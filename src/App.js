import './App.css';
import PriorityInput from "./components/PriorityInput";
import PriorityList from './components/PriorityList';
import { useState, useEffect } from 'react';

function App() {
  const [priorities, setPriorities] = useState([]);

  // Load saved priorities from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem("priorities");
    if(saved) {
      // setPriorities(JSON.parse(saved));
      try {
        const parsed = JSON.parse(saved);
        if(Array.isArray(parsed)) {
          setPriorities(parsed);
        }
        else {
          console.warn("Saved priorities is not an array, ignoring.")
        }
      }
      catch (error) {
        console.warn("Failed to parse priorities from localStorage:", error);
      }
    }
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">My Priorities</h1>
      <PriorityInput addPriority={addPriority} />
      <PriorityList
        priorities={priorities}
        toggleDone={toggleDone}
        removePriority={removePriority}
      />
    </div>
  );
}

export default App;
