const slugify = require('slugify');
const {Category} = require('../models');
const {meta, formatRes} = require('../helper/formatter/responseFormatter');
const {
  formatCategories,
  formatCategory,
} = require('../helper/formatter/categoryFormatter');
const sendError = require('../helper/formatter/error');

const createCategory = async (req, res) => {
  try {
    const {name} = req.body;
    let slug = await slugify(name, {
      replacement: '-',
      lower: true,
      strict: true,
    });
    if (slug === '') {
      const response = formatRes(
        meta('Please alphabet and number character only', 422, 'error'),
      );
      return res.status(422).json(response);
    }
    const slugExists = await Category.findOne({where: {slug}});
    if (slugExists) {
      slug = `${slug}-${Math.floor(Math.random() * 1453 + 1)}`;
    }
    const category = await Category.create({name, slug});
    if (category === null) {
      return sendError;
    }
    const response = formatRes(meta('Category created', 201, 'success'));
    return res.status(201).json(response);
  } catch (error) {
    const response = formatRes(
      meta('Service unavailable', 503, 'error'),
      error,
    );
    return res.status(503).json(response);
  }
};

const getCategories = async (req, res) => {
  try {
    const {orderByDate} = req.query;
    let {perPage, page} = req.query;
    perPage = perPage !== undefined ? parseInt(perPage, 8) : 5;
    page = page !== undefined ? parseInt(page, 8) : 1;

    let orderParameter = [['updated_at', 'ASC']];
    if (orderByDate && orderByDate.toLowerCase() === 'desc') {
      orderParameter = [['updated_at', 'DESC']];
    }
    const categories = await Category.findAll({
      offset: (page - 1) * perPage,
      limit: perPage,
      order: orderParameter,
    });
    if (categories === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }
    const data = await formatCategories(categories);
    const response = await formatRes(
      meta('List of Category', 200, 'success'),
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

const getCategory = async (req, res) => {
  try {
    const {id} = req.params;
    const category = await Category.findByPk(id);
    if (category === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }
    const response = formatRes(
      meta('Category details', 200, 'success'),
      formatCategory(category),
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

const updateCategory = async (req, res) => {
  try {
    const {id} = req.params;
    const {name} = req.body;
    const category = await Category.findByPk(id);
    if (category === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }

    if (category.name === name) {
      const response = formatRes(
        meta('Category updated', 200, 'success'),
        formatCategory(category),
      );
      return res.status(200).json(response);
    }
    let slug = await slugify(name, {
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

    const slugExists = await Category.findOne({where: {slug}});
    if (slugExists) {
      slug = `${slug}-${Math.floor(Math.random() * 1453 + 1)}`;
    }

    const updatedData = await category.update({name, slug});
    const response = formatRes(
      meta('Category updated', 200, 'success'),
      formatCategory(updatedData),
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

const deleteCategory = async (req, res) => {
  try {
    const {id} = req.params;
    await Category.destroy({where: {id}});
    const response = formatRes(meta('Category deleted', 200, 'success'));
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
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
