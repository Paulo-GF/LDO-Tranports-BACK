const pool = require('../database');

class Job {

    constructor(jobJSON) {
        
        for (const property in jobJSON) {
            this[property] = jobJSON[property];
        }
    }

    // Return all jobs
    static async getAllJobs() {
        const query = {
            text: "SELECT * FROM job",
            values: []
        };

        const { rows } = await pool.query(query);

        return rows;
    };

    async addJob() {
        console.log(this);

        const query = {
            text:"SELECT new_job($1)",
            values:[this]
        };

        const result = await pool.query(query);

        this.data = result.rows[0].new_job;
    };

    async updateJob() {
        const query = {
            text: "SELECT edit_job($1)",
            values: [this]
        };

        const result = await pool.query(query);
        this.data = result.rows[0].edit_job;
    };

};

module.exports = Job;