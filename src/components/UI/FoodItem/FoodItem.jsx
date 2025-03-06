/* eslint-disable react/prop-types */
import { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../../assets/assets";
import { StoreContext } from "../../../context/StoreContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../../features/ItemsSlice/ItemsSlice";

const FoodItem = ({ curItem }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  const foodItems = useSelector((state) => state.foodItems);
  console.log(foodItems);
  const dispatch = useDispatch();

  // Add to Cart functionality--------------
  const handleAddToCart = (id) => {
    dispatch(addToCart(id));
  };

  // remove from Cart functionality----------
  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const { _id, name, price, description, image } = curItem;
  return (
    <div className="food-item">
      <div className="food-item-image-container">
        <img className="food-item-image" src={image} alt="food-item" />
        {!cartItems[_id] ? (
          <img  
            className="add"
            onClick={() => handleAddToCart(_id)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => handleRemoveFromCart(_id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[_id]}</p>
            <img
              onClick={() => handleAddToCart(_id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name.length > 10 ? name.slice(0, 9) + "..." : name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-description">{description}</p>
        <div className="cart-btn">
          <p className="food-item-price">${price}</p>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
