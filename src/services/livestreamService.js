import db from "../models/index";
const { Op } = require("sequelize");

const create = (data) => {
    console.log(data);
    const { description, id_user, is_live_now, is_public, is_public_dangerous, media, media_type } = data
    return new Promise(async (resolve, reject) => {
        try {
            await db.LiveStream.create({
                id_user,
                is_live_now,
                is_public,
                is_public_dangerous,
                description,
                media,
                media_type,
            });
            resolve({
                message: 'OK'
            });


        } catch (e) {
            reject(e);
        }
    })
}

let gets = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let livestreams = await db.LiveStream.findAll({
                where: {
                    id_user: data.id_user
                },
                raw: false,
                nest: true
            })

            if (!livestreams) livestreams = [];

            resolve({
                errCode: 0,
                data: livestreams
            })
        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    create, gets
}