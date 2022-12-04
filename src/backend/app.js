const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./router');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(router);
app.use("/views", express.static(__dirname.replace('backend', 'frontend/views')));

app.use(express.static(path.join(__dirname .replace('backend', ''), 'frontend'))); //substitui o back pelo front

module.exports = app;

