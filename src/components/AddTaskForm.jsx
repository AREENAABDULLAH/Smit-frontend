import React, { useState } from "react";
import axios from "axios";

const AddTaskForm = ({ refreshTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");

  const handleAddTask = async (e) => {
    e.preventDefault();

    // Check if both title and description are provided
    if (!title.trim() || !description.trim()) {
      alert("Title and description are required!");
      return;
    }

    const newTask = { title, description, status };

    try {
      // Send POST request to backend
      const response = await axios.post("https://smit-backend-rosy.vercel.app/api/tasks", newTask);

      // Clear the form after successfully adding the task
      setTitle("");
      setDescription("");
      setStatus("To Do");

      // Optionally, refresh tasks in the parent component
      if (refreshTasks) {
        refreshTasks();
      }

      // Alert the user that the task was added successfully
      alert("Task added successfully!");
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    }
  };

  return (
    <form onSubmit={handleAddTask} className="bg-white p-6 rounded shadow mb-8">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
        rows="3"
        required
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;
