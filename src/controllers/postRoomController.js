import postRoomService from '../services/postRoomService'
const create = async (req, res) => {
    const { description, id_user, idRoom } = req.body
    const files = req.files;
    const { message } = await postRoomService.create({ description, files, id_user, idRoom });
    return res.status(200).json({
        message
    })

}
const gets = async (req, res) => {
    const { posts, message } = await postRoomService.gets();
    return res.status(200).json({
        posts, message
    })
}
const get = async (req, res) => {
    const { id_post } = req.body
    const { post, message } = await postRoomService.getPostByID({ id_post });
    return res.status(200).json({
        message,
        post
    })
}

module.exports = {
    create,
    gets,
    get
}