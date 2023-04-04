import productService from '../services/productService'
const create = async (req, res) => {
    const { name, description, category, id_user, is_public, currency, pricing, stock } = req.body
    const id_category = category;
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
const gets = async (req, res) => {
    const { products, message } = await productService.gets();
    return res.status(200).json({
        products, message
    })
}
const get = async (req, res) => {
    const { id_product } = req.body
    const { product, message } = await productService.getProductByID({ id_product });
    return res.status(200).json({
        message,
        product
    })
}

const getProductByUser = async (req, res) => {
    const { id_user } = req.query;
    const { product, message } = await productService.getProductByUser({ id_user });
    return res.status(200).json({
        message,
        product
    })
}

module.exports = {
    create,
    gets,
    get,
    getProductByUser
}