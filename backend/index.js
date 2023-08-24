const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./middlewares/cors');
const router = require('./routes/routes');
const { connected } = require('./utils/connect');
const cookieParser = require('cookie-parser');

// const helmet = require('helmet');
// const { limiter } = require('./utils/limiterConfig');

const { errorLogger, requestLogger } = require('./middlewares/logger');
const handlerErrors = require('./middlewares/errors');
const joiError = require('./middlewares/joiError');


const app = express();

app.disable('x-powered-by');
app.use(requestLogger);

app.use(cors)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

// app.use(limiter)
// app.use(helmet())
app.use('/', router);

app.use(joiError)
app.use(errorLogger)

app.use(handlerErrors)


connected(app);