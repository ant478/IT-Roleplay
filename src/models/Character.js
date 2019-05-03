const DATA_PROPERTIES = ['attributes', 'roles', 'skills', 'technologies', 'perks', 'availablePoints'];

module.exports.DATA_PROPERTIES = DATA_PROPERTIES;

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
    avatarId: {
      field: 'avatar_id',
      type: Sequelize.STRING(255),
      allowNull: true,
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
    },
    updatedAt: {
      field: 'updated_at',
      type: Sequelize.DATE,
      allowNull: false,
    },
  }, {
    timestamps: true,
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
