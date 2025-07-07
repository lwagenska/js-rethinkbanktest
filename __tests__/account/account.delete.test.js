const api = require('../../utils/apiClient');
const createTestUser = require('../../utils/createTestUser');

describe('Conta Bancária - Exclusão (positivos)', () => {
    jest.setTimeout(15000);

    it('deve excluir a conta com sucesso', async () => {
        const user = await createTestUser();
        await api.get(`/confirm-email?token=${user.confirmToken}`);

        const loginResponse = await api.post('/login', {
            email: user.email,
            password: user.password,
        });

        const token = loginResponse.data.token;

        const response = await api.delete('/account', {
            headers: { Authorization: `Bearer ${token}` },
            data: { password: user.password },
        });

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('message', 'Conta marcada como deletada.');
    });
});
