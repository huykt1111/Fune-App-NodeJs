import categoryService from '../services/categoryService'
const gets = async (req, res) => {
    const categories = await categoryService.gets();
    if (categories) {
        const newCategories = categories.map((cate) => ({ value: cate.id, label: cate.category }))
        return res.status(200).json({
            categories: newCategories
        })
    } else {
        return res.status(400).json({
            message: 'error api get category !'
        })
    }
}


module.exports = {
    gets
}