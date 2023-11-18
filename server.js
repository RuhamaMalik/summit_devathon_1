const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const conenectDB = require("./config/db");
const cors = require("cors");

// dotenv config
dotenv.config();

//monodb connection
conenectDB();

// rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));

//routes
// app.get("/", (req, res) => {
//   res.status(200).send({
//     message: "Server is running",
//   });
// });

app.get("/", (req, res) => {
  res.status(200).send("hello");
});

app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require('./routes/adminRoutes'));
app.use("/api/v1/doctor", require('./routes/doctorRoutes'));


app.use(cors());

//port
const port = process.env.PORT || 8000;

// app listen
app.listen(port, () => {
  console.log(
    `Server running in ${process.env.DEV_MODE} Mode on port ${process.env.PORT}`
  );
});
