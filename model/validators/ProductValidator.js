import Joi from "joi";
// https://joi.dev/api/?v=17.6.3

class ProductValidator {
    
    static validate(product) {

        const productSchema = Joi.object({
            id: Joi.string().min(0).max(25),
            freeshiping: Joi.string().min(0).max(25).required(),
            name: Joi.string().min(3).max(80).required(),
            category: Joi.string().min(3).max(20).required(),
            shortdesc: Joi.string().min(3).max(120).required(),
            longdesc: Joi.string().min(3).max(200).required(),
            brand: Joi.string().min(3).max(20).required(),
            price: Joi.number().required(),
            stock: Joi.number().required(),
            agemin: Joi.number().required(),
            agemax: Joi.number().required(),
            imgurl: Joi.string().required(),
        });

        const { error } = productSchema.validate(product);

        return error;
    }
}

export default ProductValidator;
