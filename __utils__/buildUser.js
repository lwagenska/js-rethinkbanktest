const { faker } = require('@faker-js/faker');

function buildUser(overrides = {}) {
    const password = `${faker.string.alphanumeric(6)}@1A`;
    return {
        cpf: faker.string.numeric(11),
        full_name: faker.person.fullName(),
        email: faker.internet.email(),
        password,
        confirmPassword: password,
        ...overrides
    };
}

module.exports = buildUser;
