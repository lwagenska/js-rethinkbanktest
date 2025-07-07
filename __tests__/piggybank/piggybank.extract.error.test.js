// const createTestUser = require('../../utils/createTestUser');
const api = require('../../utils/apiClient');

describe('Caixinha - Extrato (negativo)', () => {
  it('deve falhar ao tentar acessar o extrato sem token', async () => {
    const response = await api.get('/caixinha/extrato')
      .catch(e => e.response);

    expect(response.status).toBe(401);
    expect(response.data).toHaveProperty('error', 'Não autorizado');
  });
});
