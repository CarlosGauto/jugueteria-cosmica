import express from 'express';
import routerProducts from './router/products.js';
import routerCart from './router/buyCart.js';
import upload from './imgMulter.js';

// import ProductModelMongoDB from './model/products-mongodb.js';
import config from './config.js';

// ProductModelMongoDB.connectDB();
// await ProductModelMongoDB.connectDB();
// ProductModelMongoDB.connectDB();

const app = express();

app.use(express.static('public', { extensions: ['html', 'htm'] }));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Caso de uso Products
app.use('/api/products', routerProducts);
app.use('/buy/products', routerCart);


app.post('/upload', upload.single('imgurl'), function (req, res, next) {
    if (req.file) {
        res.send(req.file);
    } else {
        res.status(415).send('<h1>Se produjo un error.</h1>');
    }
});

const PORT = config.PORT;
const server = app.listen(PORT, () => console.log(`Servidor Express escuchando en el puerto ${PORT}.`));
server.on('error', error => console.log('Error al iniciar el servidor Express: ' + error.message));
