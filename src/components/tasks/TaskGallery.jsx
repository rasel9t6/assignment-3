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
const TaskGallery = () => {
  const { state, dispatch } = useTaskContext();
  const { tasks, showAddModal, taskUpdate, searchTerm } = state;

  const filteredTasks = searchTerm
    ? tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : tasks;

  const toggleAddModal = (task = null) => {
    dispatch({
      type: TOGGLE_MODAL,
      task,
    });
  };

  const handleAddEditTask = (newTask, isAdd) => {
    dispatch({
      type: ADD_EDIT_TASK,
      newTask,
      isAdd,
    });
  };

  const handleEditTask = (task) => {
    dispatch({
      type: EDIT_TASK,
      task,
    });
  };

  const handleDeleteTask = (taskId) => {
    dispatch({
      type: DELETE_TASK,
      taskId,
    });
  };

  const handleDeleteAllClick = () => {
    dispatch({
      type: DELETE_ALL_TASK,
    });
  };

  const handleFavorite = (taskId) => {
    dispatch({
      type: TOGGLE_FAVORITE,
      taskId,
    });
  };

  const handleSearch = (searchTerm) => {
    dispatch({
      type: SEARCH_TASKS,
      searchTerm,
    });
  };

  return (
    <section className='mb-20'>
      {/* show modal */}
      {showAddModal && (
        <TaskModal
          onSave={handleAddEditTask}
          onCloseModal={() => toggleAddModal()}
          taskUpdate={taskUpdate}
        />
      )}

      <div className='container'>
        <div className='rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16'>
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
