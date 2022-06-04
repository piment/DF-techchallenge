const Todo = require('../models/todo');
const uid = require('uid').uid;
const express = require('express');

const router = express.Router();

router.get('/api', (req, res) => {
  res.status(200).send({ message: 'API OK' });
});

router.get('/api/todo', (req, res) => {
  const todos = Todo.getAllTodos()
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).send(error));
});

router.get('/api/todo/:id', (req, res) => {
  const todos = Todo.getTodo(req.params.id)
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
      Todo.create(newTodo)
        .then(() => res.status(201).json(newTodo))
        .catch((error) => res.status(500).json(error));
    })
    .catch((error) => {
      res.status(500).json({ error: error.name, message: error.message });
    });
});

router.put('/api/todo/:id', (req, res) => {
  const { id } = req.params;
  Todo.update(id, req.body)
    .then((result) => {
      if (result) {
        res.sendStatus(204);
      } else {
        res.status(500).send('Error on updating todo');
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

router.delete('/api/todo/:id', (req, res) => {
  Todo.remove(req.params.id)
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(500).send(err));
});
module.exports = router;
