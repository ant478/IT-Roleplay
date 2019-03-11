module.exports = {
  up: queryInterface => queryInterface.bulkInsert('users', [{
    id: 1,
    login: 'ant478',
    email: 'ant478@gmail.com',
    salt: '1234567890',
    password_hash: '1234567812345678123456781234567812345678123456781234567812345678',
  }, {
    id: 2,
    login: 'genaschur',
    email: 'genaschur@mail.ru',
    salt: '1234567890',
    password_hash: '1234567812345678123456781234567812345678123456781234567812345678',
  }]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', {
    [Sequelize.Op.or]: [{ id: 1 }, { id: 2 }],
  }),
};
