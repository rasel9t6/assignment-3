import { v4 as uuidv4 } from 'uuid';

const defaultTasks = [
  {
    id: uuidv4(),
    title: 'Learn Next.js',
    description:
      'I want to learn Next JS so that I can treat it like a slave and command it to do whatever I want.',
    tags: ['next js', 'react', 'js'],
    priority: 'High',
    isFavorite: true,
  },
  {
    id: uuidv4(),
    title: 'Learn React Native',
    description:
      'I want to Learn React such that I can treat it like my slave and make it do whatever I want to do.',
    tags: ['web', 'react', 'js'],
    priority: 'High',
    isFavorite: false,
  },
  {
    id: uuidv4(),
    title: 'Integration API',
    description:
      'Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.',
    tags: ['web', 'python', 'API'],
    priority: 'High',
    isFavorite: false,
  },
];

export { defaultTasks };
