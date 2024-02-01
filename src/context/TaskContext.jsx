import { createContext, useEffect, useReducer } from 'react';
// import { defaultTasks } from '../data/tasksData';
import {
  ADD_EDIT_TASK,
  EDIT_TASK,
  DELETE_TASK,
  DELETE_ALL_TASK,
  TOGGLE_MODAL,
  TOGGLE_FAVORITE,
  SEARCH_TASKS,
} from '../utils/utils';

export const TaskContext = createContext();

const storedTasks = JSON.parse(localStorage.getItem('tasks'));

const initialState = {
  tasks: storedTasks,
  showAddModal: false,
  taskUpdate: null,
  searchTerm: '',
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case ADD_EDIT_TASK:
      return {
        ...state,
        tasks: action.isAdd
          ? [...state.tasks, action.newTask]
          : state.tasks.map((task) =>
              task.id === action.newTask.id ? action.newTask : task
            ),
        showAddModal: true,
        taskUpdate: null,
      };

    case EDIT_TASK:
      return {
        ...state,
        taskUpdate: action.task,
        showAddModal: true,
      };

    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.taskId),
      };

    case DELETE_ALL_TASK:
      return {
        ...state,
        tasks: [],
      };

    case TOGGLE_MODAL:
      return {
        ...state,
        taskUpdate: action.task || null,
        showAddModal: !state.showAddModal,
      };

    case TOGGLE_FAVORITE:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.taskId
            ? { ...task, isFavorite: !task.isFavorite }
            : task
        ),
      };

    case SEARCH_TASKS:
      return {
        ...state,
        searchTerm: action.searchTerm.trim(),
      };

    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  useEffect(() => {
    // Check if state.tasks is not an empty array
    if (state.tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    }
  }, [state.tasks]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
