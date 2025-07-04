# 🧑‍🔬 API Test Automation - Rethink Bank

Projeto de automação de testes em JavaScript utilizando [Jest](https://jestjs.io/) e [Axios](https://axios-http.com/) com foco na API do sistema Rethink Bank. Desenvolvido como parte de um teste técnico.

---

## 📌 Visão Geral

A automação cobre funcionalidades essenciais da aplicação, simulando a jornada de um usuário real no ecossistema do banco digital:

- Criação e confirmação de usuários
- Depósitos e resgates na caixinha
- Consulta de extratos
- Envio de pontos entre usuários
- Exclusão de conta

O projeto também contempla:

- Cobertura de cenários positivos e negativos
- Isolamento de testes via criação dinâmica de usuários
- Organização modular e reutilização de utilitários

---

## 🔧 O que foi feito?

✅ Planejamento e execução de testes funcionais via Jest e Axios  
✅ Estruturação dos testes em arquivos organizados por funcionalidade  
✅ Criação de usuários e autenticação via token JWT  
✅ Validação de respostas e mensagens da API  
✅ Criação de dados dinâmicos com Faker para simular diferentes perfis de usuário
✅ Relato e documentação de bugs encontrados, com classificação de criticidade

---

## 🕵️‍♂️ Perguntas do teste técnico

#### 🐞 Há bugs? Se sim, quais são e quais são os cenários esperados?

**Sim**, foram identificados os seguintes bugs:

1. **Depósito na caixinha**  
   - **Comportamento atual:** A API retorna status 200 com mensagem de sucesso (`Depósito na caixinha realizado.`), porém o saldo da caixinha **permanece zerado**.  
   - **Esperado:** Após o depósito, o valor deve ser refletido no saldo da caixinha.

2. **Mensagem divergente entre a API e o Swagger para envio de pontos com saldo insuficiente**  
   - **Comportamento atual:** A mensagem de erro retornada é diferente da descrita no Swagger (`"Saldo insuficiente"` vs `"Valor inválido"`).  
   - **Esperado:** Consistência entre a documentação e o retorno da API.

#### 📊 Se houver bugs, classifique-os em nível de criticidade

| Bug                                                    | Criticidade |
|--------------------------------------------------------|-------------|
| Depósito sem refletir no saldo da caixinha             | **Alta**    |
| Mensagem divergente entre documentação e API           | **Baixa**   |

#### 🚀 Diante do cenário, o sistema está pronto para subir em produção?

**Não.** O bug identificado na funcionalidade de **depósito na caixinha** afeta diretamente a lógica de saldo e transações além de afetar outros cenários de teste, comprometendo a integridade financeira do sistema. Esse é um problema crítico que precisa ser resolvido antes de uma liberação para produção.

---

## 🔐 Variáveis de ambiente

Para executar os testes, crie um arquivo `.env` na raiz do projeto com base no `.env.example` (já está no projeto).

Preencha os valores de acordo com o ambiente desejado.

---

## 📂 Arquivos ignorados

Certifique-se de que os seguintes arquivos/pastas estejam em `.gitignore`:

```gitignore
node_modules/
.env
coverage/
```
Esses arquivos são específicos do ambiente local ou gerados automaticamente e não devem ser versionados.

---

## 🧪 Clone o projeto

```bash
git clone https://github.com/seu-usuario/js-rethinkbanktest.git
cd js-rethinkbanktest
```

---

## 📦 Instalação
```bash
npm install
```

---

## 🚀 Rodando os Testes
```bash
npm test
```
Para rodar apenas um teste específico:
```bash
npm test nomeDoArquivo.test.js
```

---

## 🧾 Evidências de Execução

Os testes automatizados geram evidências em formato de relatório HTML através do [Jest HTML Reporters](https://www.npmjs.com/package/jest-html-reporters).

Após a execução dos testes, o relatório será salvo automaticamente em:
```bash
./coverage/test-report.html
```
Abra diretamente no navegador para visualizar.

---

## 🛠️ Tecnologias utilizadas

- [Jest](https://jestjs.io/) - Test Runner
- [Axios](https://axios-http.com/) - Cliente HTTP
- [Node.js](https://nodejs.org/) - Ambiente de execução
- [Faker.js](https://fakerjs.dev/) - Gerador de dados dinâmicos

---

## 🗃️ Estrutura dos testes
```bash
__tests__/
├── __account__/
│   ├── account.delete.test.js           # Exclusão de conta
│   └── account.delete.error.test.js     # Exclusão de conta - erros
├── __auth__/
│   ├── login.success.test.js            # Login com sucesso
│   ├── login.error.test.js              # Login com erro
│   ├── signup.success.test.js           # Cadastro com sucesso
│   ├── signup.error.test.js             # Cadastro com erro
│   └── signup.confirm-email.test.js     # Confirmação de e-mail
├── __piggybank__/
│   ├── piggybank.deposit.test.js        # Depósito na caixinha
│   ├── piggybank.deposit.error.test.js  # Depósito na caixinha - erros
│   ├── piggybank.withdraw.test.js       # Resgate da caixinha
│   ├── piggybank.withdraw.error.test.js # Resgate da caixinha - erros
│   ├── piggybank.extract.test.js        # Consulta de extrato
│   └── piggybank.extract.error.test.js  # Consulta de extrato - erros
├── __points__/
│   ├── sendPoints.test.js               # Envio de pontos
│   └── sendPoints.error.test.js         # Envio de pontos - erros
utils/
├── apiClient.js                         # Instância Axios com base URL
├── createTestUser.js                    # Utilitário para criação de usuário
└── buildUser.js                         # Geração de dados dinâmicos para usuário
```

---

## 🙋‍♂️ Autor

Desenvolvido por Lucas Wagenska como parte de um teste técnico.
