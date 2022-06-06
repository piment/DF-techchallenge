import React, { useState } from 'react';
import axios from 'axios';
import { AiFillCloseSquare } from 'react-icons/ai';
const api_url =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_API_URL
    : 'https://ata.mura.io';

function Modal({ show }) {
  const { showModal, setShowModal } = show;
  const [todo, setTodo] = useState({ title: '', desc: '' });

  const handleChange = (e) => {
    e.preventDefault();
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
      <h2>Create a new Todo</h2>
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
        <div className='button-set'>
          <button type='submit' className='add'>Add</button>
          <button type='button' className='cancel' onClick={() => setShowModal(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Modal;
