import livestreamService from '../services/livestreamService'
const create = async (req, res) => {
    const { description, id_user, is_live_now, is_public, is_public_dangerous } = req.body
    const file = req.file;
    if (file) {
        const media_type = file.mimetype;
        const media = file.filename;
        const { message } = await livestreamService.create({ description, id_user, is_live_now, is_public, is_public_dangerous, media_type, media });
        return res.status(200).json({
            message
        })
    }
}

let gets = async (req, res) => {
    let message = await livestreamService.gets(req.query);
    return res.status(200).json(message);
}

module.exports = {
    create,
    gets,
}