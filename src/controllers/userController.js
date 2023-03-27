import userService from "../services/userService";

let handleGetAllUsers = async (req, res) => {
    const { id } = req.body
    console.log("req", req.body)
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            users: []
        })
    }
    let users = await userService.getAllUsers(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        users
    })
}

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: '1',
            message: 'Missing inputs parameter!'
        })
    }

    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData : {}
    })
}

let handleRegister = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
}

let updateUser = async (req, res) => {
    const { id_user, description, email, dobLabel, gender, note } = req.body;
    const file = req.file;
    if (file) {
        const media_type = file.mimetype;
        const media = file.filename;
        const message = await userService.updateUser({ id_user, description, email, dobLabel, gender, note, media_type, media });
        return res.status(200).json({
            message
        })
    }
    else {
        const message = await userService.updateUser({ id_user, description, email, dobLabel, gender, note });
        return res.status(200).json({
            message
        })
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleRegister: handleRegister,
    updateUser: updateUser,
    handleGetAllUsers: handleGetAllUsers
}