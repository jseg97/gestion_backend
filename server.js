require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_helpers/error-handler');
const config = require('./config.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
    credentials: true,
    origin: ['http://localhost', 'http://localhost:4200', 'http://127.0.0.0', 'http://127.0.0.0:4200', 'http://0.0.0.0', 'http://0.0.0.0:4200'] // Whitelist the domains you want to allow
};
app.use(cors(corsOptions));

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/blog', require('./blog/blog.controller'));
app.use('/comment', require('./comment/comment.controller'));

// global error handler
app.use(errorHandler);

// start server
//const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const port = config.PORT;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});