const svgCaptcha = require('svg-captcha');
const {meta, formatRes} = require('../helper/formatter/responseFormatter');

const getCaptcha = (req, res) => {
  try {
    const captcha = svgCaptcha.create();
    req.session.captcha = captcha.text;
    res.type('svg');
    return res.status(200).send(captcha.data);
  } catch (error) {
    const response = formatRes(
      meta('Service unavailable', 503, 'error'),
      error,
    );
    return res.status(503).json(response);
  }
};

const checkCaptcha = (req, res) =>
  res.status(200).json({
    data: req.body.captcha === req.session.captcha,
    c: req.body.captcha,
    c2: req.session.captcha,
  });
module.exports = {getCaptcha, checkCaptcha};
