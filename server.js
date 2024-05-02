const express = require("express");
const router = require("./unity/router/index.js");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");
const connection = require("./unity/database/index.js");

const env = process.env;

const PORT = env.PORT;

const app = express();

// Connection to database
connection();

// Cors domain called for allowed request everywhere
app.use(cors());

// Body parse for convert data JSON to be could read
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// Router
app.use(router);

// Run

app.listen(PORT, () => {
  console.log(`Service run in PORT: ${PORT}`);
});
