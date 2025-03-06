/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../../assets/assets";
import { TiShoppingCart } from "react-icons/ti";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../context/StoreContext";
import { FaUserCircle } from "react-icons/fa";

export const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");

  const { getTotalCartAmount } = useContext(StoreContext);

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
          // href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </Link>
      </ul>
      <div className="navbar-right">
        {/* <img src={assets.search_icon} alt="search-icon" /> */}
        {/* <MdSearch /> */}
        <div className="navbar-search-icon">
          {/* <img src={assets.basket_icon} alt="basket-icon" /> */}
          <Link to="/cart">
            <TiShoppingCart style={{ fontSize: "2rem" }} />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        <button onClick={() => setShowLogin(true)}>sign in</button>
        <FaUserCircle
          onClick={() => setShowLogin(true)}
          style={{ fontSize: "2rem" }}
          title="profile"
        />
      </div>
    </div>
  );
};
