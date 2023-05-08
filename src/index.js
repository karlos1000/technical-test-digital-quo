const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");

// settings
app.set("port", process.env.PORT || 3000);

// middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api", require("./routes/operations.routes"));

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Starting Server
app.listen(app.get("port"), () => {
    console.log(`The node server is running on the port ${app.get("port")}`);
});