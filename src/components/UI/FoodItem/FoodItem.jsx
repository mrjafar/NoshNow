/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../../assets/assets";
import { ViewMore } from "../ViewMore/ViewMore";
import Modal from "react-modal";

Modal.setAppElement('#root');

const FoodItem = ({ curItem }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { _id, name, price, description, image } = curItem;
  return (
    <>
      <div className="food-item" onClick={() => setIsModalOpen(true)}>
        {/* <NavLink to={`/view-more/${_id}`} className="food-item-image-link"> */}
        <div className="food-item-image-link" >
          <div className="food-item-image-container">
            <img className="food-item-image" src={image} alt="food-item" />
            <div className="order-now-overlay">
              <div className="order-now-text">Order Now</div>
            </div>
          </div>
        </div>
        {/* </NavLink> */}

        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name.length > 10 ? name.slice(0, 9) + "..." : name}</p>
            <img src={assets.rating_starts} alt="" />
          </div>
          <p className="food-item-description">{description.length > 75 ? description.slice(0, 75) + "..." : description}</p>
          {/* <div className="cart-btn"> */}
          <p className="food-item-price">${price}</p>
          {/* </div> */}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} curItem={curItem} className="modal" overlayClassName="overlay">
        <ViewMore curItem={curItem} setIsModalOpen={setIsModalOpen} />
      </Modal>
    </>
  );
};

export default FoodItem;
