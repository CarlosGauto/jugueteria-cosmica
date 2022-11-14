import productController from "/js/controllers/product.js";
import imgController from "/js/controllers/img.js";

console.log("🆗: Módulo PageAlta cargado.");

class PageAlta {
    static form;
    static fields;
    static btnCreate;
    static btnUpdate;
    static btnCancel;

    static validators = {
        id: /^[\da-f]{0,24}$/,
        freeshiping: /^[\da-f]{0,10}$/,
        name: /^[\wáéíóúüÁÉÍÓÚÜñÑ .,-]{1,80}$/,
        brand: /^[\wáéíóúüÁÉÍÓÚÜñÑ .,-]{1,20}$/,
        category: /^[\wáéíóúüÁÉÍÓÚÜñÑ .,-]{1,20}$/,
        shortdesc: /^[\wáéíóúüÁÉÍÓÚÜñÑ!¡?¿ .,-]{1,120}$/,
        longdesc: /^[\wáéíóúüÁÉÍÓÚÜñÑ!¡?¿ .,-]{1,200}$/,
        price: /^[\d]{1,6}$/,
        stock: /^[\d]{1,4}$/,
        agemin: /^[\d]{1,2}$/,
        agemax: /^[\d]{1,3}$/,
    };

    static emptyForm() {
        PageAlta.fields.forEach((field) => (field.value = ""));
    }

    static async uploadImg(){
        const inputs = document.getElementById("imgurl");
        const res = await imgController.saveImg(inputs.files[0])
        return res
    }

    static completeForm(product) {
        PageAlta.fields.forEach((field) => {
            if (field.name != "freeshiping" && field.name != "imgurl") {
                field.value = product[field.name];
            }else{
                if (field.name == "freeshiping"){
                    field.checked = (product[field.name] == "false") ? false : true;
                }
            }
        });
    }

    static validate(value, validator) {
        return validator.test(value);
    }

    static validateForm() {
        let allValidated = true;
        const productToSave = {};

        for (const field of PageAlta.fields) {

            if (field.name != "freeshiping") {

                if (field.name != "imgurl") {

                    const validated = PageAlta.validate(field.value, PageAlta.validators[field.name]);

                    console.log(field.name, validated);

                    if (!validated) {
                        allValidated = false;
                        break;
                    } else {
                        productToSave[field.name] = field.value;
                    }
                }
                else {                    
                    productToSave[field.name] = field.value.slice(12);
                    PageAlta.uploadImg()
                }
            } else {
                productToSave[field.name] = field.checked.toString();
            }
        }

        if (!allValidated) {
            return false;
        }
        return productToSave;
    }

    static async saveProduct(product) {
        const savedProduct = await productController.saveProduct(product);
        const products = await productController.getProducts();
        console.log(`Ahora hay ${products.length} productos`);
        PageAlta.renderTemplateTable(products);
        return savedProduct;
    }

    static async updateProduct(product) {
        const updatedProduct = await productController.updateProduct(product.id, product);
        const products = await productController.getProducts();
        console.log(`Ahora hay ${products.length} productos`);
        PageAlta.renderTemplateTable(products);
        return updatedProduct;
    }

    static async addFormEvents() {
        PageAlta.form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const productToSave = PageAlta.validateForm();
            if (productToSave) {
                await PageAlta.saveProduct(productToSave);
                PageAlta.emptyForm();
            }
        });

        this.btnCancel.addEventListener("click", (e) => {
            e.preventDefault();
            PageAlta.emptyForm();
            PageAlta.btnCreate.disabled = false;
            PageAlta.btnUpdate.disabled = true;
            PageAlta.btnCancel.disabled = true;
        });

        this.btnUpdate.addEventListener("click", async (e) => {
            e.preventDefault();
            const productToSave = PageAlta.validateForm();
            if (productToSave) {
                await PageAlta.updateProduct(productToSave);
            }
            PageAlta.emptyForm();
            PageAlta.btnCreate.disabled = false;
            PageAlta.btnUpdate.disabled = true;
            PageAlta.btnCancel.disabled = true;
        });
    }

    static async renderTemplateTable(products) {
        const hbsFile = await fetch("templates/products-table.hbs").then((r) =>
            r.text()
        );
        const template = Handlebars.compile(hbsFile);
        const html = template({ products });
        document.querySelector(".products-table-container").innerHTML = html;
    }

    static async addTableEvents() {
        const deleteProduct = async (e) => {
            if (!confirm("¿Estás seguro de querer eliminar el producto?")) {
                return;
            }
            const row = e.target.closest("tr");
            const id = row.dataset.id;
            const deletedProduct = await productController.deleteProduct(id);
            console.log("Producto eliminado:", deletedProduct);
            
            const products = await productController.getProducts();
            console.log(`Aún quedan ${products.length} productos`);
            PageAlta.renderTemplateTable(products);
        };

        const editProduct = async (e) => {
            const row = e.target.closest("tr");
            const id = row.dataset.id;
            
            const productToEdit = await productController.getProduct(id);
            
            PageAlta.completeForm(productToEdit);
            PageAlta.btnCreate.disabled = true;
            PageAlta.btnUpdate.disabled = false;
            PageAlta.btnCancel.disabled = false;
        };

        document
            .querySelector(".products-table-container")
            .addEventListener("click", (e) => {
                if (e.target.classList.contains("btn-delete")) {
                    deleteProduct(e);
                    return;
                }
                if (e.target.classList.contains("btn-edit")) {
                    editProduct(e);
                    return;
                }
            });
    }

    static async init() {
        console.log("PageAlta.init()");

        PageAlta.form = document.getElementById("form-alta-producto");
        PageAlta.fields = PageAlta.form.querySelectorAll("input, textarea");
        PageAlta.btnCreate = PageAlta.form.querySelector("#btn-create");
        PageAlta.btnUpdate = PageAlta.form.querySelector("#btn-update");
        PageAlta.btnCancel = PageAlta.form.querySelector("#btn-cancel");
        
        PageAlta.addFormEvents();
        const products = await productController.getProducts();
        console.log(`Se encontraron ${products.length} productos`);

        await PageAlta.renderTemplateTable(products);
        PageAlta.addTableEvents();
    }
}

export default PageAlta;
