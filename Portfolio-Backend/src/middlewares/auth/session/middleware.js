const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const { v4: genuuid } = require('uuid');

const express = require("express");
const middleware = express();

const optionsUser = {
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  createDatabaseTable: true,
  expiration: 30 * 60 * 1000,
  schema: {
    tableName: 'admin_sessions', 
  }
};

const sessionDB = new MySQLStore(optionsUser);


middleware.use("/",
  session({
    genid: function (req) {
      return genuuid();
    },
    name: "auth",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      path: "/",
      httpOnly: true,
    },
    store: sessionDB,
  })
);


if (middleware.get('env') === 'production') {
  middleware.set('trust proxy', 1) // trust first proxy
}


module.exports = middleware;