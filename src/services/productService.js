import db from "../models/index";
const { Op } = require("sequelize");

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
const gets = () => {
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

const getProductByUser = (data) => {
    const id_user = data.id_user;
    return new Promise(async (resolve, reject) => {
        try {
            if (id_user) {
                const product = await db.Product.findAll({
                    where: { id_user: id_user }
                })
                if (product) {
                    resolve({ product, message: 'get product success!' })
                }
                else {
                    resolve({ message: 'Can not find out product!' })
                }
            }
            else {
                resolve({ message: 'Can not find id_user!' })
            }
        } catch (e) {
            reject(e);
        }
    })
}

const getSearchProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const keyword = data.keyword;
            const products = await db.Product.findAll({
                where: {
                    name: {
                        [Op.like]: `%${keyword}%`
                    }
                }
            });
            if (products) {
                console.log(products)
                resolve({ products, message: 'Get product success!' })
            }
            else {
                resolve({ message: 'Can not find out product!' })
            }
        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    create, gets, getProductByID, getProductByUser, getSearchProduct
}