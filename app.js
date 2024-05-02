const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// firing express app to listen to requests
const app = express()

// connecting to db using mongoose
const dbURI = '';
mongoose.connect(dbURI)
    .then((result) => {     // asynchronous tasks, if successful then fires this
        app.listen(3000, () => {
            console.log(`Server is running on port 3000`);
        });
    })
    .catch((err) => console.log(err));      // if error, then prints in console

// EJS View Engine for dynamic data in file
app.set('view engine', 'ejs');     // set the view engine to ejs
app.set('views', 'views');         // look for views in views folder

// Middleware (server side code)
app.use(express.static('public'));  // for allowing access to public files on browser
app.use(express.urlencoded({ extended: true }));      // for reading a post action 
app.use(morgan('dev'));     // for getting logs on console

// get request for home page
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

// get request for about page
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// Blog Routes
app.use('/blogs', blogRoutes);

// 404 response (middleware)
app.use((req, res) => {
    res.status(404).render('404',  { title: 'Page Not Found!' });
});