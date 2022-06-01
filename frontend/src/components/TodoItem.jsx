import { AiFillDelete } from 'react-icons/ai';

function TodoItem({ title, desc, created, handleDelete, id }) {
  const dateFromTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };
  return (
    <div className='Todo'>
      <h3>{title}</h3>
      <p>{desc}</p>
      <p>{dateFromTimestamp(created)}</p>
      <span className='Todo-close' id={id}>
        <AiFillDelete onClick={(e) => handleDelete(e)} />
      </span>
    </div>
  );
}

export default TodoItem;
