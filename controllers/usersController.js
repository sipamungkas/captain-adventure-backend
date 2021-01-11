const jwt = require('jsonwebtoken');
const {meta, formatRes} = require('../helper/formatter/responseFormatter');
const {formatUser} = require('../helper/formatter/userFormatter');

const jwtSecret = process.env.JWT_SECRET;

const getSession = async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const {email, password} = req.body;
  try {
    const payload = {
      id: 1,
      name: 'Ragil Burhanudin Pamungkas',
      email,
    };

    const token = await jwt.sign(payload, jwtSecret, {expiresIn: 3600});
    const user = formatUser(payload, token);
    const response = formatRes(meta('Login success', 200, 'success'), user);
    res.status(200).json(response);
  } catch (error) {
    res.status(503);
  }
};

module.exports = {getSession};
