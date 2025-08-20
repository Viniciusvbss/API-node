import jwt from 'jsonwebtoken';

export async function getJsonToken(req) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        throw new Error('Token não encontrado');
    }

    // Geralmente o token vem no formato "Bearer <token>"
    const token = authHeader.split(' ')[1];
    if (!token) {
        throw new Error('Token mal formatado');
    }

    try {
        // Decodifica o token sem validar a assinatura
        // const decoded = jwt.decode(token);

        // Se quiser validar também, precisa da sua chave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Desestrutura o payload do token
        const { id, nome, email, tipo } = decoded;

        return { id, nome, email, tipo };
    } catch (error) {
        throw new Error('Token inválido: ' + error.message);
    }
}
