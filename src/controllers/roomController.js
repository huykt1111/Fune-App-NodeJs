import roomService from "../services/roomService";

let createRoom = async (req, res) => {
    let message = await roomService.createRoom(req.body);
    return res.status(200).json(message);
}

module.exports = {
    createRoom,
}