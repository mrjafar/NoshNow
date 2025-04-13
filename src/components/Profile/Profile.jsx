import "./Profile.css";
import React, { useState } from "react";
import { auth, db, storage } from "../../firebaseConfig"; // Ensure Firebase is configured
import { updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const Profile = ({ userData, setShowProfileModal }) => {
  const [customName, setCustomName] = useState(userData?.name || "");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(userData?.photoURL || "");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);

    // Preview image
    const reader = new FileReader();
    reader.onload = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      const userRef = doc(db, "Users", auth.currentUser.uid);

      // Handle image upload
      if (profileImage) {
        const imageRef = ref(storage, `profileImages/${auth.currentUser.uid}`);
        await uploadBytes(imageRef, profileImage);
        const photoURL = await getDownloadURL(imageRef);

        await updateDoc(userRef, { name: customName, photoURL });
      } else {
        await updateDoc(userRef, { name: customName });
      }

      setShowProfileModal(false); // Close the modal
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="modal-background">
      <div className="modal-content">
        <h2>Edit Profile</h2>
        <div className="profile-image-section">
          <img
            src={previewImage || "/default-avatar.png"}
            alt="Preview"
            className="profile-preview"
          />
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
        <input
          type="text"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          placeholder="Enter custom username"
          className="input-field"
        />
        <button onClick={handleSave} className="save-button">
          Save Changes
        </button>
        <button
          onClick={() => setShowProfileModal(false)}
          className="cancel-button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
