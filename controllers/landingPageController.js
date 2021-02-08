const {Op} = require('sequelize');

const {Hero, Program, Testimonial, Contact} = require('../models');
const {formatRes, meta} = require('../helper/formatter/responseFormatter');
const {formatHeros} = require('../helper/formatter/heroFormatter');
const {formatPrograms} = require('../helper/formatter/programFormatter');
const {
  formatTestimonials,
} = require('../helper/formatter/testimonialFormatter');
const {formatFooter} = require('../helper/formatter/footerFormatter');
const {formatContacts} = require('../helper/formatter/contactFormatter');

const home = async (req, res) => {
  try {
    const heros = await Hero.findAll({
      where: {is_active: true, order: {[Op.not]: null}},
      order: [['order', 'asc']],
    });

    const programs = await Program.findAll({
      where: {is_active: true},
      order: [['updated_at', 'desc']],
      limit: 2,
    });

    const testimonials = await Testimonial.findAll({order: [['order', 'asc']]});

    const contacts = await Contact.findAll();
    const data = {
      heros: formatHeros(heros),
      programs: formatPrograms(programs),
      testimonials: formatTestimonials(testimonials),
      contacts: formatContacts(contacts),
      footer: formatFooter(formatContacts(contacts), programs),
    };
    const response = await formatRes(
      meta('Home page of landing page', 200, 'success'),
      data,
    );

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    const response = formatRes(meta('Service unavailable', 503, 'error'));
    return res.status(503).json(response);
  }
};

module.exports = {home};
