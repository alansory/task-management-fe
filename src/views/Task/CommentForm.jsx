import React, { useState } from 'react';

const CommentForm = () => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    { user: 'Alice', text: 'This is a great start!' },
    { user: 'Bob', text: 'Make sure to add unit tests.' },
    { user: 'Charlie', text: 'Review the design with the team.' }
  ]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      setComments([...comments, { user: 'User', text: newComment }]);
      setNewComment('');
    }
  };

  return (
    <div className="bg-white mt-[6rem]">
      <h2 className="text-xl font-bold">Comments</h2>
      <form onSubmit={handleAddComment}>
        <textarea
          id="comment"
          name="comment"
          value={newComment}
          onChange={handleCommentChange}
          rows="2"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {newComment.trim() !== '' && (
          <button
            type="submit"
            className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Save
          </button>
        )}
      </form>
      <div className="mt-4">
        <div className="space-y-2">
          {comments.map((comment, index) => (
            <div key={index} className="flex items-start space-x-2">
              <span className="text-sm font-bold text-gray-700">{comment.user}:</span>
              <span className="text-sm text-gray-700">{comment.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
