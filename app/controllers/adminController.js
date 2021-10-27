const userModel = require('../models/user');

const adminController = {

    /**
     * Checking if connection is allowed for admin
     * @param {json} req - retrieve the body
     * @param {*} res - retrieve status and json
     * @returns - status 403 if connection isn't allowed
     */
    adminConnection: async (req, res) => {
        const form = req.body;
        const user = await userModel.getUser(form);
        // console.log(form);
        // console.log(user);
        if (user === undefined) {
            // Send a new error 403 - forbidden
            return res.status(403).json(`Accès refusé, le mail ${form.mail} ou le mot de passe ${form.password} ne sont pas autorisés`);
        }

        // Save user informations in session
        req.session.user = {
            role: user.role,
            email: user.mail,
            firstname: user.firstname,
            lastname: user.lastname
        };

        console.log(req.session.user);

        res.status(200);
        res.json({
            message: `Connection de l'utilisateur ${user.firstname} : établie !`,
            userId: user.id,
            userFirstName: user.firstname
        });

    },
};


module.exports = adminController;