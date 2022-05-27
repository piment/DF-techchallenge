const uid = require('uid').uid;
const express = require('express');

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

router.get('/api', (req, res) => {
  res.status(200).send({ message: 'API OK' });
});

router.get('/api/todo', (req, res) => {
  res.status(200).json(todos);
});

router.post('/api/todo', (req, res) => {
  const { title, desc } = req.body;
  if (title === undefined || desc === undefined) {
    res
      .status(400)
      .json({ message: 'Error, the body need to have title and desc' });
  } else {
    const id = uid();
    const created = Date.now();
    const newTodo = { id, title, desc, created, done: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
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
