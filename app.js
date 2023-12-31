const express = require('express');
const dbConfig = require('./config/mongodb/config.js')
var bodyParser = require('body-parser');

const app = express();

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

express.application.prefix = express.Router.prefix = function (path, configure) {
    var router = express.Router();
    this.use(path, router);
    configure(router);
    return router;
};

app.use('/', require('./routes'));

// Start the server
const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});