import productService from '../services/productService'
const create = async (req, res) => {
    const { name, description, id_category, id_user, is_public, currency, pricing, stock } = req.body
    const file = req.file;
    if (file) {
        const media_type = file.mimetype;
        const media = file.filename;
        const { message } = await productService.create({ name, description, id_category, id_user, is_public, currency, pricing, stock, media_type, media });
        return res.status(200).json({
            message
        })
    }

}

module.exports = {
    create
}