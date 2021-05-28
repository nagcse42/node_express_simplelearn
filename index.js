const express = require('express');
const app = express();
const logger = require('morgan');


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(logger('dev'))

app.use('/api/users',require('./routes/api/UserController'));
app.use('/api/posts',require('./routes/api/PostsController'));

//Handling if route not found errir
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

//It will handle all the application level errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message,
        messageDesc: "APP500 - Please contact IT Teams"
    });
});

//Handling uncaught exception
process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
});

app.listen(3000, () => {
    console.log('Express app started at: 3000')
})