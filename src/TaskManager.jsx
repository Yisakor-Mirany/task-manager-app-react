import { useState } from 'react';
import './TaskManager.css';

/**
 * TaskManager component
 * -----------------------------------------------------------------
 * A simple task manager that demonstrates:
 *   - useState for state management
 *   - Immutable updates to arrays and objects in React state
 *   - Controlled input fields
 *   - Rendering lists with .map()
 */
function TaskManager() {
  // `tasks` holds the list of task objects: { id, title, completed }
  const [tasks, setTasks] = useState([]);

  // `title` is the controlled value of the input field
  const [title, setTitle] = useState('');

  /**
   * addTask
   * Adds a new task to the tasks array immutably using the spread operator.
   * - Generates a unique id with Date.now()
   * - New tasks always start with completed: false
   * - Prevents empty / whitespace-only tasks from being added
   */
  const addTask = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle === '') {
      return; // Do nothing if the input is blank
    }

    const newTask = {
      id: Date.now(),
      title: trimmedTitle,
      completed: false,
    };

    // Immutable update: build a brand-new array that contains the old
    // tasks plus the new one. We never mutate the existing `tasks` array.
    setTasks((prevTasks) => [...prevTasks, newTask]);

    // Clear the input after adding
    setTitle('');
  };

  /**
   * toggleTaskCompletion
   * Takes a task id and flips its `completed` value immutably.
   * - Uses .map() to create a new array
   * - For the matching task, returns a NEW object (never mutates the old one)
   * - For every other task, returns the original reference
   */
  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  /**
   * handleKeyDown
   * Allows users to press the Enter key to add a task quickly.
   */
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="task-manager">
      <header className="task-manager__header">
        <h1 className="task-manager__title">Task Manager</h1>
        <p className="task-manager__subtitle">
          Stay organized and get things done.
        </p>
      </header>

      {/* Input section for adding new tasks */}
      <section className="task-manager__input-section">
        <input
          type="text"
          className="task-manager__input"
          placeholder="What do you need to do?"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          className="task-manager__add-button"
          onClick={addTask}
        >
          Add Task
        </button>
      </section>

      {/* Task list section */}
      <section className="task-manager__list-section">
        {tasks.length === 0 ? (
          // Empty state message
          <div className="task-manager__empty">
            <p>No tasks yet. Add your first task above!</p>
          </div>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={
                  task.completed
                    ? 'task-item task-item--completed'
                    : 'task-item'
                }
              >
                <div className="task-item__info">
                  <span className="task-item__title">{task.title}</span>
                  <span className="task-item__status">
                    {task.completed ? 'Completed' : 'Pending'}
                  </span>
                </div>
                <button
                  type="button"
                  className="task-item__toggle-button"
                  onClick={() => toggleTaskCompletion(task.id)}
                >
                  {task.completed ? 'Mark Pending' : 'Mark Complete'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default TaskManager;
