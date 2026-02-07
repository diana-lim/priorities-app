import React from "react";

function PriorityList({ priorities, toggleDone, removePriority }) {
  // Sort by priority: high > medium > low
  const priorityOrder = { highest: 1, high: 2, medium: 3, low: 4, lowest: 5 };
  const sorted = [...priorities].sort(
    (a, b) => priorityOrder[a.level] - priorityOrder[b.level]
  );

  return (
    <div className="max-w-xl mx-auto space-y-3">
      {sorted.map((p) => (
        <div
          key={p.id}
          className={`p-4 rounded shadow flex justify-between items-center ${
            p.level === "high"
              ? "bg-red-100"
              : p.level === "medium"
              ? "bg-yellow-100"
              : "bg-green-100"
          }`}
        >
          <div
            onClick={() => toggleDone(p.id)}
            className={`flex-1 cursor-pointer ${
              p.done ? "line-through text-gray-500" : ""
            }`}
          >
            {p.text}
          </div>
          <button
            onClick={() => removePriority(p.id)}
            className="text-red-500 font-bold ml-3"
          >
            ✖
          </button>
        </div>
      ))}
      {sorted.length === 0 && (
        <p className="text-center text-gray-500">No priorities yet!</p>
      )}
    </div>
  );
}

export default PriorityList;
