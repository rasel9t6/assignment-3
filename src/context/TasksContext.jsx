import { createContext } from 'react';
import { defaultTasks } from '../data/tasksData';
import { useReducer } from 'react';

export const TaskContext = createContext(initialState);
const initialState = {
  tasks: defaultTasks,
  showAddModal: false,
  taskUpdate: null,
  searchTerm: '',
};

/* const filteredTasks = searchTerm
    ? tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : tasks;

  const toggleAddModal = (task = null) => {
    setTaskUpdate(task);
    setShowAddModal((prevShowAddModal) => !prevShowAddModal);
  };

  const handleAddEditTask = (newTask, isAdd) => {
    if (isAdd) {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } else {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === newTask.id ? newTask : task))
      );
    }
    toggleAddModal(); // Close the modal after adding/editing
  };

  const handleEditTask = (task) => {
    toggleAddModal(task);
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleDeleteAllClick = () => {
    setTasks([]);
  };

  const handleFavorite = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isFavorite: !task.isFavorite } : task
      )
    );
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm.trim());
  };
   */

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EDIT_TASK': {
      return;
    }

    default:
      return state;
  }
};
export default function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={(state, dispatch)}>
      {children}
    </TaskContext.Provider>
  );
}
