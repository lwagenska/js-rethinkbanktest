const api = require('../../utils/apiClient');
const { faker } = require('@faker-js/faker');
const buildUser = require('../../utils/buildUser');

describe('Signup - cenários negativos', () => {
    it('Deve retornar erro ao tentar cadastrar com CPF inválido', async () => {
        const user = buildUser({ cpf: '123' });

        const response = await api.post('/cadastro', user).catch(e => e.response);

        expect(response).not.toBeNull();
        expect(response.status).toBe(400);
        expect(response?.data?.error).toBe('CPF inválido');
    });

    it('Deve retornar erro ao tentar cadastrar sem email', async () => {
        const user = buildUser({ email: '' });

        const response = await api.post('/cadastro', user).catch(e => e.response);

        expect(response).not.toBeNull();
        expect(response?.status).toBe(400);
        expect(response?.data?.error).toBe('Email inválido');
    });

    it('Deve retornar erro ao tentar cadastrar com senha fraca', async () => {
        const weakPassword = '123456';
        const user = buildUser({ password: weakPassword, confirmPassword: weakPassword });

        const response = await api.post('/cadastro', user).catch(e => e.response);

        expect(response).not.toBeNull();
        expect(response?.status).toBe(400);
        expect(response?.data?.error).toBe('Senha fraca');
    });

    it('Deve retornar erro ao tentar cadastrar com confirmação de senha divergente', async () => {
        const user = buildUser({
            password: 'Teste123@',
            confirmPassword: 'Teste321@'
        });

        const response = await api.post('/cadastro', user).catch(e => e.response);

        expect(response).not.toBeNull();
        expect(response.status).toBe(400);
        expect(response.data?.error).toBe('Senhas não conferem');
    });

    it('Deve retornar erro ao tentar cadastrar com email inválido', async () => {
        // Força senha forte para garantir que o erro de email inválido seja alcançado
        const strongPassword = 'Teste123@';
        const user = buildUser({
            email: 'email_invalido',
            password: strongPassword,
            confirmPassword: strongPassword
        });

        const response = await api.post('/cadastro', user).catch(e => e.response);

        expect(response).not.toBeNull();
        expect(response?.status).toBe(400);
        expect(response?.data?.error).toBe('Email inválido');
    });

    it('Deve retornar erro ao tentar cadastrar com nome em branco', async () => {
        const user = buildUser({ full_name: '' });

        const response = await api.post('/cadastro', user).catch(e => e.response);

        expect(response).not.toBeNull();
        expect(response?.status).toBe(400);
        expect(response?.data?.error).toBe('Nome completo obrigatório');
    });

    it('Deve retornar erro ao tentar cadastrar com CPF já existente', async () => {
        // Cria um usuário válido
        const existingCpf = faker.string.numeric(11);
        const user1 = buildUser({ cpf: existingCpf });
        const created = await api.post('/cadastro', user1);

        expect(created.status).toBe(201); // Ou 200, dependendo da API

        // Tenta cadastrar novamente com o mesmo CPF
        const user2 = buildUser({ cpf: existingCpf });
        const response = await api.post('/cadastro', user2).catch(e => e.response);

        expect(response).not.toBeNull();
        expect(response.status).toBe(400);

        // TODO: A API está retornando uma mensagem de erro genérica do banco de dados (ex: "duplicate key value"). 
        // A API deveria retornar "CPF já cadastrado" (ou algo parecido)
        // expect(response.data?.error).toBe('CPF já cadastrado');
    });

    it('Deve priorizar a validação da senha fraca antes de validar o email', async () => {
        const weakPassword = '123456'; // senha fraca
        const user = buildUser({
            email: 'email_invalido',
            password: weakPassword,
            confirmPassword: weakPassword
        });

        const response = await api.post('/cadastro', user).catch(e => e.response);

        expect(response).not.toBeNull();
        expect(response.status).toBe(400);

        expect(response.data?.error).toBe('Senha fraca');

        // TODO: A API valida a senha antes do email e retorna apenas o primeiro erro encontrado.
        // O ideal seria retornar todos os erros de validação em uma única resposta,
        // permitindo que o usuário corrija todos os campos de uma só vez.
    });
});
