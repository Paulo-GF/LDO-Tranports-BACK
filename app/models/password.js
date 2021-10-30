const pool = require('../database');

class Password {

    constructor(userId, newPassword){
        this.user_id = userId;
        this.hash = newPassword;
    }

    // Get user_id and hash
    async save(){
        const query = {
            text: `UPDATE "password" SET hash=$1 WHERE user_id=$2`,
            values:[this.hash, this.user_id]
        }
        const { rows } = await pool.query(query);
        return rows[0];
    }
};

module.exports = Password;
