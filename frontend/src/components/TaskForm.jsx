import { useState } from "react";
import { Plus, Calendar, Flag } from "lucide-react";

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    // send the task data to parent
    onAdd({
      title: title.trim(),
      dueDate: dueDate || null,
      priority,
    });

    // reset form after adding
    setTitle("");
    setDueDate("");
    setPriority("medium");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* task title input */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="What do you need to do?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-[#22223B] font-medium placeholder-[#9A8C98]/60 text-lg"
        />
        <button
          type="submit"
          className="bg-[#22223B] text-white p-3 rounded-2xl hover:bg-[#FF006E] transition-colors shadow-lg shadow-[#22223B]/10"
        >
          <Plus size={20} strokeWidth={3} />
        </button>
      </div>

      {/* due date and priority row */}
      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#C9ADA7]/20">
        {/* due date picker */}
        <div className="flex items-center gap-2 text-sm text-[#9A8C98]">
          <Calendar size={15} />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="bg-transparent outline-none text-[#22223B] font-medium cursor-pointer"
          />
        </div>

        {/* priority selector */}
        <div className="flex items-center gap-2 text-sm text-[#9A8C98]">
          <Flag size={15} />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="bg-transparent outline-none text-[#22223B] font-medium cursor-pointer"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;