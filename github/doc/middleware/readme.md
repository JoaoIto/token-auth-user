# authenticate token

A verificação de autenticação do token, que é usado na tela de devolução de usuários logados, na qual
ela basicamente usa a lib do ***```jsonwebtoken```*** para fazer a verificação do token, e assim
só utilizamos essa função sendo passada por parâmetro na rota de users do server.

````ts
// Middleware para autenticação
import jwt from 'jsonwebtoken';

const secretKey = 'secretKey';
export const authenticateToken = (req: any, res: any, next: any) => {
    // Obter o token JWT do cabeçalho da requisição
    const token = req.headers['authorization'];

    // Verificar se o token está presente
    if (!token) {
        return res.status(401).json({ error: 'Token de autenticação não fornecido' });
    }

    // Verificar se o token é válido
    jwt.verify(token, secretKey, (error: any, decoded: any) => {
        if (error) {
            return res.status(403).json({ error: 'Token de autenticação inválido' });
        }
        // Se o token for válido, prosseguir para o próximo middleware
        req.user = decoded;
        next();
    });
};

````

---
