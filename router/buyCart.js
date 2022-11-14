import express from 'express';

const routerProducts = express.Router();

routerProducts.post('/',  async (req, res) => {
    let product = req.body;
    res.json(product);

    console.log("********PRODUCTOS COMPRADOS**************")
    console.log(product)
    console.log("********FIN DE LISTA**************")
});

export default routerProducts;