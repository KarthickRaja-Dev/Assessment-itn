const Order = require("../models/Order");
const storeLog = require("../utilities/logging");

const getTopProducts = async (match, groupBy) => {
  return await Order.aggregate([
    { $match: match },
    {
      $group: {
        _id: groupBy,
        totalQuantity: { $sum: "$quantitySold" },
        product: { $first: "$product" },
        category: { $first: "$category" },
        region: { $first: "$region" },
      },
    },
    { $sort: { totalQuantity: -1 } },
  ]);
};

const handleTopProducts = async (req, res, extraMatch = {}, logLabel = "") => {
  try {
    const { start, end } = req.params;
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate) || isNaN(endDate)) {
      const msg = "Invalid date format";
      await storeLog("Failed", msg);
      return res.status(400).json({ error: msg });
    }

    const match = {
      dateOfSale: { $gte: startDate, $lte: endDate },
      ...extraMatch,
    };

    const topProducts = await getTopProducts(match, "$productId");
    storeLog("Success", `Fetched top products ${logLabel}`);
    res.status(200).json(topProducts);
  } catch (error) {
    const errMsg = `Error fetching top products ${logLabel}: ${error.message}`;
    storeLog("Failed", errMsg);
    res.status(500).json({ error: error.message });
  }
};

const getAllTopProducts = (req, res) =>
  handleTopProducts(req, res, {}, "overall");

const getCategoryWiseTopProducts = (req, res) =>
  handleTopProducts(req, res, { category: req.params.category }, "by category");

const getRegionWiseTopProducts = (req, res) =>
  handleTopProducts(req, res, { region: req.params.region }, "by region");

module.exports = {
  getAllTopProducts,
  getCategoryWiseTopProducts,
  getRegionWiseTopProducts,
};
