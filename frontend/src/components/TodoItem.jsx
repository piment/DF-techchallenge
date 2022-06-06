import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { ImCheckmark, ImCross } from 'react-icons/im';
import { FaRegCheckCircle, FaHome,FaRegCircle } from 'react-icons/fa';

function TodoItem({
  id,
  title,
  desc,
  created,
  category,
  done,
  handleDelete,
  handleEdit,
  handleDone,
}) {
  const getCreatedSince = (timestamp) => {
    const now = Date.now();
    const madeOn = +timestamp;
    const delta = now - madeOn;
    const days = Math.floor(delta / (1000 * 60 *60 * 24));
    return days > 1 ? `${days} days ago`: `${days} day ago`;
  };

  return (
    <div className={`card-item-${category}`}>
      <span className='card-item-logo'><FaHome /></span>
      <span className='card-item-status' onClick={() => handleDone(id)}>{ done ? (<FaRegCheckCircle />) : (<FaRegCircle />)}</span>
      <h3 onClick={() => handleEdit(id)}>{title}</h3>
      <span className="card-item-baseline">{ getCreatedSince(created) }</span>
      {/* <span
        className={done ? 'Todo-done done' : 'Todo-done not-done'}
        onClick={() => handleDone(id)}
      >
        {done ? <ImCheckmark /> : <ImCross />}
      </span>
      <p>{dateFromTimestamp(created)}</p>
      {!done ? (
        <>
          <span className='Todo-close' onClick={() => handleDelete(id)}>
            <AiFillDelete />
          </span>
        </>
      ) : (
        <span className='Todo-close closed' onClick={() => handleDelete(id)}>
          <AiFillDelete  />
        </span>
      )} */}
    </div>
  );
}

export default TodoItem;
