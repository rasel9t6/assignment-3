import EmptyTask from './EmptyTask';
import TaskList from './TaskList';
import TaskController from './TaskController';
import { defaultTasks } from '../../data/tasksData';
import { useState } from 'react';
import TaskModal from './TaskModal';
const TaskGallery = () => {
  const [tasks, setTasks] = useState(defaultTasks);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskUpdate, setTaskUpdate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  console.log('All tasks:', tasks);
  console.log('Modals:', showAddModal);
  console.log('Edited Tasks:', taskUpdate);

  // handler's
  function handleAddEditTask(newTask, isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
      setShowAddModal(true);
    }
  }
  function getFilteredTasks() {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  function handleEditTask(task) {
    setTaskUpdate(task);
    setShowAddModal(true);
  }

  function handleDeleteTask(taskId) {
    const tasksAfterDelete = tasks.filter((task) => task.id !== taskId);
    setTasks(tasksAfterDelete);
  }

  function handleDeleteAllClick() {
    tasks.length = 0;
    setTasks([...tasks]);
  }

  function handleFavorite(taskId) {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    const newTasks = [...tasks];

    newTasks[taskIndex].isFavorite = !newTasks[taskIndex].isFavorite;

    setTasks(newTasks);
  }
  function handleSearch(searchTerm) {
    setSearchTerm(searchTerm.trim());
  }
  function handleAddClick() {
    setShowAddModal(true);
  }
  function handleCloseClick() {
    setShowAddModal(false);
    setTaskUpdate(null);
  }
  return (
    <section className='mb-20'>
      {/* show modal */}
      {showAddModal && (
        <TaskModal
          onSave={handleAddEditTask}
          onCloseModal={handleCloseClick}
          taskUpdate={taskUpdate}
        />
      )}

      <div className='container'>
        <div className='rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16'>
          <TaskController
            onSearch={handleSearch}
            onAddModal={handleAddClick}
            onDeleteAll={handleDeleteAllClick}
          />
          {getFilteredTasks().length > 0 ? (
            <TaskList
              tasks={getFilteredTasks()}
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
