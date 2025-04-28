import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { TiShoppingCart } from "react-icons/ti";
import { FaUserCircle } from "react-icons/fa";
import { data, Link, NavLink, useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { assets } from "../../../assets/assets";
import { IoIosArrowDown } from "react-icons/io";
import { MdLogout } from "react-icons/md";

export const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
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
    setTimeout(() => {
      setShowProfileDropdown(false);
    }, 2000);
  };

  // LogOut functionality-------------------
  const handleLogout = () => {
    auth.signOut();
    setUserData(null);
  };

  const goToProfile = () => {
    navigate("profile", { state: { data: userData } })
  }

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <NavLink to="/">
          <li
          // onClick={() => setMenu("home")}
          // className={menu === "home" ? "active" : ""}
          >
            Home
          </li>
        </NavLink>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
        // className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
        // className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <NavLink
          to="/contact"
          onClick={() => setMenu("contact-us")}
        // className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </NavLink>
      </ul>
      <div className="navbar-right">
        <Link to="/cart">
          <TiShoppingCart style={{ fontSize: "2rem" }} />
        </Link>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.2rem" }}>
          <FaUserCircle

            style={{ fontSize: "2rem", cursor: "pointer" }}
            title="profile"
          />
          <IoIosArrowDown onMouseOver={toggleProfileDropdown} />
        </div>
        {showProfileDropdown && (
          <div className="profile-dropdown">
            {userData ? (
              <>
                {console.log(userData)}
                {/* <Link > */}
                <p onClick={goToProfile}>
                  My Profile
                </p>
                {/* </Link> */}
                <Link to="/cart">
                  <p>
                    My Orders
                  </p>
                </Link>
                <p onClick={handleLogout} title="logout"><MdLogout />Logout</p>
              </>
            ) : (
              <button onClick={() => setShowLogin(true)}>Sign In</button>
            )}
          </div>
        )}
      </div>
    </div >
  );
};
