require('dotenv').config({ path: './.env' })

const express = require('express');
const hostname = process.env['app.hostname'];
const port = process.env['app.port'];
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const fileUpload = require('express-fileupload');
const s3 = require('./s3');

router.route('/contentws/contents')
  .post(function (request, response) {
    s3.postContent(request, response);
  });

router.route('/contentws/contents/:id')
  .get(function (request, response) {
    s3.getContent(request, response);
  })

app.use(cors());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(fileUpload());
app.use(helmet());
app.use(express.json({ limit: '400Mb' })); // Body limiter
app.use(mongoSanitize()); // Data Sanitization against NoSQL Injection Attacks
app.use(xss()); // Data Sanitization against XSS attacks

app.use(router, rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: 'Too many requests'
}));

app.listen(port, hostname, function () {
  console.log("Mon serveur fonctionne sur http://" + hostname + ":" + port);
});
