var ObjectID = require('mongodb').ObjectID
module.exports = function (app, db) {
    app.get('/food/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) };
        db.collection('book').findOne(details, (err, item) => {
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
        db.collection('book').remove(details, (err, item) => {
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
        db.collection('book').update(details, food, (err, item) => {
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
};