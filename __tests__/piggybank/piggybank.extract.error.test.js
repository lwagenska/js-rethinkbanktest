// const createTestUser = require('../../__utils__/createTestUser');
const api = require('../../__utils__/apiClient');

describe('Caixinha - Extrato (negativo)', () => {
  it('deve falhar ao tentar acessar o extrato sem token', async () => {
    const response = await api.get('/caixinha/extrato')
      .catch(e => e.response);

    expect(response.status).toBe(401);
    expect(response.data).toHaveProperty('error', 'Não autorizado');
  });
});
