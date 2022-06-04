import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { ImCheckmark, ImCross } from 'react-icons/im';

function TodoItem({
  id,
  title,
  desc,
  created,
  done,
  handleDelete,
  handleEdit,
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
      <p>{dateFromTimestamp(created)}</p>
      {!done ? (
        <>
          <span className='Todo-edit' onClick={() => handleEdit(id)}>
            <AiFillEdit />
          </span>
          <span className='Todo-close' onClick={() => handleDelete(id)}>
            <AiFillDelete />
          </span>
        </>
      ) : (
        <span className='Todo-close closed' onClick={() => handleDelete(id)}>
          <AiFillDelete  />
        </span>
      )}
    </div>
  );
}

export default TodoItem;
