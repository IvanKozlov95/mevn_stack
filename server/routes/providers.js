const express     = require('express');
const router      = express.Router();
const mongoose    = require('mongoose');
const mongooseMw  = require('../middlewares/mongoose');
const Provider = mongoose.model('Providers');

router.get('/', mongooseMw.connectMongo, (req, res, next) => {
  Provider.find({})
    .then((doc) => {
      res.send( { providers: doc } );
    })
    .catch((err) => console.error(err));
})

router.post('/add', (req, res, next) => {
  res.send('providers/add is not implemented yet');
})

module.exports = router;