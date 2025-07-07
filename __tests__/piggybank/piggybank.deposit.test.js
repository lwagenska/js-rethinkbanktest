const api = require('../../__utils__/apiClient');
const createTestUser = require('../../__utils__/createTestUser');

describe('Caixinha - Depósito (positivo)', () => {
  it('deve depositar pontos com sucesso e atualizar o saldo da caixinha', async () => {
    const user = await createTestUser();

    const response = await api.post('/caixinha/deposit', {
      amount: 50
    }, {
      headers: { Authorization: `Bearer ${user.token}` }
    });

    const balanceResponse = await api.get('/points/saldo', {
      headers: { Authorization: `Bearer ${user.token}` }
    });

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('message', 'Depósito na caixinha realizado.');

    // BUG: A API retorna status 200 e mensagem de sucesso, mas o saldo da caixinha não é atualizado.
    // Esperado: piggy_bank_balance = 50
    // Recebido: piggy_bank_balance = 0
    // Portanto, o teste falha devido a esse bug.
    expect(balanceResponse.data).toHaveProperty('piggy_bank_balance', 50)
  });
});
