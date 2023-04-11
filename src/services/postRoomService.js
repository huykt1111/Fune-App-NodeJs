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
    const { offset, limit, idRoom } = data;
    return new Promise(async (resolve, reject) => {
        try {
            if (idRoom) {
                const posts = await db.PostRoom.findAll({
                    limit,
                    offset,
                    where: {
                        idRoom: idRoom,
                    },
                    include: [{
                        model: db.MediaRoom,
                        as: 'medias',
                        order: [
                            db.sequelize.literal('medias.type LIKE "video/%" DESC'),
                            ['createdAt', 'DESC']
                        ]
                    },
                    {
                        model: db.User,
                        as: 'User',
                        attributes: ['id', 'email', 'firstName', 'lastName', 'image']
                    }
                    ],
                    raw: true,

                });
                const postArr = posts.reduce((accumulator, post) => {
                    const index = accumulator.findIndex((item) => item.id === post.id);
                    if (index > -1) {
                        accumulator[index].medias.push({
                            id_media: post['medias.id'],
                            media: post['medias.media'],
                            type: post['medias.type'],
                            id_user: post['User.id'],
                            firstName: post['User.firstName'],
                            lastName: post['User.lastName'],
                            avatar: post['User.image'],
                            email: post['User.email']
                        })
                    }
                    else {
                        const { 'medias.id': id_media,
                            'medias.media': media,
                            'medias.type': type,
                            'User.id': id_user,
                            'User.email': email,
                            'User.firstName': firstName,
                            'User.lastName': lastName,
                            'User.image': avatar,
                            ...restPost } = post;
                        accumulator.push({
                            ...restPost,
                            medias: [{
                                id_media,
                                media,
                                type,
                                id_user,
                                email,
                                firstName,
                                lastName,
                                avatar
                            }]
                        })
                    }
                    return accumulator;
                }, [])

                resolve({ posts: postArr, message: 'ok' });
            } else {
                resolve({ message: 'No post' });
            }

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