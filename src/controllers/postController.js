import postService from '../services/postService'
const create = async (req, res) => {
    const { description, id_user } = req.body
    const files = req.files;
    const { message } = await postService.create({ description, files, id_user });
    return res.status(200).json({
        message
    })

};

const love = async (req, res) => {
    const { id_post, id_user, isLove } = req.body
    const { message } = await postService.love({ id_post, id_user, isLove });
    return res.status(200).json({
        message
    })
};
const gets = async (req, res) => {
    let { limit, offset, id_user } = req.query;
    console.log(req.query)
    limit = Number(limit.trim());
    offset = Number(offset.trim())
    const { posts, message } = await postService.gets({ limit, offset, id_user });
    return res.status(200).json({
        posts, message
    })
}
const get = async (req, res) => {
    const { id_post } = req.body
    const { post, message } = await postService.getPostByID({ id_post });
    return res.status(200).json({
        message,
        post
    })
}

module.exports = {
    create,
    gets,
    get,
    love
}