const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const neo4j = require('neo4j-driver');
const reclut = 'Abril';

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

// redirects
app.get('/', (req, res) => {
  res.render('index', {
    berlin: anp.berlin,
    kakiri: anp.kakiri,
    sabalillo: anp.sabalillo,
    anp: anp
  })
});

app.get('/index', (req, res)=> {
  res.render('index', {
    berlin: anp.berlin,
    kakiri: anp.kakiri,
    sabalillo: anp.sabalillo,
    anp: anp
  })
});

app.get('/berlin', (req,res) => {
    res.render('berlin', {berlin:anp.berlin});
});

app.post('/berlin/ticket', (req,res) => {
  let quantity = req.body.quantity;
  let totalPrice = quantity * anp.berlin.price;
  const createCommand = `
  CREATE (boleto:BOLETO {reclut:$reclutParam}) -[:TIENE]-> (pago:PAGO {cantidad_boletos:$quantityParam, total:$totalParam})
  WITH boleto, pago
  MATCH(berlin:ANP {nombre: "Bosque Berlín"})
  WITH berlin, boleto
  CREATE(berlin)-[:TIENE]-> (boleto)
  `;
  const params = {reclutParam: reclut, quantityParam: quantity, totalParam: totalPrice};
  session
    .run(createCommand, params)
    .then((result) => {
      console.log(quantity);
      console.log(totalPrice);
      res.render('confirm');
    })
    .catch((err)=>{
      res.status(err.status || 400);
      console.log(err);
    });
});


app.get('/kakiri', (req,res) => {
    res.render('kakiri', {kakiri:anp.kakiri});
});

app.post('/kakiri/ticket', (req,res) => {
  let quantity = req.body.quantity;
  let totalPrice = quantity * anp.kakiri.price;
  const createCommand = `
  CREATE (boleto:BOLETO {reclut:$reclutParam}) -[:TIENE]-> (pago:PAGO {cantidad_boletos:$quantityParam, total:$totalParam})
  WITH boleto, pago
  MATCH(kakiri:ANP {nombre: "Kakiri Uka"})
  WITH kakiri, boleto
  CREATE(kakiri)-[:TIENE]-> (boleto)
  `;
  const params = {reclutParam: reclut, quantityParam: quantity, totalParam: totalPrice};
  session
    .run(createCommand, params)
    .then((result) => {
      res.render('confirm');
    })
    .catch((err)=>{
      res.status(err.status || 400);
      console.log(err);
    });
});

app.get('/sabalillo', (req,res) => {
    res.render('sabalillo', {sabalillo:anp.sabalillo});
});

app.post('/sabalillo/ticket', (req,res) => {
  let quantity = req.body.quantity;
  let totalPrice = quantity * anp.sabalillo.price;
  const createCommand = `
  CREATE (boleto:BOLETO {reclut:$reclutParam}) -[:TIENE]-> (pago:PAGO {cantidad_boletos:$quantityParam, total:$totalParam})
  WITH boleto, pago
  MATCH(sabalillo:ANP {nombre: "Sabalillo"})
  WITH sabalillo, boleto
  CREATE(sabalillo)-[:TIENE]-> (boleto)
  `;
  const params = {reclutParam: reclut, quantityParam: quantity, totalParam: totalPrice};
  session
    .run(createCommand, params)
    .then((result) => {
      res.render('confirm');
    })
    .catch((err)=>{
      res.status(err.status || 400);
      console.log(err);
    });
});


// Run app
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`The server is listening from http://localhost:${PORT}`);
});

module.exports = app;