import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import { Link } from "react-router-dom";
import "./forgotpassword.css";
const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newpassword: "",
    reEnterPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/forgot-password",
        formData
      );

      console.log(response.data);
      if (response.data.message === "Password Updated Sussfully") {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const sendOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/forgot-password-otp",
        {
          email: formData.email,
        }
      );
      console.log(formData.email);
      console.log(response.data);
      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="main_for_div w-full justify-content-center">
      <div className="flex w-6 justify-content-center align-items-center">
        <form className="flex flex-column w-9" onSubmit={handleSubmit}>
          <h1 className="signup-text w-8 text-center">Update Password</h1>

          <div className="w-full flex flex-column gap-2">
            <label htmlFor="email" className="lbl mt-1">
              Registered email <span className="lblimp">*</span>
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
              otp <span className="lblimp">*(Valid for 5 minutes only)</span>
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
            <label htmlFor="newpassword" className="lbl mt-1">
              New Password <span className="lblimp">*</span>
            </label>
            <InputText
              id="newpassword"
              name="newpassword"
              type="password"
              aria-describedby="newpassword-help"
              className="h-3rem"
              placeholder="******"
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full flex flex-column gap-2">
            <label htmlFor="reEnterPassword" className="lbl mt-1">
              Re-enter Password <span className="lblimp">*</span>
            </label>
            <InputText
              id="reEnterPassword"
              name="reEnterPassword"
              type="password"
              aria-describedby="reEnterPassword-help"
              className="h-3rem"
              placeholder="John Doe"
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full text-center mt-3">
            <button type="submit" className=" w-3 text-center sign">
              Update
            </button>
          </div>
          <div
            className="flex align-items-center"
            style={{ fontFamily: "poppins", letterSpacing: "1px" }}
          >
            <h4>Back To</h4>
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

export default ForgotPassword;
