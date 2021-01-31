const slugify = require('slugify');
const {Category, Packet} = require('../models');
const {meta, formatRes} = require('../helper/formatter/responseFormatter');
const {
  formatPackets,
  formatPacket,
} = require('../helper/formatter/packetFormatter');

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

const getPackets = async (req, res) => {
  try {
    const {orderByDate} = req.query;
    let {perPage, page} = req.query;
    perPage = perPage !== undefined ? parseInt(perPage, 8) : 5;
    page = page !== undefined ? parseInt(page, 8) : 1;

    let orderParameter = [['updated_at', 'ASC']];
    if (orderByDate && orderByDate.toLowerCase() === 'desc') {
      orderParameter = [['updated_at', 'DESC']];
    }
    const packets = await Packet.findAll({
      offset: (page - 1) * perPage,
      limit: perPage,
      order: orderParameter,
      include: 'category',
    });
    if (packets === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }
    const data = await formatPackets(packets);
    const response = await formatRes(
      meta('List of Packets', 200, 'success'),
      data,
    );
    return res.status(200).json(response);
  } catch (error) {
    const response = formatRes(
      meta('Service unavailable', 503, 'error'),
      error,
    );
    return res.status(503).json(response);
  }
};

const getPacket = async (req, res) => {
  try {
    const {id} = req.params;
    const packet = await Packet.findByPk(id, {include: 'category'});
    if (packet === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }
    const response = formatRes(
      meta('Packet details', 200, 'success'),
      formatPacket(packet),
    );
    return res.status(200).json(response);
  } catch (error) {
    const response = formatRes(
      meta('Service unavailable', 503, 'error'),
      error,
    );
    return res.status(503).json(response);
  }
};
module.exports = {createPacket, getPackets, getPacket};
