const FilterBar = ({ filter, onFilterChange, taskCount }) => {
  const filters = ["all", "pending", "completed"];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-2">
      {/* filter buttons */}
      <div className="flex flex-wrap justify-center bg-[#C9ADA7]/20 p-1 rounded-xl">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${filter === f
                ? "bg-white text-[#22223B] shadow-sm"
                : "text-[#9A8C98] hover:text-[#22223B]"
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* task count */}
      <span className="text-[11px] font-black uppercase tracking-widest text-[#9A8C98]">
        {taskCount} {taskCount === 1 ? "Task" : "Tasks"}
      </span>
    </div>
  );
};

export default FilterBar;