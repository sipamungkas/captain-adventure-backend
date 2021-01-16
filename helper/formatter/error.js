const {meta, formatRes} = require('./responseFormatter');

const sendError = (req, res) => {
  const response = formatRes(meta('Service unavailable', 503, 'error'));
  return res.status(503).json(response);
};

module.exports = sendError;
