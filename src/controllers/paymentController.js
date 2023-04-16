import paymentService from "../services/paymentService";

let createPayment = async (req, res) => {
    let message = await paymentService.createPayment(req.body);
    return res.status(200).json(message);
}

let updatePayment = async (req, res) => {
    let message = await paymentService.updatePayment(req.body);
    return res.status(200).json(message);
}


let getsPayment = async (req, res) => {
    let message = await paymentService.getsPayment(req.query);
    return res.status(200).json(message);
}

let getPaymentByUser = async (req, res) => {
    let message = await paymentService.getPaymentByUser(req.query);
    return res.status(200).json(message);
}

module.exports = {
    createPayment,
    updatePayment,
    getsPayment,
    getPaymentByUser
}