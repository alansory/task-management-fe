import React from 'react';
import TaskForm from './TaskForm';
import CommentForm from './CommentForm';

const TaskDetail = () => {
  const props = {
    edit: true,
    title:"Task Detail" 
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

export default TaskDetail;
