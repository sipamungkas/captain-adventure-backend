const {Contact} = require('../models');
const {meta, formatRes} = require('../helper/formatter/responseFormatter');

const {
  formatContact,
  formatContacts,
} = require('../helper/formatter/contactFormatter');

const base_url = process.env.BASEURL;

const createContact = async (req, res) => {
  try {
    const {value, link, category} = req.body;
    const newContact = {
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
    perPage = perPage !== undefined ? parseInt(perPage, 10) : 5;
    page = page !== undefined ? parseInt(page, 10) : 1;

    let orderParameter = [['updated_at', 'ASC']];
    if (orderByDate && orderByDate.toLowerCase() === 'desc') {
      orderParameter = [['updated_at', 'DESC']];
    }
    const contacts = await Contact.findAndCountAll({
      offset: (page - 1) * perPage,
      limit: perPage,
      order: orderParameter,
    });
    if (contacts === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }
    const data = await formatContacts(contacts.rows);
    const _links = {
      self: {
        href: `${base_url}v1/contacts?page=${page}&perPage=${perPage}`,
      },
      first: {
        href: `${base_url}v1/contacts?page=${page}`,
      },
      prev: {
        href: `${base_url}v1/contacts?page=${page - 1}&perPage=${perPage}`,
      },
      next: {
        href: `${base_url}v1/contacts?page=${page + 1}&perPage=${perPage}`,
      },
      last: {
        href: `${base_url}v1/contacts?page=${Math.ceil(
          parseInt(contacts.count, 8) / perPage,
        )}&perPage=${perPage}`,
      },
    };
    const total = contacts.count;
    const response = await formatRes(
      meta('List of contacts', 200, 'success'),
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
