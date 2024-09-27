// src/components/Header.jsx
import { Link, useNavigate } from 'react-router-dom';
import { FaTasks } from 'react-icons/fa'; // Task and Search icons from react-icons

const Header = () => {
    const navigate = useNavigate();

    // Function to refresh the page
    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <header className="bg-gray-300 text-black p-4 flex flex-col md:flex-row justify-between items-center">
            {/* Task Manager Title with Icon, clickable */}
            <div className="flex items-center space-x-2 cursor-pointer mb-2 md:mb-0" onClick={() => navigate('/')}>
                <FaTasks className="text-red-500 text-2xl" /> {/* Red Task Icon */}
                <h1 className="text-2xl font-bold">Task Manager</h1>
            </div>

 

            {/* Navigation Buttons */}
            <nav className="flex space-x-1 flex-wrap">
                {/* Create Task Button */}
                <Link
                    to="/create"
                    className="bg-yellow-500 hover:bg-yellow-400 text-gray py-2 px-4 rounded w-full md:w-40 text-center mb-2 md:mb-0"
                >
                    New Task
                </Link>
                {/* Refresh Button */}
                <button
                    onClick={handleRefresh}
                    className="bg-yellow-500 hover:bg-yellow-400 text-black py-2 px-4 rounded w-full md:w-40 text-center mb-2 md:mb-0"
                >
                    Refresh
                </button>
            </nav>
        </header>
    );
};

export default Header;
