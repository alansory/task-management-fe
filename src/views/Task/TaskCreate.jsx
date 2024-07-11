import React from 'react';
import TaskForm from './TaskForm';
import CommentForm from './CommentForm';

const TaskCreate = () => {
  const props = {
    edit: false,
    title:"Task Create" 
  };

  return (
    <div className="max-w-4xl mx-[10rem] mt-2 bg-white p-6">
      <TaskForm 
        {...props}
      />
      <CommentForm />
    </div>
  );
}

export default TaskCreate;
