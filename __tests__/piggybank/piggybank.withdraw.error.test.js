const createTestUser = require('../../__utils__/createTestUser');
const api = require('../../__utils__/apiClient');

describe('Caixinha - Resgate (negativos)', () => {
    it('deve falhar ao tentar resgatar sem token', async () => {
        const response = await api.post('/caixinha/withdraw', { amount: 10 })
            .catch(e => e.response);

        expect(response.status).toBe(401);
        expect(response.data).toHaveProperty('error', 'Não autorizado');
    });

    it('deve falhar ao resgatar mais que o saldo da caixinha', async () => {
        const user = await createTestUser();

        // Tenta depositar 50 na caixinha
        await api.post('/caixinha/deposit', {
            amount: 50
        }, {
            headers: { Authorization: `Bearer ${user.token}` }
        });

        // Valida se o saldo foi atualizado corretamente
        const saldoResponse = await api.get('/points/saldo', {
            headers: { Authorization: `Bearer ${user.token}` }
        });

        const saldo = saldoResponse.data.piggy_bank_balance;

        // Garante que o cenário esteja correto (pré-condição)
        expect(saldo).toBe(50); // se for 0 aqui, o teste já quebra e evita falso positivo (como estava dando inicialmente)

        const response = await api.post('/caixinha/withdraw', { 
            amount: 100 
        }, {
            headers: { Authorization: `Bearer ${user.token}` }
        }).catch(e => e.response);

        expect(response.status).toBe(400);
        expect(response.data).toHaveProperty('error', 'Saldo na caixinha insuficiente');
    });
});
