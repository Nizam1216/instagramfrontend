import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import profileImage from "../../images/profileImg.png";
import "./profile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import UserPosts from "../../components/UserPosts";

const Profile = ({ userData }) => {
  const profilePic = useSelector(
    (state) => state.profile.userDetails.profilePic?.url
  );

  const [response, setResponse] = useState([]);
  const navigate = useNavigate();
  // eslint-disable-next-line
  useEffect(() => {
    const headers = {
      authToken: localStorage.getItem("authToken"),
      "Content-Type": "application/json",
    };
    const allposts = async () => {
      const alldata = await axios.post(
        "http://localhost:8080/api/posts/user-posts",{},
        { headers }
      );
      console.log(alldata.data);
      setResponse(alldata.data);
    };
    allposts();
  }, []);

  return (
    <>
      <div className="flex w-full dash_main">
        <Navbar />
        {userData && (
          <div
            className="flex w-full justify-content-center dash_posts"
            style={{ width: "400px" }}
          >
            <div className="flex flex-column w-full justify-content-top mt-3 profile_main_div">
              <div className="top-Div flex justify-content-center mt-1 ">
                <img
                  src={profilePic ? profilePic : profileImage}
                  alt="Profile"
                  className="profileimg mt-5"
                />
                <div>
                  <div className="flex gap-3 justify-content-left user_holder">
                    <h1 className="username">{userData.username}</h1>
                    <button
                      className="edit_profile_button"
                      onClick={() => navigate("/edit-profile")}
                    >
                      edit profile
                    </button>
                  </div>
                  <div className="flex gap-5 followers_div">
                    <h3>{response.length} posts</h3>
                    <h3>1037 followers</h3>
                    <h3>234 following</h3>
                  </div>
                  <h3>{userData.fullname}</h3>
                </div>
              </div>

              <UserPosts response={response} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
