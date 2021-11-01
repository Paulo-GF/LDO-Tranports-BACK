const pool = require('../database');

class Job {

    constructor(jobJSON) {

        for (const property in jobJSON) {
            this[property] = jobJSON[property];
        }
    }


    async addJob() {
        console.log(this);

        const query = {
            text: "SELECT new_job($1)",
            values: [this]
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

    // Return all jobs
    static async getAllJobs() {
        const query = {
            text: "SELECT * FROM job;",
            values: []
        };

        const { rows } = await pool.query(query);

        return rows;
    };
    static async deleteJob(jobId) {
        try {
            await pool.query(`DELETE FROM "job" WHERE id=$1`, [jobId]);
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    };

};

module.exports = Job;