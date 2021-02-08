const groupBy = (list, keyGetter) => {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
};

const formatFooter = (contacts, programs) => {
  const formattedContacts = groupBy(contacts, (contact) => contact.category);
  const formatter = {
    social_media: formattedContacts.get('social media'),
    address: formattedContacts.get('address'),
    programs: programs.map((program) => program.title),
  };
  return formatter;
};

module.exports = {
  formatFooter,
};
