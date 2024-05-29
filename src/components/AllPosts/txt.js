import { Card } from "primereact/card";
import dummypic from "../../images/profileImg.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import "./allposts.css";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";

export default function AllPosts({ response }) {
  const reduxData = useSelector((state) => state.profile.userDetails);
  const userId = reduxData?._id;
  const username = reduxData?.username;
  const [posts, setPosts] = useState(response);
  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    setPosts(response);
  }, [response]);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const addComment = async (postId) => {
    try {
      const headers = {
        authToken: localStorage.getItem("authToken"),
        "Content-Type": "application/json",
      };
      const response = await axios.post(
        `http://localhost:8080/api/posts/${postId}/comments`,
        {
          text: comment,
          username: username,
          profilePic: reduxData?.profilePic.url,
          fullname: reduxData?.fullname,
        },
        { headers }
      );

      // Update the local state with the new comment
      const updatedPosts = posts.map((post) =>
        post._id === postId
          ? { ...post, comments: [...post.comments, response.data] }
          : post
      );
      setComment(""); // Clear the input field
      setPosts(updatedPosts);
      console.log(posts);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleToggleLike = async (postId) => {
    const headers = {
      authToken: localStorage.getItem("authToken"),
      "Content-Type": "application/json",
    };
    try {
      const postIndex = posts.findIndex((post) => post._id === postId);
      if (postIndex === -1) return;

      const post = posts[postIndex];
      const hasLiked = post.likedBy.includes(userId);

      if (hasLiked) {
        await axios.post(
          `http://localhost:8080/api/posts/${postId}/unlike`,
          { userId },
          { headers }
        );
        post.likes -= 1;
        post.likedBy = post.likedBy.filter((id) => id !== userId);
      } else {
        await axios.post(
          `http://localhost:8080/api/posts/${postId}/like`,
          { userId },
          { headers }
        );
        post.likes += 1;
        post.likedBy.push(userId);
      }

      const updatedPosts = [...posts];
      updatedPosts[postIndex] = post;
      setPosts(updatedPosts);
    } catch (error) {
      console.error(error);
    }
  };

  const openDialog = (post) => {
    setSelectedPost(post);
    setVisible(true);
  };

  return (
    <div className="card flex flex-column justify-content-center mt-5">
      <Dialog
        visible={visible}
        style={{ width: "60vw" }}
        onHide={() => setVisible(false)}
      >
        {selectedPost && (
          <div className="flex w-full">
            <div className="w-6">
              <img
                src={selectedPost.post}
                alt="Post"
                style={{ width: "100%" }}
              />
            </div>
            <div className="w-6">
              <div className="flex align-items-center mb-2">
                <img
                  src={selectedPost.user.profilePic?.url || dummypic}
                  alt="Profile"
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                />
                <div className="ml-2">
                  <h4>{selectedPost.user.username}</h4>
                  <p>{selectedPost.user.fullname}</p>
                </div>
              </div>
              <hr style={{ width: "50%", height: "2px" }} />
              <h3>{selectedPost.caption}</h3>
              <div>
                {selectedPost.comments.map((comment) => (
                  <div key={comment._id} className="comment">
                    <img
                      src={comment.user.profilePic?.url || dummypic}
                      alt="Profile"
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                      }}
                    />
                    <div className="ml-2">
                      <h4>{comment.user.username}</h4>
                      <p>{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Dialog>

      {posts.map((item) => (
        <div key={item._id}>
          <div
            className="flex mr-5 gap-3 align-items-center"
            style={{ height: "90px", width: "28rem " }}
          >
            <img
              src={item.user.profilePic?.url || dummypic}
              alt="Profile"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
            <div
              className="flex justify-content-between align-items-center"
              style={{ height: "90px", width: "24rem " }}
            >
              <div>
                <h4 className="p-0 ">{item.user.username}</h4>
                <p className="pb-2 -mt-3">{item.user.fullname}</p>
              </div>
              <h2 className="dots">...</h2>
            </div>
          </div>
          <Card
            header={
              <img alt="Card" src={item.post} style={{ height: "28rem" }} />
            }
            className="md:w-28rem h-28rem mb-2"
          />
          <div
            className="flex justify-content-between"
            style={{ width: "28rem" }}
          >
            <div className="flex gap-3">
              <i
                className={`icons pi ${
                  item.likedBy.includes(userId) ? "pi-heart-fill" : "pi-heart"
                }`}
                onClick={() => handleToggleLike(item._id)}
              ></i>
              <i
                className="icons pi pi-comment"
                onClick={() => openDialog(item)}
              ></i>
              <i className="icons pi pi-share-alt"></i>
            </div>
            <i className="icons pi pi-bookmark"></i>
          </div>
          <p style={{ fontWeight: "600" }}>{item.likes} likes</p>
          <div
            className="flex gap-1 -mt-4 align-items-center"
            style={{ width: "28rem" }}
          >
            <h3>{item.user.username}</h3>
            <p>
              {item.caption.length > 35
                ? item.caption.slice(0, 35) + "...see more"
                : item.caption}
            </p>
          </div>
          <p
            className="-mt-3"
            style={{ fontWeight: "200" }}
            onClick={() => openDialog(item)}
          >
            view all {item.comments.length} comments
          </p>
          <div className="flex w-full gap-1">
            <InputText
              id="text"
              name="text"
              aria-describedby="username-help"
              className="h-3rem w-9 comment_input"
              placeholder="Add a Comment"
              onChange={handleChange}
              required
            />
            <button
              className="addcmt_btn w-2"
              onClick={() => addComment(item._id)}
            >
              add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
