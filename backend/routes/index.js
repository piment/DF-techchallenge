const Todo = require('../models/todo');
const uid = require('uid').uid;
const express = require('express');

const router = express.Router();

router.get('/api', (req, res) => {
  res.status(200).send({ message: 'API OK' });
});

router.get('/api/todo', (req, res) => {
  const todos = Todo.getTodo()
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).send(error));
});

router.post('/api/todo', async (req, res) => {
  const { title, desc = '' } = req.body;
  Todo.validate({ title, desc })
    .then(() => {
      const id = uid();
      const created = Date.now();
      const newTodo = { title, desc, created };
      Todo.create(newTodo);
      res.status(201).json(newTodo);
    })
    .catch((error) => {
      res.status(400).json({ error: error.name, message: error.message });
    });
});

router.put('/api/todo/:id', (req, res) => {
  const { id } = req.params;
  Todo.update(id, req.body)
    .then((todo) => {
      res.status(201).json(todo);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});
module.exports = router;
