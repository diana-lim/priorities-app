import React from "react";

function PriorityList({ 
    priorities, 
    toggleDone, 
    removePriority,
    editingId,
    editingText,
    setEditingId,
    setEditingText,
    saveEdit 
}) {
  // Sort by priority: high > medium > low
  const priorityOrder = { highest: 1, high: 2, medium: 3, low: 4, lowest: 5 };
  const sorted = [...priorities].sort(
    (a, b) => priorityOrder[a.level] - priorityOrder[b.level]
  );

  // Background colors
  const borderColor = {
    highest: "border-black border-2",
    high: "border-black border-2",
    medium: "border-blue-600 border-2",
    low: "border-green-600 border-2",
    lowest: "border-green-600 border-2",
  };

  return (
    <div className="max-w-xl mx-auto space-y-3 mb-4">
      {sorted.map((p) => (
        <div
        key={p.id}
        className={`p-4 rounded flex justify-between items-center bg-white ${borderColor[p.level]}`}
        >
          {editingId === p.id ? (
            // Edit mode
            <input
              type="text"
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              onBlur={() => saveEdit(p.id)}
              onKeyDown={(e) => e.key === "Enter" && saveEdit(p.id)}
              className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-slate-200"
              autoFocus
            />
          ) : (
            // Display mode
            <div
              onDoubleClick={() => {
                setEditingId(p.id);
                setEditingText(p.text);
              }}
              onClick={() => toggleDone(p.id)}
              className={`flex-1 cursor-pointer ${
                p.done ? "line-through text-gray-500" : ""
              }`}
            >
              {p.text}
            </div>
          )}

            <div className="flex gap-2 ml-2">
                {editingId === p.id ? (
                    <>
                    <button
                        onClick={() => saveEdit(p.id)}
                        className="text-green-600"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => {
                        setEditingId(null);
                        setEditingText("");
                        }}
                        className="text-gray-500"
                    >
                        Cancel
                    </button>
                    </>
                ) : (
                    <>
                    <button
                        onClick={() => {
                        setEditingId(p.id);
                        setEditingText(p.text);
                        }}
                        className="text-blue-600"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => removePriority(p.id)}
                        className="text-red-600"
                    >
                        X
                    </button>
                    </>
                )}
            </div>
        </div>
      ))}
      {sorted.length === 0 && (
        <p className="text-center text-gray-500">No priorities yet!</p>
      )}
    </div>
  );
}

export default PriorityList;
