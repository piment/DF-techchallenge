const Joi = require('joi');

const todoSchema = Joi.object().keys({
  title: Joi.string().min(1).max(50).required(),
  desc: Joi.string().min(10).max(500).allow(''),
});

let todosList = [
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

const validate = ({ title, desc }) => {
  return new Promise((resolve, reject) => {
    const error = todoSchema.validate({ title, desc }).error;
    if (error) {
      return reject(error);
    }
    return resolve();
  });
};

const getTodo = () => {
  return todosList;
};

const create = (data) => {
  todosList.push(data);
};

const update = (id, data) => {
  return new Promise((resolve, reject) => {
    todoIndex = todosList.findIndex((todo) => todo.id === id);
    console.log(todoIndex);
    if (todoIndex === -1) {
      return reject(`No todo founded with id: ${id}`);
    }
    todosList[todoIndex] = { ...todosList[todoIndex], ...data };
    return resolve(todosList[todoIndex]);
  });
};

module.exports = {
  todosList,
  getTodo,
  validate,
  create,
  update,
};
