const formatContact = (contact) => {
  const formatter = {
    id: contact.id ?? null,
    value: contact.value ?? null,
    link: contact.link ?? null,
    category: contact.category ?? null,
  };
  return formatter;
};

const formatContacts = (contacts) =>
  contacts.map((contact) => formatContact(contact));

module.exports = {formatContact, formatContacts};
