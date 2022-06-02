import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function Todo() {
  const { id } = useParams();
  const [todo, setTodo] = useState();

  const handleChange = () => {
    axios
      .put(`http://localhost:5000/api/todo/${id}`, todo)
      .then(() => {
        setTodo(todo);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/todo/${id}`)
      .then((data) => setTodo(data.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    todo && (
      <div className='Todo-card'>
        <label htmlFor='title'>
          TITLE
          <input
            type='text'
            name='title'
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
        </label>
        <label htmlFor='desc'>
          DESCRIPTION
          <textarea
            id='desc'
            name='desc'
            cols='10'
            rows='10'
            value={todo.desc}
            onChange={(e) => setTodo({ ...todo, desc: e.target.value })}
          ></textarea>
        </label>

        <Link to='/DF-techchallenge/'>
          <button onClick={handleChange}>SAVE</button>
        </Link>
      </div>
    )
  );
}

export default Todo;
