import React, { useState } from 'react';
import axios from 'axios';
import { AiFillCloseSquare } from 'react-icons/ai';
const api_url = import.meta.env.VITE_API_URL;

function Modal({ show }) {
  const { showModal, setShowModal } = show;
  const [todo, setTodo] = useState({ title: '', desc: '' });

  const handleChange = () => {
    axios
      .post(api_url + `/api/todo`, todo)
      .then(() => {
        setShowModal(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className='Modal'>
      <form className='Todo-card' onSubmit={handleChange}>
        <span className='close'>
          <AiFillCloseSquare onClick={() => setShowModal(false)} />
        </span>
        <label htmlFor='title'>
          TITLE
          <input
            type='text'
            name='title'
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            placeholder='required'
            required
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
            placeholder='optionnal'
          ></textarea>
        </label>
        <button type='submit'>CREATE NEW TODO</button>
      </form>
    </div>
  );
}

export default Modal;
