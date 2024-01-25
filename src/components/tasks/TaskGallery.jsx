import { useRef } from 'react';
import EmptyTask from './EmptyTask';
import TaskList from './TaskList';
import TaskController from './TaskController';
import TaskModal from './TaskModal';
import useTaskContext from '../../Hooks/useTaskContext';
import { toast } from 'react-toastify';

const ADD_EDIT_TASK = 'ADD_EDIT_TASK';
const EDIT_TASK = 'EDIT_TASK';
const DELETE_TASK = 'DELETE_TASK';
const DELETE_ALL_TASKS = 'DELETE_ALL_TASKS';
const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
const SEARCH_TASK = 'SEARCH_TASK';
const CLOSE_MODAL = 'CLOSE_MODAL';

const TaskGallery = () => {
  const { state, dispatch } = useTaskContext();
  const { tasks, showAddModal, taskUpdate } = state;

  // Add and Dismiss react-toast to fix multiple toast display at the same time.
  const toastRef = useRef(null);

  const showToast = (message, type) => {
    if (toastRef.current) {
      toast.dismiss(toastRef.current);
    }
    const newToast = toast[type](message);
    toastRef.current = newToast;
  };

  const handleAddEdit = (newTask, isAdd) => {
    dispatch({ type: ADD_EDIT_TASK, newTask, isAdd });
    handleModalClose();
    showToast(`Task ${isAdd ? 'added' : 'edited'} successfully!`, 'success');
  };

  const handleEdit = (task) => {
    dispatch({ type: EDIT_TASK, task });
  };

  const handleDelete = (taskId) => {
    const deletedTask = tasks.find((task) => task.id === taskId);
    dispatch({ type: DELETE_TASK, taskId });
    showToast(`Task "${deletedTask.title}" deleted successfully!`, 'error');
  };

  const handleDeleteAll = () => {
    dispatch({ type: DELETE_ALL_TASKS });
    showToast('All tasks deleted successfully!', 'error');
  };

  const handleFavorite = (taskId) => {
    const toggledTask = tasks.find((task) => task.id === taskId);
    const newStatus = !toggledTask.isFavorite;
    dispatch({ type: TOGGLE_FAVORITE, taskId });
    const action = newStatus ? 'favorited' : 'unfavorited';
    showToast(`Task "${toggledTask.title}" ${action} successfully!`, 'info');
  };

  const handleSearch = (searchTerm) => {
    dispatch({ type: SEARCH_TASK, searchTerm });
  };

  const handleModalClose = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  return (
    <section className='mb-20'>
      {showAddModal && (
        <TaskModal
          onSave={handleAddEdit}
          onClose={handleModalClose}
          taskUpdate={taskUpdate}
        />
      )}

      <div className='container'>
        <div className='rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16'>
          <TaskController
            onSearch={handleSearch}
            onAdd={() => dispatch({ type: EDIT_TASK, task: null })}
            onDeleteAll={handleDeleteAll}
          />
          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onFav={handleFavorite}
            />
          ) : (
            <EmptyTask />
          )}
        </div>
      </div>
    </section>
  );
};

export default TaskGallery;
