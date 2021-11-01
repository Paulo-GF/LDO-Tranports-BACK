const pool = require('../database');


/**
 * @typedef Password
 * @property {number} userId
 * @property {string} newPassword
 */
class Password {

    constructor(userId, newPassword) {
        this.user_id = userId;
        this.hash = newPassword;
    }

    /**
     * Update password and save hash in db
     * @async
     * @returns {Password} Updated instance
     * @throws {Error} There's a problem with the request
     */
    async save() {
        try {
            const query = {
                text: `UPDATE "password" SET hash=$1 WHERE user_id=$2`,
                values: [this.hash, this.user_id]
            }
            const { rows } = await pool.query(query);
            return rows[0];
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }
};

module.exports = Password;
