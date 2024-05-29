import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import AllPosts from "../../components/AllPosts";
import dummypic from "../../images/profileImg.png";
import "./dashboard.css";
import Stories from "../../components/Stories";
const Dashboard = () => {
  const reduxData = useSelector((state) => state.profile?.userDetails);

  const [response, setResponse] = useState([]);
  // eslint-disable-next-line
  useEffect(() => {
    allposts();
  }, []);

  const allposts = async () => {
    const alldata = await axios.post(
      "http://localhost:8080/api/posts/all-posts"
    );

    setResponse(alldata.data);
  };

  return (
    <div className="flex justify-content-between dash_main">
      <Navbar />
      <div className="dash_posts flex justify-content-between">
        <div>
          <Stories />
          <AllPosts response={response} />
        </div>

        <div
          className="flex mr-5 gap-3 align-items-center"
          style={{ height: "150px" }}
        >
          <img
            src={reduxData.profilePic?.url || dummypic}
            alt="Profile"
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />

          <div className="">
            <h4 className="p-0 ">{reduxData.username}</h4>
            <p className="pb-2 -mt-3">{reduxData.fullname}</p>
          </div>
          <div>Switch</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
