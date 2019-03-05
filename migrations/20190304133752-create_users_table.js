module.exports = {
  up: (sequelize, Sequelize) => sequelize.createTable(
    'users', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      login: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      salt: {
        type: Sequelize.CHAR(10),
        allowNull: false,
      },
      password_hash: {
        type: Sequelize.CHAR(64),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        allowNull: false,
      },
    },
  ).then(() =>
    sequelize.addIndex('users', {
      fields: ['login'],
      name: 'login_UNIQUE',
      unique: true,
    }),
  ).then(() =>
    sequelize.addIndex('users', {
      fields: ['email'],
      name: 'email_UNIQUE',
      unique: true,
    }),
  ),

  down: queryInterface => queryInterface.dropTable('users'),
};
