import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentList, saveComment } from '../../actions/commentActions'
import { useParams } from 'react-router-dom';

const CommentForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState('');
  const comments = useSelector(state => state.comment.data) || [];

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    const payloads = {
      content: newComment,
      task_id: Number(id),
    }
    dispatch(saveComment(undefined, payloads))
    const queryParams = {
      task_id: Number(id),
      page: 1,
      per_page: 10
    };
    dispatch(getCommentList(queryParams));
    setNewComment('')
  };

  useEffect(() => {
    const queryParams = {
      task_id: Number(id),
      page: 1,
      per_page: 10
    }
    if(id){
      dispatch(getCommentList(queryParams))
    }
  }, [dispatch, id]);

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
              <span className="text-sm font-bold text-gray-700">{comment.user.email}:</span>
              <span className="text-sm text-gray-700">{comment.content}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
