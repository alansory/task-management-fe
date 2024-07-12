import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; 
import { deleteTask, getTaskList } from '../../actions/taskActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaEye, FaTrash } from 'react-icons/fa';
import DeleteModal from '../../components/Modal/DeleteModal';

const TaskList = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate(); 
  const [taskId, setTaskId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortStatus, setSortStatus] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(20); 
  const isFetching = useSelector(state => state.task.isFetching) || false;
  const isDeleted = useSelector(state => state.task.isDeleted) || false;
  const tasks = useSelector(state => state.task.data) || [];
  const paging = useSelector(state => state.task.paging) || null;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleDeleteModal = (id) => {
    setShowConfirmModal(true)
    setTaskId(id)
  };

  useEffect(() => {
    const queryParams = {
      title: searchTerm,
      status: sortStatus,
      page: currentPage,
      per_page: perPage
    }
    dispatch(getTaskList(queryParams));
    if(isDeleted){
      setShowConfirmModal(false)
    }
  }, [dispatch, searchTerm, sortStatus, currentPage, perPage, isDeleted]);

  const total = paging ? paging.total : 0;
  const totalPages = Math.ceil(total / perPage);
  const handlePagination = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="h-full flex flex-column ml-5 mr-5">
      <DeleteModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => handleDelete(taskId)}
      />
      <h2 className="text-xl font-bold mt-4">Task List</h2>
      <div className="flex items-center justify-between mb-3">
        <input
          type="text"
          placeholder="Search tasks by title"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border text-xs px-2 py-2 rounded-sm w-60"
        />
        <div className="flex items-center">
          <button
            onClick={() => navigateTo('/tasks/create')}
            className="bg-blue-500 text-white px-3 py-1 rounded-sm hover:bg-blue-600"
          >
            +
          </button>
          <select
            value={sortStatus}
            onChange={handleSortChange}
            className="border text-xs px-2 py-2 rounded-sm ml-2"
          >
            <option value="">Sort Status...</option>
            <option value="TO_DO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
        </div>
      </div>
      {isFetching && !taskId ? (
        <div className="text-center my-4">Loading...</div>
      ) : (
        <table className="w-80% divide-y divide-gray-200 shadow-none">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="border px-6 py-2 text-left text-xs font-medium tracking-wider w-[1rem]">
                ID
              </th>
              <th scope="col" className="border px-6 py-2 text-left text-xs font-medium tracking-wider">
                Title
              </th>
              <th scope="col" className="border px-6 py-2 text-left text-xs font-medium tracking-wider">
                Description
              </th>
              <th scope="col" className="border px-6 py-2 text-left text-xs font-medium tracking-wider w-[1rem]">
                Due Date
              </th>
              <th scope="col" className="border px-6 py-2 text-left text-xs font-medium tracking-wider w-[1rem]">
                Status
              </th>
              <th scope="col" className="border text-center px-6 py-2 text-xs font-medium tracking-wider w-[10rem]">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="border px-6 py-2 whitespace-nowrap text-xs text-gray-900 w-[1rem]">{task.id}</td>
                <td className="border px-6 py-2 whitespace-nowrap text-xs text-gray-900">{task.title}</td>
                <td className="border px-6 py-2 whitespace-nowrap text-xs text-gray-900">{task.description}</td>
                <td className="border px-6 py-2 whitespace-nowrap text-xs text-gray-900 w-[1rem]">
                  {task.due_date ? new Date(task.due_date).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }): '-'}
                </td>
                <td className="border px-6 py-2 whitespace-nowrap text-xs text-gray-900  w-[1rem]">{task.status.replace(/_/g, ' ')}</td>
                <td className="flex items-center space-x-2 border px-6 py-2 whitespace-nowrap text-xs text-gray-900 w-[10rem]">
                  <Link to={`/tasks/${task.id}`} className="flex items-center text-blue-500 no-underline hover:underline mr-2">
                    <FaEye className="mr-1" />
                    View
                  </Link>
                  <button
                    onClick={() => handleDeleteModal(task.id)}
                    className="flex items-center text-red-500 no-underline hover:underline"
                  >
                    <FaTrash className="mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="mt-4 flex justify-end">
        <nav className="relative z-0 inline-flex shadow-sm">
          <button
            onClick={() => handlePagination(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded-md text-xs mr-1 ${currentPage === 1 ? 'text-gray-900 cursor-not-allowed' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}`}
          >
           {"<"} Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePagination(index + 1)}
              className={`px-3 py-2 rounded-md text-xs mr-1 ${currentPage === index + 1 ? 'text-black' : 'text-gray-900 hover:bg-gray-300'}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePagination(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded-md text-xs ${currentPage === totalPages ? 'text-gray-900 cursor-not-allowed' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}`}
          >
            Next {">"}
          </button>
        </nav>
      </div>
    </div>
  );
};

export default TaskList;
