const bcrypt = require('bcrypt');
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

        const form = req.body;
        const user = await userModel.getUser(form);
        // console.log(form);
        // console.log(user);

        // If mail is allow, check password hash and form password
        if (user !== undefined) {
            // check password between form and db hash
            if (bcrypt.compareSync(form.password, user.hash)) {

                // Save user informations in session
                req.session.user = {
                    role: user.role,
                    mail: user.mail,
                    firstname: user.firstname,
                    lastname: user.lastname
                };

                console.log(req.session.user);

                res.status(200);
                res.json({
                    message: `Connection de l'utilisateur ${user.firstname} : établie !`,
                    userId: user.id,
                    userFirstName: user.firstname,
                    role: user.role
                });

            }
            // If mail is ok but password isn't ok : send error 403 - forbidden
            else {
                res.status(403);
                res.json(`Accès refusé, le mot de passe ${form.password} n'est pas autorisé`);
            }
        }
        // If mail is not allowed
        if (!user) {
            // Send a new error 403 - forbidden
            res.status(403);
            res.json(`Accès refusé, le mail ${form.mail} ou le mot de passe ${form.password} ne sont pas autorisés`);

        }

    },

    modifyPassword: async function (req, res) {
        const form = req.body;
        // je vais vérifier que le mot de passe entré est le même que le mot de passe de confirmation
        if (form.newPassword === form.newPasswordConfirm) {
            // si ça correspond, je chiffre le mot de passe
            const salt = bcrypt.genSaltSync(saltRounds);
            let hash = bcrypt.hashSync(form.newPassword, salt);
            console.log('hash : ', hash);
            console.log('#######"');

            //  je mets à jour le mot de passe avec celui hashé
            form.newPassword = hash;
        }
        console.log(form);

        const newPass = new Password(form);
        await newPass.save();

        res.json(newPass);

        console.log('newPassword :', newPass);
    }
};

module.exports = adminController;