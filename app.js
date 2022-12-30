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

const {URI, username, password} = require('./credentials.js');
var driver = neo4j.driver(URI, neo4j.auth.basic(username, password), 
{/* encrypted: 'ENCRYPTION_OFF' */});
const session = driver.session({database:"neo4j"});

// anp info
const {anp} = require('./anp');


app.get('/', (req, res) => {
  res.render('index', {
    berlin: anp.berlin,
    kakiri: anp.kakiri,
    sabalillo: anp.sabalillo,
    anp: anp
  })
});



// Run app
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`The server is listening from http://localhost:${PORT}`);
});

module.exports = app;