const formatFooter = (contacts, programs) => {
  const formatter = {
    contacts: contacts.map(({id, ...contact}) => contact),
    programs: programs.map((program) => program.title),
  };
  return formatter;
};

module.exports = {
  formatFooter,
};
