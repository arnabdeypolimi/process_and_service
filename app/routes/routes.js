var ObjectID = require('mongodb').ObjectID
module.exports = function (app, db) {
    app.get('/food/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) };
        db.collection('food').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'an error has occured' });
            } else {
                res.send(item)
            }
        });
    });

    app.delete('/food/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) };
        db.collection('food').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'an error has occured' });
            } else {
                res.send('book' + id + 'deleted!');
            }
        });
    });

    app.put('/food/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) };
        const food = { text: req.body.body, title: req.body.title };
        db.collection('food').update(details, food, (err, item) => {
            if (err) {
                res.send({ 'error': 'an error has occured' });
            } else {
                res.send(item)
            }
        });
    });

    app.post('/food', (req, res) => {
        const food = { text: req.body.body, title: req.body.title };
        db.collection('food').insert(food, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occured' + err });
            } else {
                res.send(result.ops[0])
            }
        });
    });



    app.get('/user/info/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) };
        db.collection('user').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'an error has occured' });
            } else {
                res.send(item)
            }
        });
    });

    app.put('/user/info/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) };
        const user = { name: req.body.name, email: req.body.email, pass: req.body.password };
        db.collection('user').update(details, user, (err, item) => {
            if (err) {
                res.send({ 'error': 'an error has occured' });
            } else {
                res.send(item)
            }
        });
    });

    app.post('/user/signUp', (req, res) => {
        const user = { name: req.body.name, email: req.body.email, pass: req.body.password };
        db.collection('user').insert(user, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occured' + err });
            } else {
                res.send("success")
            }
        });

    });
    app.post('/user/signIn', (req, res) => {
        const details = { 'email': req.body.email, 'pass': req.body.password };
        db.collection('user').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'an error has occured' });
            } else {
                res.send(item)
            }
        });
    });



    app.post('/restaurant/add', (req, res) => {
        const restaurant = { name: req.body.name, location: req.body.location, type: req.body.type };
        db.collection('restaurant').insert(restaurant, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occured' + err });
            } else {
                res.send("success")
            }
        });
    });

    app.get('/restaurant/getInfo/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) };
        db.collection('restaurant').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'an error has occured' });
            } else {
                res.send(item)
            }
        });
    });

    app.get('/request/all', (req, res) => {
        db.collection('request').distinct('_id', (err, item) => {
            if (err) {
                res.send({ 'error': 'an error has occured' });
            } else {
                res.send(item)
            }
        });
    });

    app.get('/request/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) };
        db.collection('request').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'an error has occured' });
            } else {
                res.send(item)
            }
        });
    });

    app.post('/request/new', (req, res) => {
        const request = { name: req.body.name, email: req.body.email, category: req.body.category };
        db.collection('request').insert(request, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occured' + err });
            } else {
                res.send("success")
            }
        });
    });



};