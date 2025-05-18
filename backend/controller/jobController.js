const Job = require("../models/Job");

const getJobs = async (req, res) => {
  try {
    const filters = {};
    filters.status = "completed";
    if (req.query.jobType) filters.jobType = req.query.jobType;
    if (req.query.location)
      filters.location = { $regex: req.query.location, $options: "i" };
    if (req.query.companyName)
      filters.companyName = { $regex: req.query.companyName, $options: "i" };
    if (req.query.jobTitle)
      filters.jobTitle = { $regex: req.query.jobTitle, $options: "i" };
    const minSalary = parseInt(req.query.minSalary);
    const maxSalary = parseInt(req.query.maxSalary);

    if (!isNaN(minSalary)) {
      filters.salaryRangeEnd = { $gte: minSalary };
    }
    if (!isNaN(maxSalary)) {
      filters.salaryRangeStart = { $lte: maxSalary };
    }
    console.log(filters);
    const jobs = await Job.find(filters);
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs", details: err });
  }
};
const getDraft = async (req, res) => {
  try {
    const jobs = await Job.find({ draft: "draft" });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs", details: err });
  }
};

const createJob = async (req, res) => {
  try {
    console.log(req.body);
    const {
      jobTitle,
      companyName,
      location,
      jobType,
      expRange,
      salaryStart,
      salaryEnd,
      jobDescription,
      deadLine,
      requirements,
      status,
    } = req.body;
    const newJob = new Job({
      jobTitle,
      companyName,
      location,
      jobType,
      salaryRangeStart: salaryStart,
      salaryRangeEnd: salaryEnd,
      jobDescription: jobDescription.trim(),
      expRange,
      deadLine,
      requirements,
      status,
    });
    await newJob.save();
    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (err) {
    res.status(400).json({ error: "Failed to post job", details: err });
    console.log(err);
  }
};

module.exports = {
  getJobs,
  createJob,
};
