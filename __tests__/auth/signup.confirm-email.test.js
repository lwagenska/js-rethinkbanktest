const api = require('../../__utils__/apiClient');
const buildUser = require('../../__utils__/buildUser');

describe('Signup - Confirmação de Email', () => {
    it('deve confirmar o email com sucesso com um token válido', async () => {
        const user = buildUser();

        // Faz o cadastro e captura o token
        const signupResponse = await api.post('/cadastro', user);
        const token = signupResponse.data?.confirmToken;

        expect(token).toBeDefined();

        // Faz a confirmação de email
        const confirmResponse = await api.get(`/confirm-email?token=${token}`);

        expect(confirmResponse.status).toBe(200);
        // A resposta da API é em text/plain, portanto response.data é uma string simples
        expect(confirmResponse.data).toBe('E-mail confirmado com sucesso.');
    });

    it('deve retornar erro ao tentar confirmar com token inválido', async () => {
        const invalidToken = 'invalid-token-123';

        const response = await api.get(`/confirm-email?token=${invalidToken}`).catch(e => e.response);

        expect(response).not.toBeNull();
        expect(response.status).toBe(400);
        // A resposta da API é em text/plain, portanto response.data é uma string simples
        expect(response.data).toBe('Token inválido ou expirado.');
    });

});
