const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const fs = require('fs-extra');
const path = require('path');
const {meta, formatRes} = require('../helper/formatter/responseFormatter');
const {formatUser} = require('../helper/formatter/userFormatter');
const mail = require('../services/mail');
const {User} = require('../models');

const jwtSecret = process.env.JWT_SECRET;
const saltRounds = parseInt(process.env.SALT_ROUNDS, 8);

const getSession = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({where: {email}});
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

const forgotPassword = async (req, res) => {
  try {
    const {email} = req.body;
    const user = await User.findOne({where: {email}});
    if (user === null) {
      const response = formatRes(meta('Email not found', 200, 'success'), null);
      return res.status(200).json(response);
    }
    const buffer = await crypto.randomBytes(20);
    const token = buffer.toString('hex');
    await User.update(
      {
        reset_token: token,
        reset_expired: new Date().getTime() + 3 * 60 * 60 * 1000,
      },
      {
        where: {
          email,
        },
      },
    );

    const mailStatus = await mail.sendResetLink(email, user.name, token);
    if (mailStatus === false) {
      const response = formatRes(meta('Service unavailable', 503, 'error'));
      return res.status(503).json(response);
    }

    const data = {
      message:
        'An email has been sent to your email address containing an activation link. Please click on the link to activate your account. If you do not click the link your account will remain inactive and you will not receive further emails. If you do not receive the email within a few minutes, please check your spam folder.',
    };

    const response = formatRes(
      meta('Reset link has been sent', 200, 'success'),
      data,
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

const resetPassword = async (req, res) => {
  try {
    const {token} = req.query;
    const {password, verifyPassword} = req.body;
    if (password !== verifyPassword) {
      const response = formatRes(meta('Password did not match', 401, 'error'));
      return res.status(401).json(response);
    }

    const user = await User.findOne({where: {reset_token: token}});
    if (user === null) {
      const response = formatRes(meta('Reset link invalid', 401, 'error'));
      return res.status(401).json(response);
    }

    const today = new Date();
    if (today > new Date(user.reset_expired)) {
      const response = formatRes(meta('Link expired!', 403, 'error'));
      return res.status(403).json(response);
    }

    const newPassword = await bcrypt.hash(password, saltRounds);
    await user.update({
      password: newPassword,
      reset_token: null,
      reset_expired: null,
    });

    const response = formatRes(meta('Password changed!', 200, 'success'));
    return res.status(200).json(response);
  } catch (error) {
    const response = formatRes(
      meta('Service unavailable', 503, 'error'),
      error,
    );
    return res.status(503).json(response);
  }
};

const uploadAvatar = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const pathFile = path.join(__dirname, `../public/${user.avatar}`);
    const exists = await fs.pathExists(pathFile);
    if (exists) {
      await fs.unlink(pathFile);
    }
    await user.update({avatar: `avatars/${req.file.filename}`});
    const response = formatRes(meta('Avatar uploaded!', 200, 'success'));
    return res.status(200).json(response);
  } catch (error) {
    const response = formatRes(
      meta('Service unavailable', 503, 'error'),
      error,
    );
    return res.status(503).json(response);
  }
};

module.exports = {getSession, forgotPassword, resetPassword, uploadAvatar};
