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

    addJob: async function (req, res) {
        try {
            const job = new Job(req.body);
            await job.addJob();
            res.json(job);
        } catch (error) {
            response.status(500).send(error.message);
        }
    },

    updateJob: async function (req, res) {
        try {
            console.log(req.body);
            const job = new Job(req.body);
            await job.updateJob();
            res.json(job);
        } catch (error) {
            response.status(500).send(error.message);
        }
    },

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
