import db from "../models/index";

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

module.exports = {
    createRoom
}