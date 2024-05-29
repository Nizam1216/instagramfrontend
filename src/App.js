import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/profile";
import Editprofile from "./pages/Editprofile";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./app/store";
import { setUserDetails } from "./app/profilePicSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import CreatePost from "./pages/CreatePost";

function AppContent() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const reduxData =
    useSelector((state) => state.profile?.userDetails) &&
    localStorage.getItem("authToken");

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, [dispatch]);
  const headers = {
    authToken: localStorage.getItem("authToken"),
    "Content-Type": "application/json",
  };

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/user/user", {
        headers,
      });

      setUserData(response.data);

      dispatch(setUserDetails(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={reduxData ? <Dashboard /> : <Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin userData={userData} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={reduxData ? <Dashboard /> : <Signin />} />
        <Route
          path="/create-post"
          element={reduxData ? <CreatePost /> : <Signin />}
        />
        <Route
          path="/profile"
          element={reduxData ? <Profile userData={userData} /> : <Signin />}
        />
        <Route
          path="/edit-profile"
          element={userData ? <Editprofile /> : <Signin />}
        />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
