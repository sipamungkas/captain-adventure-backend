const {Setting} = require('../models');
const {formatSettings} = require('../helper/formatter/landingPageFormatter');

const settingsData = async () => {
  try {
    const settings = await Setting.findAll();
    const seo = settings.filter((setting) => setting.group === 'meta');
    const data = {
      seo: formatSettings(seo),
      settings: formatSettings(
        settings.filter((setting) => setting.group !== 'meta'),
      ),
    };
    return data;
  } catch (error) {
    return {};
  }
};

module.exports = {settingsData};
