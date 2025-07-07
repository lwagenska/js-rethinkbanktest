const api = require('../../__utils__/apiClient');
const buildUser = require('../../__utils__/buildUser');

describe('Login - Cenários positivos', () => {
    let user;
    let token;

    beforeAll(async () => {
        user = buildUser();

        // Cadastro do usuário
        const signupResponse = await api.post('/cadastro', user);
        const confirmToken = signupResponse.data?.confirmToken;

        // Confirmação de email
        await api.get(`/confirm-email?token=${confirmToken}`);

        // Realiza login
        const loginResponse = await api.post('/login', {
            email: user.email,
            password: user.password,
        });

        expect(loginResponse.status).toBe(200);
        expect(loginResponse.data).toHaveProperty('token');

        token = loginResponse.data.token;
    });

    it('deve realizar login com sucesso', () => {
        expect(token).toMatch(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/);
    });

    it('deve gerar token com expiração de 10 minutos', () => {
        const payloadBase64 = token.split('.')[1];
        const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf-8');
        const decoded = JSON.parse(payloadJson);

        expect(decoded.exp).toBeDefined();

        const now = Math.floor(Date.now() / 1000);
        const diff = decoded.exp - now;

        expect(diff).toBeGreaterThanOrEqual(9 * 60); // mínimo 9 minutos
        expect(diff).toBeLessThanOrEqual(10 * 60);   // máximo 10 minutos
    });

    it('deve gerar um novo token a cada login', async () => {
        const login1 = await api.post('/login', {
            email: user.email,
            password: user.password,
        });

        await new Promise((r) => setTimeout(r, 1000));

        const login2 = await api.post('/login', {
            email: user.email,
            password: user.password,
        });

        expect(login1.status).toBe(200);
        expect(login2.status).toBe(200);
        expect(login1.data.token).not.toBe(login2.data.token);

        const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;

        expect(login1.data.token).toMatch(jwtRegex);
        expect(login2.data.token).toMatch(jwtRegex);
    });
});
