import db from "../models/index";
const create = (data) => {
    const { description, files, id_user, idRoom } = data;
    return new Promise(async (resolve, reject) => {
        if (files) {
            try {
                const newRecord = await db.PostRoom.create({
                    id_user,
                    idRoom,
                    description,
                    is_public: true,
                }, { returning: true });
                const id_post = newRecord.id;
                const newFiles = files.map(file => ({
                    id_post: id_post,
                    type: file.mimetype,
                    media: file.filename,
                }));
                try {
                    const insertedMedias = await db.MediaRoom.bulkCreate(newFiles);
                    if (insertedMedias) {
                        resolve({
                            message: 'OK'
                        });
                    }
                    // } 
                    else {
                        reject("Insert failed!");
                    }
                } catch (error) {
                    reject(error);
                }

            } catch (e) {
                reject(e);
            }
        }
        else {
            reject("no files");
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
const getPostByID = (data) => {
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
    create, gets, getPostByID
}