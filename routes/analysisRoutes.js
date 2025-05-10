const refreshData = require("../controller/dataController");
const {
  getAllTopProducts,
  getCategoryWiseTopProducts,
  getRegionWiseTopProducts,
} = require("../controller/topProductsController");

const routes = require("express").Router();

routes.get("/top-products/:start/:end", getAllTopProducts);

routes.get("/top-products/:start/:end/:category", getCategoryWiseTopProducts);

routes.get(
  "/top-products/by-region/:start/:end/:region",
  getRegionWiseTopProducts
);

routes.get("/refresh-data", refreshData);

module.exports = routes;
