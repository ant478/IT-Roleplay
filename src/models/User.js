module.exports = (sequelize, Sequelize) => {
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
        exclude: ['passwordHash', 'salt'],
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

  return User;
};
