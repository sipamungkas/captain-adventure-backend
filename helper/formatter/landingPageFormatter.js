const formatFooter = (contacts, programs) => {
  const formatter = {
    contacts: contacts.map(({id, ...contact}) => contact),
    programs: programs.map((program) => program.title),
  };
  return formatter;
};

const formatSetting = (setting) => {
  const formatter = {
    key: setting?.key ?? null,
    value: setting?.value ?? null,
    group: setting?.group ?? null,
  };
  return formatter;
};

const formatSettings = (settings) =>
  settings.map((setting) => formatSetting(setting));

module.exports = {
  formatFooter,
  formatSettings,
};
