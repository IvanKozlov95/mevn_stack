const express     = require('express');
const router      = express.Router();
const mongoose    = require('mongoose');
const mongooseMw  = require('../middlewares/mongoose');
const Client = mongoose.model('Client');

router.get('/', mongooseMw.connectMongo, (req, res, next) => {
  Client.find({})
    .then((doc) => {
      res.send( { clients: doc } );
    })
    .catch((err) => console.error(err));
})

router.post('/add', mongooseMw.connectMongo, (req, res, next) => {
  let newClient = new Client({
    name: 'Test'
  });
  newClient.save()
    .then(() => res.send('Client added'));
})

module.exports = router;
