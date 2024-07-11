import React, { useState, useEffect } from 'react';
import { getTaskDetail } from '../../actions/taskActions';
import { getUserList } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const TaskForm = ({ ...props }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector(state => state.task.detail);
  const users = useSelector(state => state.user.data);

  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'TO_DO',
    assignee: '',
    assignees: {},
    dueDate: ''
  });
  const [assignees, setAssignees] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if(id){
      dispatch(getTaskDetail(id));
      dispatch(getUserList())
    } else {
      setTask({
        title: '',
        description: '',
        status: 'TO_DO',
        assignee: '',
        assignees: {},
        dueDate: ''
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id && detail && detail.id !== id) {
      setTask({
        title: detail.title || '',
        description: detail.description || '',
        status: detail.status || 'TO_DO',
        assignee: detail.assignee ? detail.assignee.name : '',
        assignees: detail.assignee || {},
        dueDate: detail.dueDate ? detail.dueDate.split('T')[0] : ''
      });
    }
  }, [id, detail]);

  useEffect(() => {
    const queryParams = {
      email: task.assignee
    }
    if(task.assignee.length >= 2){
      dispatch(getUserList(queryParams))
    }
  }, [dispatch, task.assignee]);

  useEffect(() => {
    if (users) {
      setAssignees(users);
    }
  }, [users]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setTask(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAssigneeClick = (assignee) => {
    setTask(prevState => ({
      ...prevState,
      assignee: assignee.email,
      assignees: assignee
    }));
    setShowDropdown(false);
  };

  const handleAssigneeInputChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (value.trim() === '') {
      console.log('masuk sini')
      setTask(prevState => ({
        ...prevState,
        assignee: '',
        assignees: {}
      }));
      setShowDropdown(false);
    } else {
      const filtered = users.filter(assignee =>
        assignee.email.toLowerCase().includes(value.toLowerCase())
      );
      setAssignees(filtered);
      setShowDropdown(true);
      setTask(prevState => ({
        ...prevState,
        assignee: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white">
      <h2 className="text-xl font-bold mb-4">{ props.title }</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="status"
            name="status"
            value={task.status}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="TO_DO">TO DO</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
        </div>
        <div className="mb-4 relative">
          <label htmlFor="assignee" className="block text-sm font-medium text-gray-700">Assignee</label>
          <input
            type="text"
            id="assignee"
            name="assignee"
            value={task.assignee}
            onChange={handleAssigneeInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {showDropdown && (
            <ul className="p-0 absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md">
              {assignees.map((assignee, index) => (
                <li
                  key={index}
                  onClick={() => handleAssigneeClick(assignee)}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {assignee.email}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
