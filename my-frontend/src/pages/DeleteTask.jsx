// src/pages/DeleteTask.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { deleteTask } from '../api';

function DeleteTask() {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        await deleteTask(id);
        alert("Task deleted successfully!");
        navigate('/');
    };

    return (
        <div className="p-4 max-w-md mx-auto"> {/* Center the form and limit its max width */}
            <h2 className="text-2xl mb-4 text-red-500 text-center">Delete Task</h2>
            <p className="text-center">Are you sure you want to delete this task?</p>
            <div className="flex justify-between mt-6">
                <button
                    onClick={() => navigate('/')}
                    className="bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded flex-1 mr-2"
                >
                    No
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded flex-1 ml-2"
                >
                    Yes
                </button>
            </div>
        </div>
    );
}

export default DeleteTask;
