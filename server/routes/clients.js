const express     = require('express');
const router      = express.Router();
const mongoose    = require('mongoose');
const mongooseMw  = require('../middlewares/mongoose');
const Client = mongoose.model('Client');

router.get('/', mongooseMw.connectMongo, (req, res, next) => {
  Client.find({})
    .populate('providers')
    .then((doc) => {
      res.send( { clients: doc } );
    })
    .catch((err) => console.error(err));
})

router.post('/add', mongooseMw.connectMongo, (req, res, next) => {
  console.log(req.body);
  let newClient = new Client({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    providers: req.body.providers
  });
  newClient.save()
    .then(() => res.send('Client added'));
})

module.exports = router;
