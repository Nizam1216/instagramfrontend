import React, { useEffect, useState } from "react";
import image from "../../images/profileImg.png";
import { useSelector } from "react-redux";
import axios from "axios";
import "./stories.css";
import { Dialog } from "primereact/dialog";
const Stories = () => {
  const [visible, setVisible] = useState(false);
  const currentuser = useSelector((state) => state.profile?.userDetails);
  const [stories, setStories] = useState([]);
  const [currStories, setCurrStories] = useState([]);
  useEffect(() => {
    allStories();
  }, []);

  const allStories = async () => {
    try {
      const headers = {
        authToken: localStorage.getItem("authToken"),
        "Content-Type": "application/json",
      };
      const response = await axios.post(
        "http://localhost:8080/api/stories/view-stories",
        {},
        { headers }
      );
      if (response.data.allStories) {
        setStories(response.data.allStories);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const openStory = (story) => {
    console.log(story);
    setCurrStories(story);
    setVisible(true);
  };
  return (
    <div className="flex gap-3  md:w-28rem overflow-x-scroll this_is">
      <Dialog
        visible={visible}
        style={{ width: "30vw", height: "78.1vh" }}
        onHide={() => setVisible(false)}
      >
        <img
          className="md:w-27rem"
          src={currStories.story}
          alt="..."
          style={{ height: "73vh" }}
        />
      </Dialog>
      {stories.length > 1 ? (
        stories.map((story) => (
          <div onClick={() => openStory(story)}>
            <img
              src={story.profilePic ? story.profilePic : image}
              alt="..."
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            />
            <p className="-mt-1">{story?.username}</p>
          </div>
        ))
      ) : (
        <div>
          {" "}
          <img
            src={
              currentuser.profilePic?.url ? currentuser.profilePic?.url : image
            }
            alt="..."
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          />
          <p className="-mt-1">{currentuser?.username}</p>
        </div>
      )}
    </div>
  );
};

export default Stories;
