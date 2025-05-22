const { Client } = require("pg");

const client = new Client({
  connectionString: "postgres://localhost/fullstack_employees",
});

module.exports = client;