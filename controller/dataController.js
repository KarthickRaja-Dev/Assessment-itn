const loadCsv = require('../utilities/csvLoader.js');
const storeLog = require('../utilities/logging.js');

const refreshData = async (req, res) => {
  try {
    await loadCsv("utilities/sample.csv");
    storeLog("Success", "Data loaded successfully");
    res.status(200).json({ message: "Data loaded successfully" });
  } catch (error) {
    const errorMsg = "Data load failed: " + error.message;
    storeLog("Error", errorMsg);
    res.status(500).json({ message: errorMsg });
  }
};

module.exports = refreshData;
