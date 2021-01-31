const formatCategory = (category) => {
  const formatter = {
    id: category.id,
    image: category.image,
    name: category.name,
    slug: category.slug,
    is_active: category.is_active,
    packets_count: category.packets ? category.packets.length : 0,
  };
  return formatter;
};

const formatCategories = (categories) =>
  categories.map((category) => formatCategory(category));

module.exports = {formatCategory, formatCategories};
