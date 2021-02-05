const slugify = require('slugify');
const {Contact} = require('../models');
const {meta, formatRes} = require('../helper/formatter/responseFormatter');

const {
  formatContact,
  formatContacts,
} = require('../helper/formatter/contactFormatter');

const createContact = async (req, res) => {
  try {
    const {key, value, link, category} = req.body;
    const slug = await slugify(key, {
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

    const slugExists = await Contact.findOne({where: {key: slug}});
    if (slugExists) {
      const response = formatRes(
        meta(
          'Key already exists, please create new contact or edit contact',
          422,
          'error',
        ),
      );
      return res.status(422).json(response);
    }
    const newContact = {
      key: slug,
      value,
      link,
      category,
    };

    const contact = await Contact.create(newContact);
    if (contact === null) {
      const response = formatRes(meta('Service unavailable', 503, 'error'));
      return res.status(503).json(response);
    }
    const response = formatRes(meta('Contact created', 201, 'success'));
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

const getContacts = async (req, res) => {
  try {
    const {orderByDate} = req.query;
    let {perPage, page} = req.query;
    perPage = perPage !== undefined ? parseInt(perPage, 8) : 5;
    page = page !== undefined ? parseInt(page, 8) : 1;

    let orderParameter = [['updated_at', 'ASC']];
    if (orderByDate && orderByDate.toLowerCase() === 'desc') {
      orderParameter = [['updated_at', 'DESC']];
    }
    const contacts = await Contact.findAll({
      offset: (page - 1) * perPage,
      limit: perPage,
      order: orderParameter,
    });
    if (contacts === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }
    const data = await formatContacts(contacts);
    const response = await formatRes(
      meta('List of contacts', 200, 'success'),
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

const getContact = async (req, res) => {
  try {
    const {id} = req.params;
    const contact = await Contact.findByPk(id);
    if (contact === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }
    const response = formatRes(
      meta('Contact details', 200, 'success'),
      formatContact(contact),
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

const updateContact = async (req, res) => {
  try {
    const {id} = req.params;
    const {value, link, category} = req.body;
    const contact = await Contact.findByPk(id);
    if (contact === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }
    const newContact = {
      key: id,
      value,
      link,
      category,
    };
    const updatedData = await contact.update(newContact);
    const response = formatRes(
      meta('Contact updated', 200, 'success'),
      formatContact(updatedData),
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

const deleteContact = async (req, res) => {
  try {
    const {id} = req.params;
    const contact = await Contact.findByPk(id);
    if (contact === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }
    await contact.destroy();
    const response = formatRes(meta('Contact deleted', 200, 'success'));
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
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
};
