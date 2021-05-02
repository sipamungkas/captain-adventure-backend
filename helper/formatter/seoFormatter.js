const formatSeo = (seo) => {
  const formatter = {
    page: seo.page,
    title: seo.title,
    description: seo.description,
  };
  return formatter;
};

const formatSeos = (data) => data.map((seo) => formatSeo(seo));

module.exports = {formatSeo, formatSeos};
