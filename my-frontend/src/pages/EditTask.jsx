// src/pages/EditTask.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTask, updateTask } from '../api';

function EditTask() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({
        assignedTo: '',
        status: 'not started',
        dueDate: '',
        priority: 'normal',
        comment: '',
    });

    useEffect(() => {
        const fetchTask = async () => {
            const data = await getTask(id);
            setTask(data);
        };
        fetchTask();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateTask(id, task);
        alert("Task updated successfully!");
        navigate('/');
    };

    return (
        <div className="p-4 max-w-md mx-auto"> {/* Center the form and limit its max width */}
            <h2 className="text-2xl mb-4 text-center font-bold">Edit Task</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Assigned To"
                    value={task.assignedTo}
                    onChange={(e) => setTask({ ...task, assignedTo: e.target.value })}
                    className="border p-2 w-full rounded-md"
                    required
                />
                <select
                    value={task.status}
                    onChange={(e) => setTask({ ...task, status: e.target.value })}
                    className="border p-2 w-full rounded-md"
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
                    className="border p-2 w-full rounded-md"
                    required
                />
                <select
                    value={task.priority}
                    onChange={(e) => setTask({ ...task, priority: e.target.value })}
                    className="border p-2 w-full rounded-md"
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
                    className="border p-2 w-full rounded-md"
                />
                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="bg-yellow-500 hover:bg-yellow-400 text-black py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-yellow-500 hover:bg-yellow-400 text-black py-2 px-4 rounded"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditTask;
