import React, { useState } from "react";

function PriorityInput({ addPriority }) {
  const [text, setText] = useState("");
  const [level, setLevel] = useState("medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    addPriority(text, level);
    setText("");
    setLevel("medium");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 justify-center mb-6"
    >
      <input
        type="text"
        placeholder="Add a new priority..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 rounded w-2/3"
      />
      <select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="high">High 🔴</option>
        <option value="medium">Medium 🟡</option>
        <option value="low">Low 🟢</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 rounded">
        Add
      </button>
    </form>
  );
}

export default PriorityInput;
