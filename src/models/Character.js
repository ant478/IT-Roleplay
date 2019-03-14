module.exports.Character = (sequelize, Sequelize) => {
  const Character = sequelize.define('Character', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    avatarUrl: {
      field: 'avatar_url',
      type: Sequelize.STRING(2083),
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    authorId: {
      field: 'author_id',
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    data: {
      type: Sequelize.JSON,
      allowNull: false,
    },
    createdAt: {
      field: 'created_at',
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('NOW()'),
    },
    updatedAt: {
      field: 'updated_at',
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('NOW()'),
    },
  }, {
    tableName: 'characters',
  });

  Character.associate = function associate(models) {
    models.Character.belongsTo(models.User, {
      as: 'author',
      foreignKey: 'authorId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };

  Character.loadScopes = function loadScopes(models) {
    Character.addScope('withAuthor', {
      include: [{
        model: models.User,
        as: 'author',
      }],
      attributes: {
        exclude: ['authorId'],
      },
    });
  };

  return Character;
};
