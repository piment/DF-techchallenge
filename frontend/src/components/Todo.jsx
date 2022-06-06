import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { AiFillCloseSquare } from 'react-icons/ai';
const api_url =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_API_URL
    : 'https://ata.mura.io';

function Todo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState();

  const handleChange = (e) => {
    e.preventDefault();
    console.log(todo);
    axios
      .put(api_url + `/api/todo/${id}`, todo)
      .then(() => {
        navigate('/DF-techchallenge', { replace: true });
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = () => {
    axios
      .delete(api_url + `/api/todo/${id}`)
      .then((result) => navigate('/DF-techchallenge', { replace: true }))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get(api_url + `/api/todo/${id}`)
      .then((data) => setTodo(data.data))
      .catch((err) => navigate('/DF-techchallenge', { replace: true }));
  }, []);
  return (
    todo && (
      <div className='Modal'>
        <div className='Todo-card'>
          <h3>Edit Todo</h3>
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
          <label htmlFor='category'>
            CATEGORY
            <select
              name='category'
              id='category'
              onChange={(e) => setTodo({ ...todo, category: e.target.value })}
            >
              <option value='home' selected={todo.category === 'home'}>
                Home
              </option>
              <option value='pro' selected={todo.category === 'pro'}>
                Pro
              </option>
              <option value='family' selected={todo.category === 'family'}>
                Family
              </option>
            </select>
          </label>
          <div className='button-set'>
            <button className='add' onClick={handleChange}>
              SAVE
            </button>
            <button
              className='cancel'
              onClick={() => navigate('/DF-techchallenge')}
            >
              CANCEL
            </button>
          </div>
          <div className='button-set'>
            <button className='delete' onClick={handleDelete}>
              DELETE
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default Todo;
