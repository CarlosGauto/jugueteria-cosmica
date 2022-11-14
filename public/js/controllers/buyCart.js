import productService from '/js/services/buyCart.js';

class BuyCartController {

    async saveProduct(products) {
        // console.log('saveProduct:', product);
        const savedProduct = await productService.saveProduct(products);
        return savedProduct;
    }

}

const buyCartController = new BuyCartController();
export default buyCartController;
