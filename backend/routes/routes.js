const uid = require('uid').uid;
const express = require('express');
const Joi = require('joi');

const router = express.Router();

let todos = [
  {
    id: '47bc8793241',
    title: 'first todo',
    desc: 'Make a first todo',
    done: false,
    created: 1653688704307,
  },
  {
    id: '7bc87932415',
    title: 'finish tech challenge',
    desc: 'Do all the US to finish the technical challenge',
    done: false,
    created: 1653688704308,
  },
  {
    id: 'bc879324151',
    title: 'Have some sleep',
    desc: 'Take some sleep to keep a good health',
    done: false,
    created: 1653688704309,
  },
  {
    id: 'c879324151e',
    title: 'Eat something and drink water',
    desc: "Don't forget to eat food and drink a lot of water",
    done: false,
    created: 1653688704310,
  },
];

const todoSchema = Joi.object().keys({
  title: Joi.string().min(1).max(50).required(),
  desc: Joi.string().min(10).max(500).allow(''),
});

router.get('/api', (req, res) => {
  res.status(200).send({ message: 'API OK' });
});

router.get('/api/todo', (req, res) => {
  res.status(200).json(todos);
});

router.post('/api/todo', async (req, res) => {
  const { title, desc = '' } = req.body;
  try {
    const value = await todoSchema.validateAsync({ title, desc });
    const id = uid();
    const created = Date.now();
    const newTodo = { ...value, id, created, done: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ error: error.name, message: error.message });
  }
});

router.put('/api/todo/:action/:id', (req, res) => {
  const { id, action } = req.params;
  todoIndex = todos.findIndex((todo) => todo.id === id);

  if (action === 'done') {
    todos[todoIndex].done = !todos[todoIndex].done;
    res.send(todos[todoIndex]);
  } else if (action === 'delete') {
    todos = todos.filter((el) => el.id !== id);
    console.log(todos);
    res.send({ message: 'successfully delete todo' });
  }
});
module.exports = router;
