import sellerService from "../services/sellerService";

let createSeller = async (req, res) => {
    let message = await sellerService.createSeller(req.body);
    return res.status(200).json(message);
}

module.exports = {
    createSeller,
}