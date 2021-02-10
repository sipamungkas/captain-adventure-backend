const fs = require('fs-extra');
const path = require('path');
const {Gallery} = require('../models');
const {meta, formatRes} = require('../helper/formatter/responseFormatter');

const {
  formatGallery,
  formatGalleries,
} = require('../helper/formatter/galleryFormatter');

const base_url = process.env.BASEURL;

const createGallery = async (req, res) => {
  try {
    if (!req.file) {
      const response = formatRes(meta('invalid image type', 422, 'error'));
      return res.status(422).json(response);
    }
    const {title, alt} = req.body;
    let newGallery = {
      title,
      image: null,
      alt,
    };
    if (req.file) {
      newGallery = {
        title,
        image: `images/galleries/${req.file.filename}`,
        alt,
      };
    }
    const gallery = await Gallery.create(newGallery);
    if (gallery === null) {
      const response = formatRes(meta('Service unavailable', 503, 'error'));
      return res.status(503).json(response);
    }
    const response = formatRes(meta('Gallery created', 201, 'success'));
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

const getGalleries = async (req, res) => {
  try {
    const {orderByDate} = req.query;
    let {perPage, page} = req.query;
    perPage = perPage !== undefined ? parseInt(perPage, 10) : 5;
    page = page !== undefined ? parseInt(page, 10) : 1;

    let orderParameter = [['updated_at', 'ASC']];
    if (orderByDate && orderByDate.toLowerCase() === 'desc') {
      orderParameter = [['updated_at', 'DESC']];
    }
    const galleries = await Gallery.findAndCountAll({
      offset: (page - 1) * perPage,
      limit: perPage,
      order: orderParameter,
    });
    if (galleries === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }

    const data = formatGalleries(galleries.rows);
    const _links = {
      self: {
        href: `${base_url}v1/galleries?page=${page}&perPage=${perPage}`,
      },
      first: {
        href: `${base_url}v1/galleries?page=${page}`,
      },
      prev: {
        href: `${base_url}v1/galleries?page=${page - 1}&perPage=${perPage}`,
      },
      next: {
        href: `${base_url}v1/galleries?page=${page + 1}&perPage=${perPage}`,
      },
      last: {
        href: `${base_url}v1/galleries?page=${Math.ceil(
          parseInt(galleries.count, 8) / perPage,
        )}&perPage=${perPage}`,
      },
    };
    const total = galleries.count;

    const response = formatRes(
      meta('List of galleries', 200, 'success'),
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

const getGallery = async (req, res) => {
  try {
    const {id} = req.params;
    const gallery = await Gallery.findByPk(id);
    if (gallery === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }
    const response = formatRes(
      meta('Gallery details', 200, 'success'),
      formatGallery(gallery),
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

const updateGallery = async (req, res) => {
  try {
    const {id} = req.params;
    const {title, alt} = req.body;
    const gallery = await Gallery.findByPk(id);
    if (gallery === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }

    let newGallery = {
      title,
      image: null,
      alt,
    };

    if (req.file) {
      const pathFile = path.join(__dirname, `../public/${gallery.image}`);
      const exists = await fs.pathExists(pathFile);
      if (exists) {
        await fs.unlink(pathFile);
      }
      newGallery = {
        title,
        image: `images/galleries/${req.file.filename}`,
        alt,
      };
    }
    const updatedData = await gallery.update(newGallery);
    const response = formatRes(
      meta('Gallery updated', 200, 'success'),
      formatGallery(updatedData),
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

const deleteGallery = async (req, res) => {
  try {
    const {id} = req.params;
    const gallery = await Gallery.findByPk(id);
    if (gallery === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }

    const pathFile = path.join(__dirname, `../public/${gallery.image}`);
    const exists = await fs.pathExists(pathFile);
    if (exists) {
      await fs.unlink(pathFile);
    }
    await gallery.destroy();
    const response = formatRes(meta('Gallery deleted', 200, 'success'));
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
  createGallery,
  getGalleries,
  getGallery,
  updateGallery,
  deleteGallery,
};
