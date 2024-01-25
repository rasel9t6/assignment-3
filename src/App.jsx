import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import TaskGallery from './components/tasks/TaskGallery';
import { TaskProvider } from './context/TaskContext';

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      {/* TaskProvider Context API Provide Tasks for Consumer TaskGallery component */}
      <TaskProvider>
        <TaskGallery />
      </TaskProvider>
      <ToastContainer position='bottom-right' />
      <Footer />
    </>
  );
}

export default App;
