const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {meta, formatRes} = require('../helper/formatter/responseFormatter');
const {formatUser} = require('../helper/formatter/userFormatter');
const {User} = require('../models');

const jwtSecret = process.env.JWT_SECRET;

const getSession = async (req, res) => {
  try {
    const {email, password} = req.body;
    let user = await User.findOne({where: {email}});
    if (user === null) {
      const response = formatRes(meta('Email not found', 200, 'success'), null);
      return res.status(200).json(response);
    }
    user = await User.findOne({where: {email}});
    if (user === null) {
      const response = formatRes(meta('Email not found', 200, 'success'), null);
      return res.status(200).json(response);
    }

    const hashedPassword = await bcrypt.compare(password, user.password);
    if (!hashedPassword) {
      const response = formatRes(
        meta('These credentials do not match our records.', 401, 'success'),
        null,
      );
      return res.status(401).json(response);
    }

    const data = {
      id: user.id,
    };
    const token = await jwt.sign(data, jwtSecret, {expiresIn: '1 days'});

    const userData = formatUser(user, token);
    const response = formatRes(meta('Login success', 200, 'success'), userData);
    return res.status(200).json(response);
  } catch (error) {
    const response = formatRes(
      meta('Service unavailable', 503, 'error'),
      error,
    );
    return res.status(503).json(response);
  }
};

module.exports = {getSession};
