const express = require('express');
const router = express.Router();
const knex = require('knex');

const knexConfig = require('./knexfile');
const bearsdb = knex(knexConfig.development);

router.get('/', (req, res) => {
  bearsdb('bears')
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => {
      res
        .status(500)
        .json('Unable to retrieve the list of bears from the database.');
    });
});

router.get('/:id', (req, res) => {
  const bearsId = req.params.id;
  bearsdb('bears')
    .where({ id: bearsId })
    .first()
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => {
      res
        .status(500)
        .json('Unable to retrieve the list of bears from the database.');
    });
});

router.post('/', (req, res) => {
  bearsdb('bears')
    .insert(req.body)
    .then(ids => {
      const id = ids[0];
      bearsdb('bears')
        .where({ id })
        .first()
        .then(bears => {
          res.status(201).json(bears);
        })
        .catch(err => {
          res
            .status(500)
            .json('Unable to retrieve the list of bears from the database.');
        });
    });
});

router.put('/:id', (req, res) => {
  bearsdb('bears')
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
  // const bearsId = req.params.id;
  bearsdb('bears')
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
