import {
  TOGGLE_MODAL,
  ADD_EDIT_TASK,
  EDIT_TASK,
  DELETE_TASK,
  DELETE_ALL_TASK,
  TOGGLE_FAVORITE,
  SEARCH_TASKS,
} from '../../utils/utils';

import EmptyTask from './EmptyTask';
import TaskList from './TaskList';
import TaskController from './TaskController';
import TaskModal from './TaskModal';
import useTaskContext from '../../Hooks/useTaskContext';
import { useMemo, useRef } from 'react';
import { toast } from 'react-toastify';

const TaskGallery = () => {
  const { state, dispatch } = useTaskContext();
  const { tasks, showAddModal, taskUpdate, searchTerm } = state;

  // Add and Dismiss react-toast to fix multiple toast display at the same time.
  const toastRef = useRef(null);

  const showToast = (message, type) => {
    if (toastRef.current) {
      toast.dismiss(toastRef.current);
    }
    const newToast = toast[type](message);
    toastRef.current = newToast;
  };

  //Filtered tasks
  const filteredTasks = useMemo(() => {
    return searchTerm
      ? tasks.filter((task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : tasks;
  }, [searchTerm, tasks]);

  const handleAddEditTask = (newTask, isAdd) => {
    dispatch({
      type: ADD_EDIT_TASK,
      newTask,
      isAdd,
    });

    showToast(`Task ${isAdd ? 'added' : 'edited'} successfully!`, 'success');
  };

  const handleEditTask = (task) => {
    dispatch({
      type: EDIT_TASK,
      task,
    });
  };

  const handleDeleteTask = (taskId) => {
    const deletedTask = tasks.find((task) => task.id === taskId);
    dispatch({
      type: DELETE_TASK,
      taskId,
    });

    showToast(`Task "${deletedTask.title}" deleted successfully!`, 'error');
  };

  const handleDeleteAllClick = () => {
    dispatch({
      type: DELETE_ALL_TASK,
    });
    showToast('All tasks deleted successfully!', 'error');
  };

  const handleFavorite = (taskId) => {
    const toggledTask = tasks.find((task) => task.id === taskId);
    const newStatus = !toggledTask.isFavorite;
    const action = newStatus ? 'favorited' : 'unfavorited';

    dispatch({
      type: TOGGLE_FAVORITE,
      taskId,
    });
    showToast(`Task "${toggledTask.title}" ${action} successfully!`, 'info');
  };

  const handleSearch = (searchTerm) => {
    dispatch({
      type: SEARCH_TASKS,
      searchTerm,
    });
  };

  const toggleAddModal = (task = null) => {
    dispatch({
      type: TOGGLE_MODAL,
      task,
    });
  };

  return (
    <section className='mb-20 section-style'>
      {/* show modal */}
      {showAddModal && (
        <TaskModal
          onSave={handleAddEditTask}
          onCloseModal={() => toggleAddModal()}
          taskUpdate={taskUpdate}
        />
      )}

      <div className='container '>
        <div className='rounded-xl border dark:border-[rgba(206,206,206,0.12)]  border-[rgba(206,206,206,0.80)] shadow-sm section-style px-6 py-8 md:px-9 md:py-16'>
          <TaskController
            onSearch={handleSearch}
            onAddModal={() => toggleAddModal()}
            onDeleteAll={handleDeleteAllClick}
          />
          {filteredTasks.length > 0 ? (
            <TaskList
              tasks={filteredTasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
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
