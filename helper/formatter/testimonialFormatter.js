const formatTestimonial = (testimonial) => {
  const formatter = {
    id: testimonial.id,
    image: testimonial.image,
    name: testimonial.name,
    testimoni: testimonial.testimoni,
    order: testimonial.order,
  };
  return formatter;
};

const formatTestimonials = (testimoinals) =>
  testimoinals.map((blog) => formatTestimonial(blog));

module.exports = {formatTestimonial, formatTestimonials};
