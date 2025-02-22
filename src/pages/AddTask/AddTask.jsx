import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const AddTask = ({ addNewTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("todo");
  const navigate = useNavigate();

  // Validation & Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Title Validation
    if (title.trim() === "") {
      toast.error("Task title is required!");
      return;
    }
    if (title.length > 50) {
      toast.error("Title cannot exceed 50 characters.");
      return;
    }

    // Description Validation
    if (description.trim() === "") {
      toast.error("Task description is required!");
      return;
    }
    if (description.length > 200) {
      toast.error("Description cannot exceed 200 characters.");
      return;
    }

    const newTask = { title, description, category };

    try {
      const response = await axios.post(`${"http://localhost:5000/api/tasks"}/task`, newTask);
      if (response.data) {
        addNewTask(category, { ...newTask, id: response.data.id });
        toast.success("Task added successfully!");

        setTimeout(() => navigate("/"), 1000); // Redirect to Home
      }
    } catch (error) {
      toast.error("Error adding task. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800">
      <Toaster position="top-right" />
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-10 rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-6">Add New Task</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Task Title */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Task Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
              placeholder="Enter task title"
              maxLength={50}
              required
            />
          </div>

          {/* Task Description */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Task Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
              placeholder="Enter task description"
              rows="8"
              maxLength={200}
              required
            ></textarea>
          </div>

          {/* Task Category */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Task Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option value="todo">To-Do</option>
              <option value="inProgress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
