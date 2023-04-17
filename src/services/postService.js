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
const getCommentsByPostID = (data) => {
    const { limit, offset, id_post } = data;
    return new Promise(async (resolve, reject) => {
        try {
            if (id_post) {
                const comments = await db.CommentPost.findAll({
                    limit,
                    offset,
                    order: [['createdAt', 'DESC']],
                    where: { id_post: id_post },
                    include: [
                        {
                            model: db.User,
                            as: 'User',
                            attributes: ['id', 'email', 'image', [db.sequelize.fn('CONCAT', db.sequelize.col('User.firstName'), ' ', db.sequelize.col('User.lastName')), 'fullName']]
                        },
                    ],
                    raw: true
                }
                )
                let newComments = [];
                if (comments) {
                    newComments = await Promise.all(comments.map(async (element) => {
                        const parentComment = await db.CommentPost.findOne({
                            where: { id: element.id_parent },
                            include: [
                                {
                                    model: db.User,
                                    as: 'User',
                                    attributes: []
                                },
                            ],
                            attributes: [[db.sequelize.fn('CONCAT', db.sequelize.col('User.firstName'), ' ', db.sequelize.col('User.lastName')), 'parentName']],
                            raw: true
                        })
                        const { "User.id": id_user, "User.fullName": fullname, "User.image": image, ...restCmt } = element
                        return {
                            id_user, fullname, image, ...restCmt, parent: parentComment
                        }

                    }));
                    resolve({ comments: newComments, message: 'get comments success!' })
                }
                else {
                    resolve({ message: 'Can not find out comments!' })
                }
            }
            else {
                resolve({ message: 'Can not find id_post!' })
            }
        } catch (e) {
            reject(e);
        }
    })
}
const createComment = (data) => {
    const { id_post, id_parent, id_user, comment } = data;
    return new Promise(async (resolve, reject) => {
        try {
            const newRecord = await db.CommentPost.create({
                id_post, id_parent, id_user, comment
            }, { returning: true })
            if (newRecord) {
                resolve({
                    message: 'OK',
                    new_comment: newRecord
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    create, gets, getPostByID, love, getCommentsByPostID, createComment
}