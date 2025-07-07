const api = require('../../utils/apiClient');
const createTestUser = require('../../utils/createTestUser');

describe('Envio de Pontos - Cenários positivos', () => {
  let sender;
  let receiver;
  let senderToken;

  beforeAll(async () => {
    sender = await createTestUser();
    receiver = await createTestUser();

    // Login para obter o token do remetente
    const loginResponse = await api.post('/login', {
      email: sender.email,
      password: sender.password
    });

    senderToken = loginResponse.data.token;
  });

  it('deve enviar pontos com sucesso para outro usuário', async () => {
    const response = await api.post('/points/send', {
      recipientCpf: receiver.cpf,     
      amount: 100
    }, {
      headers: { Authorization: `Bearer ${senderToken}` }
    });

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('message', 'Pontos enviados com sucesso.');
  });
});
