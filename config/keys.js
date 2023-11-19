// if (process.env.NODE_ENV === "production") {
//   module.exports = require("./production.js");
// } else {
//   module.exports = require("./dev.js");
// }
let config;

if (process.env.NODE_ENV === "production") {
  config = require("./production.js");
} else {
  config = require("./dev.js");
}
module.exports = { JSON_SECRET, MONGODB_URL, NODE_ENV } = config;
