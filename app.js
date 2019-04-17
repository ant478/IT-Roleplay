const path = require('path');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const responses = require('./src/responses');
const models = require('./src/models');
const apiConfig = require('./config/api');
const routes = require('./src/routes/routes');
const errorsHandler = require('./src/middleware/errorsHandler');
const stubAuth = require('./src/middleware/stubAuth');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', false);
  res.header('Access-Control-Max-Age', '86400');
  next();
});

app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 2000000,
  },
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
  usernameField: 'login',
}, async (login, password, done) => {
  try {
    const user = await models.User.unscoped().findOne({ where: { login } });

    if (!user || !user.verifyPassword(password)) {
      return done(null, false, new responses.BadRequest());
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(stubAuth);
app.use(bodyParser.json());
app.use(apiConfig.path, routes.router);
app.use(express.static('./frontend/build'));
app.use(errorsHandler);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './frontend/build/index.html'));
});

app.listen(apiConfig.port, () => {
  /* eslint-disable no-console */
  console.log(`Example app listening on port ${apiConfig.port}!`);
  /* eslint-enable no-console */
});
