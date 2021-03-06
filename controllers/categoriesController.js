const slugify = require('slugify');
const fs = require('fs-extra');
const path = require('path');
const {Category} = require('../models');
const {meta, formatRes} = require('../helper/formatter/responseFormatter');
const {
  formatCategories,
  formatCategory,
} = require('../helper/formatter/categoryFormatter');

const base_url = process.env.BASEURL;

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
    let newCategory = {
      image: null,
      name,
      slug,
    };
    if (req.file) {
      newCategory = {
        image: `images/categories/${req.file.filename}`,
        name,
        slug,
      };
    }
    const category = await Category.create(newCategory);
    if (category === null) {
      const response = formatRes(meta('Service unavailable', 503, 'error'));
      return res.status(503).json(response);
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
    perPage = perPage !== undefined ? parseInt(perPage, 10) : 5;
    page = page !== undefined ? parseInt(page, 10) : 1;

    let orderParameter = [['updated_at', 'ASC']];
    if (orderByDate && orderByDate.toLowerCase() === 'desc') {
      orderParameter = [['updated_at', 'DESC']];
    }
    const categories = await Category.findAndCountAll({
      offset: (page - 1) * perPage,
      limit: perPage,
      order: orderParameter,
      include: ['packets'],
    });
    if (categories === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }
    const data = await formatCategories(categories.rows);

    const _links = {
      self: {
        href: `${base_url}v1/categories?page=${page}&perPage=${perPage}`,
      },
      first: {
        href: `${base_url}v1/categories?page=${page}`,
      },
      prev: {
        href: `${base_url}v1/categories?page=${page - 1}&perPage=${perPage}`,
      },
      next: {
        href: `${base_url}v1/categories?page=${page + 1}&perPage=${perPage}`,
      },
      last: {
        href: `${base_url}v1/categories?page=${Math.ceil(
          parseInt(categories.count, 8) / perPage,
        )}&perPage=${perPage}`,
      },
    };
    const total = categories.count;

    const response = await formatRes(
      meta('List of Category', 200, 'success'),
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
    if (slugExists && slugExists.id !== category.id) {
      slug = `${slug}-${Math.floor(Math.random() * 1453 + 1)}`;
    }

    let newCategory = {
      image: category.image,
      name,
      slug,
    };
    if (req.file) {
      const pathFile = path.join(__dirname, `../public/${category.image}`);
      const exists = await fs.pathExists(pathFile);
      if (exists) {
        await fs.unlink(pathFile);
      }
      newCategory = {
        image: `images/categories/${req.file.filename}`,
        name,
        slug,
      };
    }
    const updatedData = await category.update(newCategory);
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
    const category = await Category.findByPk(id);
    if (category === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }

    const pathFile = path.join(__dirname, `../public/${category.image}`);
    const exists = await fs.pathExists(pathFile);
    if (exists) {
      await fs.unlink(pathFile);
    }
    await category.destroy();
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
