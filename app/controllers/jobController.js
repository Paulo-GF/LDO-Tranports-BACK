const Job = require('../models/job');

const jobController = {
    /**
     * Return the list of all jobs
     * @async
     * @param {job}
     * @returns JSON of every job
     */
    getAllJobs: async function (_, res) {
        try {
            const jobs = await Job.getAllJobs();
            console.log(jobs);

            res.json(jobs);
        } catch (error) {
            response.status(500).send(error.message);
        }
    },

    /**
     * send id of the job to job model
     * @async
     * @param {jobId}
     * @returns JSON of the job selected
     */
    getOneJob: async function (req, res) {

        try {
            const jobId = Number(req.params.jobId);
            const jobs = await Job.getOneJob(jobId);
            console.log(jobId);
            if (jobs === undefined) {
                res.status(404).json(`Cette offre n'existe pas`);
            } else {
                res.json(jobs);
            }
        } catch (error) {
            response.status(500).send(error.message);
        }
    },

    /**
     * send the new job added to job model
     * @async
     * @param {job}
     * @returns JSON of new job added
     */
    addJob: async function (req, res) {
        try {
            const job = new Job(req.body);
            await job.addJob();
            res.json(job);
        } catch (error) {
            response.status(500).send(error.message);
        }
    },

    /**
     * Send modifications to job model
     * @async
     * @param {body} - request the body sent by front-end app
     * @returns JSON of updated job
     */
    updateJob: async function (req, res) {
        try {
            console.log(req.body);
            const job = new Job(req.body);
            await job.updateJob();
            console.log(job);
            res.json({
                id: Number(job.id),
                title: job.title,
                region: job.region,
                city: job.city,
                type: job.type,
                description: job.description
            });
        } catch (error) {
            response.status(500).send(error.message);
        }
    },

    /**
     * Returns the delete's job page
     * @async
     * @param {jobId}
     * @returns status 200 : delete message
     */
    deleteJob: async function (req, res) {
        try {
            const jobId = Number(req.params.jobId);
            await Job.deleteJob(jobId);

            res.status(200).json({
                message: 'Suppression réussie!'
            });
        } catch (error) {
            response.status(500).send(error.message);
        }
    }
};

module.exports = jobController;
