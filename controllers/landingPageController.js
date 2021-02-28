const {Op} = require('sequelize');

const {sendQuestionNotification} = require('../services/mail');
const {
  Hero,
  Program,
  Testimonial,
  Contact,
  Category,
  Packet,
  Blog,
  Gallery,
  Question,
} = require('../models');
const {formatRes, meta} = require('../helper/formatter/responseFormatter');
const {
  formatTestimonials,
} = require('../helper/formatter/testimonialFormatter');
const {formatFooter} = require('../helper/formatter/landingPageFormatter');
const {formatContacts} = require('../helper/formatter/contactFormatter');
const {formatHeros} = require('../helper/formatter/heroFormatter');
const {formatPrograms} = require('../helper/formatter/programFormatter');
const {formatCategories} = require('../helper/formatter/categoryFormatter');
const {
  formatPackets,
  formatPacket,
} = require('../helper/formatter/packetFormatter');
const {
  formatGalleries,
  formatGallery,
} = require('../helper/formatter/galleryFormatter');
const {formatBlogs, formatBlog} = require('../helper/formatter/blogFormatter');

const base_url = process.env.BASEURL;

const home = async (req, res) => {
  try {
    const heros = await Hero.findAll({
      // where: {is_active: true, order: {[Op.not]: null}},
      where: {is_active: true},
      order: [['order', 'asc']],
    });

    const programs = await Program.findAll({
      where: {is_active: true},
      order: [['updated_at', 'desc']],
    });

    const testimonials = await Testimonial.findAll({order: [['order', 'asc']]});

    const contacts = await Contact.findAll();
    const data = {
      heros: formatHeros(heros).map(({id, ...hero}) => hero),
      programs: formatPrograms(programs.slice(0, 2)).map(
        ({id, ...program}) => program,
      ),
      testimonials: formatTestimonials(testimonials).map(
        ({id, ...testimonial}) => testimonial,
      ),
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

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: {is_active: true},
      include: 'packets',
    });
    const contacts = await Contact.findAll();
    const programs = await Program.findAll({
      where: {is_active: true},
      order: [['updated_at', 'desc']],
    });
    const data = {
      categories: formatCategories(categories).map(({id, ...packet}) => packet),
      contacts: formatContacts(contacts),
      footer: formatFooter(formatContacts(contacts), programs),
    };
    const response = await formatRes(
      meta('List of Packet Categories', 200, 'success'),
      data,
    );

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    const response = formatRes(meta('Service unavailable', 503, 'error'));
    return res.status(503).json(response);
  }
};

const getPacketsByCategory = async (req, res) => {
  try {
    const {slug} = req.params;
    const packets = await Packet.findAll({
      include: 'category',
      where: {
        '$category.slug$': {[Op.eq]: slug},
      },
    });
    if (packets.length === 0) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }
    const contacts = await Contact.findAll();
    const programs = await Program.findAll({
      where: {is_active: true},
      order: [['updated_at', 'desc']],
    });
    const data = {
      packets: formatPackets(packets).map(({id, ...packet}) => packet),
      contacts: formatContacts(contacts),
      footer: formatFooter(formatContacts(contacts), programs),
    };
    const response = await formatRes(
      meta('Packets list by category', 200, 'success'),
      data,
    );

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    const response = formatRes(meta('Service unavailable', 503, 'error'));
    return res.status(503).json(response);
  }
};

const getPacketBySlug = async (req, res) => {
  try {
    const {slug} = req.params;
    const packet = await Packet.findOne({
      include: 'category',
      where: {slug},
    });
    if (packet === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }
    const formattedPacket = formatPacket(packet);
    delete formattedPacket.id;
    delete formattedPacket.category.id;
    const contacts = await Contact.findAll();
    const programs = await Program.findAll({
      where: {is_active: true},
      order: [['updated_at', 'desc']],
    });
    const data = {
      packet: formattedPacket,
      contacts: formatContacts(contacts),
      footer: formatFooter(formatContacts(contacts), programs),
    };
    const response = await formatRes(
      meta('List of Packets', 200, 'success'),
      data,
    );

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    const response = formatRes(meta('Service unavailable', 503, 'error'));
    return res.status(503).json(response);
  }
};

const getBlogs = async (req, res) => {
  try {
    let {perPage, page} = req.query;
    perPage = perPage !== undefined ? parseInt(perPage, 10) : 5;
    page = page !== undefined ? parseInt(page, 10) : 1;
    const blogs = await Blog.findAndCountAll({
      offset: (page - 1) * perPage,
      limit: perPage,
      where: {is_active: true},
    });
    const contacts = await Contact.findAll();
    const programs = await Program.findAll({
      where: {is_active: true},
      order: [['updated_at', 'desc']],
    });
    const data = {
      posts: formatBlogs(blogs.rows).map(({id, ...blog}) => blog),
      contacts: formatContacts(contacts),
      footer: formatFooter(formatContacts(contacts), programs),
    };
    const _links = {
      self: {
        href: `${base_url}v1/landing-page/blogs?page=${page}&perPage=${perPage}`,
      },
      first: {
        href: `${base_url}v1/landing-page/blogs?page=${page}`,
      },
      prev: {
        href: `${base_url}v1/landing-page/blogs?page=${
          page - 1
        }&perPage=${perPage}`,
      },
      next: {
        href: `${base_url}v1/landing-page/blogs?page=${
          page + 1
        }&perPage=${perPage}`,
      },
      last: {
        href: `${base_url}v1/landing-page/blogs?page=${Math.ceil(
          parseInt(blogs.count, 8) / perPage,
        )}&perPage=${perPage}`,
      },
    };
    const total = blogs.count;
    const response = await formatRes(
      meta('List of blogs post', 200, 'success'),
      data,
      total,
      _links,
    );

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    const response = formatRes(meta('Service unavailable', 503, 'error'));
    return res.status(503).json(response);
  }
};

const getBlogBySlug = async (req, res) => {
  try {
    const {slug} = req.params;
    const blog = await Blog.findOne({
      where: {slug},
    });
    if (blog === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }
    const formattedBlog = formatBlog(blog);
    delete formattedBlog.id;
    const contacts = await Contact.findAll();
    const programs = await Program.findAll({
      where: {is_active: true},
      order: [['updated_at', 'desc']],
    });
    const data = {
      post: formattedBlog,
      contacts: formatContacts(contacts),
      footer: formatFooter(formatContacts(contacts), programs),
    };
    const response = await formatRes(
      meta('Blog post details', 200, 'success'),
      data,
    );

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    const response = formatRes(meta('Service unavailable', 503, 'error'));
    return res.status(503).json(response);
  }
};

const getGalleries = async (req, res) => {
  try {
    let {perPage, page} = req.query;
    perPage = perPage !== undefined ? parseInt(perPage, 10) : 5;
    page = page !== undefined ? parseInt(page, 10) : 1;
    const galleries = await Gallery.findAndCountAll({
      offset: (page - 1) * perPage,
      limit: perPage,
      where: {is_active: true},
    });
    const contacts = await Contact.findAll();
    const programs = await Program.findAll({
      where: {is_active: true},
      order: [['updated_at', 'desc']],
    });

    const data = {
      galleries: formatGalleries(galleries.rows),
      contacts: formatContacts(contacts),
      footer: formatFooter(formatContacts(contacts), programs),
    };
    const _links = {
      self: {
        href: `${base_url}v1/landing-page/galleries?page=${page}&perPage=${perPage}`,
      },
      first: {
        href: `${base_url}v1/landing-page/galleries?page=${page}`,
      },
      prev: {
        href: `${base_url}v1/landing-page/galleries?page=${
          page - 1
        }&perPage=${perPage}`,
      },
      next: {
        href: `${base_url}v1/landing-page/galleries?page=${
          page + 1
        }&perPage=${perPage}`,
      },
      last: {
        href: `${base_url}v1/landing-page/galleries?page=${Math.ceil(
          parseInt(galleries.count, 8) / perPage,
        )}&perPage=${perPage}`,
      },
    };
    const total = galleries.count;
    const response = await formatRes(
      meta('List of Galleries', 200, 'success'),
      data,
      total,
      _links,
    );

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    const response = formatRes(meta('Service unavailable', 503, 'error'));
    return res.status(503).json(response);
  }
};

const getGalleryById = async (req, res) => {
  try {
    const {id} = req.params;
    const gallery = await Gallery.findByPk(id);
    if (gallery === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }
    const contacts = await Contact.findAll();
    const programs = await Program.findAll({
      where: {is_active: true},
      order: [['updated_at', 'desc']],
    });
    const data = {
      packet: formatGallery(gallery),
      contacts: formatContacts(contacts),
      footer: formatFooter(formatContacts(contacts), programs),
    };
    const response = await formatRes(
      meta('Gallery details', 200, 'success'),
      data,
    );

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    const response = formatRes(meta('Service unavailable', 503, 'error'));
    return res.status(503).json(response);
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    const programs = await Program.findAll({
      where: {is_active: true},
      order: [['updated_at', 'desc']],
    });

    const data = {
      contacts: formatContacts(contacts).map(({id, ...contact}) => contact),
      footer: formatFooter(formatContacts(contacts), programs),
    };
    const response = await formatRes(
      meta('Contacts Information', 200, 'success'),
      data,
    );

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    const response = formatRes(meta('Service unavailable', 503, 'error'));
    return res.status(503).json(response);
  }
};

const sendQuestion = async (req, res) => {
  try {
    const {name, email, body} = req.body;
    const question = await Question.create({name, email, body});
    if (question === null) {
      const response = formatRes(meta('Service unavailable', 503, 'error'));
      return res.status(503).json(response);
    }
    await sendQuestionNotification(name, email, body);
    const response = formatRes(meta('Question has been sent', 201, 'success'));
    return res.status(201).json(response);
  } catch (error) {
    const response = formatRes(meta('Service unavailable', 503, 'error'));
    return res.status(503).json(response);
  }
};

module.exports = {
  home,
  getCategories,
  getPacketsByCategory,
  getPacketBySlug,
  getBlogs,
  getBlogBySlug,
  getGalleries,
  getGalleryById,
  getContacts,
  sendQuestion,
};
