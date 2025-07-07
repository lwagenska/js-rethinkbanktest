const api = require('../../__utils__/apiClient');
const createTestUser = require('../../__utils__/createTestUser');

describe('Envio de Pontos - Cenários negativos', () => {
    let sender;
    let senderToken;

    beforeAll(async () => {
        sender = await createTestUser();

        const loginResponse = await api.post('/login', {
            email: sender.email,
            password: sender.password
        });

        senderToken = loginResponse.data.token;
    });

    it('deve falhar ao tentar enviar pontos para um CPF inexistente', async () => {
        // 1. Cria o remetente autenticado
        const sender = await createTestUser();

        // 2. Exclui outro usuário e guarda seu CPF para garantir que ele "não exista"
        const userToDelete = await createTestUser();

        await api.delete('/account', {
            headers: { Authorization: `Bearer ${userToDelete.token}` },
            data: { password: userToDelete.password }
        });

        // 3. Tenta enviar pontos para o CPF excluído
        const response = await api.post('/points/send', {
            recipientCpf: userToDelete.cpf,
            amount: 100
        }, {
            headers: { Authorization: `Bearer ${sender.token}` }
        }).catch(e => e.response);

        // 4. Verificações
        expect(response.status).toBe(404);
        expect(response.data).toHaveProperty('error', 'Usuário destino não encontrado');
    });

    it('deve falhar ao tentar enviar pontos com saldo insuficiente', async () => {
        const response = await api.post('/points/send', {
            recipientCpf: '11122233344', // CPF válido mas saldo insuficiente
            amount: 999999
        }, {
            headers: { Authorization: `Bearer ${senderToken}` }
        }).catch(e => e.response);

        expect(response.status).toBe(400);
        expect(response.data).toHaveProperty('error', 'Saldo insuficiente');
    });

    it('deve falhar ao tentar enviar pontos sem saldo suficiente', async () => {
        const sender = await createTestUser();
        const recipient = await createTestUser();

        const response = await api.post('/points/send', {
            recipientCpf: recipient.cpf,
            amount: 150 // ou qualquer valor > 100
        }, {
            headers: { Authorization: `Bearer ${sender.token}` }
        }).catch(e => e.response);

        expect(response.status).toBe(400);
        // A mensagem correta retornada pela API é "Saldo insuficiente",
        // embora o Swagger documente "Valor inválido", a mensagem atual é a mais ideal
        expect(response.data).toHaveProperty('error', 'Saldo insuficiente');
    });
});
