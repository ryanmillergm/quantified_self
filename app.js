var express = require('express');
var path = require('path');
require('dotenv').config();
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiFoodsRouter = require('./routes/api/v1/foods');
var apiMealsRouter = require('./routes/api/v1/meals');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/foods', apiFoodsRouter);
app.use('/api/v1/meals', apiMealsRouter);

module.exports = app;
