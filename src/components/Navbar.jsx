import { FaMoon } from 'react-icons/fa';
import { useDarkMode } from '../Hooks/useDarkMode';
import logo from '../assets/lws-logo-en.svg';
import { TbBulbFilled } from 'react-icons/tb';
const Navbar = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <nav className='py-6 md:py-8 fixed top-0 w-full dark:text-white dark:!bg-[#191D26] text-gray-800 bg-slate-300 shadow-sm z-50'>
      <div className='container mx-auto flex items-center justify-between gap-x-6'>
        <a href='/'>
          <img
            className='h-[45px]'
            src={logo}
            alt='Lws'
          />
        </a>

        <button
          onClick={toggleDarkMode}
          className='dark:bg-gray-800 bg-slate-100 dark:text-white px-5 py-3 rounded-md'
        >
          {darkMode ? (
            <TbBulbFilled className='dark:text-yellow-300 text-2xl' />
          ) : (
            <FaMoon className='text-[#191D26] text-2xl' />
          )}
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
