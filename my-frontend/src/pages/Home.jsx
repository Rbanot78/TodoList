// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTasks } from '../api';
import { RxDropdownMenu } from 'react-icons/rx'; 
import { FaSearch, FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa'; // Import pagination icons

const PAGE_SIZE = 4;

function Home() {
    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);  
    const [totalPages, setTotalPages] = useState(0);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [completedTasks, setCompletedTasks] = useState(new Set()); // Track completed tasks

    useEffect(() => {
        const fetchTasks = async () => {
            const data = await getTasks();
            setTasks(data);
            setTotalPages(Math.ceil(data.length / PAGE_SIZE));
        };
        fetchTasks();
    }, []);

    const handleCheckboxChange = (id) => {
        setCompletedTasks(prev => {
            const updated = new Set(prev);
            updated.has(id) ? updated.delete(id) : updated.add(id); // Toggle completion
            return updated;
        });
    };

    const handleFirstPage = () => setCurrentPage(1);
    const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const handleLastPage = () => setCurrentPage(totalPages);

    // Filter and paginate tasks
    const filteredTasks = tasks.filter(task => 
        task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
    ).filter(task => !completedTasks.has(task.id));

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const currentTasks = filteredTasks.slice(startIndex, startIndex + PAGE_SIZE);

    // Toggle dropdown menu visibility
    const toggleDropdown = (taskId) => {
        setActiveDropdown(activeDropdown === taskId ? null : taskId);
    };

    // Function to get highlight color based on task status
    const getHighlightColor = (task) => {
        switch (task.status) {
            case 'Not Started':
                return 'bg-red-200'; // Red for Not Started
            case 'In Progress':
                return 'bg-yellow-200'; // Yellow for In Progress
            case 'Completed':
                return 'bg-green-200'; // Green for Completed
            default:
                return '';
        }
    };

    return (
        <div className="p-4">
            <div className="mb-4 flex justify-end"> {/* Align items to the right */}
                <div className="flex items-center">
                    <FaSearch className="text-gray-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border p-2 w-[150px]" // Set smaller width for the search bar
                    />
                </div>
            </div>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr>
                        <th className="border-b border-gray-300 p-2 text-center"> {/* Center align header */}
                            <input
                                type="checkbox"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        // Mark all as completed
                                        setCompletedTasks(new Set(tasks.map(task => task.id)));
                                    } else {
                                        // Clear completed tasks
                                        setCompletedTasks(new Set());
                                    }
                                }}
                            />
                        </th>
                        <th className="border-b border-gray-300 p-2 text-center">Assigned To</th>
                        <th className="border-b border-gray-300 p-2 text-center">Status</th>
                        <th className="border-b border-gray-300 p-2 text-center">Due Date</th>
                        <th className="border-b border-gray-300 p-2 text-center">Priority</th>
                        <th className="border-b border-gray-300 p-2 text-center">Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTasks.map((task) => (
                        <tr 
                            key={task.id} 
                            className={`${getHighlightColor(task)} ${task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ? 'font-bold' : ''}`} // Highlight based on status and bold if search matches
                        >
                            <td className="border-b p-2 text-center"> {/* Center align data */}
                                <input
                                    type="checkbox"
                                    checked={completedTasks.has(task.id)}
                                    onChange={() => handleCheckboxChange(task.id)}
                                />
                            </td>
                            <td className="border-b p-2 text-center">{task.assignedTo}</td>
                            <td className="border-b p-2 text-center">{task.status}</td>
                            <td className="border-b p-2 text-center">{task.dueDate.split('T')[0]}</td>
                            <td className="border-b p-2 text-center">{task.priority}</td>
                            <td className="border-b p-2 text-center flex justify-between">
                                <span>{task.comment}</span>
                                <div className="relative">
                                    <button onClick={() => toggleDropdown(task.id)}>
                                        <RxDropdownMenu className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                                    </button>
                                    {activeDropdown === task.id && (
                                        <div className="absolute right-0 mt-2 w-24 bg-white shadow-lg rounded-lg z-10">
                                            <Link to={`/edit/${task.id}`} className="block px-4 py-2 text-gray-700 bg-yellow-500 hover:bg-gray-200">
                                                Edit
                                            </Link>
                                            <Link to={`/delete/${task.id}`} className="block px-4 py-2 text-gray-700 bg-yellow-500 hover:bg-gray-200">
                                                Delete
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="bg-gray-300 w-full p-4 mt-4 flex justify-between items-center space-x-2">
                <span className="text-sm font-semibold border p-2 w-[30px]">
                     {filteredTasks.length}
                </span>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleFirstPage}
                        disabled={currentPage === 1}
                        className="bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded flex items-center disabled:bg-gray-400"
                    >
                        <FaAngleDoubleLeft className="mr-1" /> First
                    </button>
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded flex items-center disabled:bg-gray-400"
                    >
                        <FaAngleLeft className="mr-1" /> Prev
                    </button>
                    <span className="text-sm font-semibold border p-2 w-[30px]"> {currentPage}</span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded flex items-center disabled:bg-gray-400"
                    >
                        <FaAngleRight className="mr-1" /> Next
                    </button>
                    <button
                        onClick={handleLastPage}
                        disabled={currentPage === totalPages}
                        className="bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded flex items-center disabled:bg-gray-400"
                    >
                        <FaAngleDoubleRight className="mr-1" /> Last
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
