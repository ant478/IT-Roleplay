module.exports = {
  up: queryInterface => queryInterface.bulkInsert('users', [{
    id: 1,
    login: 'ant478',
    email: 'ant478@gmail.com',
    salt: '55df896cb0',
    password_hash: '3f9966addc73cd34bc9ebec92877ea513b173765eb081c054bd587216a0b23aa', // 123456
  }, {
    id: 2,
    login: 'genaschur',
    email: 'genaschur@mail.ru',
    salt: '55df896cb0',
    password_hash: '3f9966addc73cd34bc9ebec92877ea513b173765eb081c054bd587216a0b23aa', // 123456
  }]),

  down: queryInterface => queryInterface.bulkDelete('users'),
};
