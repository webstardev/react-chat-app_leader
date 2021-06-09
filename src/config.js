require("dotenv").config();

let CONFIG = {};
CONFIG.REACT_APP_BASE_URL =
  process.env.REACT_APP_BASE_URL || "http://localhost:3000";
CONFIG.REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

module.exports = CONFIG;
