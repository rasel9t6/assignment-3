import { FaStar } from 'react-icons/fa';
import { getRandomColor } from '../../utils/utils';
const TaskList = ({ tasks, onEdit, onDelete, onFav }) => {
  const handleDelete = (taskId) => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this task?'
    );

    // If the user confirms, proceed with onDelete
    if (isConfirmed) {
      onDelete(taskId);
    }
  };
  return (
    <div className='overflow-auto section-style'>
      <table className='table-fixed overflow-auto xl:w-full'>
        <thead className='border-2 border-slate-300 dark:border-[#2E3443]'>
          <tr>
            <th className='p-4 pb-8 text-sm font-semibold capitalize w-[48px]'></th>
            <th className='p-4 border-r  border-slate-300 dark:border-[#2E3443] pb-8 text-sm font-semibold capitalize w-[300px]'>
              {' '}
              Title{' '}
            </th>
            <th className='p-4 border-r  border-slate-300 dark:border-[#2E3443] pb-8 text-sm font-semibold capitalize w-full'>
              {' '}
              Description{' '}
            </th>
            <th className='p-4 border-r  border-slate-300 dark:border-[#2E3443] pb-8 text-sm font-semibold capitalize md:w-[350px]'>
              {' '}
              Tags{' '}
            </th>
            <th className='p-4 border-r  border-slate-300 dark:border-[#2E3443] pb-8 text-sm font-semibold capitalize md:w-[100px]'>
              {' '}
              Priority{' '}
            </th>
            <th className='p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]'>
              {' '}
              Options{' '}
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className='border-b border-slate-300 dark:border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2'
            >
              <td>
                <button onClick={() => onFav(task.id)}>
                  {task.isFavorite ? (
                    <FaStar className='text-red-500 dark:text-yellow-300' />
                  ) : (
                    <FaStar color='gray' />
                  )}
                </button>
              </td>
              <td>{task.title}</td>
              <td>
                <div>{task.description}</div>
              </td>
              <td>
                <ul className='flex justify-center gap-1.5 flex-wrap'>
                  {task.tags?.map((tag) => (
                    <li key={tag}>
                      <span
                        className={`inline-block shadow-lg h-5 whitespace-nowrap rounded-[45px] px-2.5 text-sm capitalize text-[#F4F5F6]`}
                        style={{
                          backgroundColor: getRandomColor(0.7),
                          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                        }}
                      >
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>
              </td>
              <td className='text-center'>{task.priority}</td>
              <td>
                <div className='flex items-center justify-center space-x-3'>
                  <button
                    className='text-red-500'
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                  <button
                    className='text-blue-500'
                    onClick={() => onEdit(task)}
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TaskList;
