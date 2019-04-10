const Box = require('../models/Box');

module.exports = {
  async store(req, res) {
    const box = await Box.create(req.body);

    return res.status(201).json(box);
  },

  async show(req, res) {
    const box = await Box.findById(req.params.id).populate({
      path: 'files',
      options: { sort: { createdAt: -1 } },
    });

    return res.json(box);
  },
};
