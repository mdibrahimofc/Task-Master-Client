import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2 } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const TaskBoard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });

  useEffect(() => {
    // Fetch tasks from the database on mount
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tasks");
        const data = response.data;
        const groupedTasks = { todo: [], inProgress: [], done: [] };

        data.forEach((task) => {
          groupedTasks[task.category].push(task);
        });

        setTasks(groupedTasks);
      } catch (error) {
        toast.error("Failed to load tasks.");
      }
    };

    fetchTasks();
  }, []);

  // Handle Drag-and-Drop
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceColumn = [...tasks[source.droppableId]];
    const destColumn = [...tasks[destination.droppableId]];
    const [movedTask] = sourceColumn.splice(source.index, 1);

    movedTask.category = destination.droppableId;
    destColumn.splice(destination.index, 0, movedTask);

    setTasks({ ...tasks, [source.droppableId]: sourceColumn, [destination.droppableId]: destColumn });

    try {
      await axios.put(`http://localhost:5000/api/tasks/${movedTask.id}`, { category: movedTask.category });
    } catch (error) {
      toast.error("Failed to update task position.");
    }
  };

  // Navigate to Add Task Page
  const addTask = () => navigate("/add-task");

  return (
    <div className="w-full min-h-screen py-10 bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800">
      <Toaster position="top-right" />
      <h2 className="text-4xl font-extrabold text-center text-gray-800 dark:text-white mb-6">
        Task Management Board
      </h2>
      <button
        onClick={addTask}
        className="block mx-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg transition mb-6"
      >
        <Plus className="inline w-5 h-5 mr-2" /> Add Task
      </button>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {Object.keys(tasks).map((columnId) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-white">
                    {columnId === "todo" && "📝 To-Do"}
                    {columnId === "inProgress" && "⚡ In Progress"}
                    {columnId === "done" && "✅ Done"}
                  </h3>
                  {tasks[columnId].map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-4 bg-white dark:bg-gray-700 rounded-lg mb-3 shadow-md border border-gray-300"
                        >
                          <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{task.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{task.description}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;
