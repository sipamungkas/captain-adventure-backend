const {validationResult} = require('express-validator');
const {formatRes, meta} = require('../helper/formatter/responseFormatter');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const response = formatRes(
    meta('Validation errors', 422, 'error'),
    errors.array(),
  );
  return res.status(422).json(response);
};

module.exports = validate;
