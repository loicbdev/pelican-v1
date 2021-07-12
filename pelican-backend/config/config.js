module.exports = {
  development: {
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOST,
    dialect: "mysql",
  },
  test: {
    username: process.env.CI_DB_USER,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: process.env.CI_DB_HOST,
    dialect: "mysql",
  },
  production: {
    username: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOST,
    dialect: "mysql",
  },
};
