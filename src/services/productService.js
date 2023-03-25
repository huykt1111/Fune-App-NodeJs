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


module.exports = {
    create
}