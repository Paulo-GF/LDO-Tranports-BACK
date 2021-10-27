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

    // constructor(userJson){
    //     for (const props in userJson){
    //         this[props] = userJson[props];
    //     }
    // }

    /**
     * Get all user informations for checking admin connection
     * @param {form} retrieve req.body from adminController 
     * @returns - A new instance of User with db informations
     */
    static async getUser(form){
        const query = {
            text: `SELECT "user".id, role, firstname, lastname, mail, hash
                    FROM "user"
                    JOIN password ON user_id = "user".id
                    WHERE mail=$1 AND hash=$2;`,

            values: [form.mail, form.password]
        };

        const {rows} = await pool.query(query);
        //console.log(rows[0]);
        return rows[0];
    }
};

module.exports = User;