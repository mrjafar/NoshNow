import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { TiShoppingCart } from "react-icons/ti";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { auth, db } from "../../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { assets } from "../../../assets/assets";

export const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [userData, setUserData] = useState(null);
  // const [showProfileModal, setShowProfileModal] = useState(false);

  const fetchUserData = async () => {
    try {
      const user = auth.currentUser; // Get current user
      if (user) {
        const userDocRef = doc(db, "Users", user.uid); // Reference Firestore document
        const userDoc = await getDoc(userDocRef); // Fetch data from Firestore
        if (userDoc.exists()) {
          setUserData(userDoc.data()); // Store user data
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const toggleProfileDropdown = () => {
    setShowProfileDropdown((prev) => !prev);
  };

  // LogOut functionality-------------------
  const handleLogout = () => {
    auth.signOut(); // Logs out the user
    setUserData(null); // Reset user data
  };

  // Show Profile functionality---------------------
  // const toggleProfileModal = () => {
  //   setShowProfileModal((prev) => !prev);
  // };
  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link to="/">
          <li
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            Home
          </li>
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <Link
          to="/contact"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </Link>
      </ul>
      <div className="navbar-right">
        <Link to="/cart">
          <TiShoppingCart style={{ fontSize: "2rem" }} />
        </Link>
        <FaUserCircle
          onClick={toggleProfileDropdown}
          style={{ fontSize: "2rem", cursor: "pointer" }}
          title="profile"
        />
        {showProfileDropdown && (
          <div className="profile-dropdown">
            {userData ? (
              <>
                <p>
                  <strong>Name:</strong> {userData.name}
                </p>
                <p>
                  <strong>Email:</strong> {userData.email}
                </p>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <button onClick={() => setShowLogin(true)}>Sign In</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
