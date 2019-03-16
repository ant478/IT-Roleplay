const hooks = require('hooks');

function logIn(transaction, userId) {
  transaction.request.headers['stub-auth-user-id'] = `${userId}`; // TODO: send login request instead of stubbing
}

function replaceIdInPath(transaction, newId) {
  transaction.fullPath = transaction.fullPath.replace(/\/\d+$/, `/${newId}`);
  transaction.request.uri = transaction.fullPath;
}

function assignPropertyInRequestBody(transaction, property, value) {
  const requestBody = JSON.parse(transaction.request.body);

  requestBody[property] = value;

  transaction.request.body = JSON.stringify(requestBody);
}

hooks.beforeEach((transaction) => {
  transaction.skip = transaction.expected.statusCode === '500'; // error 500 cant be triggered in normal conditions (I hope)
});

hooks.before('Characters > /characters > Creates new character. > 201 > application/json; charset=utf-8', (transaction) => {
  logIn(transaction, 1);
});

hooks.before('Characters > /characters > Creates new character. > 400 > application/json; charset=utf-8', (transaction) => {
  logIn(transaction, 1);
  assignPropertyInRequestBody(transaction, 'name', null);
});

hooks.before('Characters > /characters/{characterId} > Gets full profile of a character. > 404 > application/json; charset=utf-8', (transaction) => {
  replaceIdInPath(transaction, 123);
});

hooks.before('Characters > /characters/{characterId} > Modifies character. > 200 > application/json; charset=utf-8', (transaction) => {
  logIn(transaction, 1);
});

hooks.before('Characters > /characters/{characterId} > Modifies character. > 400 > application/json; charset=utf-8', (transaction) => {
  logIn(transaction, 1);
  assignPropertyInRequestBody(transaction, 'data', 123);
});

hooks.before('Characters > /characters/{characterId} > Modifies character. > 403 > application/json; charset=utf-8', (transaction) => {
  logIn(transaction, 2);
});

hooks.before('Characters > /characters/{characterId} > Modifies character. > 404 > application/json; charset=utf-8', (transaction) => {
  logIn(transaction, 1);
  replaceIdInPath(transaction, 123);
});

hooks.before('Characters > /characters/{characterId} > Deletes character. > 200', (transaction) => {
  logIn(transaction, 1);
  replaceIdInPath(transaction, 2);
});

hooks.before('Characters > /characters/{characterId} > Deletes character. > 401', (transaction) => {
  replaceIdInPath(transaction, 2);
});

hooks.before('Characters > /characters/{characterId} > Deletes character. > 403', (transaction) => {
  logIn(transaction, 2);
});

hooks.before('Characters > /characters/{characterId} > Deletes character. > 404', (transaction) => {
  logIn(transaction, 1);
  replaceIdInPath(transaction, 123);
});

hooks.before('Users > /user/login > Logging user in. > 400 > application/json; charset=utf-8', (transaction) => {
  assignPropertyInRequestBody(transaction, 'login', null);
});

hooks.before('Users > /user/register > Registration of a new user. > 400 > application/json; charset=utf-8', (transaction) => {
  assignPropertyInRequestBody(transaction, 'login', null);
});

hooks.before('Users > /user/register > Registration of a new user. > 409 > application/json; charset=utf-8', (transaction) => {
  assignPropertyInRequestBody(transaction, 'login', 'ant478');
});

hooks.before('Users > /user/logout > Logging user out. > 200 > application/json; charset=utf-8', (transaction) => {
  logIn(transaction, 1);
});
