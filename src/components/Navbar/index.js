import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import dummypic from "../../images/profileImg.png";
import "./navbar.css";
import { setUserDetails } from "../../app/profilePicSlice";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import axios from "axios";
import { Sidebar } from "primereact/sidebar";
import { useEffect, useState } from "react";
import { Tag } from "primereact/tag";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profilePic = useSelector(
    (state) => state.profile.userDetails.profilePic?.url
  );

  const [visible, setVisible] = useState(false);
  const [visibleRight, setVisibleRight] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to handle search input

  useEffect(() => {
    getallUsers();
  }, []);

  const getallUsers = async () => {
    const response = await axios.post(
      "http://localhost:8080/api/user/allusers"
    );
    setUsers(response.data);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search input state
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Dialog
        header="Confirm Logout"
        visible={visible}
        style={{ width: "30vw" }}
        onHide={() => setVisible(false)}
      >
        <p className="m-0">Are you sure You want to Logout?</p>
        <div className="flex gap-3 mt-3 justify-content-end">
          <Button
            label="Yes"
            onClick={() => {
              localStorage.removeItem("authToken");
              dispatch(setUserDetails([]));
              navigate("/");
            }}
          />
          <Button label="No" onClick={() => setVisible(false)} />
        </div>
      </Dialog>
      <Sidebar
        visible={visibleRight}
        position="right"
        onHide={() => setVisibleRight(false)}
      >
        <div className="flex flex-column md:justify-content-center">
          <input
            id="searchbar"
            name="searchbar"
            type="text"
            className="h-3rem"
            placeholder="John Doe"
            value={searchQuery} // Bind search input value to state
            onChange={handleSearchChange} // Handle input change
            required
          />
          <ul className="m-0 p-0 list-none border-none p-3 flex flex-column gap-2 w-full md:w-18rem">
            {filteredUsers.map(
              (
                user // Use filtered users for rendering
              ) => (
                <li
                  key={user._id}
                  className={`p-2 hover:surface-hover border-round border-1 border-transparent transition-all transition-duration-200 flex align-items-center justify-content-between`}
                >
                  <div className="flex align-items-center gap-2">
                    <img
                      alt={user.username}
                      src={user.profilePic.url}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                      }}
                    />
                    <span className="font-bold">{user.username}</span>
                  </div>
                  <Tag value="follow" />
                </li>
              )
            )}
          </ul>
        </div>
      </Sidebar>
      <div className="sidebar flex justify-content-center">
        <div className="uls_div">
          <h3 className="logo">instagram</h3>
          <ul>
            <Link to="/home" style={{ textDecoration: "none", color: "black" }}>
              <li>
                <h3 className="side_links">
                  <i
                    className="pi pi-home mr-2"
                    style={{ color: "black", fontWeight: "800" }}
                  ></i>
                  Home
                </h3>
              </li>
            </Link>
            <li onClick={() => setVisibleRight(true)}>
              <h3 className="side_links">
                <i
                  className="pi pi-search mr-2"
                  style={{ color: "black", fontWeight: "800" }}
                ></i>
                Search
              </h3>
            </li>
            <li>
              <h3 className="side_links">
                <i
                  className="pi pi-send mr-2"
                  style={{ color: "black", fontWeight: "800" }}
                ></i>
                Messages
              </h3>
            </li>
            <li>
              <h3 className="side_links">
                <i
                  className="pi pi-bell mr-2"
                  style={{ color: "black", fontWeight: "800" }}
                ></i>
                Notifications
              </h3>
            </li>
            <Link
              to="/create-post"
              style={{ textDecoration: "none", color: "black" }}
            >
              <li>
                <h3 className="side_links">
                  <i
                    className="pi pi-plus-circle mr-2"
                    style={{ color: "black", fontWeight: "800" }}
                  ></i>
                  Create
                </h3>
              </li>
            </Link>
            <Link
              to="/profile"
              style={{ textDecoration: "none", color: "black" }}
            >
              <li>
                <h3 className="side_links flex align-items-center gap-2">
                  <img
                    src={profilePic || dummypic}
                    alt="Profile"
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                    }}
                  />
                  Profile
                </h3>
              </li>
            </Link>
          </ul>

          <h3 className="side_links logout" onClick={() => setVisible(true)}>
            <i
              className="pi pi-sign-out mr-2"
              style={{ color: "black", fontWeight: "800" }}
            ></i>
            Logout
          </h3>
        </div>
      </div>
    </>
  );
};

export default Navbar;
