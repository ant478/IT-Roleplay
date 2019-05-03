const _ = require('lodash');
const models = require('../models');
const { DATA_PROPERTIES } = require('../models/Character');
const responses = require('../responses');
const validationHelper = require('../helpers/userInputValidationHelper');

function omitAvatarPropertyIfNull(characterJSON) { // TODO: remove when dredd will fully support OpenAPI 3 (nullable properties)
  if (characterJSON.avatarId === null) {
    return _.omit(characterJSON, ['avatarId']);
  }

  return characterJSON;
}

function formatCharacterInstanceForOutput(characterInstance) {
  return omitAvatarPropertyIfNull(characterInstance.toJSON());
}

const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 0;

function getLimitArgumentFromRequest(req) {
  if (!_.has(req, 'query.limit')) {
    return DEFAULT_LIMIT;
  }

  const limit = parseInt(req.query.limit, 10);

  if (!validationHelper.isLimitValid(limit)) {
    return DEFAULT_LIMIT;
  }

  return limit;
}

function getOffsetArgumentFromRequest(req) {
  if (!_.has(req, 'query.offset')) {
    return DEFAULT_OFFSET;
  }

  const offset = parseInt(req.query.offset, 10);

  if (!validationHelper.isOffsetValid(offset)) {
    return DEFAULT_OFFSET;
  }

  return offset;
}

module.exports.index = async function index(req, res) {
  const limit = getLimitArgumentFromRequest(req);
  const offset = getOffsetArgumentFromRequest(req);

  const characters = await models.Character.scope('withAuthor').findAll({ limit, offset });
  const json = characters.map((character) => {
    const characterJSON = formatCharacterInstanceForOutput(character);

    return Object.assign(characterJSON, {
      data: _.pick(characterJSON.data, ['attributes', 'roles']),
    });
  });

  return res.status(200).json(json);
};

module.exports.view = async function view(req, res) {
  const { characterId } = req.params;
  const character = await models.Character.scope('withAuthor').findByPk(characterId);

  if (!character) {
    return res.status(404).json(new responses.NotFound());
  }

  return res.status(200).json(formatCharacterInstanceForOutput(character));
};

module.exports.new = async function createNewCharacter(req, res) {
  const { name, avatarId, data } = req.body;
  const pickedData = _.pick(data, DATA_PROPERTIES);

  const isUserInputValid = validationHelper.isCharacterNameValid(name)
    && validationHelper.isAvatarValid(avatarId)
    && validationHelper.isCharacterDataValid(pickedData);

  if (!isUserInputValid) {
    return res.status(400).json(new responses.BadRequest());
  }

  const newCharacter = await models.Character.create({
    name,
    avatarId,
    data: pickedData,
    authorId: req.user.id,
  });

  const characterInstance = await models.Character.scope('withAuthor').findByPk(newCharacter.id);

  return res.status(201).json(formatCharacterInstanceForOutput(characterInstance));
};

module.exports.update = async function update(req, res) {
  const { characterId } = req.params;
  const { name, avatarId, data } = req.body;

  const isUserInputValid = (!_.has(req.body, 'name') || validationHelper.isCharacterNameValid(name))
    && (!_.has(req.body, 'avatarId') || validationHelper.isAvatarValid(avatarId))
    && (!_.has(req.body, 'data') || _.isPlainObject(data));

  if (!isUserInputValid) {
    return res.status(400).json(new responses.BadRequest());
  }

  const character = await models.Character.scope('withAuthor').findByPk(characterId);

  if (!character) {
    return res.status(404).json(new responses.NotFound());
  }

  if (character.author.id !== req.user.id) {
    return res.status(403).json(new responses.Forbidden());
  }

  if (_.has(req.body, 'data')) {
    const pickedData = _.pick(data, DATA_PROPERTIES);
    const updatedData = Object.assign({}, character.data, pickedData);

    if (!validationHelper.isCharacterDataValid(updatedData)) {
      return res.status(400).json(new responses.BadRequest());
    }

    character.set('data', updatedData);
  }

  if (_.has(req.body, 'name')) {
    character.set('name', name);
  }

  if (_.has(req.body, 'avatarId')) {
    character.set('avatarId', avatarId);
  }

  const updatedCharacter = await character.save();

  return res.status(200).json(formatCharacterInstanceForOutput(updatedCharacter));
};

module.exports.delete = async function deleteCharacter(req, res) {
  const { characterId } = req.params;
  const character = await models.Character.findByPk(characterId);

  if (!character) {
    return res.status(404).json(new responses.NotFound());
  }

  if (character.authorId !== req.user.id) {
    return res.status(403).json(new responses.Forbidden());
  }

  return character.destroy().then(() => res.status(200).json(new responses.OK()));
};
