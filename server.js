const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

var mainRoutes = require('./app/routes/index')

const db = require("./app/models");
db.sequelize.sync();

const logger = function (req,res,next) {
  console.info('Request LOG >>>> ', req.url + ' :'+req.method + ' :body'+ JSON.stringify(req.body));
  next();
};
app.use(logger)

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome, How are you?" });
});

// routers
require('./app/routes/index')(app)


// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});