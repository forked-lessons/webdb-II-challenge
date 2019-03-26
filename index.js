const express = require('express');
const helmet = require('helmet');
const server = express();
const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
  res.send('Hello');
});

const port = 3300;
// server.use('/api/zoos', zooRouter);

server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
