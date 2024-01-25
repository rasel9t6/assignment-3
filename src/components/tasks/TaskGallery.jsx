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

  // handler's
  function handleAddEdit(newTask, isAdd) {
    if (isAdd) {
      setTasks(...tasks, newTask);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }

    handleModalClose();
  }

  function handleEdit(task) {
    setTaskUpdate(task);
    setShowAddModal(true);
  }

  function handleDelete(taskId) {
    const tasksAfterDelete = tasks.filter((task) => task.id !== taskId);
    setTasks(tasksAfterDelete);
  }

  function handleDeleteAll() {
    tasks.length = 0;
    setTasks(...tasks);
  }

  function handleFavorite(taskId) {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isFavorite: !task.isFavorite };
        } else {
          return task;
        }
      })
    );
  }

  function handleSearch(searchTerm) {
    if (searchTerm === '') {
      setTasks(defaultTasks);
    }
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setTasks(...filtered);
  }

  function handleModalClose() {
    setShowAddModal(false);
    setTaskUpdate(null);
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
            onAdd={() => setShowAddModal(true)}
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
