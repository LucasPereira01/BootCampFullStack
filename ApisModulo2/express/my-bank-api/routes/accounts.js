const express = require('express');
const router = express.Router();
const fs = require('fs').promises;

global.fileName = 'accounts.json';

router.get('/', async (req, res) => {
  try {
    let data = await fs.readFile(global.fileName, 'utf-8');
    let json = JSON.parse(data);
    delete json.nextId;
    res.status(200).send(json);
    logger.info('Get /account - Consulta de Contas');
  } catch (error) {
    res.status(400).send({ error: 'erro Leitura' });
    logger.error('GET /account- Nao foi possivel buscar Contas');
  }
});
router.get('/:id', async (req, res) => {
  try {
    let data = await fs.readFile(global.fileName, 'utf-8');
    let id = req.params.id;
    let json = JSON.parse(data);
    let account = json.accounts.find((account) => account.id === parseInt(id));
    if (account) {
      res.status(200).send(account);
    } else {
      res.end();
    }
    logger.info(`GET ID /account -  ${JSON.stringify(account)}`);
  } catch (error) {
    res.status(400).send({ error: 'Erro Leitura' });
    logger.error('GET ID /account - Usuario nao encontrado');
  }
});

router.post('/', async (req, res) => {
  let account = req.body;
  try {
    let data = await fs.readFile(global.fileName, 'utf-8');
    let json = JSON.parse(data);

    account = { id: json.nextId++, ...account };
    json.accounts.push(account);

    await fs.writeFile(global.fileName, JSON.stringify(json));
    res.status(201).send('Conta Criada com Sucesso');
    logger.info(`Post /account - ${JSON.stringify(account)}`);
  } catch (error) {
    res.status(400).send({ error: 'Erro criar conta' });
    logger.error(`Post /account - Erro crir conta`);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let data = await fs.readFile(global.fileName, 'utf-8');
    let id = req.params.id;
    const json = JSON.parse(data);
    const account = json.accounts.filter(
      (account) => account.id !== parseInt(id)
    );
    json.accounts = account;
    fs.writeFile(global.fileName, JSON.stringify(json));
    res.status(201).send({ sucesso: 'conta excluida ' });

    logger.info(`Delete /account  ID:${id}`);
  } catch (error) {
    res.status(400).send({ err: 'Erro ao excluir conta' });
    logger.error('Delete /account erro ao deletar ');
  }
});
router.put('/', async (req, res) => {
  let newAccount = req.body;
  try {
    let data = await fs.readFile(global.fileName, 'utf-8');
    const json = JSON.parse(data);
    const accountIndex = json.accounts.findIndex(
      (account) => account.id === newAccount.id
    );
    json.accounts[accountIndex].name = newAccount.name;
    json.accounts[accountIndex].ballance = newAccount.ballance;
    await fs.writeFile(global.fileName, JSON.stringify(json));
    res.status(201).send({ sucesso: 'conta Alterada ' });
    logger.info(`PUT /account - ${JSON.stringify(newAccount)}`);
  } catch (error) {
    res.status(400).send({ err: 'Erro ao alterar  conta' });
    logger.error('PUT /account erro ao Alterar dados da conta ');
  }
});

router.post('/deposit', async (req, res) => {
  let params = req.body;
  try {
    let data = await fs.readFile(global.fileName, 'utf-8');
    const json = JSON.parse(data);
    const index = json.accounts.findIndex(
      (account) => account.id === params.id
    );

    if (params.value < 0 && json.accounts[index].ballance + params.value < 0) {
      throw new Error('Nao ha saldo suficiente');
    }
    json.accounts[index].ballance += params.value;
    await fs.writeFile(global.fileName, JSON.stringify(json));
    res.status(201).send({ succes: `transação feita com sucesso` });
    logger.info(
      `POST /account/deposit - Valor:${JSON.stringify(params.value)}`
    );
  } catch (error) {
    res.status(400).send({ erro: 'Nao foi possivel altera o saldo' });
    logger.erro('POST /account/deposit - Erro na Transação');
  }
});

module.exports = router;
