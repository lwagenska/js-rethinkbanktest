const createTestUser = require('../../__utils__/createTestUser');
const api = require('../../__utils__/apiClient');

describe('Caixinha - Resgate (positivo)', () => {
    // ⚠️ Este teste está falhando devido a um bug no endpoint /caixinha/deposit,
    // que retorna 200 mas não atualiza corretamente o saldo da caixinha.
    // Sem saldo, não é possível efetivar retiradas portanto o teste aqui falha.
    // O bug deve ser corrigido para que o fluxo completo funcione como esperado.
    it('deve resgatar pontos com sucesso', async () => {
        const user = await createTestUser();

        // Primeiro, deposita pontos na caixinha (BUG)
        await api.post('/caixinha/deposit', {
            amount: 100
        }, {
            headers: { Authorization: `Bearer ${user.token}` }
        });

        try {
            // Tenta resgatar
            const response = await api.post('/caixinha/withdraw', {
                amount: 50
            }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });

            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty('message', 'Resgate da caixinha realizado.');

        } catch (error) {
            // Aqui entra por causa do BUG: depósito não reflete no saldo da caixinha
            const status = error.response?.status;
            const message = error.response?.data?.error || JSON.stringify(error.response?.data);

            throw new Error(`❌ Esperado status 200 com mensagem de sucesso, mas retornou ${status}. Erro: ${message}`);
        }
    });
});
