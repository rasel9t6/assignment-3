import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import TaskGallery from './components/tasks/TaskGallery';
import TaskProvider from './context/TasksContext';

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TaskProvider>
        <TaskGallery />
      </TaskProvider>
      <Footer />
    </>
  );
}

export default App;
