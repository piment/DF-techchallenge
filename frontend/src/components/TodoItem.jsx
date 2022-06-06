import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { ImCheckmark, ImCross } from 'react-icons/im';
import {
  FaRegCheckCircle,
  FaGalacticRepublic,
  FaRegCircle,
  FaEmpire,
  FaJediOrder,
} from 'react-icons/fa';

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
    const days = Math.floor(delta / (1000 * 60 * 60 * 24));
    return days > 1 ? `${days} days ago` : `${days} day ago`;
  };
  const logo = (category) => {
    if (category === 'home') return <FaGalacticRepublic />;
    if (category === 'pro') return <FaEmpire />;
    if (category === 'family') return <FaJediOrder />;
  };
  return (
    <div className={`card-item-${category}`}>
      <span className='card-item-logo'>{logo(category)}</span>
      <span className='card-item-status' onClick={() => handleDone(id)}>
        {done ? <FaRegCheckCircle /> : <FaRegCircle />}
      </span>
      <h3 onClick={() => handleEdit(id)}>{title}</h3>
      <span className='card-item-baseline'>{getCreatedSince(created)}</span>
    </div>
  );
}

export default TodoItem;
