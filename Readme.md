# token-auth-user

O intuito desse repositório é criar um componente padrão de token de autenticação, construído 
em node.js com Typescript, para ser usado sempre na autenticação de usuário usando a estrutura
padrão de CPF e senha, e liberação do token, a partir de usuário também pré-criados, usando MongoDB.

<img src="https://raw.githubusercontent.com/JoaoIto/token-auth-user/main/github/assets/baseTlDraw.jpeg">

---
## How start:

````
npm run start
````

Isso vai iniciar as rotas do servidor:

````
get => /users
post => /login {cpf, senha}
````

A rota de get, devolve todos os usuários, porém protegida com um token já validado a partir de um usuário,
e a rota de post sendo utilizada para fazer a verificação.

- Ao iniciar o sistema, os usuários são pré-criados no banco de dados configurado do mongoDB.
- Ao iniciar é rodado uma função que cria registros fake para serem usados na verificação.

````json 
{
  "users": [
    {
      "cpf": "00000000000",
      "senha": "1111"
    }
  ]
}
````

---