const {Setting} = require('../models');
const {formatRes, meta} = require('../helper/formatter/responseFormatter');

const getSettings = async (req, res) => {
  try {
    const settings = await Setting.findAll();
    const response = formatRes(
      meta('List of settings', 200, 'success'),
      settings,
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

const updateCreateSettings = async (req, res) => {
  try {
    const arrayOfSetting = req.body;
    const settings = await Setting.bulkCreate(arrayOfSetting, {
      updateOnDuplicate: ['key', 'value'],
    });
    const response = formatRes(meta('Data updated', 200, 'success'), settings);
    return res.status(200).json(response);
  } catch (error) {
    const response = formatRes(
      meta('Service unavailable', 503, 'error'),
      error,
    );
    return res.status(503).json(response);
  }
};

module.exports = {getSettings, updateCreateSettings};
