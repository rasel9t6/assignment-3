const getRandomColor = (alpha = 1) => {
  const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)}, ${alpha})`;
  return randomColor;
};

const validateForm = (task) => {
  // form validation
  if (
    !task.title.trim() ||
    !task.description.trim() ||
    !Array.isArray(task.tags) ||
    task.tags.length === 0 ||
    !task.priority.trim()
  ) {
    return false;
  }

  return true;
};
export { getRandomColor, validateForm };
