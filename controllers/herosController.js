const fs = require('fs-extra');
const path = require('path');
const {Hero} = require('../models');
const {meta, formatRes} = require('../helper/formatter/responseFormatter');

const {formatHero, formatHeros} = require('../helper/formatter/heroFormatter');

const createHero = async (req, res) => {
  try {
    const {title, short_description, video, order} = req.body;
    let newHero = {
      image: null,
      order,
      video,
      title,
      short_description,
    };
    if (req.file) {
      newHero = {
        image: `images/hero/${req.file.filename}`,
        order,
        video,
        title,
        short_description,
      };
    }
    const hero = await Hero.create(newHero);
    if (hero === null) {
      const response = formatRes(meta('Service unavailable', 503, 'error'));
      return res.status(503).json(response);
    }
    const response = formatRes(meta('Hero slider created', 201, 'success'));
    return res.status(201).json(response);
  } catch (error) {
    const response = formatRes(
      meta('Service unavailable', 503, 'error'),
      error,
    );
    return res.status(503).json(response);
  }
};

const getHeros = async (req, res) => {
  try {
    const {orderByDate} = req.query;
    let {perPage, page} = req.query;
    perPage = perPage !== undefined ? parseInt(perPage, 8) : 5;
    page = page !== undefined ? parseInt(page, 8) : 1;

    let orderParameter = [['updated_at', 'ASC']];
    if (orderByDate && orderByDate.toLowerCase() === 'desc') {
      orderParameter = [['updated_at', 'DESC']];
    }
    const heros = await Hero.findAll({
      offset: (page - 1) * perPage,
      limit: perPage,
      order: orderParameter,
    });
    if (heros === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }
    const data = await formatHeros(heros);
    const response = await formatRes(
      meta('List of Hero', 200, 'success'),
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

const getHero = async (req, res) => {
  try {
    const {id} = req.params;
    const hero = await Hero.findByPk(id);
    if (hero === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }
    const response = formatRes(
      meta('Hero details', 200, 'success'),
      formatHero(hero),
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

const updateHero = async (req, res) => {
  try {
    const {id} = req.params;
    const {title, video, short_description, order} = req.body;
    const orderExists = await Hero.findOne({where: {order}});
    if (orderExists && orderExists.id !== parseInt(id, 8)) {
      const response = formatRes(
        meta(`Order number ${order} already exists`, 422, 'error'),
      );
      return res.status(422).json(response);
    }
    const hero = await Hero.findByPk(id);
    if (hero === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }

    let newHero = {
      image: null,
      order,
      title,
      short_description,
    };

    if (req.file) {
      const pathFile = path.join(__dirname, `../public/${hero.image}`);
      const exists = await fs.pathExists(pathFile);
      if (exists) {
        await fs.unlink(pathFile);
      }
      newHero = {
        image: `images/hero/${req.file.filename}`,
        order,
        video,
        title,
        short_description,
      };
    }
    const updatedData = await hero.update(newHero);
    const response = formatRes(
      meta('Hero updated', 200, 'success'),
      formatHero(updatedData),
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

const deleteHero = async (req, res) => {
  try {
    const {id} = req.params;
    const hero = await Hero.findByPk(id);
    if (hero === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }

    const pathFile = path.join(__dirname, `../public/${hero.image}`);
    const exists = await fs.pathExists(pathFile);
    if (exists) {
      await fs.unlink(pathFile);
    }
    await hero.destroy();
    const response = formatRes(meta('Hero slider deleted', 200, 'success'));
    return res.status(204).json(response);
  } catch (error) {
    const response = formatRes(
      meta('Service unavailable', 503, 'error'),
      error,
    );
    return res.status(503).json(response);
  }
};

module.exports = {createHero, getHeros, getHero, updateHero, deleteHero};