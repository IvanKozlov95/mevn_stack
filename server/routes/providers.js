const express     = require('express');
const router      = express.Router();
const mongoose    = require('mongoose');
const mongooseMw  = require('../middlewares/mongoose');
const Provider = mongoose.model('Provider');

router.get('/', mongooseMw.connectMongo, (req, res, next) => {
  Provider.find({})
    .select(['name'])
    .then((doc) => {
      res.send( { providers: doc } );
    })
    .catch((err) => console.error(err));
})

router.post('/add', mongooseMw.connectMongo, (req, res, next) => {
  console.log(req.body);
  let newProvider = new Provider({
    name: req.body.name
  });
  newProvider.save()
    .then(() => res.send('Provider added'))
    .catch(next);
})

router.delete('/:id', mongooseMw.connectMongo, (req, res, next) => {
  Provider
    .remove({ _id: new mongoose.Types.ObjectId(req.params.id) })
    .then(() => res.send('Provider deleted'))
    .catch(next);
});

module.exports = router;