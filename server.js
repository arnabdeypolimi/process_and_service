//..................................... Main server .......................................
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser'); 4
const db = require('./config/db');

// Assigning port for the server 
const port = process.env.PORT || 3000;

// For swagger documentation page 
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(bodyParser.urlencoded({ extended: true }));


// connection to the database 
MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)
    require('./app/routes')(app, database);
    // Start the server
    app.listen(port, () => {
        console.log(`App running on port ${port}..`)
    })
})

// API documentation routes 
app.use('/api-doc', swaggerUi.serve)
app.get('/api-doc', swaggerUi.setup(swaggerDocument))