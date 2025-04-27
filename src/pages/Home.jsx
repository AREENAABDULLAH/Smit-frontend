



import React from "react";
import useTasks from "../hooks/useTasks";
import AddTaskForm from "../components/AddTaskForm";
import TaskBoard from "../components/TaskBoard";
import "./Home.css"; // CSS import

const Home = () => {
  const {
    tasks,
    title,
    description,
    status,
    setTitle,
    setDescription,
    setStatus,
    handleAddTask,
    handleDeleteTask,
    onDragEnd,
  } = useTasks();

  return (
    <div className="p-6 min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Task Manager</h1>
        <AddTaskForm
          title={title}
          description={description}
          status={status}
          setTitle={setTitle}
          setDescription={setDescription}
          setStatus={setStatus}
          handleAddTask={handleAddTask}
        />
        <TaskBoard
          tasks={tasks}
          handleDeleteTask={handleDeleteTask}
          onDragEnd={onDragEnd}
        />
      </div>
    </div>
  );
};

export default Home;

