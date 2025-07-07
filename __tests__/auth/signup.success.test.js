const api = require('../../utils/apiClient');
const buildUser = require('../../utils/buildUser');

describe('Signup - Cadastro de novo usuário', () => {
  it('deve cadastrar um novo usuário com sucesso', async () => {
    const user = buildUser();

    const response = await api.post('/cadastro', user);

    expect(response.status).toBe(201);
    expect(response.data.message).toBe('Cadastro realizado com sucesso.');
    expect(typeof response.data.confirmToken).toBe('string');
    expect(response.data.confirmToken.length).toBeGreaterThan(0);
  });

  it('deve retornar somente a mensagem e o token de confirmação no corpo da resposta', async () => {
    const user = buildUser();

    const response = await api.post('/cadastro', user);

    const responseFields = Object.keys(response.data);

    expect(responseFields).toEqual(expect.arrayContaining(['message', 'confirmToken']));
    expect(responseFields.length).toBe(2); // deve conter exatamente esses dois campos
  });
});
