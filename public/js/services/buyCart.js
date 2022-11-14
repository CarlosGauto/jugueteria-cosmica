import http from '/js/clients/http.client.js';

class BuyCartService {
    
    URL_PRODUCTOS = '/buy/products'

    async saveProduct(products) {
        const savedProduct = await http.post(this.URL_PRODUCTOS, products);
        return savedProduct;
    }

}

const buyCartService = new BuyCartService();

export default buyCartService;
