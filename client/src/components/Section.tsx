import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';
import { Task } from '../types/task';
import { Header } from './Header';
import { TaskItem } from './TaskItem';
import toast from 'react-hot-toast';
import { TaskContext } from '../context/TaskContext';
import axios from 'axios';

interface Props {
  status: string;
}

export const Section: React.FC<Props> = ({ status }) => {
  const { tasks, setTasks } = useContext(TaskContext);

  const filteredTasks = tasks.filter((task) => task.status === status);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item: Task) => addItemToSection(item._id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addItemToSection = async (id: string) => {
    try {
      await axios.put(`http://localhost:5500/api/item/${id}`, {
        status: status,
      });
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) =>
          task._id === id ? { ...task, status } : task
        );
        toast(`Task status was changed to ${status}`, {
          icon: '✔',
          duration: 1000,
        });
        return updatedTasks;
      });

    } catch (error) {
      toast.error('Failed to update task status');
    }
  };

  const text =
    status === 'todo'
      ? 'Todo'
      : status === 'inprogress'
        ? 'In Progress'
        : 'Closed';
  const bg =
    status === 'todo'
      ? 'bg-slate-500'
      : status === 'inprogress'
        ? 'bg-purple-500'
        : 'bg-green-500';

  return (
    <div
      ref={drop}
      className={`w-64 rounded-md p-2 ${isOver ? 'bg-slate-200' : ''}`}
    >
      <Header text={text} bg={bg} count={filteredTasks.length} />
      {filteredTasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};
