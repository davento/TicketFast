const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const neo4j = require('neo4j-driver');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

var driver = neo4j.driver('neo4j+s://bd720e6b.databases.neo4j.io',
neo4j.auth.basic('postulante', 'solucionatica2022'), 
{/* encrypted: 'ENCRYPTION_OFF' */});
const session = driver.session({database:"neo4j"});

// app.get('/', (req, res) => {
// });