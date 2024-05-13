import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
function PostPage() {
  const { postSlug } = useParams();
  const [post, setPost] = useState({});
  const fetchPost = async () => {
    try {
      const res = await axios.get(`/api/v1/post/get-posts?slug=${postSlug}`);
      console.log(res);
      if (res.data.success) {
        console.log(res.data.data.posts[0]);
        setPost(res.data.data.posts[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchPost();
  }, [postSlug]);
  return (
    <>
      <div className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
          {post.title}
        </h1>

        <Link
          to={`/search?category=${post.category}`}
          className="self-center mt-5"
        >
          <Button color="gray" pill size="xs">
            {post.category}
          </Button>
        </Link>

        <img
          src={post.image}
          alt={post.title}
          className="mt-10 p-3 max-h-[600px] w-full object-cover"
        />

        <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <span className="italic">
            {(post.content?.length / 1000).toFixed(0)} mins read
          </span>
        </div>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      <div className="max-w-4xl mx-auto w-full">
        <CommentSection postId={post._id} />
      </div>
    </>
  );
}

export default PostPage;
