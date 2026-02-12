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
  const [showAll, setShowAll] = useState(false);


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
        p.id === id ? { ...p, text: editingText } : p
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  return (
    <div className="min-h-screen bg-gray-200 p-8 relative">
      <h1 className="text-3xl font-bold mb-12 text-center">Don't forget to...</h1>
      <div className='overflow-y-auto' style={{ height: '65vh' }}>
        <PriorityList
          priorities={priorities.slice(0, 3)} // show only top 3
          toggleDone={toggleDone}
          removePriority={removePriority}
          editingId={editingId}
          editingText={editingText}
          setEditingId={setEditingId}
          setEditingText={setEditingText}
          saveEdit={saveEdit}
        />

        {showAll && (
        <PriorityList
          priorities={priorities.slice(3)}
          toggleDone={toggleDone}
          removePriority={removePriority}
          editingId={editingId}
          editingText={editingText}
          setEditingId={setEditingId}
          setEditingText={setEditingText}
          saveEdit={saveEdit}
        />
        )}
      </div>

      <div className="text-center my-2">
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-blue-500 hover:underline"
        >
          {showAll ? "Hide All Reminders" : "View All Reminders"}
        </button>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-200 transition-all duration-200">
        <div className="max-w-xl mx-auto p-4">
          <PriorityInput addPriority={addPriority} />
        </div>
      </div>


    </div>
  );
}

export default App;
