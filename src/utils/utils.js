const getRandomColor = (alpha = 1) => {
  const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)}, ${alpha})`;
  return randomColor;
};

const validateForm = (task) => {
  // Form validation
  if (
    !task.title.trim() ||
    !task.description.trim() ||
    !Array.isArray(task.tags) ||
    task.tags.length === 0 ||
    !task.priority.trim() ||
    task.tags.some((tag) => tag.trim() === '')
  ) {
    return false;
  }

  return true;
};
export { getRandomColor, validateForm };

const TOGGLE_MODAL = 'TOGGLE_MODAL';
const ADD_EDIT_TASK = 'ADD_EDIT_TASK';
const EDIT_TASK = 'EDIT_TASK';
const DELETE_TASK = 'DELETE_TASK';
const DELETE_ALL_TASK = 'DELETE_ALL_TASK';
const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
const SEARCH_TASKS = 'SEARCH_TASKS';

export {
  TOGGLE_MODAL,
  ADD_EDIT_TASK,
  EDIT_TASK,
  DELETE_TASK,
  DELETE_ALL_TASK,
  TOGGLE_FAVORITE,
  SEARCH_TASKS,
};
