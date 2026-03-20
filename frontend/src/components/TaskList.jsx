import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onToggle, onEdit, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="text-4xl mb-4 text-[#C9ADA7]/40 font-bold italic">
          No Tasks Yet
        </div>
        <p className="text-[#9A8C98] font-medium">
          Add your first task above to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="pb-10">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;