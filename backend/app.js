const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Allow only frontend origin
    credentials: true, // if you're using cookies or auth headers
  })
);

//app.use(cors()); // Allow all origins (good for dev, but not for production)

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

module.exports = app;
