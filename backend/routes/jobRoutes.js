const express = require('express');
const router = express.Router();
const {
  getJobs,
  createJob
} = require('../controller/jobController');

router.get('/jobs', getJobs);
router.post('/job/post', createJob);
module.exports = router;
