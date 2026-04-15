# Task Manager App

A simple, clean, and beginner-friendly **Task Manager** built with **React** and **Vite**.
This project was created as a class assignment to practice core React concepts such as state management with `useState`, handling user input, rendering lists, and — most importantly — updating arrays and objects in React state **immutably**.

---

## Description

The Task Manager App lets users add tasks, view them in a styled list, and toggle their completion status. It is intentionally small and readable so that students can focus on the fundamentals of React state without getting distracted by extra libraries or boilerplate.

---

## Features

- Add new tasks with a unique id
- Prevent blank / whitespace-only tasks from being added
- Toggle a task's completion state
- Visually distinguish completed tasks (strike-through, green accent)
- Friendly empty state when no tasks exist
- Press `Enter` to quickly add a task
- Fully responsive layout (mobile-friendly)
- Clean, modern UI with gradient accents

---

## Technologies Used

- [React 18](https://react.dev/) (functional components + hooks)
- [Vite](https://vitejs.dev/) (fast dev server and build tool)
- Plain CSS (no UI frameworks)
- JavaScript (JSX, no TypeScript)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/task-manager-app-react.git
   cd task-manager-app-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## How to Run the App

Start the development server:
```bash
npm run dev
```
Then open the URL shown in the terminal (usually `http://localhost:5173`).

Create a production build:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---

## Project Structure

```
task-manager-app-react/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
├── README.md
└── src/
    ├── main.jsx           # App entry point — mounts <App /> to #root
    ├── App.jsx            # Root component, renders <TaskManager />
    ├── TaskManager.jsx    # Main feature component
    ├── TaskManager.css    # Styles for the TaskManager component
    └── index.css          # Global styles and CSS reset
```

---

## Learning Objectives

By completing this project, a student should be able to:

1. Bootstrap a React project with **Vite**.
2. Split a React app into **functional components**.
3. Manage local state with the **`useState`** hook.
4. Build a **controlled input** that is bound to state.
5. Add new items to an array in state **immutably** using the spread operator.
6. Update a specific object inside an array **immutably** using `.map()`.
7. Render lists with `.map()` and use the `key` prop correctly.
8. Apply conditional CSS classes based on component state.
9. Handle user events like `onClick`, `onChange`, and `onKeyDown`.

---

## Example of React Concepts Used

### 1. Initializing state

```jsx
const [tasks, setTasks] = useState([]);
const [title, setTitle] = useState('');
```

### 2. Adding a task immutably

```jsx
const addTask = () => {
  const trimmedTitle = title.trim();
  if (trimmedTitle === '') return;

  const newTask = {
    id: Date.now(),
    title: trimmedTitle,
    completed: false,
  };

  // Build a new array — never mutate the existing one
  setTasks((prevTasks) => [...prevTasks, newTask]);
  setTitle('');
};
```

### 3. Toggling completion immutably with `.map()`

```jsx
const toggleTaskCompletion = (id) => {
  setTasks((prevTasks) =>
    prevTasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
  );
};
```

Notice that the matching task is replaced with a **brand-new object** (`{ ...task, completed: !task.completed }`) rather than mutating the original. This is the correct way to update nested state in React.

### 4. Rendering the list

```jsx
{tasks.map((task) => (
  <li key={task.id} className={task.completed ? 'task-item task-item--completed' : 'task-item'}>
    {/* ... */}
  </li>
))}
```

---

## Future Improvements

- Persist tasks in `localStorage` so they survive page refreshes
- Delete tasks
- Edit existing task titles
- Filter tasks (All / Active / Completed)
- Add due dates and priorities
- Drag-and-drop reordering
- Dark mode toggle
- Migrate to TypeScript for stronger type safety
- Add unit tests with Vitest and React Testing Library

---

## License

This project is released under the MIT License. See `LICENSE` for details.
