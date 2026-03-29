const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let productos = [
  { id: 1, nombre: "Camiseta", precio: 50000 },
  { id: 2, nombre: "Jean", precio: 90000 }
];

app.get('/', (req, res) => {
  res.render('index', { productos });
});

app.get('/products', (req, res) => {
  res.render('products/index', { productos });
});

app.get('/products/create', (req, res) => {
  res.render('products/create');
});

app.post('/products/create', (req, res) => {
  const { nombre, precio } = req.body;
  productos.push({ id: productos.length + 1, nombre, precio });
  res.redirect('/products');
});

app.get('/products/edit/:id', (req, res) => {
  const producto = productos.find(p => p.id == req.params.id);
  res.render('products/edit', { producto });
});

app.post('/products/edit/:id', (req, res) => {
  const { nombre, precio } = req.body;
  const producto = productos.find(p => p.id == req.params.id);
  producto.nombre = nombre;
  producto.precio = precio;
  res.redirect('/products');
});

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));
