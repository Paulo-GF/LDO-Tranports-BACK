const Job = require('../models/job');

const jobController = {

    getAllJobs: async function (_, res) {

        const jobs = await Job.getAllJobs();
        console.log(jobs);

        res.json(jobs);
    },

    addJob: async function (req, res) {
        
        const job = new Job(req.body);
        await job.addJob();
        res.json(job);


    }
};

module.exports = jobController;