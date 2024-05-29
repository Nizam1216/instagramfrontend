import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    caption: "",
    post: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prevData) => ({ ...prevData, post: reader.result }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const headers = {
      authToken: localStorage.getItem("authToken"),
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/posts/create-post",
        {
          caption: formData.caption,
          post: formData.post,
        },
        { headers }
      );

      if (response.data) {
        console.log(response);
      }
    } catch (error) {
      console.error(error);
      alert("Error creating post");
    }
  };

  return (
    <div className="flex justify-content-between dash_main">
      <Navbar />
      <div className="dash_posts flex justify-content-between">
        <form className="flex flex-column w-6 h-6" onSubmit={handleSubmit}>
          <h1 className="signup-text w-8 text-center">Create posts here</h1>
          <div className="w-full flex flex-column gap-3">
            <label htmlFor="post" className="lbl mt-3">
              Post <span className="lblimp">*</span>
            </label>
            <input
              id="post"
              name="post"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="w-full flex h-6 flex-column gap-3">
            <label htmlFor="caption" className="lbl mt-3">
              Caption <span className="lblimp">*</span>
            </label>
            <textarea
              id="caption"
              name="caption"
              cols={30}
              className="h-3rem"
              placeholder="Caption"
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-full text-center my-3">
            <button type="submit" className=" w-6 text-center sign">
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
