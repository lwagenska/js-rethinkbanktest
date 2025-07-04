const api = require('../../utils/apiClient');
const buildUser = require('../../utils/buildUser');
const createTestUser = require('../../utils/createTestUser');

describe('Login - Cenários negativos', () => {
  it('deve falhar ao tentar logar com e-mail inexistente', async () => {
    // Usuário não existe no sistema
    const response = await api.post('/login', {
      email: 'naoexiste@teste.com',
      password: 'qualquerSenha123'
    }).catch(e => e.response);

    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty('error', 'Credenciais inválidas');
  });

  it('deve falhar ao tentar logar com senha incorreta', async () => {
    const user = await createTestUser();

    const response = await api.post('/login', {
      email: user.email,
      password: 'senhaIncorreta123'
    }).catch(e => e.response);

    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty('error', 'Credenciais inválidas');
  });

  it('deve falhar ao tentar logar sem confirmar o e-mail', async () => {
    const user = buildUser();

    await api.post('/cadastro', user);

    const response = await api.post('/login', {
      email: user.email,
      password: user.password
    }).catch(e => e.response);

    expect(response.status).toBe(403);
    expect(response.data).toHaveProperty('error', 'E-mail não confirmado');
  });
});
