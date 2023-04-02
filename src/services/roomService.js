import db from "../models/index";
const { Op } = require("sequelize");

let createRoom = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data);
            await db.Room.create({
                name: data.roomName,
                idUser: data.id_user,
                image: data.imageIndividual,
                background: data.backgroundIndividual,
                description: data.description
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

let getRoomCreate = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataRoom = await db.Room.findAll({
                where: {
                    idUser: data.id
                },
                include: [
                    {
                        model: db.Member, as: 'memberData', attributes: ['idMember', 'follow']
                    }
                ],
                raw: false,
                nest: true
            })

            if (!dataRoom) dataRoom = [];

            resolve({
                errCode: 0,
                data: dataRoom
            })
        } catch (e) {
            reject(e);
        }
    })
}

let getRoomNotJoined = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataRoom = await db.Room.findAll({
                where: {
                    [Op.not]: [
                        { idUser: data.id }
                    ]
                },
                include: [
                    {
                        model: db.Member, as: 'memberData', attributes: ['idMember', 'follow']
                    }
                ],
                raw: false,
                nest: true
            })

            if (!dataRoom) dataRoom = [];

            resolve({
                errCode: 0,
                data: dataRoom
            })
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createRoom,
    getRoomCreate,
    getRoomNotJoined
}