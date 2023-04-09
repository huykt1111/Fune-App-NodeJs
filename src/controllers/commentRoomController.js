import commentRoomService from '../services/commentRoomService'
const create = async (req, res) => {
    const { idPost, id_user, comment } = req.body
    const { message } = await commentRoomService.create({ idPost, comment, id_user });
    return res.status(200).json({
        message
    })

}

const gets = async (req, res) => {
    let { idPost } = req.query
    const { errCode, data } = await commentRoomService.gets({ idPost });
    return res.status(200).json({
        errCode, data
    })
}

module.exports = {
    create, gets
}