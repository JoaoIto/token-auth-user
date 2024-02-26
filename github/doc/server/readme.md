# ``server.ts``

O arquivo principal do projeto, na qual é onde iniciamos o servidor, a conexão com o banco
do MongoDB. Vamos entender cada parte do código e o que ela faz:

## Inicializando servidor e portas
`````ts
const app = express();
const port = 3000;
const secretKey = 'secretKey';
`````

Inicializando o servidor do express, depois especificamos a porta e ainda sim pré-definimos
a key que será usado na definição do token.

## Configuração e logs do banco de dados
````ts
// Conectar ao banco de dados MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase');

// Verificar se a conexão foi bem-sucedida
mongoose.connection.on('connected', () => {
    console.log('Conectado ao banco de dados!');
    // Você também pode exibir algumas informações sobre o banco de dados conectado
    console.log('Informações do banco de dados:');
    console.log(`Nome do banco de dados: ${mongoose.connection.name}`);
    console.log(`Host: ${mongoose.connection.host}`);
    console.log(`Porta: ${mongoose.connection.port}`);
});

// Verificar se a conexão falhou
mongoose.connection.on('error', (error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
});

````

---

## Rotas: 

- **``Rota de registro: ``**: : Esta rota permite que novos usuários sejam registrados fornecendo um CPF e uma senha. Após o registro bem-sucedido, o usuário pode usar suas credenciais para fazer login no sistema.
````ts
app.post('/register', async (req, res) => {
const { cpf, senha } = req.body;
try {
// Verificar se o usuário já existe no banco de dados
const existingUser = await UserModel.findOne({ cpf });
if (existingUser) {
return res.status(400).json({ error: 'Usuário já existe' });
}
// Criar um novo usuário no banco de dados
const newUser = new UserModel({ cpf, senha });
await newUser.save();
res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
} catch (error) {
console.error('Erro durante o cadastro:', error);
res.status(500).json({ error: 'Erro interno do servidor' });
}
});

````

- **``Rota de login: ``**: Essa é a rota da principal funcionalidade para qual o sistema foi feito, na qual
temos os parâmetros padrão de requisições, (``request, response``), sendo o corpo da requisição, o que esperamos
receber do usuário a ser logado.
1. Primeiramente ele faz a busca no banco de dados, comparando os dados recebidos do usuário 
com algum que já exista no banco de dados do mongoDB, e assim temos seguinte uma verificação. 

2. A verificação entende de que caso o usuário não exista, ou suas credenciais sejam diferentes de todos os usuários
que possam existir no banco, ele já retorna um erro de não autorização, 401, e assim não há nada o que fazer.
Caso contrário, o usuário encontrado, e com essas credenciais, temos aí um token gerado a partir do CPF que é oferecido
e a key para o token.
````ts
app.use(bodyParser.json());
app.post('/login', async (req, res) => {
    const { cpf, senha } = req.body;
    try {
        // Procurar usuário no banco de dados
        const user = await UserModel.findOne({ cpf });
        if (!user) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }
        // Verificar a senha
        if (user.senha !== senha) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }
        // Gerar token JWT
        const token = jwt.sign({ cpf }, secretKey);
        res.json({ token });
    } catch (error) {
        console.error('Erro durante a autenticação:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
````

- **``Rota de users: ``**: Uma rota de get padrão, na qual ela usa autenticação, para garantir que possa devolver 
todos os usuários existentes, somente caso o usuário requerente esteja enviando um token autenticado, que é validado.

````ts
app.get('/users', async (req, res) => {
    try {
        console.log('\nBuscando usuários...\n');
        // Buscar todos os usuários no banco de dados
        const users = await UserModel.find();
        console.log('Usuários encontrados:', users);
        // Retornar a lista de usuários
        res.json({ users });
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
````

---
