// src/app.js
const express = require('express');
// const helmet = require('helmet');
// const xss = require('xss-clean');
// const mongoSanitize = require('express-mongo-sanitize');
// const compression = require('compression');
// const cors = require('cors');
// const passport = require('passport');
// const httpStatus = require('http-status');
// const config = require('./config/config');
// const morgan = require('./config/morgan');
// const { jwtStrategy } = require('./config/passport');
// const { authLimiter } = require('./middlewares/rateLimiter');
// const routes = require('./routes/v1');
// const { errorConverter, errorHandler } = require('./middlewares/error');
// const ApiError = require('./utils/ApiError');

const app = express();

// // Logging
// if (config.env !== 'test') {
//   app.use(morgan.successHandler);
//   app.use(morgan.errorHandler);
// }

// // Security
// app.use(helmet());
// app.use(xss());
// app.use(mongoSanitize());

// // JSON & URL encoding
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Compression & CORS
// app.use(compression());
// app.use(cors());
// app.options('*', cors());

// // JWT auth
// app.use(passport.initialize());
// passport.use('jwt', jwtStrategy);

// // Rate limiter (optional)
// if (config.env === 'production') {
//   app.use('/v1/auth', authLimiter);
// }

// Routes
// app.use('/v1', routes);

// 404
// app.use((req, res, next) => {
//   next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
// });

// Custom response format
// app.response.sendJSONResponse = function ({ statusCode, status = true, message, data, isShowMessage = true }) {
//   return this.status(statusCode).json({ statusCode, status, message, isShowMessage, data });
// };

// // Error handling
// app.use(errorConverter);
// app.use(errorHandler);
app.get('/', (req, res) => {
  res.send('API is working8888');
});

module.exports = app;
