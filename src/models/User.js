const crypto = require('crypto');

const GLOBAL_SALT = '7E3D616848B3';
const PRIVATE_PROPERTIES = ['passwordHash', 'salt'];

const getPasswordHash = (password, salt) =>
  crypto.pbkdf2Sync(`${GLOBAL_SALT}${password}`, salt, 1000, 32, 'sha256').toString('hex');

module.exports.PRIVATE_PROPERTIES = PRIVATE_PROPERTIES;

module.exports.User = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    login: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    salt: {
      type: Sequelize.CHAR(10),
      allowNull: false,
    },
    passwordHash: {
      field: 'password_hash',
      type: Sequelize.CHAR(64),
      allowNull: false,
    },
    createdAt: {
      field: 'created_at',
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      field: 'updated_at',
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }, {
    tableName: 'users',
    defaultScope: {
      attributes: {
        exclude: PRIVATE_PROPERTIES,
      },
    },
  });

  User.associate = function associate(models) {
    models.User.hasMany(models.Character, {
      as: 'characters',
      foreignKey: 'authorId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };

  User.prototype.setPassword = function setPassword(password) {
    const salt = crypto.randomBytes(5).toString('hex');
    const passwordHash = getPasswordHash(password, salt);

    this.set('salt', salt);
    this.set('passwordHash', passwordHash);
  };

  User.prototype.verifyPassword = function verifyPassword(password) {
    return getPasswordHash(password, this.salt) === this.passwordHash;
  };

  return User;
};
