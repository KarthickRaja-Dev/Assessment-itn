const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
    enum: ["Full-time", "Part-time", "Contract", "Internship"],
  },
  salaryRangeStart: {
    type: Number,
    required: true,
  },
  salaryRangeEnd: {
    type: Number,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  requirements: {
    type: String,
  },
  expRange: {
    type: String,
    required: true,
  },
  deadLine: {
    type: Date,
    required: true,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["completed", "draft"],
    default: "completed",
  },
});

module.exports = mongoose.model("Job", jobSchema);
