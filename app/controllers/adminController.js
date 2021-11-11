const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const userModel = require('../models/user');
const Password = require('../models/password');

const adminController = {

    /**
     * Checking if connection is allowed for admin - Sign Jwt
     * @async
     * @param {mail} req - retrieve the mail
     * @param {password} req - retrieve the password
     * @param {JSON} res - send status and json
     * @returns {403} - status Forbidden -> mail not ok
     * @returns {403} - status Forbidden -> password not ok
     * @returns {200}- status 200 Sucess -> All ok
     */
    adminSignin: async function (req, res) {

        const { mail, password } = req.body;
        const user = await userModel.getUser(mail);

        // If mail is not allowed
        if (!user) {
            // Send a new error 403 - forbidden
            return res.status(403).json({
                message :`Accès refusé, le mail ${mail} n'est pas autorisé`,
                connected: false});

        }
        // If mail is allowed, check password hash and form password
        if (user !== undefined && !bcrypt.compareSync(password, user.hash)) {
            // If mail is ok but password isn't ok : send error 403 - forbidden
            return res.status(403).json({
                message : `Accès refusé, le mot de passe ${password} n'est pas autorisé`,
                connected:false});

        }

        // Create a token with user informations and secret
        const token = jsonwebtoken.sign({
            userId: user.id,
            userMail: user.mail,
            userRole: user.role
        },
            process.env.JWT_SECRET);
        //res.cookie('access_token', token, { httpOnly: true });

        // password is ok and mail is ok
        res.status(200).json({
            message: `Connection de l'utilisateur ${user.firstname} : établie !`,
            userId: user.id,
            userFirstName: user.firstname,
            role: user.role,
            access_token: token,
            connected : true
        });
    },

    /**
     * Modify Admin password, and apply bcrypt on new password 
     * @async
     * @param {userId} req - User id
     * @param {newPassword} req - new password
     * @param {newPasswordConfirm} req - new password again
     * @param {JSON} res - Send back JSON
     */
    modifyPassword: async function (req, res) {
        let { userId, newPassword, newPasswordConfirm } = req.body;
        // Virify both passwords from front body
        if (newPassword === newPasswordConfirm) {
            // If is ok, "newPassword" is encrypted
            const salt = bcrypt.genSaltSync(saltRounds);
            let hash = bcrypt.hashSync(newPassword, salt);

            //  Update "newPassword" from the front body with new encrypted password
            newPassword = hash;
        }

        // Sending information to the model Password, to update db
        let newPass = new Password(userId, newPassword);
        newPass.save();

        res.json(newPass);
    }
};

module.exports = adminController;
