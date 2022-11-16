const express = require('express');
const router = require('./router');
const routerPages = require('./routerPages');
const path = require('path');

const app = express();

app.use(express.json());

app.use(router);

app.use("/pages", routerPages);

app.use(express.static(path.join(__dirname .replace('backend', ''), 'frontend'))); //substitui o back pelo front

module.exports = app;

