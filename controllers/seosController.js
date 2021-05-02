const {Seo} = require('../models');
const {formatRes, meta} = require('../helper/formatter/responseFormatter');
const {formatSeos} = require('../helper/formatter/seoFormatter');

const base_url = process.env.BASEURL;

const getSeoList = async (req, res) => {
  try {
    const {orderByDate} = req.query;
    let {perPage, page} = req.query;
    perPage = perPage !== undefined ? parseInt(perPage, 10) : 5;
    page = page !== undefined ? parseInt(page, 10) : 1;

    let orderParameter = [['updated_at', 'ASC']];
    if (orderByDate && orderByDate.toLowerCase() === 'desc') {
      orderParameter = [['updated_at', 'DESC']];
    }
    const questions = await Seo.findAndCountAll({
      offset: (page - 1) * perPage,
      limit: perPage,
      order: orderParameter,
    });
    if (questions === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }
    const data = await formatSeos(questions.rows);
    const _links = {
      self: {
        href: `${base_url}v1/seo?page=${page}&perPage=${perPage}`,
      },
      first: {
        href: `${base_url}v1/seo?page=${page}`,
      },
      prev: {
        href: `${base_url}v1/seo?page=${page - 1}&perPage=${perPage}`,
      },
      next: {
        href: `${base_url}v1/seo?page=${page + 1}&perPage=${perPage}`,
      },
      last: {
        href: `${base_url}v1/seo?page=${Math.ceil(
          parseInt(questions.count, 8) / perPage,
        )}&perPage=${perPage}`,
      },
    };
    const total = questions.count;
    const response = await formatRes(
      meta('List of Seo pages', 200, 'success'),
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

module.exports = {getSeoList};
