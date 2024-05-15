import React from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
function Comment({ comment, onLike }) {
  const { currentUser } = useSelector((state) => state.user);
  // console.log(comment);
  return (
    <div className="flex border-b dark:border-gray-600 text-sm p-4">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={comment.userId.photourl}
          alt={comment.userId.username}
        ></img>
      </div>
      <div className="flex-1 ">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            @{comment.userId.username}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-gray-500 pb-2">{comment.content}</p>
        <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
          <button
            type="button"
            onClick={() => onLike(comment._id)}
            className={`text-${
              comment.likes.includes(currentUser._id) ? "blue-500" : "gray-400"
            } hover:text-red-500`}
          >
            <FaThumbsUp className="text-sm" />
          </button>

          <p className="text-gray-400">
            {comment.numberOfLikes}{" "}
            {comment.numberOfLikes === 0 || comment.numberOfLikes === 1
              ? "like"
              : "likes"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
