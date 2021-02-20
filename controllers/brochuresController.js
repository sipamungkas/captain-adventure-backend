const fs = require('fs-extra');
const path = require('path');
const {meta, formatRes} = require('../helper/formatter/responseFormatter');

const brochurePath = 'files/brochures/brochure.pdf';

const uploadBochure = async (req, res) => {
  try {
    if (!req.file) {
      const response = formatRes(meta('Brochure upload failed', 422, 'error'));
      return res.status(422).json(response);
    }
    const image = brochurePath;
    const response = formatRes(meta('Brochure uploaded', 200, 'success'), {
      brochure_url: image,
    });
    return res.status(200).json(response);
  } catch (error) {
    const response = formatRes(
      meta('Service unavailable', 503, 'error'),
      error,
    );
    return res.status(503).json(response);
  }
};

const getBrochure = async (req, res) => {
  try {
    const pathFile = path.join(__dirname, `../public/${brochurePath}`);
    const exists = await fs.pathExists(pathFile);
    if (!exists) {
      const response = formatRes(meta('Brochure not found', 404, 'success'));
      return res.status(503).json(response);
    }
    // const response = formatRes(meta('Brochure not found', 404, 'success'));
    // return res.status(503).json(response);
    return res.download(pathFile);
  } catch (error) {
    const response = formatRes(
      meta('Service unavailable', 503, 'error'),
      error,
    );
    return res.status(503).json(response);
  }
};

module.exports = {uploadBochure, getBrochure};
