const fs = require('fs-extra');
const path = require('path');
const {Testimonial} = require('../models');
const {meta, formatRes} = require('../helper/formatter/responseFormatter');

const base_url = process.env.BASEURL;

const {
  formatTestimonial,
  formatTestimonials,
} = require('../helper/formatter/testimonialFormatter');

const createTestimonial = async (req, res) => {
  try {
    if (!req.file) {
      const response = formatRes(meta('invalid image type', 422, 'error'));
      return res.status(422).json(response);
    }
    const {name, testimoni, position} = req.body;
    let {order} = req.body;
    const orderExists = await Testimonial.findOne({where: {order}});
    if (orderExists) {
      const latestOrderNumber = await Testimonial.findOne({
        attributes: ['order'],
        order: [['order', 'desc']],
      });
      order = parseInt(latestOrderNumber.order, 8) + 1;
    }
    let newTestimonial = {
      image: null,
      name,
      position,
      order,
      testimoni,
    };
    if (req.file) {
      newTestimonial = {
        image: `images/testimonials/${req.file.filename}`,
        name,
        position,
        order,
        testimoni,
      };
    }
    const testimonial = await Testimonial.create(newTestimonial);
    if (testimonial === null) {
      const response = formatRes(meta('Service unavailable', 503, 'error'));
      return res.status(503).json(response);
    }
    const response = formatRes(meta('Testimonial created', 201, 'success'));
    return res.status(201).json(response);
  } catch (error) {
    console.log(error);
    const response = formatRes(
      meta('Service unavailable', 503, 'error'),
      error,
    );
    return res.status(503).json(response);
  }
};

const getTestimonials = async (req, res) => {
  try {
    const {orderByDate} = req.query;
    let {perPage, page} = req.query;
    perPage = perPage !== undefined ? parseInt(perPage, 10) : 5;
    page = page !== undefined ? parseInt(page, 10) : 1;

    let orderParameter = [['updated_at', 'ASC']];
    if (orderByDate && orderByDate.toLowerCase() === 'desc') {
      orderParameter = [['updated_at', 'DESC']];
    }
    const testimonials = await Testimonial.findAndCountAll({
      offset: (page - 1) * perPage,
      limit: perPage,
      order: orderParameter,
    });
    if (testimonials === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }
    const data = await formatTestimonials(testimonials.rows);
    const _links = {
      self: {
        href: `${base_url}v1/testimonials?page=${page}&perPage=${perPage}`,
      },
      first: {
        href: `${base_url}v1/testimonials?page=${page}`,
      },
      prev: {
        href: `${base_url}v1/testimonials?page=${page - 1}&perPage=${perPage}`,
      },
      next: {
        href: `${base_url}v1/testimonials?page=${page + 1}&perPage=${perPage}`,
      },
      last: {
        href: `${base_url}v1/testimonials?page=${Math.ceil(
          parseInt(testimonials.count, 8) / perPage,
        )}&perPage=${perPage}`,
      },
    };
    const total = testimonials.count;
    const response = await formatRes(
      meta('List of Testimonials', 200, 'success'),
      data,
      total,
      _links,
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

const getTestimonial = async (req, res) => {
  try {
    const {id} = req.params;
    const testimonial = await Testimonial.findByPk(id);
    if (testimonial === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }
    const response = formatRes(
      meta('Testimonial details', 200, 'success'),
      formatTestimonial(testimonial),
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

const updateTestimonial = async (req, res) => {
  try {
    const {id} = req.params;
    const {name, testimoni, order, position} = req.body;
    const orderExists = await Testimonial.findOne({where: {order}});
    if (orderExists && orderExists.id !== parseInt(id, 10)) {
      const response = formatRes(
        meta(`Order number ${order} already exists`, 422, 'error'),
      );
      return res.status(422).json(response);
    }
    const testimonial = await Testimonial.findByPk(id);
    if (testimonial === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }

    let newTestimonial = {
      image: testimonial.image,
      name,
      position,
      order,
      testimoni,
    };

    if (req.file) {
      const pathFile = path.join(__dirname, `../public/${testimonial.image}`);
      const exists = await fs.pathExists(pathFile);
      if (exists) {
        await fs.unlink(pathFile);
      }
      newTestimonial = {
        image: `images/testimonials/${req.file.filename}`,
        name,
        position,
        order,
        testimoni,
      };
    }
    const updatedData = await testimonial.update(newTestimonial);
    const response = formatRes(
      meta('Testimonial updated', 200, 'success'),
      formatTestimonial(updatedData),
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

const deleteTestimonial = async (req, res) => {
  try {
    const {id} = req.params;
    const testimonial = await Testimonial.findByPk(id);
    if (testimonial === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }

    const pathFile = path.join(__dirname, `../public/${testimonial.image}`);
    const exists = await fs.pathExists(pathFile);
    if (exists) {
      await fs.unlink(pathFile);
    }
    await testimonial.destroy();
    const response = formatRes(meta('Testimonial deleted', 200, 'success'));
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

module.exports = {
  createTestimonial,
  getTestimonials,
  getTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
