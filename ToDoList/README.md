# React TypeScript Todo List

A modern, responsive todo list application built with React and TypeScript. The application features a clean interface with task management capabilities, including creating, completing, and deleting tasks, as well as tracking urgent tasks separately.

## Features

- ✅ Create new tasks with optional urgent status
- 📊 Track created, completed, and urgent tasks
- 🗑️ Delete tasks when no longer needed
- 📅 Current date display with day name
- 🎨 Clean and Userfriendly  interface
- 💪 Built with TypeScript for enhanced type safety

## Project Structure

```
src/
├── components/
│   ├── AllTodos/
│   │   ├── AllTodos.css
│   │   └── AllTodos.tsx
│   ├── Form/
│   │   ├── Form.css
│   │   └── Form.tsx
│   ├── TodoData/
│   │   ├── TodoData.module.css
│   │   └── TodoData.tsx
│   └── TodoItem/
│       ├── TodoItem.css
│       └── TodoItem.tsx
├── types/
│   └── todo.ts
├── assets/
├── App.css
├── App.tsx
└── index.tsx
```

## Prerequisites

- Node.js (version 14.0 or higher)
- npm  package manager

## Installation

1. Clone the repository:
```bash
git clone [https://github.com/YaraDaraghmeh/GSG_REACT_NEXT/tree/main/ToDoList]
cd [ToDoList]
```

2. Install dependencies:
```bash
npm install

```

3. Start the development server:
```bash
npm start


```

## Usage

1. Enter a task in the input field at the top of the application
2. Check the "Urgent" checkbox if the task is urgent
3. Click "Add Todo" or press Enter to add the task
4. Click on a task to mark it as complete
5. Click the "×" button to delete a task
6. View task statistics in the dashboard cards

## Component Overview

- **App.tsx**: Main application component that manages state and renders child components
- **Form**: Handles task input and creation
- **TodoData**: Displays statistics about tasks (created, completed, urgent)
- **AllTodos**: Renders the list of all todos
- **TodoItem**: Individual todo item component

## Type Definitions

The main Todo type is defined in `types/todo.ts`:

```typescript
export interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
  isUrgent: boolean;
}
```



## Development Notes

- The project uses functional components with React Hooks
- State management is handled using the useState Hook
- CSS modules are used for component-specific styling
- TypeScript is used throughout the project for type safety

## Future Improvements

- Add local storage persistence
- Implement task categories/tags
- Add due dates for tasks
- Include task priority levels
- Add user authentication
- Implement task filtering and sorting
