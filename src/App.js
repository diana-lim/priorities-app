import logo from './logo.svg';
import './App.css';
import PriorityInput from "./components/PriorityInput";
import PriorityList from './components/PriorityList';
import { useState } from 'react';

function App() {
  const [priorities, setPriorities] = useState([]);

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
