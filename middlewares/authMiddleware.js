const jwt = require('jsonwebtoken');
const {User} = require('../models');
const {meta, formatRes} = require('../helper/formatter/responseFormatter');

const jwtSecret = process.env.JWT_SECRET;

const authenticateToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    const response = formatRes(
      meta('Access denied!', 401, 'Unauthorized access'),
    );
    return res.status(401).json(response);
  }
  try {
    const {authorization} = req.headers;
    const bearer = authorization.split(' ');
    const token = bearer[1];
    const decode = await jwt.verify(token, jwtSecret);

    const user = await User.findByPk(decode.id);

    if (user === null) {
      const response = formatRes(
        meta('Access denied!', 401, 'Unauthorized access'),
      );
      return res.status(401).json(response);
    }
    req.user = user;
    return next();
  } catch (error) {
    const response = formatRes(
      meta('Access denied!', 401, 'Unauthorized access'),
    );
    return res.status(401).json(response);
  }
};

const isAdmin = async (req, res, next) => {};

module.exports = {authenticateToken, isAdmin};
