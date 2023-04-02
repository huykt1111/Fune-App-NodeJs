import roomService from "../services/roomService";

let createRoom = async (req, res) => {
    let message = await roomService.createRoom(req.body);
    return res.status(200).json(message);
}

let getRoomCreate = async (req, res) => {
    let message = await roomService.getRoomCreate(req.query);
    return res.status(200).json(message);
}

let getRoomNotJoined = async (req, res) => {
    let message = await roomService.getRoomNotJoined(req.query);
    return res.status(200).json(message);
}

module.exports = {
    createRoom,
    getRoomCreate,
    getRoomNotJoined
}