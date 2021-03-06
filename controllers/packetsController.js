const slugify = require('slugify');
const fs = require('fs-extra');
const path = require('path');
const {Category, Packet} = require('../models');
const {meta, formatRes} = require('../helper/formatter/responseFormatter');
const {
  formatPackets,
  formatPacket,
} = require('../helper/formatter/packetFormatter');

const base_url = process.env.BASEURL;

const createPacket = async (req, res) => {
  try {
    if (!req.file) {
      const response = formatRes(meta(`Invalid image type`, 422, 'error'));
      return res.status(422).json(response);
    }

    const {
      title,
      start_at,
      subtitle,
      description,
      category_id,
      perks,
      short_description,
    } = req.body;

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
      perks,
      short_description,
      start_at,
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
    perPage = perPage !== undefined ? parseInt(perPage, 10) : 5;
    page = page !== undefined ? parseInt(page, 10) : 1;

    let orderParameter = [['updated_at', 'ASC']];
    if (orderByDate && orderByDate.toLowerCase() === 'desc') {
      orderParameter = [['updated_at', 'DESC']];
    }
    const packets = await Packet.findAndCountAll({
      offset: (page - 1) * perPage,
      limit: perPage,
      order: orderParameter,
      include: 'category',
    });
    if (packets === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }
    const data = await formatPackets(packets.rows);
    const _links = {
      self: {
        href: `${base_url}v1/packets?page=${page}&perPage=${perPage}`,
      },
      first: {
        href: `${base_url}v1/packets?page=${page}`,
      },
      prev: {
        href: `${base_url}v1/packets?page=${page - 1}&perPage=${perPage}`,
      },
      next: {
        href: `${base_url}v1/packets?page=${page + 1}&perPage=${perPage}`,
      },
      last: {
        href: `${base_url}v1/packets?page=${Math.ceil(
          parseInt(packets.count, 8) / perPage,
        )}&perPage=${perPage}`,
      },
    };
    const total = packets.count;
    const response = await formatRes(
      meta('List of Packets', 200, 'success'),
      data,
      total,
      _links,
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

const updatePacket = async (req, res) => {
  try {
    const {id} = req.params;
    const {
      title,
      start_at,
      subtitle,
      description,
      category_id,
      perks,
      short_description,
    } = req.body;
    const packet = await Packet.findByPk(id);
    if (packet === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }

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
    if (slugExists && slugExists.id !== packet.id) {
      slug = `${slug}-${Math.floor(Math.random() * 1453 + 1)}`;
    }

    let newPacket = {
      cover: packet.cover,
      image: packet.image,
      title,
      perks,
      short_description,
      start_at,
      subtitle,
      slug,
      description,
      category_id,
    };
    if (req.file) {
      const pathFileImage = path.join(__dirname, `../public/${packet.image}`);
      const imageExists = await fs.pathExists(pathFileImage);
      if (imageExists) {
        await fs.unlink(pathFileImage);
      }
      newPacket = {
        image: `images/packets/${req.file.filename}`,
        title,
        perks,
        short_description,
        start_at,
        subtitle,
        slug,
        description,
        category_id,
      };
    }

    let updatedData = await packet.update(newPacket);
    updatedData = await Packet.findByPk(updatedData.id, {include: 'category'});
    const response = formatRes(
      meta('Packet updated', 200, 'success'),
      formatPacket(updatedData),
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

const deletePacket = async (req, res) => {
  try {
    const {id} = req.params;
    const packet = await Packet.findByPk(id);
    if (packet === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }

    const pathFileImage = path.join(__dirname, `../public/${packet.image}`);
    const imageExists = await fs.pathExists(pathFileImage);
    if (imageExists) {
      await fs.unlink(pathFileImage);
    }
    await packet.destroy();
    const response = formatRes(meta('Packet deleted', 200, 'success'));
    return res.status(204).json(response);
  } catch (error) {
    const response = formatRes(
      meta('Service unavailable', 503, 'error'),
      error,
    );
    return res.status(503).json(response);
  }
};

module.exports = {
  createPacket,
  getPackets,
  getPacket,
  updatePacket,
  deletePacket,
};
