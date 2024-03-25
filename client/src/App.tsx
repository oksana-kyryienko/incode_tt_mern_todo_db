import { useEffect, useState } from 'react';
import { CreateTask } from './components/CreateTask';
import { ListTasks } from './components/ListTasks';
import { Task } from './types/task';
import toast, { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TaskContext } from './context/TaskContext';

import './App.css';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const getItem = async () => {
      try {
        const res = await axios.get('http://localhost:5500/api/items');
        setTasks(res.data);
      } catch (err) {
        toast.error('Can not load items, try later');
      }
    };
    getItem();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      <DndProvider backend={HTML5Backend}>
        <Toaster />
        <div className="bg-slate-100 h-screen flex flex-col pt-20 gap-16">
          <CreateTask />
          <ListTasks />
        </div>
      </DndProvider>
    </TaskContext.Provider>
  );
}

export default App;
