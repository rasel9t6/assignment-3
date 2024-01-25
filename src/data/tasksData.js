const defaultTasks = [
  {
    id: crypto.randomUUID(),
    title: 'Learn React Native',
    description:
      'I want to Learn React such thanI can treat it like my slave and make it do whatever I want to do.',
    tags: ['web', 'react', 'js'],
    priority: 'High',
    isFavorite: true,
  },
  {
    id: crypto.randomUUID(),
    title: 'Integration API',
    description:
      'Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.',
    tags: ['web', 'python', 'API'],
    priority: 'High',
    isFavorite: true,
  },
];

export { defaultTasks };
