import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { ImCheckmark, ImCross } from 'react-icons/im';

function TodoItem({
  id,
  title,
  desc,
  created,
  done,
  handleDelete,
  handleDone,
}) {
  const dateFromTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };
  return (
    <div className='Todo'>
      <h3>{title}</h3>
      <span
        className={done ? 'Todo-done done' : 'Todo-done not-done'}
        onClick={() => handleDone(id)}
      >
        {done ? <ImCheckmark /> : <ImCross />}
      </span>
      <p>{desc}</p>
      <p>{dateFromTimestamp(created)}</p>
      {!done ? (
        <>
          <span className='Todo-edit'>
            <AiFillEdit onClick={() => handleDelete(id)} />
          </span>
          <span className='Todo-close'>
            <AiFillDelete onClick={() => handleDelete(id)} />
          </span>
        </>
      ) : (
        <span className='Todo-close closed'>
          <AiFillDelete onClick={() => handleDelete(id)} />
        </span>
      )}
    </div>
  );
}

export default TodoItem;
