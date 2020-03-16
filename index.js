// implement your API here
const express = require('express');
const db = require('./data/db')

const server = express();
const port = 4000;

server.listen(4000, () => {
  console.log(`Server listening on port: ${port}`);
});

server.use(express.json());

//Start of the get request

server.get('/', (req, res) => {
  res.send('Hi I can respond!');
});

server.post('/api/users', (req, res) => {
  const userInfo = req.body;
  console.log(userInfo);

  if (!userInfo.name || !userInfo.bio) {
    res.status(400).json({
      errorMessage: 'Please provide name and bio for the user'
    });
  }

  db.insert(userInfo)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      });
    });
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