import db from "../models/index";
const create = (data) => {
    const { description, files, id_user } = data;
    return new Promise(async (resolve, reject) => {
        if (files) {
            try {
                const newRecord = await db.Post.create({
                    id_user,
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
                    const insertedMedias = await db.Media.bulkCreate(newFiles);
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
const love = (data) => {
    const { id_post, id_user, isLove } = data;
    return new Promise(async (resolve, reject) => {
        if (id_post && id_user) {
            try {
                if (isLove) {
                    const newRecord = await db.LovePost.create({
                        id_user,
                        id_post,
                    }, { returning: true });
                    const id = newRecord.id;
                    if (id) {
                        resolve({
                            message: 'OK'
                        });
                    }
                }
                else {
                    await db.LovePost.destroy({
                        where: {
                            id_user: id_user,
                            id_post: id_post
                        }
                    })
                    resolve({
                        message: 'OK'
                    });
                }
            } catch (e) {
                reject(e);
            }
        }
        else {
            reject("can't love");
        }

    })
}
const gets = (data) => {
    const { offset, limit, id_user } = data;
    return new Promise(async (resolve, reject) => {
        console.log("offset, limit", offset, limit, id_user)
        try {
            const posts = await db.Post.findAll({
                limit,
                offset,
                order: [['createdAt', 'DESC']],
                attributes: {
                    include: [
                        [
                            db.sequelize.literal(`(
                                SELECT
                                    CASE
                                    WHEN EXISTS (
                                        SELECT 1 FROM LovePosts WHERE id_post = Post.id AND id_user = ${id_user}
                                    )
                                    THEN true
                                    ELSE false
                                    END AS isLove
                                )`),
                            'isLove'
                        ], [
                            db.sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM LovePosts
                            WHERE LovePosts.id_post = Post.id
                            )`),
                            'total_loves'
                        ]
                    ]
                },
                include: [
                    {
                        model: db.Media,
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
                    },
                    // {
                    //     model: db.LovePost,
                    //     as: 'LovePosts',
                    //     attributes: [[db.sequelize.fn('COUNT', db.sequelize.col('LovePosts.id_user')), 'total_loves']],
                    //     // required: false, // để giữ lại bản ghi Post ngay cả khi không có bản ghi LovePost phù hợp
                    // }
                ],
                group: ['Post.id'],
                raw: true
            })

            // console.log(posts);
            const postArr = posts.reduce((accumulator, post) => {
                const index = accumulator.findIndex((item) => item.id === post.id);
                const { 'medias.id': id_media,
                    'medias.media': media,
                    'medias.type': type,
                    'User.id': id_user,
                    'User.email': email,
                    'User.firstName': firstName,
                    'User.lastName': lastName,
                    'User.image': avatar,
                    total_loves,
                    isLove,
                    ...restPost } = post;
                if (index > -1) {
                    accumulator[index].medias.push({
                        id_media, media, type, id_user, firstName, lastName, avatar, email, isLove
                    })
                }
                else {
                    accumulator.push({
                        ...restPost,
                        total_loves,
                        medias: [{
                            id_media, media, type, id_user, email, firstName, lastName, avatar, isLove
                        }]
                    })
                }
                return accumulator;
            }, [])

            resolve({ posts: postArr, message: 'ok' });
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
    create, gets, getPostByID, love
}