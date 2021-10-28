const pool = require('../database');

class Password {

    constructor(form){
        this.user_id = form.userId;
        this.hash = form.newPassword;
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
