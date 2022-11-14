import productController from "/js/controllers/product.js";
import modalCart from "/js/modules/modal.js";

console.log("🆗: Módulo PageInicio cargado.");

class PageInicio {
  static async renderTemplateCards(products) {
    const hbsFile = await fetch("templates/inicio.hbs").then((r) => r.text());
    const template = Handlebars.compile(hbsFile);
    const html = template({ products });
    const cardContainer = document.querySelector(".cards-container");

    cardContainer.innerHTML = html;
    this.addCardEvents(cardContainer);
  }

  static async addCardEvents(cardContainer) {
    cardContainer.addEventListener("click", async (e) => {
      if (e.target.classList.contains("card__link")) {
        const idCard = e.target.dataset.productId;
        const product = await productController.getProduct(idCard);

        modalCart.addCartProduct(product);
        PageInicio.ShowProductAdd();
      }
    });
  }

  static async init() {
    console.log("PageInicio.init()");

    const products = await productController.getProducts();
    console.log(`Se encontraron ${products.length} productos`);
    await PageInicio.renderTemplateCards(products);
  }

  static ShowProductAdd() {
    const show = document.getElementById("show-product-add");
    show.classList.remove("close");
    setTimeout(() => {
      show.classList.add("close");
    }, 1000);
  }
}

export default PageInicio;
