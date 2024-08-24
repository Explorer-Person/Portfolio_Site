const session = require('express-session');
const Knex = require('knex');
const {ConnectSessionKnexStore} = require('connect-session-knex');
const { Model } = require('objection');
const {v4: genuuid} = require('uuid');

const express = require('express');
const middleware = express();


const knex = Knex({
 client: 'mysql2',
 connection: {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}
});

Model.knex(knex);

const store = new ConnectSessionKnexStore({
  knex: knex,
  tablename: 'sessions', // optional. Defaults to 'sessions'
  createtable: true // Automatically create the table if it doesn't exist
});

let sess = {
  genid: function(req){
   return genuuid()
  },
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    secure: false, // Ensures the cookie is only used over HTTPS
    httpOnly: true, // Ensures the cookie is sent only via HTTP(S), not accessible via client-side JavaScript
    maxAge: 1000 * 60 * 60 * 1 // 1 hour
  },
}


if (middleware.get('env') === 'production') {
  middleware.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

middleware.use(session(sess));

module.exports = middleware;