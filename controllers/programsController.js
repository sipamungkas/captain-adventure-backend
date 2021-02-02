const fs = require('fs-extra');
const path = require('path');
const {Program} = require('../models');
const {meta, formatRes} = require('../helper/formatter/responseFormatter');

const {
  formatProgram,
  formatPrograms,
} = require('../helper/formatter/programFormatter');

const createProgram = async (req, res) => {
  try {
    const {title, perks, short_description, body} = req.body;
    let newProgram = {
      image: null,
      title,
      perks,
      short_description,
      body,
    };
    if (req.file) {
      newProgram = {
        image: `images/programs/${req.file.filename}`,
        title,
        perks,
        short_description,
        body,
      };
    }
    const post = await Program.create(newProgram);
    if (post === null) {
      const response = formatRes(meta('Service unavailable', 503, 'error'));
      return res.status(503).json(response);
    }
    const response = formatRes(meta('Program created', 201, 'success'));
    return res.status(201).json(response);
  } catch (error) {
    const response = formatRes(
      meta('Service unavailable', 503, 'error'),
      error,
    );
    return res.status(503).json(response);
  }
};

const getPrograms = async (req, res) => {
  try {
    const {orderByDate} = req.query;
    let {perPage, page} = req.query;
    perPage = perPage !== undefined ? parseInt(perPage, 8) : 5;
    page = page !== undefined ? parseInt(page, 8) : 1;

    let orderParameter = [['updated_at', 'ASC']];
    if (orderByDate && orderByDate.toLowerCase() === 'desc') {
      orderParameter = [['updated_at', 'DESC']];
    }
    const posts = await Program.findAll({
      offset: (page - 1) * perPage,
      limit: perPage,
      order: orderParameter,
    });
    if (posts === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }
    const data = await formatPrograms(posts);
    const response = await formatRes(
      meta('List of Programs', 200, 'success'),
      data,
    );
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    const response = formatRes(
      meta('Service unavailable', 503, 'error'),
      error,
    );
    return res.status(503).json(response);
  }
};

const getProgram = async (req, res) => {
  try {
    const {id} = req.params;
    const post = await Program.findByPk(id);
    if (post === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }
    const response = formatRes(
      meta('Program details', 200, 'success'),
      formatProgram(post),
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

const updateProgram = async (req, res) => {
  try {
    const {id} = req.params;
    const {title, perks, short_description, body} = req.body;
    const post = await Program.findByPk(id);
    if (post === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }

    let newProgram = {
      image: null,
      title,
      perks,
      short_description,
      body,
    };

    if (req.file) {
      const pathFile = path.join(__dirname, `../public/${post.image}`);
      const exists = await fs.pathExists(pathFile);
      if (exists) {
        await fs.unlink(pathFile);
      }
      newProgram = {
        image: `images/programs/${req.file.filename}`,
        title,
        perks,
        short_description,
        body,
      };
    }
    const updatedData = await post.update(newProgram);
    const response = formatRes(
      meta('Program updated', 200, 'success'),
      formatProgram(updatedData),
    );
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    const response = formatRes(
      meta('Service unavailable', 503, 'error'),
      error,
    );
    return res.status(503).json(response);
  }
};

const deleteProgram = async (req, res) => {
  try {
    const {id} = req.params;
    const post = await Program.findByPk(id);
    if (post === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }

    const pathFile = path.join(__dirname, `../public/${post.image}`);
    const exists = await fs.pathExists(pathFile);
    if (exists) {
      await fs.unlink(pathFile);
    }
    await post.destroy();
    const response = formatRes(meta('Program deleted', 200, 'success'));
    return res.status(204).json(response);
  } catch (error) {
    console.log(error);
    const response = formatRes(
      meta('Service unavailable', 503, 'error'),
      error,
    );
    return res.status(503).json(response);
  }
};

const uploadProgramImage = async (req, res) => {
  try {
    if (!req.file) {
      const response = formatRes(meta('invalid image type', 422, 'error'));
      return res.status(422).json(response);
    }
    const image = `images/programs/${req.file.filename}`;
    const response = formatRes(meta('Image uploaded', 200, 'success'), {
      image_url: image,
    });
    return res.status(200).json(response);
  } catch (error) {
    const response = formatRes(
      meta('Service unavailable', 503, 'error'),
      error,
    );
    return res.status(503).json(response);
  }
};

module.exports = {
  createProgram,
  getPrograms,
  getProgram,
  updateProgram,
  deleteProgram,
  uploadProgramImage,
};
