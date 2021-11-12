const pool = require('../database');


/**
 * An entity representing an incoming user trying to connect as admin
 * @typedef User
 * @property {number} user.id
 * @property {text} role
 * @property {text} firstname
 * @property {mail} mail
 * @property {pass} hash
 */

class User {

    /**
     * Get all user informations for checking admin connection
     * @param {form} retrieve req.body from adminController
     * @returns - A new instance of User with db informations
     * @throws {Error} - There's a problem with the request
     */
    static async getUser(mail) {
        try {
            const query = {
                text: `SELECT "user".id, role, firstname, lastname, mail, hash
                    FROM "user"
                    JOIN password ON user_id = "user".id
                    WHERE mail=$1;`,

                values: [mail]
            };

            const { rows } = await pool.query(query);
            //console.log(rows[0]);
            return rows[0];
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    };
};

module.exports = User;
