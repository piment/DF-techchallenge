const sqlite3 = require('sqlite3').verbose();
const Joi = require('joi');

const db = new sqlite3.Database('todos.sqlite');
const table = db.run(
  'CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(50) NOT NULL, desc TEXT(500) NULL, done TINYINT(1) DEFAULT 0, created INTEGER NOT NULL)'
);
if (table) {
  console.log(table, 'Database opened correctly');
}

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
  return new Promise((resolve, reject) => {
    const values = db.all('SELECT * FROM todos', (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};

const create = (data) => {
  console.log('data', data);
  const query = db.run(
    'INSERT INTO todos (title, desc, created) VALUES(?, ?, ?)',
    [data.title, data.desc, data.created]
  );
};

const update = (id, data) => {
  return new Promise((resolve, reject) => {
    // TODO Need to retrieve specific object, change properties and send it back for update
    const query = db.run('UPDATE todos SET ? WHERE id = 2', [data]);
    console.log(query);
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
