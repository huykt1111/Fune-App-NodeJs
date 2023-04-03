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

let joinRoom = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let member = await db.Member.findOne({
                where: {
                    [Op.and]: [
                        { idRoom: data.idRoom },
                        { idMember: data.id_user, }
                    ]
                },
                raw: false
            });
            if (member) {
                resolve(true)
            }
            else {
                await db.Member.create({
                    idRoom: data.idRoom,
                    idMember: data.id_user,
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

let getRoomCreate = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataRoom = await db.Room.findAll({
                where: {
                    idUser: data.id
                },
                include: [
                    {
                        model: db.Member, as: 'memberData', attributes: ['idRoom', 'idMember', 'follow', 'heart', 'roleId']
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
                        model: db.Member, as: 'memberData', attributes: ['idRoom', 'idMember', 'follow', 'heart', 'roleId'],

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

let getRoomJoined = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataRoom = await db.Room.findAll({

                include: [
                    {
                        model: db.Member, as: 'memberData', attributes: ['idRoom', 'idMember', 'follow', 'heart', 'roleId'],
                        where: {
                            idMember: data.id
                        }
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

let getMembers = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataMember = await db.Member.findAll({
                where: {
                    idRoom: data.id
                },
                include: [
                    {
                        model: db.User,
                        attributes: ['id', 'image', 'firstName'],
                    }
                ],
                raw: false,
                nest: true
            })

            if (!dataMember) dataMember = [];

            resolve({
                errCode: 0,
                data: dataMember
            })
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createRoom,
    getRoomCreate,
    joinRoom,
    getRoomNotJoined,
    getRoomJoined,
    getMembers
}