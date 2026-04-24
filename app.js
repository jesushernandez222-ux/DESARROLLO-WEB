const express = require('express');
const app = express();

const productosRoutes = require('./routes/productosRoutes');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use('/productos', productosRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
