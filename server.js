const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const conenectDB = require("./config/db");
const cors = require("cors");
const config = require("./config/keys");

// dotenv config
dotenv.config();

//monodb connection
conenectDB();

// rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//routes

app.get("/", (req, res) => {
  res.status(200).send("Server is running");
});

app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));


// setup for deployment

if (process.env.NODE_ENV == "production") {
  const path = require("path");
  app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "client", "build")));
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
//port
const port = 8000;

// app listen
// app.listen(port, () => {
//   console.log(
//     `Server running in ${process.env.DEV_MODE} Mode on port ${process.env.PORT}`
//   );
// });

app.listen(port, () => {
  console.log(`Server running in ${config.NODE_ENV} Mode on port ${port}`);
});
