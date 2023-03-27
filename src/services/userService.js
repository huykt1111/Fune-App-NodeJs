import db from "../models/index";
import bcrypt from "bcrypt";

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                });
            }

            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                });
            }
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['id', 'email', 'password', 'firstName', 'lastName', 'birthday', 'address',
                        'phonenumber', 'gender', 'image', 'roleId', 'description', 'background', 'note'
                    ],
                    raw: true
                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Ok';
                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found!`
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in system. Please try other email!`
            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check email is exist
            let check = await checkUserEmail(data.email);
            if (check) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your emaili is already in used, Please try another email!'
                });
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    birthday: data.birthday,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleId: 1,
                    image: data.avatar
                });
                resolve({
                    errCode: 0,
                    message: 'OK'
                });
            }

        } catch (e) {
            reject(e);
        }
    })
}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        console.log(data);
        try {
            let user = await db.User.findOne({
                where: { id: data.id_user },
                raw: false
            });
            if (user) {
                user.email = data.email;
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.birthday = data.dobLabel;
                user.gender = data.gender;
                user.description = data.description;
                user.note = data.note;
                user.background = data.media;
                user.image_type = data.media_type;

                await user.save();

                resolve({
                    errCode: 0,
                    message: 'OK'
                });
            }

        } catch (e) {
            console.log(e);
        }
    })
}


module.exports = {
    handleUserLogin: handleUserLogin,
    createNewUser: createNewUser,
    updateUser: updateUser,
    getAllUsers: getAllUsers
}