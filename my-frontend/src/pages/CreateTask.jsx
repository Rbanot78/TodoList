// src/pages/CreateTask.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../api';

function CreateTask() {
    const navigate = useNavigate();
    const [task, setTask] = useState({
        assignedTo: '',
        status: 'not started',
        dueDate: '',
        priority: 'normal',
        comment: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createTask(task);
        alert("Task created successfully!");
        navigate('/');
    };

    return (
        <div className="p-4 max-w-md mx-auto"> {/* Center the form and limit its max width */}
            <h2 className="text-2xl mb-4 text-center">New Task</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Assigned To"
                    value={task.assignedTo}
                    onChange={(e) => setTask({ ...task, assignedTo: e.target.value })}
                    className="border p-2 w-full rounded"
                    required
                />
                <select
                    value={task.status}
                    onChange={(e) => setTask({ ...task, status: e.target.value })}
                    className="border p-2 w-full rounded"
                    required
                >
                    <option value="not started">Not Started</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <input
                    type="date"
                    value={task.dueDate}
                    onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                    className="border p-2 w-full rounded"
                    required
                />
                <select
                    value={task.priority}
                    onChange={(e) => setTask({ ...task, priority: e.target.value })}
                    className="border p-2 w-full rounded"
                    required
                >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                </select>
                <textarea
                    placeholder="Comment"
                    value={task.comment}
                    onChange={(e) => setTask({ ...task, comment: e.target.value })}
                    className="border p-2 w-full rounded"
                />
                <div className="flex justify-between mt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="bg-yellow-500 hover:bg-yellow-400 text-black py-2 px-4 rounded w-full mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-yellow-500 hover:bg-yellow-400 text-black py-2 px-4 rounded w-full ml-2"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateTask;
