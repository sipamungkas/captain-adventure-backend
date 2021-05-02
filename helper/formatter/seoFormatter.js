const formatSeo = (seo) => {
  const formatter = {
    page: seo.page,
    name: seo.name,
    description: seo.description,
  };
  return formatter;
};

const formatSeos = (data) => data.map((seo) => formatSeo(seo));

module.exports = {formatSeo, formatSeos};
