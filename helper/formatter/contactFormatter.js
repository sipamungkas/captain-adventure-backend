const formatContact = (contact) => {
  const formatter = {
    value: contact.value,
    link: contact.link,
    category: contact.category,
  };
  return formatter;
};

const formatContacts = (contacts) =>
  contacts.map((contact) => formatContact(contact));

module.exports = {formatContact, formatContacts};
