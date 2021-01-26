const slugify = require('slugify');
const {Category, Packet} = require('../models');
const {meta, formatRes} = require('../helper/formatter/responseFormatter');

const createPacket = async (req, res) => {
  try {
    if (!req.file) {
      const response = formatRes(meta(`Invalid image type`, 422, 'error'));
      return res.status(422).json(response);
    }

    const {title, subtitle, description, category_id} = req.body;

    const categoryExists = await Category.findByPk(category_id);
    if (categoryExists === null) {
      const response = formatRes(meta(`Category did'nt exists`, 422, 'error'));
      return res.status(422).json(response);
    }

    let slug = await slugify(title, {
      replacement: '-',
      lower: true,
      strict: true,
    });

    if (slug === '') {
      const response = formatRes(
        meta('Please input alphabet and number character only', 422, 'error'),
      );
      return res.status(422).json(response);
    }

    const slugExists = await Packet.findOne({where: {slug}});
    if (slugExists) {
      slug = `${slug}-${Math.floor(Math.random() * 1453 + 1)}`;
    }

    const packet = await Packet.create({
      image: `images/packets/${req.file.filename}`,
      title,
      subtitle,
      slug,
      description,
      category_id,
    });

    if (packet === null) {
      const response = formatRes(meta('Service unavailable', 503, 'error'));
      return res.status(503).json(response);
    }

    const response = formatRes(meta('Packet created', 201, 'success'));
    return res.status(201).json(response);
  } catch (error) {
    const response = formatRes(
      meta('Service unavailable', 503, 'error'),
      error,
    );
    return res.status(503).json(response);
  }
};

module.exports = {createPacket};
