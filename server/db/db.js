const { Pool } =
  require("pg");

const pool = new Pool({

  user:
    "postgres",

  host:
    "localhost",

  database:
    "insurance_db",

  password:
    "Shrikant@2003",

  port: 5432
});

module.exports = pool;