import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { AiFillCloseSquare } from 'react-icons/ai';
const api_url = import.meta.env.MODE === 'development' ? import.meta.env.VITE_API_URL : 'https://ata.mura.io';

function Todo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState();

  const handleChange = (e) => {
    e.preventDefault();
    axios
      .put(api_url + `/api/todo/${id}`, todo)
      .then(() => {
        navigate('/DF-techchallenge', { replace: true });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get(api_url + `/api/todo/${id}`)
      .then((data) => setTodo(data.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    todo && (
      <div className='Todo-card'>
        <span className='close'>
          <AiFillCloseSquare onClick={() => navigate('/DF-techchallenge')} />
        </span>
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

          <button onClick={handleChange}>SAVE</button>
      </div>
    )
  );
}

export default Todo;
