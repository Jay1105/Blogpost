const { method, get } = require('lodash');
const Blog = require('../modules/blogs');

// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1})
        .then ((result) => {
            res.render('blogs/index', { title: 'Blogs', blogs: result })
        })
        .catch(err => console.log(err));
};

const blog_details = (req, res) => {
    Blog.findById(req.params.id)
        .then((result) => {
            res.render('blogs/details', { title: 'Blog Details', blog: result });
        })
        .catch((err) => {
            res.status(404).render('404', { title: 'Page Not Found'});
        });
};

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create Blog'});
};

const blog_create_post = (req, res) => {
    const newBlog = new Blog(req.body);

    newBlog.save()
        .then((result) => {
            res.redirect('/');
        })
        .catch(err => console.log(err));
};

const blog_delete = (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.json({ redirect: '/'});
        })
        .catch(err => console.log(err));
};

module.exports = {
    blog_index, blog_details, blog_create_get, blog_create_post, blog_delete
};