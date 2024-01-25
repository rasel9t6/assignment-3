const getRandomColor = (alpha = 1) => {
  const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)}, ${alpha})`;
  return randomColor;
};

export { getRandomColor };
