const formatBlog = (post) => {
  const formatter = {
    id: post.id,
    image: post.image,
    title: post.title,
    perks: post.perks,
    short_description: post.short_description,
    body: post.body,
    is_active: post.is_active,
  };
  return formatter;
};

const formatBlogs = (blogs) => blogs.map((blog) => formatBlog(blog));

module.exports = {formatBlog, formatBlogs};
