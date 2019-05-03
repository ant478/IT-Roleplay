const path = require('path');
const Datauri = require('datauri');
const cloudinary = require('cloudinary');
const responses = require('../responses');
const cloudinaryConfig = require('../../config/cloudinary');

const dataUri = new Datauri();

module.exports.upload = async function upload(req, res) {
  if (!req.file) {
    return res.status(400).json(new responses.BadRequest());
  }

  const image = dataUri.format(path.extname(req.file.originalname), req.file.buffer).content;
  const cloudinaryResponse = await cloudinary.v2.uploader.upload(image, { folder: cloudinaryConfig.folder });

  return res.status(201).json({ id: `${cloudinaryResponse.public_id}.${cloudinaryResponse.format}` });
};
