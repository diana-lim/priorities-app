import './App.css';
import PriorityInput from "./components/PriorityInput";
import PriorityList from './components/PriorityList';
import { useState, useEffect } from 'react';

function App() {
  const [priorities, setPriorities] = useState(() => {
    try {
      const saved = localStorage.getItem("priorities");
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    }
    catch {
      return [];
    }
  });

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editingLevel, setEditingLevel] = useState("");


  // Save priorities to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("priorities", JSON.stringify(priorities));
  }, [priorities])

  // Add a new priority
  const addPriority = (text, level) => {
    if(!text) return;
    setPriorities([
      ...priorities,
      { id: Date.now(), text, level, done: false }
    ]);
  } 

  // Toggle Done Status
  const toggleDone = (id) => {
    setPriorities(
      priorities.map((p) => 
        p.id === id ? { ...p, done: !p.done } : p
      )
    );
  };

  // Remove a Priority
  const removePriority = (id) => {
    setPriorities(priorities.filter((p) => p.id !== id));
  };

  // Save edits to a priority
  const saveEdit = (id) => {
    setPriorities((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, text: editingText, level: editingLevel } : p
      )
    );
    setEditingId(null);
    setEditingText("");
    setEditingLevel("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">My Priorities</h1>
      <PriorityInput addPriority={addPriority} />
      <PriorityList
        priorities={priorities}
        toggleDone={toggleDone}
        removePriority={removePriority}
        editingId={editingId}
        editingText={editingText}
        setEditingId={setEditingId}
        setEditingText={setEditingText}
        saveEdit={saveEdit}
      />
    </div>
  );
}

export default App;
