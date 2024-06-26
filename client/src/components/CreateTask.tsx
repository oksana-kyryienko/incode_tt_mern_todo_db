import { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import toast from 'react-hot-toast';
import axios from 'axios';

export const CreateTask: React.FC = () => {
  const { tasks, setTasks } = useContext(TaskContext);

  const [task, setTask] = useState({
    id: '',
    title: '',
    description: '',
    status: 'todo'
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!task.title.trim() || /^\s*$/.test(task.title)) {
      return toast.error('Input cannot be empty', {duration: 1000}); 
    }

    if (task.title.trim().length > 20) {
      setTask(prevTask => ({ ...prevTask, title: '' }));
      return toast.error('Title cannot contain more than 20 characters', {duration: 1000}); 
    }

    try {
      const res = await axios.post('http://localhost:5500/api/item',  {
        title: task.title,
        description: task.description,
        status: task.status
      });
      if (res.status === 200) {
        const newTask = { ...task, _id: res.data._id };
        const updatedTasks = [...tasks, newTask];
       
        setTasks(updatedTasks);
    
        toast.success('Task was created', { duration: 1000 });
        setTask({
          id: '',
          title: '',
          description: '',
          status: 'todo'
        });
      } else {
        toast.error('Failed to create task');
      }
    } catch (error) {
      toast.error('Failed to create task');
    }

   
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTask(prevTask => ({ ...prevTask, [name]: value }));
  };
  
  return (
    <form className='flex flex-col items-center justify-between gap-10' onSubmit={handleSubmit}>
      <input 
        type="text" 
        className="border-2 border-slate-400 bg-slate-100 rounded-md h-12 w-64 px-1"
        name="title"
        value={task.title}
        onChange={handleChange}
      />
      <textarea 
        className="border-2 border-slate-400 bg-slate-100 rounded-md h-20 w-64 px-1"
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Enter description"
      />
      <button className="bg-cyan-500 rounded-md px-4 h-12 w-60 text-white">Create</button>
    </form>
  );
};
