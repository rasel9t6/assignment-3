import { useContext } from 'react';
import TaskContext from '../context/TasksContext';

const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a Task Provider');
  }
  return context;
};

export default useTaskContext;
