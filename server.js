const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const bodyParser = require('body-parser');
const db = require('./config/db');
const port = process.env.PORT || 3000

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))



MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)
    require('./app/routes')(app, database);
    // Start the server
    app.listen(port, () => {
        console.log(`App running on port ${port}..`)
    })
})