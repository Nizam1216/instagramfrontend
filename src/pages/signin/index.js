import React, { useState } from "react";
import "./signin.css";
import sideImage from "../../images/signimage.jpg";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signin = ({ userData }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/signin",
        formData
      );

      if (response.data) {
        localStorage.setItem("authToken", response.data);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };
  if (localStorage.getItem("authToken")) {
    navigate("/home");
  }

  return (
    <div
      className="flex w-full"
      style={{ height: "100vh", backgroundColor: "rgb(248 236 238)" }}
    >
      <div className="flex w-6">
        <img
          src={sideImage}
          alt="not loadings"
          className="w-full object-cover sideimage"
          style={{ height: "100vh !important", opacity: "0.6" }}
        />
      </div>
      <div className="flex w-6 justify-content-center align-items-center">
        <form className="flex flex-column w-9" onSubmit={handleSubmit}>
          <h1 className="signup-text w-8 text-center">Sign In</h1>

          <div className="w-full flex flex-column gap-3">
            <label htmlFor="username" className="lbl mt-3">
              User Name <span className="lblimp">*</span>
            </label>
            <InputText
              id="username"
              name="username"
              aria-describedby="username-help"
              className="h-3rem"
              placeholder="Johnking123"
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-full flex flex-column gap-3">
            <label htmlFor="password" className="lbl mt-3">
              Password <span className="lblimp">*</span>
            </label>
            <InputText
              id="password"
              name="password"
              type="password"
              aria-describedby="password-help"
              className="h-3rem"
              placeholder="******"
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-full text-center my-3">
            <button type="submit" className=" w-3 text-center sign">
              Sign In
            </button>
          </div>
          <div className="flex w-full justify-content-between align-items-center">
            <div
              className="flex align-items-center"
              style={{ fontFamily: "poppins", letterSpacing: "1px" }}
            >
              <h4>Not A User Yet?</h4>
              <Link to="/signup">
                {" "}
                <h4>Sign Up</h4>
              </Link>
            </div>
            <div
              className="flex align-items-center"
              style={{ fontFamily: "poppins", letterSpacing: "1px" }}
            >
              <h4>Forgot Password?</h4>
              <Link to="/forgot-password">
                {" "}
                <h4>Click Here</h4>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
