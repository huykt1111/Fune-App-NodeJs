import db from "../models/index";
const create = (data) => {
    const { name, description, id_category, id_user, is_public, currency, pricing, stock, media, media_type } = data
    return new Promise(async (resolve, reject) => {
        try {
            await db.Product.create({
                id_user,
                id_category,
                name,
                description,
                media,
                media_type,
                is_public,
                currency,
                pricing,
                stock,
            });
            resolve({
                message: 'OK'
            });


        } catch (e) {
            reject(e);
        }
    })
}
const gets = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await db.Product.findAll();
            resolve({ products, message: 'get productc success!' })
        } catch (error) {
            reject(error);
        }
    })
}
const getProductByID = (data) => {
    const id_product = data.id_product;
    return new Promise(async (resolve, reject) => {
        try {
            if (id_product) {
                const product = await db.Product.findOne({
                    where: { id: id_product }
                })
                if (product) {
                    resolve({ product, message: 'get product success!' })
                }
                else {
                    resolve({ message: 'Can not find out product!' })
                }
            }
            else {
                resolve({ message: 'Can not find id_product!' })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    create, gets, getProductByID
}