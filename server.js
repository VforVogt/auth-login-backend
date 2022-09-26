require("dotenv").config();
const express = require("express");
const server = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");

//Connect to Mongo DB
connectDB();

//custom middleware logger
server.use(logger);

//Handle options credentials check - before CORS
//fetch cookies credentials requirement
server.use(credentials);

//Cross Origin Resource Sharing
server.use(cors(corsOptions));

//built-in middleware to handle form data
server.use(express.urlencoded({ extended: false }));

//middleware for json
server.use(express.json());

//middleware for cookies
server.use(cookieParser());

//serve static files
server.use("/", express.static(path.join(__dirname, "/public")));

//routes
server.use("/", require("./routes/root"));
server.use("/register", require("./routes/register"));
server.use("/auth", require("./routes/auth"));
server.use("/refresh", require("./routes/refresh"));
server.use("/logout", require("./routes/logout"));

server.use(verifyJWT);
server.use("/employees", require("./routes/api/employees"));
server.use("/users", require("./routes/api/users"));

server.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

server.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  server.listen(4000, () => console.log(`Server is running on port 4000`));
});
