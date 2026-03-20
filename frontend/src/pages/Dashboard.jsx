import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import FilterBar from "../components/FilterBar";
import { LogOut, CheckCircle, Sparkles } from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      setError("Could not load tasks");
    } finally {
      setLoading(false);
    }
  };

  // create a new task 
  const addTask = async (taskData) => {
    try {
      const res = await api.post("/tasks", {
        title: taskData.title,
        dueDate: taskData.dueDate,
        priority: taskData.priority,
      });
      setTasks([res.data, ...tasks]);
    } catch (err) {
      setError("Could not add task");
    }
  };


  const toggleTask = async (id, completed) => {
    try {
      const res = await api.put(`/tasks/${id}`, { completed: !completed });
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      setError("Failed to update status");
    }
  };

  // edit a task
  const editTask = async (id, newTitle) => {
    try {
      const res = await api.put(`/tasks/${id}`, { title: newTitle });
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      setError("Failed to rename task");
    }
  };

  // remove a task
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      setError("Failed to delete task");
    }
  };


  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F2E9E4] font-['Nunito'] text-[#22223B]">

      <nav className=" px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-[#22223B] p-1.5 rounded-lg">
              <Sparkles size={18} className="text-[#FF006E]" />
            </div>
            <span className="text-xl font-black tracking-tight uppercase">TaskFlow</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm font-bold text-[#FF006E] hover:opacity-70 transition"
          >

            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight">My Tasks</h1>
          <p className="text-[#9A8C98] font-medium">
            Welcome back, {user?.name || "User"}.
          </p>
        </div>

        {/* error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex justify-between items-center text-sm font-bold">
            {error}
            <button onClick={() => setError("")}>&times;</button>
          </div>
        )}

        <div className="space-y-6">

          <div className="bg-white p-6 rounded-3xl border border-[#C9ADA7]/30 shadow-sm">
            <TaskForm onAdd={addTask} />
          </div>

          {/* task list with filters */}
          <div className="bg-white/50 p-2 rounded-3xl border border-[#C9ADA7]/20">
            <FilterBar
              filter={filter}
              onFilterChange={setFilter}
              taskCount={filteredTasks.length}
            />

            <div className="mt-4 px-2">
              {loading ? (
                <div className="py-20 text-center text-[#9A8C98] font-bold">
                  Loading tasks...
                </div>
              ) : (
                <TaskList
                  tasks={filteredTasks}
                  onToggle={toggleTask}
                  onEdit={editTask}
                  onDelete={deleteTask}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;