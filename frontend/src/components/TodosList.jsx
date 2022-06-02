import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import { useNavigate } from 'react-router-dom';

function TodosList() {
  const [todos, setTodos] = useState();
  const navigate = useNavigate();

  const getTodos = () => {
    axios
      .get('http://localhost:5000/api/todo')
      .then((data) => setTodos(data.data))
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/todo/${id}`)
      .then((result) => getTodos())
      .catch((error) => console.log(error));
  };

  const handleDone = (id) => {
    const currentTodo = todos.filter((todo) => todo.id == id)[0];
    axios
      .put(`http://localhost:5000/api/todo/${id}`, {
        done: currentTodo.done ? 0 : 1,
      })
      .then((result) => getTodos())
      .catch((error) => console.log(error));
  };

  const handleEdit = (id) => {
    navigate('/DF-techchallenge/' + id);
  };
  const getUndone = () => {
    return todos
      .filter((todo) => !todo.done)
      .sort((current, next) => current.created - next.created)
      .map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          handleDelete={handleDelete}
          handleDone={handleDone}
          handleEdit={handleEdit}
        />
      ));
  };

  const getDone = () => {
    return todos
      .filter((todo) => todo.done)
      .sort((current, next) => current.created - next.created)
      .map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          handleDelete={handleDelete}
          handleDone={handleDone}
        />
      ));
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className='Todolist'>
      <h2>To Do</h2>
      <ul> {todos && getUndone()}</ul>
      <span className='separator'></span>
      <h2>Done</h2>
      <ul>{todos && getDone()}</ul>
    </div>
  );
}

export default TodosList;
