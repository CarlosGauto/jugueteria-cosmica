import buyCartController from '/js/controllers/buyCart.js'

class Modal {
    static cartProducts = {
        content: [],
        total: 0,
    }


    static async addProductModal() {
        this.cartProducts.total = this.TotalCartProduct()
        const contentModal = document.getElementById("modal-products-id");
        const template = await fetch("templates/cart-products.hbs");
        const pseudoHTML = await template.text();
        const hbsHTML = Handlebars.compile(pseudoHTML);
        const resultado = hbsHTML(this.cartProducts);
        contentModal.innerHTML = resultado;
        this.addEventbBtn()
    }

    static addEventbBtn() {

        if(this.cartProducts.content.length > 0){
            document.querySelector(".table-cart-products").addEventListener("click", (e) => {
                if (e.target.classList.contains("btn-delete")) {
                    const row = e.target.closest("tr");
                    const id = row.dataset.id;
                    Modal.deleteCartProduct(id)
                }
            })

            document.querySelector("#btnBuy").addEventListener("click", () => {
                Modal.buyCart()
            })
        }
    }

    static buyCart(){
        buyCartController.saveProduct(this.cartProducts.content)
        this.cartProducts.content.length = this.cartProducts.content.length - this.cartProducts.content.length
        this.cartProducts.total = 0
        this.addProductModal()
    }


    static deleteCartProduct(id){
        const productFind = this.cartProducts.content.findIndex(elemento => elemento.id == id)
        this.cartProducts.content.shift(productFind)
        this.addProductModal()
    }

    static TotalCartProduct() {
        let suma = 0;
        this.cartProducts.content.forEach((product) => {
            suma += product.total;
        });

        return suma;
    }

    static addCartProduct(product) {

        let idProduct = product.id
        const indexEncontrado = this.cartProducts.content.findIndex(elemento => elemento.id == idProduct)

        if (indexEncontrado === -1) {
            
            product.cant = 1
            product.total = product.price
            this.cartProducts.content.push(product)

        } else {
            const productEncontrado = this.cartProducts.content[indexEncontrado]
            productEncontrado.cant++
            productEncontrado.total = productEncontrado.price * productEncontrado.cant
            this.cartProducts.content[indexEncontrado] = productEncontrado
        }

        this.addProductModal()
    }


    static async init() {

        let modalConteiner = document.getElementById("modalContainer");
        let bCart = document.getElementById("bCart");

        // Abre y Cierra Modal con click en el carrito
        bCart.addEventListener("click", () => {
            if (!modalConteiner.classList.contains("close")) {
                modalConteiner.classList.add("close");
            } else {
                modalConteiner.classList.remove("close");
            }
        });
        // Si hacemos click fuera de la pantalla de carrito cerramos el Modal
        modalConteiner.addEventListener("click", (e) => {
            if (e.target.id === "modalContainer" || e.target.type === 'button') {
                modalConteiner.classList.add("close");
            }
        });

        // Cerrar modal con ESCAPE
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && !modalConteiner.classList.contains("close")) {
                modalConteiner.classList.add("close");
            }
        });
    }

}

export default Modal;