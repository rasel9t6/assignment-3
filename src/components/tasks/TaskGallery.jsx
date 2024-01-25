import EmptyTask from './EmptyTask';
import TaskList from './TaskList';
import TaskController from './TaskController';
import TaskModal from './TaskModal';
import useTaskContext from '../../Hooks/useTaskContext';
import { toast } from 'react-toastify';
import { useRef } from 'react';

const TaskGallery = () => {
  const { state, dispatch } = useTaskContext();
  const { tasks, showAddModal, taskUpdate } = state;

  // Reference to the currently displayed toast
  const toastRef = useRef(null);

  // handlers
  function handleAddEdit(newTask, isAdd) {
    dispatch({ type: 'ADD_EDIT_TASK', newTask, isAdd });
    handleModalClose();

    // Dismiss the existing toast before displaying a new one
    if (toastRef.current) {
      toast.dismiss(toastRef.current);
    }

    // Display toast for add or edit
    const action = isAdd ? 'added' : 'edited';
    const newToast = toast.success(`Task ${action} successfully!`);

    // Store the reference to the current toast
    toastRef.current = newToast;
  }

  function handleEdit(task) {
    dispatch({
      type: 'EDIT_TASK',
      task,
    });
  }

  function handleDelete(taskId) {
    const deletedTask = tasks.find((task) => task.id === taskId);

    dispatch({
      type: 'DELETE_TASK',
      taskId,
    });

    // Dismiss the existing toast before displaying a new one
    if (toastRef.current) {
      toast.dismiss(toastRef.current);
    }

    // Display toast for delete
    const newToast = toast.error(
      `Task "${deletedTask.title}" deleted successfully!`
    );

    // Store the reference to the current toast
    toastRef.current = newToast;
  }

  function handleDeleteAll() {
    dispatch({
      type: 'DELETE_ALL_TASKS',
    });

    // Dismiss the existing toast before displaying a new one
    if (toastRef.current) {
      toast.dismiss(toastRef.current);
    }

    // Display toast for delete
    const newToast = toast.error(`All tasks deleted successfully!`);

    // Store the reference to the current toast
    toastRef.current = newToast;
  }

  function handleFavorite(taskId) {
    const toggledTask = tasks.find((task) => task.id === taskId);
    const newStatus = !toggledTask.isFavorite;
    dispatch({
      type: 'TOGGLE_FAVORITE',
      taskId,
    });

    // Dismiss the existing toast before displaying a new one
    if (toastRef.current) {
      toast.dismiss(toastRef.current);
    }

    // Display toast for toggle favorite
    const action = newStatus ? 'favorited' : 'unfavorited';
    const newToast = toast.info(
      `Task "${toggledTask.title}" ${action} successfully!`
    );

    // Store the reference to the current toast
    toastRef.current = newToast;
  }

  function handleSearch(searchTerm) {
    dispatch({
      type: 'SEARCH_TASK',
      searchTerm,
    });
  }

  function handleModalClose() {
    dispatch({
      type: 'CLOSE_MODAL',
    });
  }

  return (
    <section className='mb-20'>
      {/* show modal */}
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
            onAdd={() => dispatch({ type: 'EDIT_TASK', task: null })}
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
