const fs = require('fs');
const path = require('path');

const ruta = path.join(__dirname, '../data/productos.json');

const leerProductos = () => {
    const data = fs.readFileSync(ruta, 'utf-8');
    return JSON.parse(data);
};

const guardarProductos = (productos) => {
    fs.writeFileSync(ruta, JSON.stringify(productos, null, 2));
};

module.exports = {
    listar: (req, res) => {
        const productos = leerProductos();
        res.render('productos/list', { productos });
    },

    crearVista: (req, res) => {
        res.render('productos/create');
    },

    crear: (req, res) => {
        const productos = leerProductos();

        const nuevo = {
            id: Date.now(),
            ...req.body
        };

        productos.push(nuevo);
        guardarProductos(productos);

        res.redirect('/productos');
    },

    editarVista: (req, res) => {
        const productos = leerProductos();
        const producto = productos.find(p => p.id == req.params.id);

        res.render('productos/edit', { producto });
    },

    editar: (req, res) => {
        let productos = leerProductos();

        productos = productos.map(p =>
            p.id == req.params.id ? { ...p, ...req.body } : p
        );

        guardarProductos(productos);

        res.redirect('/productos');
    },

    eliminar: (req, res) => {
        let productos = leerProductos();

        productos = productos.filter(p => p.id != req.params.id);

        guardarProductos(productos);

        res.redirect('/productos');
    }
};
