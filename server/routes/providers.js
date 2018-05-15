const express     = require('express');
const router      = express.Router();
const mongoose    = require('mongoose');
const mongooseMw  = require('../middlewares/mongoose');
const Provider = mongoose.model('Provider');

router.get('/', mongooseMw.connectMongo, (req, res, next) => {
  Provider.find({})
    .then((doc) => {
      res.send( { providers: doc } );
    })
    .catch((err) => console.error(err));
})

router.post('/add', (req, res, next) => {
  console.log(req.body);
  let newProvider = new Provider({
    name: req.body.name
  });
  newProvider.save()
    .then(() => res.send('Provider added'))
    .catch((err) => console.log(err));
})

module.exports = router;