// src/pages/Editprofile/index.js
import React, { useState } from "react";

import axios from "axios";
import Navbar from "../../components/Navbar";

import "./editprofile.css";
import { useSelector } from "react-redux";

const EditProfile = () => {
  const reduxData = useSelector((state) => state.profile.userDetails);

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    profilePic: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prevData) => ({ ...prevData, profilePic: reader.result }));
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
        "http://localhost:8080/api/user/update-user",
        {
          fullname: formData.fullname,
          username: formData.username,
          profilePic: formData.profilePic,
        },
        { headers }
      );

      if (response.data) {
        alert("Profile updated successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      alert("Error updating profile");
    }
  };

  return (
    <div className="flex">
      <Navbar />
      <div className="flex w-full justify-content-center align-items-center">
        <form className="flex flex-column w-9" onSubmit={handleSubmit}>
          <h1 className="signup-text w-8 text-center">Update Profile</h1>

          <div className="w-full flex flex-column gap-2">
            <label htmlFor="fullname" className="lbl mt-1">
              Full name <span className="lblimp">*</span>
            </label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              className="h-3rem"
              placeholder="John Doe"
              onChange={handleChange}
              defaultValue={reduxData.fullname}
              required
            />
          </div>
          <div className="w-full flex flex-column gap-2">
            <label htmlFor="username" className="lbl mt-1">
              User Name <span className="lblimp">*</span>
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="h-3rem"
              placeholder="Johnking123"
              defaultValue={reduxData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-full flex flex-column gap-2">
            <label htmlFor="profilePic" className="lbl mt-1">
              Profile Picture <span className="lblimp">*</span>
            </label>
            <input
              id="profilePic"
              name="profilePic"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="w-full text-center mt-3">
            <button type="submit" className="w-3 text-center sign">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
