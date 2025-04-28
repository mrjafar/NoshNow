import "./Profile.css";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";


export const Profile = () => {
  const [input, setInput] = useState({
    phone: "",
    add: "",
  });
  const [isEditing, setIsEditing] = useState({
    phone: false,
    add: false,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const uData = location.state?.data;

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const toggleEditing = (field) => {
    setIsEditing({ ...isEditing, [field]: !isEditing[field] });
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <div className="img-container">
        <figure>
          {uData?.photoURL ? (
            <img src={uData?.photoURL} alt="Profile" className="profile-image" />
          ) : (
            <FaRegUserCircle style={{ fontSize: "5rem" }} />
          )}
        </figure>
        <div>

          <h2>{uData?.name}</h2>
          <p>{uData?.email}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="information">

        {/* Phone Field */}
        <label htmlFor="phone">Phone:</label>
        {isEditing.phone ? (
          <input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            value={input.phone}
            onChange={handleInputChange}
            onBlur={() => toggleEditing("phone")}
          />
        ) : (
          <p onClick={() => toggleEditing("phone")}>
            {input.phone || "Click to add your phone number"}
          </p>
        )}

        {/* Address Field */}
        <label htmlFor="add">Address:</label>
        {isEditing.add ? (
          <input
            type="text"
            name="add"
            placeholder="Enter your address"
            value={input.add}
            onChange={handleInputChange}
            onBlur={() => toggleEditing("add")}
          />
        ) : (
          <p onClick={() => toggleEditing("add")}>
            {input.add || "Click to add your address"}
          </p>
        )}

        <div className="profile-btn">
          <button type="submit" disabled={!input.phone && !input.add} onClick={() => toast.success("Profile updated successfully!")}>
            Save
          </button>
          <button onClick={() => navigate("/")}>Cancel</button>
        </div>
      </form>
    </div>
  );
};