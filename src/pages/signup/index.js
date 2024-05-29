import React, { useState } from "react";
import "./signup.css";
import sideImage from "../../images/signimage.jpg";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
   
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/signup",
        formData
      );

    
      if (response.data.message === "User created Sucessfully") {
        navigate("/signin");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const sendOtp = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/user/otp", {
        email: formData.email,
      });
      console.log(formData.email);
      console.log(response.data);
      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex w-full"
      style={{ height: "auto", backgroundColor: "rgb(248 236 238)" }}
    >
      <div className="flex w-6">
        <img
          src={sideImage}
          alt="not loadings"
          className="w-full object-cover sideimage"
          style={{ height: "100% !important", opacity: "0.6" }}
        />
      </div>
      <div className="flex w-6 justify-content-center align-items-center">
        <form className="flex flex-column w-9" onSubmit={handleSubmit}>
          <h1 className="signup-text w-8 text-center">Sign Up</h1>

          <div className="w-full flex flex-column gap-2">
            <label htmlFor="fullname" className="lbl mt-1">
              Full name <span className="lblimp">*</span>
            </label>
            <InputText
              id="fullname"
              name="fullname"
              aria-describedby="fullname-help"
              className="h-3rem"
              placeholder="John Doe"
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full flex flex-column gap-2">
            <label htmlFor="username" className="lbl mt-1">
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
          <div className="w-full flex flex-column gap-2">
            <label htmlFor="email" className="lbl mt-1">
              email <span className="lblimp">*</span>
            </label>
            <div className="flex w-full">
              <InputText
                id="email"
                name="email"
                type="email"
                aria-describedby="email-help"
                className="h-3rem w-10 mr-2"
                placeholder="John Doe"
                onChange={handleChange}
                required
              />
              <button
                className="w-2 sign2"
                disabled={formData.email.length < 10}
                onClick={sendOtp}
                style={{ opacity: formData.email.length < 10 ? 0.1 : 1 }}
              >
                Send otp
              </button>
            </div>
          </div>
          <div className="w-full flex flex-column gap-2">
            <label htmlFor="otp" className="lbl mt-1">
              otp <span className="lblimp">* (valid for 5 minutes only)</span>
            </label>
            <div className="flex w-full">
              <InputText
                id="otp"
                name="otp"
                type="text"
                aria-describedby="otp-help"
                className="h-3rem w-full mr-2"
                placeholder="otp(IN CAPTIAL LETTERS)"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="w-full flex flex-column gap-2">
            <label htmlFor="password" className="lbl mt-1">
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
          <div className="w-full flex flex-column gap-2">
            <label htmlFor="confirmPassword" className="lbl mt-1">
              Confirm Password <span className="lblimp">*</span>
            </label>
            <InputText
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              aria-describedby="confirmPassword-help"
              className="h-3rem"
              placeholder="John Doe"
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full text-center mt-3">
            <button type="submit" className=" w-3 text-center sign">
              Sign Up
            </button>
          </div>
          <div
            className="flex align-items-center"
            style={{ fontFamily: "poppins", letterSpacing: "1px" }}
          >
            <h4>Already a User?</h4>
            <Link to="/signin">
              {" "}
              <h4>Sign In</h4>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
