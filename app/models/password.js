// const pool = require('../database');

// class Password {

//     constructor(object){
//         //this.user_id = object.user_id;
//         this.hash = object.hash;
//     }

//     // Get user_id and hash
//     static async getPasswordById(userId){
//         const query = {
//             text: "SELECT hash, user_id FROM password WHERE user_id=$1",
//             values:[userId]
//         }
//         const result = await pool.query(query);
//         return new Password(result.rows[0]);
//     }
// };

// module.exports = Password;
