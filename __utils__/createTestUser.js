const api = require('./apiClient');
const { faker } = require('@faker-js/faker');

async function createTestUser() {
  const password = faker.internet.password({ length: 10, memorable: true }) + 'Aa@1';

  const user = {
    cpf: faker.string.numeric(11),
    full_name: faker.person.fullName(),
    email: faker.internet.email(),
    password,
    confirmPassword: password,
  };

  const signupResponse = await api.post('/cadastro', user).catch(e => e.response);

  if (!signupResponse || !signupResponse.data?.confirmToken) {
    throw new Error('Erro ao cadastrar usuário: ' + JSON.stringify(signupResponse?.data || 'Resposta indefinida'));
  }

  await api.get(`/confirm-email?token=${signupResponse.data.confirmToken}`).catch(e => {
    throw new Error('Erro ao confirmar e-mail: ' + JSON.stringify(e.response?.data || e.message));
  });

  const loginResponse = await api.post('/login', {
    email: user.email,
    password: user.password
  });

  return {
    email: user.email,
    password: user.password,
    cpf: user.cpf,
    token: loginResponse.data.token,
    confirmToken: signupResponse.data.confirmToken
  };
}

module.exports = createTestUser;
