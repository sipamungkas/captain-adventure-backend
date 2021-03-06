const fs = require('fs-extra');
const slugify = require('slugify');
const path = require('path');
const {Blog} = require('../models');
const {meta, formatRes} = require('../helper/formatter/responseFormatter');

const base_url = process.env.BASEURL;
const {formatBlog, formatBlogs} = require('../helper/formatter/blogFormatter');

const createBlogPost = async (req, res) => {
  try {
    const {title, perks, short_description, body} = req.body;
    let slug = await slugify(title, {
      replacement: '-',
      lower: true,
      strict: true,
    });
    if (slug === '') {
      const response = formatRes(
        meta('Please input alphabet and number character only', 422, 'error'),
      );
      return res.status(422).json(response);
    }

    const slugExists = await Blog.findOne({where: {slug}});
    if (slugExists) {
      slug = `${slug}-${Math.floor(Math.random() * 1453 + 1)}`;
    }
    let newPost = {
      image: null,
      slug,
      title,
      perks,
      short_description,
      body,
    };
    if (req.file) {
      newPost = {
        image: `images/blogs/${req.file.filename}`,
        slug,
        title,
        perks,
        short_description,
        body,
      };
    }
    const post = await Blog.create(newPost);
    if (post === null) {
      const response = formatRes(meta('Service unavailable', 503, 'error'));
      return res.status(503).json(response);
    }
    const response = formatRes(meta('Blog post created', 201, 'success'));
    return res.status(201).json(response);
  } catch (error) {
    const response = formatRes(
      meta('Service unavailable', 503, 'error'),
      error,
    );
    return res.status(503).json(response);
  }
};

const getBlogsPost = async (req, res) => {
  try {
    const {orderByDate} = req.query;
    let {perPage, page} = req.query;
    perPage = perPage !== undefined ? parseInt(perPage, 10) : 5;
    page = page !== undefined ? parseInt(page, 10) : 1;

    let orderParameter = [['updated_at', 'ASC']];
    if (orderByDate && orderByDate.toLowerCase() === 'desc') {
      orderParameter = [['updated_at', 'DESC']];
    }
    const posts = await Blog.findAndCountAll({
      offset: (page - 1) * perPage,
      limit: perPage,
      order: orderParameter,
    });
    if (posts === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }
    const data = await formatBlogs(posts.rows);
    const _links = {
      self: {
        href: `${base_url}v1/posts?page=${page}&perPage=${perPage}`,
      },
      first: {
        href: `${base_url}v1/posts?page=${page}`,
      },
      prev: {
        href: `${base_url}v1/posts?page=${page - 1}&perPage=${perPage}`,
      },
      next: {
        href: `${base_url}v1/posts?page=${page + 1}&perPage=${perPage}`,
      },
      last: {
        href: `${base_url}v1/posts?page=${Math.ceil(
          parseInt(posts.count, 8) / perPage,
        )}&perPage=${perPage}`,
      },
    };
    const total = posts.count;
    const response = await formatRes(
      meta('List of Blog Posts', 200, 'success'),
      data,
      total,
      _links,
    );
    return res.status(200).json(response);
  } catch (error) {
    const response = formatRes(
      meta('Service unavailable', 503, 'error'),
      error,
    );
    return res.status(503).json(response);
  }
};

const getBlogPost = async (req, res) => {
  try {
    const {id} = req.params;
    const post = await Blog.findByPk(id);
    if (post === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }
    const response = formatRes(
      meta('Blog post details', 200, 'success'),
      formatBlog(post),
    );
    return res.status(200).json(response);
  } catch (error) {
    const response = formatRes(
      meta('Service unavailable', 503, 'error'),
      error,
    );
    return res.status(503).json(response);
  }
};

const updateBlogPost = async (req, res) => {
  try {
    const {id} = req.params;
    const {title, perks, short_description, body} = req.body;
    const post = await Blog.findByPk(id);
    if (post === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }
    let slug = await slugify(title, {
      replacement: '-',
      lower: true,
      strict: true,
    });
    if (slug === '') {
      const response = formatRes(
        meta('Please input alphabet and number character only', 422, 'error'),
      );
      return res.status(422).json(response);
    }

    const slugExists = await Blog.findOne({where: {slug}});
    if (slugExists && slugExists.id !== post.id) {
      slug = `${slug}-${Math.floor(Math.random() * 1453 + 1)}`;
    }
    let newPost = {
      image: post.image,
      title,
      slug,
      perks,
      short_description,
      body,
    };

    if (req.file) {
      const pathFile = path.join(__dirname, `../public/${post.image}`);
      const exists = await fs.pathExists(pathFile);
      if (exists) {
        await fs.unlink(pathFile);
      }
      newPost = {
        image: `images/blogs/${req.file.filename}`,
        title,
        slug,
        perks,
        short_description,
        body,
      };
    }
    const updatedData = await post.update(newPost);
    const response = formatRes(
      meta('Blog post updated', 200, 'success'),
      formatBlog(updatedData),
    );
    return res.status(200).json(response);
  } catch (error) {
    const response = formatRes(
      meta('Service unavailable', 503, 'error'),
      error,
    );
    return res.status(503).json(response);
  }
};

const deleteBlogPost = async (req, res) => {
  try {
    const {id} = req.params;
    const post = await Blog.findByPk(id);
    if (post === null) {
      const response = formatRes(meta('Page not found', 404, 'success'));
      return res.status(404).json(response);
    }

    const pathFile = path.join(__dirname, `../public/${post.image}`);
    const exists = await fs.pathExists(pathFile);
    if (exists) {
      await fs.unlink(pathFile);
    }
    await post.destroy();
    const response = formatRes(meta('Blog post deleted', 200, 'success'));
    return res.status(204).json(response);
  } catch (error) {
    const response = formatRes(
      meta('Service unavailable', 503, 'error'),
      error,
    );
    return res.status(503).json(response);
  }
};

const uploadPostImage = async (req, res) => {
  try {
    if (!req.file) {
      const response = formatRes(meta('invalid image type', 422, 'error'));
      return res.status(422).json(response);
    }
    const image = `images/blogs/${req.file.filename}`;
    const response = formatRes(meta('Image uploaded', 200, 'success'), {
      image_url: image,
    });
    return res.status(200).json(response);
  } catch (error) {
    const response = formatRes(
      meta('Service unavailable', 503, 'error'),
      error,
    );
    return res.status(503).json(response);
  }
};

module.exports = {
  createBlogPost,
  getBlogsPost,
  getBlogPost,
  updateBlogPost,
  deleteBlogPost,
  uploadPostImage,
};
