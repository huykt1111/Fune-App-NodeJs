import cartService from "../services/cartService";

let create = async (req, res) => {
    let message = await cartService.create(req.body);
    return res.status(200).json(message);
}
let deletes = async (req, res) => {
    let message = await cartService.deletes(req.body);
    return res.status(200).json(message);
}

let deletecart = async (req, res) => {
    let message = await cartService.deletecart(req.body);
    return res.status(200).json(message);
}

let gets = async (req, res) => {
    let message = await cartService.gets(req.query);
    return res.status(200).json(message);
}

let increase = async (req, res) => {
    let message = await cartService.increase(req.body);
    return res.status(200).json(message);
}

let decrease = async (req, res) => {
    let message = await cartService.decrease(req.body);
    return res.status(200).json(message);
}

module.exports = {
    create,
    gets,
    decrease,
    increase,
    deletes,
    deletecart
}