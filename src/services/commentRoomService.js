import db from "../models/index";

let create = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { idPost, comment, id_user } = data;
            await db.CommentRoom.create({
                idPost: idPost,
                idUser: id_user,
                comment: comment,
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

const gets = (data) => {
    const { idPost } = data;
    return new Promise(async (resolve, reject) => {
        try {
            let dataComment = await db.CommentRoom.findAll({
                where: {
                    idPost: idPost
                },
                include: [
                    {
                        model: db.User,
                        as: 'User',
                        attributes: ['id', 'email', 'firstName', 'lastName', 'image']
                    },
                ],
                raw: false,
                nest: true
            })

            if (!dataComment) dataComment = [];

            resolve({
                errCode: 0,
                data: dataComment
            })
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    create, gets
}