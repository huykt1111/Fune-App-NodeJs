import db from "../models/index";
const create = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let cart = await db.Cart.findOne({
                where: {
                    idUser: data.idUser,
                    idProduct: data.idProduct
                },
                raw: false,
            })
            if (cart) {
                // update
                cart.quantity = parseInt(cart.quantity) + parseInt(data.quantity);
                await cart.save();
            } else {
                // create
                await db.Cart.create({
                    idProduct: data.idProduct,
                    idUser: data.idUser,
                    quantity: data.quantity
                })
            }
            resolve({
                errCode: 0,
                message: 'OK'
            });
        } catch (error) {
            reject(error);
        }
    })
}

const increase = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let cart = await db.Cart.findOne({
                where: {
                    idUser: data.idUser,
                    idProduct: data.idProduct
                },
                raw: false,
            })
            if (cart) {
                // update
                cart.quantity = parseInt(cart.quantity) + 1;
                await cart.save();
            }
            resolve({
                errCode: 0,
                message: 'OK'
            });
        } catch (error) {
            reject(error);
        }
    })
}

const decrease = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let cart = await db.Cart.findOne({
                where: {
                    idUser: data.idUser,
                    idProduct: data.idProduct
                },
                raw: false,
            })
            if (cart) {
                // update
                if (parseInt(cart.quantity) > 1) {
                    cart.quantity = parseInt(cart.quantity) - 1;
                    await cart.save();
                }
            }
            resolve({
                errCode: 0,
                message: 'OK'
            });
        } catch (error) {
            reject(error);
        }
    })
}

let gets = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let carts = await db.Cart.findAll({
                where: {
                    idUser: data.id_user
                },
                include: [
                    {
                        model: db.Product, as: 'cartData', attributes: ['id', 'name', 'description', 'media', 'currency', 'pricing']
                    }
                ],
                raw: false,
                nest: true
            })

            if (!carts) carts = [];

            resolve({
                errCode: 0,
                data: carts
            })
        } catch (e) {
            reject(e);
        }
    })
}

const deletes = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let cart = await db.Cart.findAll({
                where: {
                    idUser: data.idUser,
                },
                raw: false,
            })
            if (cart) {
                // update
                for (let i = 0; i < cart.length; i++) {
                    await cart[i].destroy();
                }

            }
            resolve({
                errCode: 0,
                message: 'OK'
            });
        } catch (error) {
            reject(error);
        }
    })
}

const deletecart = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let cart = await db.Cart.findOne({
                where: {
                    idUser: data.idUser,
                    idProduct: data.idProduct
                },
                raw: false,
            })
            if (cart) {
                // update
                await cart.destroy();
            }
            resolve({
                errCode: 0,
                message: 'OK'
            });
        } catch (error) {
            reject(error);
        }
    })
}


module.exports = {
    create,
    gets,
    increase,
    decrease,
    deletes,
    deletecart
}