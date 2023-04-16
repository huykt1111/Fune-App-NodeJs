import db from "../models/index";
import Sequelize from 'sequelize';

const createOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.OrderUser.create({
                idUser: data.id_user,
                idProduct: data.idProduct,
                quantity: data.quantity,
                total: data.total,
                address: data.address,
                payment: data.payment,
                statusId: "1",
            });
            resolve({
                errCode: 0,
                message: 'OK'
            });

        } catch (e) {
            reject(e);
        }
    })
}

let updateOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = await db.OrderUser.findOne({
                where: {
                    id: data.idOrder
                },
                raw: false
            });
            if (order) {
                order.statusId = "2";

                await order.save();

                resolve({
                    errCode: 0,
                    message: 'OK'
                });
            }

        } catch (e) {
            console.log(e);
        }
    })
}

let getsOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = await db.OrderUser.findAll({
                where: {
                    idUser: data.id_user,
                    statusId: "1"
                },
                include: [
                    {
                        model: db.Product, as: 'orderData', attributes: ['id', 'name', 'description', 'media', 'currency', 'pricing']
                    }
                ],
                // createdAt: Sequelize.where(
                //     Sequelize.fn('date_format', Sequelize.col('createdAt'), '%Y-%m-%d %H:%i:%s'),
                //     '=',
                //     Sequelize.fn('date_format', new Date(), '%Y-%m-%d %H:%i:%s')
                // ),
                raw: false,
                nest: true
            })

            if (!order) order = [];

            resolve({
                errCode: 0,
                data: order
            })
        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    createOrder,
    getsOrder,
    updateOrder
}