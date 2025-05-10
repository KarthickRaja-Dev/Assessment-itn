const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cron = require('node-cron')
const path = require("path")
const routes = require("./routes/analysisRoutes.js");
const loadData = require("./utilities/csvLoader.js");
const storeLog = require("./utilities/logging.js");
const app = express();


require("dotenv").config();
const port = process.env.PORT;
app.use(bodyParser.json());
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err.message));
app.use("/api/analysis", routes);
cron.schedule('0 0 * * *',()=>{
    try {
        loadData(path.join(__dirname,"utilities","sample.csv"))
        storeLog("Success","Loaded Data")
    } catch (error) {
        storeLog("Failed","Error Loading Data"+error.message)
    }
})
app.listen(port, () => {
  console.log("Server Running On ", port);
});
