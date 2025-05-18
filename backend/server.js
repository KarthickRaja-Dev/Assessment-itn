const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/jobRoutes.js");
const app = express();
const cors = require("cors");
const Job = require("./models/Job.js");
require("dotenv").config();
const port = process.env.PORT;
app.use(cors());
app.use(bodyParser.json());
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err.message));
// Job.deleteMany({}).then(()=>console.log("Deleted"))//
app.use("/api", routes);

app.listen(port, () => {
  console.log("Server Running On ", port);
});
