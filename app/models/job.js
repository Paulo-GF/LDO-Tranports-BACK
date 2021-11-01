const pool = require('../database');

class Job {


    static async getAllJobs(){
        const query = {
            text:"SELECT * FROM job;",
            values:[]
        };

        const result = await pool.query(query);

        return result;
    }
};

module.exports = Job;