const formatBlog = (post) => {
  const formatter = {
    id: post.id,
    image: post.image,
    title: post.title,
    slug: post.slug,
    perks: post.perks,
    short_description: post.short_description,
    body: post.body,
    is_active: post.is_active,
    writter: post?.written_by || 'admin',
    date: post.updatedAt,
  };
  return formatter;
};

const formatBlogs = (blogs) => blogs.map((blog) => formatBlog(blog));

module.exports = {formatBlog, formatBlogs};
