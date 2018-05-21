const express     = require('express');
const router      = express.Router();
const mongoose    = require('mongoose');
// const mongooseMw  = require('../middlewares/mongoose');
const Client = mongoose.model('Client');

router.get('/', (req, res, next) => {
  Client.find({})
    .populate('providers')
    .then((doc) => {
      res.send( { clients: doc } );
    })
    .catch((err) => console.error(err));
})

router.post('/add', (req, res, next) => {
  console.log(req.body);
  let newClient = new Client({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    providers: req.body.providers
  });
  newClient.save()
    .then(() => res.send('Client added'))
    .catch(next);
})

router.put('/:id', (req, res, next) => {
  let objectId = new mongoose.Types.ObjectId(req.params.id);
  console.log(req.body);
  Client.findById(objectId)
    .then(client => {
      client.name = req.body.name;
      client.email = req.body.email;
      client.phone = req.body.phone;
      client.providers = req.body.providers;
      return client.save()
    })
    .then(() => res.send('Client updated'))
    .catch(next);
})

router.delete('/:id', (req, res, next) => {
  Client
    .remove({ _id: new mongoose.Types.ObjectId(req.params.id) })
    .then(() => res.send('Client deleted'))
    .catch(next);
})

module.exports = router;
