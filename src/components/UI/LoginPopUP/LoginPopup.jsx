/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "./LoginPopup.css";
import { RxCross2 } from "react-icons/rx";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {
  const [curState, setCurState] = useState("Login");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    try {
      if (curState === "Sign Up") {
        await createUserWithEmailAndPassword(auth, data.email, data.password);
        const user = auth.currentUser;
        console.log(user);
        if (user) {
          await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            name: data.name,
          });
        }
        console.log("User Registered Successfully.");
        toast.success("You are Registered Successfully.");
      } else if (curState === "Login") {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        toast("You are Logged in Successfully.");
      }
      setData({
        name: "",
        email: "",
        password: "",
      });

      // setShowLogin(false);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={handleFormSubmit} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{curState}</h2>
          <RxCross2
            className="cross-icon"
            onClick={() => setShowLogin(false)}
          />
        </div>
        <div className="login-popup-inputs">
          {curState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              placeholder="enter you name"
              name="name"
              required={curState === "Sign Up"}
              value={data.name}
              onChange={handleInputChange}
            />
          )}
          <input
            type="email"
            placeholder="enter you email"
            name="email"
            required
            value={data.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            value={data.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">
          {curState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {curState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurState("Sign Up")}>Click here </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
