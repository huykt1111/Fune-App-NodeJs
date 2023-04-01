import db from "../models/index";

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Seller.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

let createSeller = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check email is exist
            let check = await checkUserEmail(data.email);
            if (check) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already in used, Please try another email!'
                });
            } else {
                let user = await db.User.findOne({
                    where: { id: data.id_user },
                    raw: false
                });
                if (user) {
                    user.roleId = 2;
                    await user.save();
                }
                await db.Seller.create({
                    idUser: data.id_user,
                    name: data.name,
                    gender: data.gender,
                    address: data.address,
                    email: data.email,
                    bankAccountName: data.bankName,
                    bankAccountNumber: data.bankNumber,
                    bankIdentifierCode: data.bankCode,
                    bankLocation: data.bankLocation,
                    bankCurrency: data.bankCurrency,
                });
                resolve({
                    errCode: 0,
                    message: 'OK'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createSeller
}