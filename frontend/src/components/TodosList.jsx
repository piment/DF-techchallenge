import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

function TodosList() {
  const [todos, setTodos] = useState();

  const getTodos = () => {
    axios
      .get('http://localhost:5000/api/todo')
      .then((data) => setTodos(data.data))
      .catch((error) => console.log(error));
  };

  const handleDelete = (e) => {
    const id = e.target.parentNode.parentNode.id;
    axios
      .delete(`http://localhost:5000/api/todo/${id}`)
      .then((result) => getTodos())
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <ul>
      {todos &&
        todos
          .sort((current, next) => current.created - next.created)
          .map((todo) => (
            <TodoItem key={todo.id} {...todo} handleDelete={handleDelete} />
          ))}
    </ul>
  );
}

export default TodosList;
