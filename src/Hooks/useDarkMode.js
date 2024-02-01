import { useContext } from 'react';
import { DarkModeContext } from '../context/ThemeContext';

export const useDarkMode = () => {
  return useContext(DarkModeContext);
};
