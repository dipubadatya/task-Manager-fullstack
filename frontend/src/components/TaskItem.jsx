import { useState } from "react";
import { Trash2, Edit3, Check, X, Calendar, Flag } from "lucide-react";


const formatDate = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// color map for priority badges
const priorityStyles = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onEdit(task._id, editTitle.trim());
    setIsEditing(false);
  };

  // check if due date has passed
  const isOverdue =
    task.dueDate && !task.completed && new Date(task.dueDate) < new Date();

  return (
    <div className="group flex items-start justify-between p-4 mb-3 bg-white border border-[#C9ADA7]/20 rounded-2xl hover:border-[#FF006E]/30 transition-all shadow-sm">
      <div className="flex items-start gap-4 flex-1">
        {/* checkbox */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task._id, task.completed)}
          className="w-5 h-5 mt-1 rounded-lg border-2 border-[#C9ADA7] checked:bg-[#FF006E] cursor-pointer transition-all"
        />

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              autoFocus
              className="w-full bg-[#F2E9E4] px-3 py-1 rounded-lg outline-none text-[#22223B] font-medium"
            />
          ) : (
            <>

              <span
                className={`block font-medium transition-all ${task.completed
                  ? "line-through text-[#9A8C98] opacity-50"
                  : "text-[#22223B]"
                  }`}
              >
                {task.title}
              </span>


              <div className="flex flex-wrap items-center gap-3 mt-1.5">
                {/* created date */}
                <span className="text-[11px] text-[#9A8C98] font-medium">
                  Created {formatDate(task.createdAt)}
                </span>

                {/* due date */}
                {task.dueDate && (
                  <span
                    className={`flex items-center gap-1 text-[11px] font-semibold ${isOverdue ? "text-red-500" : "text-[#9A8C98]"
                      }`}
                  >
                    <Calendar size={11} />
                    {isOverdue ? "Overdue" : "Due"}{" "}
                    {formatDate(task.dueDate)}
                  </span>
                )}

                {/* priority badge */}
                {task.priority && (
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${priorityStyles[task.priority] || priorityStyles.medium
                      }`}
                  >
                    <Flag size={10} className="inline mr-0.5 -mt-0.5" />
                    {task.priority}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* action buttons */}
      <div className="flex items-center gap-1 ml-4 mt-1">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
            >
              <Check size={18} />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 text-red-400 hover:bg-red-50 rounded-lg"
            >
              <X size={18} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-[#9A8C98] hover:text-[#22223B] hover:bg-[#F2E9E4] rounded-lg transition-colors  group-hover:opacity-100"
            >
              <Edit3 size={16} />
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="p-2 text-[#9A8C98] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors  group-hover:opacity-100"
            >
              <Trash2 size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;