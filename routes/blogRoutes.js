const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// get request for blogs page
router.get('/', blogController.blog_index);

// post request for blogs page
router.post('/', blogController.blog_create_post);

// get request for blogs/create page
router.get('/create', blogController.blog_create_get);

// get request for single blog
router.get('/:id', blogController.blog_details);

// delete a single blog
router.delete('/:id', blogController.blog_delete);

module.exports = router;