const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const userModel = require('../models/user');
const Password = require('../models/password');

const adminController = {

    /**
     * Checking if connection is allowed for admin
     * @param {json} req - retrieve the body
     * @param {*} res - send status and json
     * @returns - status 403 if connection isn't allowed
     */
    adminSignin: async function (req, res) {

        const { mail, password } = req.body;
        const user = await userModel.getUser(mail);

        // If mail is not allowed
        if (!user) {
            // Send a new error 403 - forbidden
            return res.status(403).json(`Accès refusé, le mail ${mail} n'est pas autorisé`);

        }
        // If mail is allowed, check password hash and form password
        if (user !== undefined && !bcrypt.compareSync(password, user.hash)) {
            // If mail is ok but password isn't ok : send error 403 - forbidden
            return res.status(403).json(`Accès refusé, le mot de passe ${password} n'est pas autorisé`);

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
        res.json({
            message: `Connection de l'utilisateur ${user.firstname} : établie !`,
            userId: user.id,
            userFirstName: user.firstname,
            role: user.role,
            access_token: token
        });
    },

    modifyPassword: async function (req, res) {
        const { userId, newPassword, newPasswordConfirm } = req.body;
        // Virify both passwords from front body
        if (newPassword === newPasswordConfirm) {
            // If is ok, "newPassword" is encrypted
            const salt = bcrypt.genSaltSync(saltRounds);
            let hash = bcrypt.hashSync(newPassword, salt);
            console.log('hash : ', hash);
            console.log('#######"');

            //  Update "newPassword" from the front body with new encrypted password
            newPassword = hash;
        }
        console.log(newPassword, newPasswordConfirm);

        // Sending information to the model Password, to update db
        const newPass = new Password(userId, newPassword);
        await newPass.save();

        res.json(newPass);

        console.log('newPassword :', newPass);
    }
};

module.exports = adminController;