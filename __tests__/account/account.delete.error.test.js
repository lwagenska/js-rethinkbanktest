const api = require('../../utils/apiClient');
const createTestUser = require('../../utils/createTestUser');

describe('Conta Bancária - Exclusão (negativos)', () => {
    it('deve falhar ao tentar excluir conta sem token', async () => {
        const response = await api.delete('/account', {
            data: { password: 'qualquerSenha123' },
        }).catch(e => e.response);

        expect(response.status).toBe(401);
        expect(response.data).toHaveProperty('error', 'Não autorizado');
    });

    it('deve falhar ao tentar excluir conta com token inválido', async () => {
        const response = await api.delete('/account', {
            data: { password: 'qualquerSenha123' },
        }).catch(e => e.response);

        expect(response.status).toBe(401);
        expect(response.data).toHaveProperty('error', 'Não autorizado');
    });

    it('deve falhar ao tentar excluir conta com senha inválida', async () => {
        const user = await createTestUser();
        await api.get(`/confirm-email?token=${user.confirmToken}`);

        const loginResponse = await api.post('/login', {
            email: user.email,
            password: user.password,
        });

        const token = loginResponse.data.token;

        const response = await api.delete('/account', {
            headers: { Authorization: `Bearer ${token}` },
            data: { password: 'senhaErrada123' },
        }).catch(e => e.response);

        expect(response.status).toBe(400);
        expect(response.data).toHaveProperty('error', 'Senha inválida');
    });
});
