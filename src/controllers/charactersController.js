const _ = require('lodash');
const models = require('../models');

const characterFull = {
  id: 1,
  name: 'Thomas Anderson',
  avatarUrl: 'https://upload.wikimedia.org/wikipedia/ru/4/4c/Neo2.jpg',
  author: {
    id: 1,
    login: 'ant478',
    email: 'ant478@gmail.com',
    createdAt: '2019-02-21T14:54:42.779Z',
    updatedAt: '2019-02-21T14:54:42.779Z',
  },
  data: {
    attributes: [
      {
        id: 1,
        value: 10,
      },
      {
        id: 2,
        value: 14,
      },
      {
        id: 3,
        value: 14,
      },
      {
        id: 4,
        value: 12,
      },
      {
        id: 5,
        value: 16,
      },
      {
        id: 6,
        value: 8,
      },
    ],
    classes: [
      {
        id: 1,
        value: 10,
      },
      {
        id: 2,
        value: 14,
      },
      {
        id: 3,
        value: 14,
      },
      {
        id: 4,
        value: 12,
      },
      {
        id: 5,
        value: 16,
      },
      {
        id: 6,
        value: 8,
      },
    ],
    skills: [
      {
        id: 1,
        value: 10,
      },
      {
        id: 2,
        value: 14,
      },
      {
        id: 3,
        value: 14,
      },
      {
        id: 4,
        value: 12,
      },
      {
        id: 5,
        value: 16,
      },
      {
        id: 6,
        value: 8,
      },
    ],
    technologies: [
      1,
      3,
      7,
      5,
      12,
    ],
    perks: [
      1,
      3,
      7,
      5,
      12,
    ],
  },
  createdAt: '2019-02-21T14:54:42.779Z',
  updatedAt: '2019-02-21T14:54:42.779Z',
};

module.exports.index = async function index(req, res) {
  const characters = await models.Character.scope('withAuthor').findAll();
  const json = characters.map((character) => {
    const characterJSON = character.toJSON();

    return Object.assign(characterJSON, {
      data: _.pick(characterJSON.data, ['attributes', 'classes']),
    });
  });

  res.status(200).json(json);
};

module.exports.view = async function view(req, res) {
  const { characterId } = req.params;
  const character = await models.Character.scope('withAuthor').findByPk(characterId);

  if (!character) {
    res.status(404).json({ code: 404, message: 'Not Found.' });
  }

  res.status(200).json(character.toJSON());
};

module.exports.new = function newCharacter(req, res) {
  res.status(201).json(characterFull);
};

module.exports.update = function update(req, res) {
  res.status(200).json(characterFull);
};

module.exports.delete = function deleteCharacter(req, res) {
  res.json({ message: 'OK', code: 200 });
};
