import { Button, TextInput, Textarea } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  console.log(currentUser);
  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
     const res = await axios.post(`/posts/${postId}/comment`, {
        comment,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>

          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.photourl}
            alt=""
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-xs text-cyan-600 hover:underline"
          >
            <p>@{currentUser.username}</p>
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be logged in to post a Comment.
          <Link className="text-blue-500 hover:underline" to="/sign-in">
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form onSubmit={handleAddComment} className="border border-teal-500 rounded-md p-3">
          <Textarea placeholder="Add a comment..." rows="3" maxLength="200" value={comment} onChange={(e) => setComment(e.target.value)} />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-xs">
              {200 - comment.length} characters remaining
              <Button outline gradientDuoTone="purpleToBlue" type="submit">
                Submit
              </Button>
            </p>
          </div>
        </form>
      )}
    </div>
  );
}

export default CommentSection;
