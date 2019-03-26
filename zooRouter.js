const express = require('express');
const router = express.Router();
const knex = require('knex');

const knexConfig = require('./knexfile');
const zoodb = knex(knexConfig.development);

router.get('/', (req, res) => {
  zoodb('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res
        .status(500)
        .json('Unable to retrieve the list of zoos from the database.');
    });
});

router.get('/:id', (req, res) => {
  const zooId = req.params.id;
  zoodb('zoos')
    .where({ id: zooId })
    .first()
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res
        .status(500)
        .json('Unable to retrieve the list of zoos from the database.');
    });
});

router.post('/', (req, res) => {
  zoodb('zoos')
    .insert(req.body)
    .then(ids => {
      const id = ids[0];
      zoodb('zoos')
        .where({ id })
        .first()
        .then(zoo => {
          res.status(201).json(zoo);
        })
        .catch(err => {
          res
            .status(500)
            .json('Unable to retrieve the list of zoos from the database.');
        });
    });
});

router.put('/:id', (req, res) => {
  zoodb('zoos')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: 'Record not found' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete('/:id', (req, res) => {
  // const zooId = req.params.id;
  zoodb('zoos')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'Record not found' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
module.exports = router;
