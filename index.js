// implement your API here
const express = require('express');
const db = require('./data/db')

const server = express();
const port = 4000;

server.listen(4000, () => {
  console.log(`Server listening on port: ${port}`);
});

server.use(express.json());

server.get('/', (req, res) => {
  res.send('Hi I can respond!');
});

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({
        error: "The users information could not be retrieved."
      });
    });
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          error: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        error: "The user information could not be retrieved."
      });
    });
});