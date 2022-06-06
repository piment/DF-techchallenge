import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
const api_url =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_API_URL
    : 'https://ata.mura.io';

function TodosList() {
  const [todos, setTodos] = useState();
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const getTodos = () => {
    axios
      .get(api_url + '/api/todo')
      .then((data) => setTodos(data.data))
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    axios
      .delete(api_url + `/api/todo/${id}`)
      .then((result) => getTodos())
      .catch((error) => console.log(error));
  };

  const handleDone = (id) => {
    const currentTodo = todos.filter((todo) => todo.id == id)[0];
    axios
      .put(api_url + `/api/todo/${id}`, {
        done: currentTodo.done ? 0 : 1,
      })
      .then((result) => getTodos())
      .catch((error) => console.log(error));
  };

  const handleEdit = (id) => {
    navigate('/DF-techchallenge/' + id);
  };

  const sortByDate = (array, order) => {
    if (order && order.toLowerCase() === 'desc') {
      return array.sort((current, next) => current.created - next.created);
    }
    return array.sort((current, next) => next.created - current.created);
  };

  const sortByStatus = (array, status) => {
    if (status && status.toLowerCase() === 'done') {
      return array.filter((el) => el.done);
    }
    return array.filter((el) => !el.done);
  };

  const getDone = (array) => {
    const done = sortByStatus(array, 'done');
    return sortByDate(done);
  };

  const getUnDone = (array) => {
    const undone = sortByStatus(array);
    return sortByDate(undone);
  };

  const getLeft = (array) => {
    const length = array.length;
    return length > 1 ? `${length} lefts` : `${length} left`;
  };

  useEffect(() => {
    getTodos();
  }, [showModal]);

  return (
    <div className='Todolist'>
      <section className='cards'>
        <span className='cards-lefts'>
          {todos && getLeft(getUnDone(todos))}
        </span>
        <h3>To Do</h3>
        <ul className='cards-list'>
          {todos &&
            getUnDone(todos).map((todo) => (
              <TodoItem
                key={todo.id}
                {...todo}
                handleDelete={handleDelete}
                handleDone={handleDone}
                handleEdit={handleEdit}
                category='orange'
              />
            ))}
        </ul>
      </section>
      <section className='cards'>
        <h3>Done</h3>
        <ul className='cards-list'>
          {todos &&
            getDone(todos).map((todo) => (
              <TodoItem
                key={todo.id}
                {...todo}
                handleDelete={handleDelete}
                handleDone={handleDone}
                handleEdit={handleEdit}
                category='orange'
              />
            ))}
        </ul>
      </section>
      <span className='new-todo' onClick={() => setShowModal(true)}>
        add a new todo &nbsp; <AiOutlineAppstoreAdd />
      </span>
      {showModal && <Modal show={{ showModal, setShowModal }} />}
    </div>
  );
}

export default TodosList;
