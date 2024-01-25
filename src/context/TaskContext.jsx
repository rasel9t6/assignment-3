import { createContext, useReducer } from 'react';
import { defaultTasks } from '../data/tasksData';
export const TaskContext = createContext();
const initialState = {
  tasks: defaultTasks,
  showAddModal: false,
  taskUpdate: null,
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EDIT_TASK':
      if (action.isAdd) {
        return { ...state, tasks: [...state.tasks, action.newTask] };
      } else {
        const updatedTasks = state.tasks.map((task) =>
          task.id === action.newTask.id ? action.newTask : task
        );
        return { ...state, tasks: updatedTasks };
      }

    case 'EDIT_TASK': {
      return { ...state, showAddModal: true, taskUpdate: action.task };
    }
    case 'DELETE_TASK': {
      const tasksAfterDelete = state.tasks.filter(
        (task) => task.id !== action.taskId
      );
      return { ...state, tasks: tasksAfterDelete };
    }
    case 'DELETE_ALL_TASKS': {
      return { ...state, tasks: [] };
    }
    case 'TOGGLE_FAVORITE': {
      const toggleFavorite = state.tasks.map((task) =>
        task.id === action.taskId
          ? { ...task, isFavorite: !task.isFavorite }
          : task
      );
      return { ...state, tasks: toggleFavorite };
    }
    case 'SEARCH_TASK': {
      if (action.searchTerm === '') {
        return { ...state, tasks: defaultTasks };
      } else {
        const filtered = defaultTasks.filter((task) =>
          task.title.toLowerCase().includes(action.searchTerm.toLowerCase())
        );
        return { ...state, tasks: filtered };
      }
    }
    case 'CLOSE_MODAL': {
      return { ...state, showAddModal: false, taskUpdate: null };
    }

    default:
      return state;
  }
};
// useReducer with context provider
export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
