import db from "../models/index";

const createPayment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Payment.create({
                idUser: data.id_user,
                name: data.name,
                cartNumber: data.cartNumber,
                expires: data.expires,
                cvv: data.cvv,
                zipCode: data.zipCode,
                billingAddress: data.billingAddress,
                state: data.state,
                city: data.city
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

let updatePayment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id_user },
                raw: false
            });
            if (user) {
                user.paymentId = data.payment;

                await user.save();

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

let getsPayment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let payment = await db.Payment.findAll({
                where: {
                    idUser: data.id_user
                },
                raw: false,
                nest: true
            })

            if (!payment) payment = [];

            resolve({
                errCode: 0,
                data: payment
            })
        } catch (e) {
            reject(e);
        }
    })
}

let getPaymentByUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let payment = await db.Payment.findOne({
                where: {
                    id: data.payment
                },
                raw: false,
                nest: true
            })

            resolve({
                errCode: 0,
                data: payment
            })
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createPayment,
    updatePayment,
    getsPayment,
    getPaymentByUser
}