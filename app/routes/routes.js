var ObjectID = require('mongodb').ObjectID
module.exports = function (app, db) {

    const path = require('path');
    app.get('/', (req, res) => {
        var file = path.join(__dirname + '/main.html')
        res.sendFile(file)
    })
    //API for food 

    // Find food by Id 
    app.get('/food/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) };
        db.collection('food').findOne(details, (err, item) => {
            if (err) {
                res.status(400).send({ 'error': 'an error has occurred' });
            } else {
                res.status(200).send(item);
            }
        });
    });

    // Find all food by type
    app.get('/food/type/:type', (req, res) => {
        const details = { 'type': req.params.type };
        db.collection('food').find(details).toArray(function (err, result) {
            if (err) {
                res.status(400).send({ 'error': 'an error has occurred' });
            } else {
                res.status(200).send(result);
            }
        });
    });

    // Delete food by Id 
    app.delete('/food/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) };
        db.collection('food').remove(details, (err, item) => {
            if (err) {
                res.status(400).send({ 'error': 'an error has occurred' });
            } else {
                res.status(200).send('food ' + id + ' deleted!');
            }
        });
    });

    // update existing food by Id 
    app.put('/food/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) };
        const food = { text: req.body.body, title: req.body.title };
        db.collection('food').update(details, food, (err, item) => {
            if (err) {
                res.status(400).send({ 'error': 'an error has occurred' });
            } else {
                res.status(200).send(item);
            }
        });
    });

    // Add new food 
    app.post('/food', (req, res) => {
        const food = { text: req.body.body, title: req.body.title };
        db.collection('food').insert(food, (err, result) => {
            if (err) {
                res.status(400).send({ 'error': 'An error has occurred' + err });
            } else {
                res.status(200).send(result.ops[0]);
            }
        });
    });


    // API for user information 

    // Get user info by id 
    app.get('/user/info/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) };
        db.collection('user').findOne(details, (err, item) => {
            if (err) {
                res.status(400).send({ 'error': 'an error has occurred' });
            } else {
                res.status(200).send(item);
            }
        });
    });

    // Update user info by id 
    app.put('/user/info/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) };
        const user = { name: req.body.name, email: req.body.email, pass: req.body.password };
        db.collection('user').update(details, user, (err, item) => {
            if (err) {
                res.status(400).send({ 'error': 'an error has occurred' });
            } else {
                res.status(200).send(item);
            }
        });
    });

    // Register new user
    app.post('/user/signUp', (req, res) => {
        const user = { name: req.body.name, email: req.body.email, pass: req.body.password };
        db.collection('user').insert(user, (err, result) => {
            if (err) {
                res.status(400).send({ 'error': 'An error has occurred' + err });
            } else {
                res.status(200).send(item);
            }
        });
    });

    //  SignIn with user info
    app.post('/user/signIn', (req, res) => {
        const details = { 'email': req.body.email, 'pass': req.body.password };
        db.collection('user').findOne(details, (err, item) => {
            if (err) {
                res.status(400).send({ 'error': 'an error has occurred' });
            } else {
                res.status(200).send(item);
            }
        });
    });

    //API for restaurant information

    //Add new restaurant to database
    app.post('/restaurant/add', (req, res) => {
        const restaurant = { name: req.body.name, location: req.body.location, type: req.body.type };
        db.collection('restaurant').insert(restaurant, (err, result) => {
            if (err) {
                res.status(400).send({ 'error': 'An error has occurred' + err });
            } else {
                res.status(200).send("success");
            }
        });
    });

    // Get info about restaurant by ID
    app.get('/restaurant/getInfo/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) };
        db.collection('restaurant').findOne(details, (err, item) => {
            if (err) {
                res.status(400).send({ 'error': 'an error has occurred' });
            } else {
                res.status(200).send(item);
            }
        });
    });

    // API for requests

    // Find all requests
    app.get('/request/all', (req, res) => {
        db.collection('request').distinct('_id', (err, item) => {
            if (err) {
                res.status(400).send({ 'error': 'an error has occurred' });
            } else {
                res.status(200).send(item);
            }
        });
    });

    // Find a request by Id 
    app.get('/request/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) };
        db.collection('request').findOne(details, (err, item) => {
            if (err) {
                res.status(400).send({ 'error': 'an error has occurred' });
            } else {
                res.status(200).send(item);
            }
        });
    });

    // Add new request
    app.post('/request', (req, res) => {
        const request = { name: req.body.name, email: req.body.email, category: req.body.category };
        db.collection('request').insert(request, (err, result) => {
            if (err) {
                res.status(400).send({ 'error': 'An error has occurred' + err });
            } else {
                res.status(200).send("success")
            }
        });
    });

    app.delete('/request/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) };
        db.collection('request').remove(details, (err, item) => {
            if (err) {
                res.status(400).send({ 'error': 'an error has occurred' });
            } else {
                res.status(200).send('request ' + id + ' deleted!');
            }
        });
    });


};