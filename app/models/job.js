const pool = require('../database');

/**
 * @typedef Job
 * @property {text} title
 * @property {text} region
 * @property {text} city
 * @property {text} type
 * @property {text} description
 */
class Job {

    constructor(jobJSON) {

        for (const property in jobJSON) {
            this[property] = jobJSON[property];
        }
    }


    /**
     * returns all jobs from db
     * @async
     * @param {job}
     * @returns all jobs
     * @throws {Error} There is a problem with the request
     */
    static async getAllJobs() {
        try {

            const { rows } = await pool.query(`SELECT * FROM job ORDER BY "created_at" DESC`);
            return rows.map(row => new Job(row));

        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    };

    /**
     * returns one job from db
     * @async
     * @param {jobId} - Get id from jobController
     * @returns - one job
     * @throws {Error} There is a problem with the request
     */
     static async getOneJob(jobId) {
        try {

            const { rows } = await pool.query(`SELECT * FROM job WHERE id=$1`, [jobId]);
            return rows[0];

        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    };

    /**
     * Insert a new job (SQL function : new_job)
     * @async
     * @returns job informations (id included)
     * @throws {Error} There is a problem with the request
     */
    async addJob() {
        try {
            //console.log(this);
            const query = {
                text: "SELECT new_job($1)",
                values: [this]
            };

            const result = await pool.query(query);

            this.data = result.rows[0].new_job;

        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    };

    /**
     * Update a job in database
     * @async
     * @returns job after edition
     * @throws {Error} There is a problem with the request
     */
    async updateJob() {
        try {
            const query = {
                text: "SELECT edit_job($1)",
                values: [this]
            };

            const result = await pool.query(query);
            this.data = result.rows[0].edit_job;

        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    };
     /**
     * Erases a job from database
     * @static
     * @async
     * @param {number} jobId
     * @throws {Error} There's a problem with the request
     */

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
