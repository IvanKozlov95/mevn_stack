const express     = require('express');
const router      = express.Router();
const mongoose    = require('mongoose');
const Provider = mongoose.model('Provider');

router.get('/', (req, res, next) => {
  Provider.find({})
    .select(['name'])
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
    .catch(next);
})

router.put('/:id', (req, res, next) => {
  let objectId = new mongoose.Types.ObjectId(req.params.id);
  console.log(req.body);
  Provider.findById(objectId)
    .then(provider => {
      provider.name = req.body.name;
      return provider.save()
    })
    .then(() => res.send('Provdier updated'))
    .catch(next);
})

router.delete('/:id', (req, res, next) => {
  Provider
    .remove({ _id: new mongoose.Types.ObjectId(req.params.id) })
    .then(() => res.send('Provider deleted'))
    .catch(next);
});

module.exports = router;