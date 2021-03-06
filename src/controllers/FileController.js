// eslint-disable-next-line no-unused-vars
const File = require('../models/File');
const Box = require('../models/Box');

module.exports = {
  async store(req, res) {
    const box = await Box.findById(req.params.id);
    const file = await File.create({
      title: req.file.originalname,
      path: req.file.key,
    });

    box.files.push(file);

    await box.save();

    // eslint-disable-next-line no-underscore-dangle
    req.io.sockets.in(box._id).emit('file', file);

    return res.send(file);
  },
};
