const formatPerks = (perks) => {
  const formatter = perks.split(',');

  return formatter.map((perk) => perk.trim());
};

const formatProgram = (post) => {
  const formatter = {
    id: post.id,
    image: post.image,
    title: post.title,
    perks: post.perks,
    formattedPerks: post.perks ? formatPerks(post.perks) : null,
    short_description: post.short_description,
    body: post.body,
    is_active: post.is_active,
  };
  return formatter;
};

const formatPrograms = (blogs) => blogs.map((blog) => formatProgram(blog));

module.exports = {formatProgram, formatPrograms};
