const Joi = require('joi');

const db = require('better-sqlite3')('./todos.db');
const table = db.exec(
  'CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(50) NOT NULL, desc TEXT(500) NULL, done TINYINT(1) DEFAULT 0, created INTEGER NOT NULL)'
);
if (table) {
  console.log(table, 'Database opened correctly');
}

const todoSchema = Joi.object().keys({
  title: Joi.string().min(1).max(50).required(),
  desc: Joi.string().min(0).max(500).allow(''),
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

const getTodo = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.prepare('SELECT * from todos WHERE id = ?').get(id);
    if (!query) {
      return reject(err);
    }
    return resolve(query);
  });
};

const getAllTodos = () => {
  return new Promise((resolve, reject) => {
    const values = db.prepare('SELECT * FROM todos').all();
    //    (err, data) => {
    //     if (err) {
    //       return reject(err);
    //     }
    //     return resolve(data);
    //   });
    return resolve(values);
  });
};

const create = (data) => {
  return new Promise((resolve, reject) => {
    const query = db
      .prepare('INSERT INTO todos (title, desc, created) VALUES(?, ?, ?)')
      .run(data.title, data.desc, data.created);
    if (query.changes) {
      return resolve();
    }
    return reject(query);
  });
};

const update = (id, data) => {
  return new Promise((resolve, reject) => {
    getTodo(id)
      .then((todo) => {
        newTodo = { ...todo, ...data };
        const todoParsed = Object.entries(newTodo)
          .map(([key, value], id) => `${key} = '${value}'`)
          .join(', ');
        const query = db
          .prepare(`UPDATE todos SET ${todoParsed} WHERE id = ${id}`)
          .run();
        return resolve(query.changes);
      })
      .catch((error) => reject(`No todo founded with id: ${id}`));
  });
};

const remove = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.prepare('DELETE FROM todos WHERE id = ?').run(id);
    if (query.changes) {
      return resolve();
    }
    return reject(query);
  });
};

module.exports = {
  todosList,
  getTodo,
  getAllTodos,
  validate,
  create,
  update,
  remove,
};
