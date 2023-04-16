import orderService from "../services/orderService";

let createOrder = async (req, res) => {
    let message = await orderService.createOrder(req.body);
    return res.status(200).json(message);
}

let getsOrder = async (req, res) => {
    let message = await orderService.getsOrder(req.query);
    return res.status(200).json(message);
}

let updateOrder = async (req, res) => {
    let message = await orderService.updateOrder(req.body);
    return res.status(200).json(message);
}

module.exports = {
    createOrder,
    getsOrder,
    updateOrder
}