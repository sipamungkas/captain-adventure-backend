const formatGallery = (gallery) => {
  const formatter = {
    id: gallery.id,
    image: gallery.image,
    alt: gallery.alt,
    is_active: gallery.is_active,
  };
  return formatter;
};

const formatGalleries = (galleries) =>
  galleries.map((gallery) => formatGallery(gallery));

module.exports = {formatGallery, formatGalleries};
