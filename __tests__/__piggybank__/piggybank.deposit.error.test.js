const api = require('../../utils/apiClient');
const createTestUser = require('../../utils/createTestUser');

describe('Caixinha - Depósito (negativos)', () => {
  it('deve falhar ao depositar sem token', async () => {
    const response = await api.post('/caixinha/deposit', {
      amount: 50
    }).catch(e => e.response);

    expect(response.status).toBe(401);
    expect(response.data).toHaveProperty('error', 'Não autorizado');
  });

  it('deve falhar ao depositar valor maior que o saldo', async () => {
    const user = await createTestUser();

    const response = await api.post('/caixinha/deposit', {
      amount: 9999
    }, {
      headers: { Authorization: `Bearer ${user.token}` }
    }).catch(e => e.response);

    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty('error'); 
  });
});
