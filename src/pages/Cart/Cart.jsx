import React from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTotalCartAmount, removeFromCart } from "../../features/ItemsSlice/ItemsSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.foodItems.cartItems);
  const food_list = useSelector((state) => state.foodItems.foodList);
  const getTotalCart = useSelector((state) => getTotalCartAmount(state.foodItems));
  console.log(getTotalCart);
  
  // const { cartItems, food_list, removeFromCart, getTotalCartAmount } =
    // useContext(StoreContext);
    // const {getTotalCartAmount} = useContext(StoreContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isEmptyCart = !food_list.some((curItem) => cartItems[curItem._id] > 0);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {isEmptyCart ? (
          <div className="empty-cart-message">
            <p>Your cart is empty. Start adding items to your cart!</p>
          </div>
        ) : (
          food_list.map((curItem, index) => {
            const { _id, name, image, price } = curItem;
            if (cartItems[_id] > 0) {
              return (
                <div key={index}>
                  <div className="cart-items-title cart-items-item">
                    <img src={image} alt="" />
                    <p>{name}</p>
                    <p>${price}</p>
                    <p>{cartItems[_id]}</p>
                    <p>${price * cartItems[_id]}</p>
                    <p
                      onClick={() => handleRemoveFromCart(_id)}
                      className="cross"
                    >
                      X
                    </p>
                  </div>
                  <hr />
                </div>
              );
            }
          })
        )}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCart}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCart === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCart === 0 ? 0 : getTotalCart + 2}
              </b>
            </div>
          </div>
          <button onClick={() => navigate("/order")} disabled={isEmptyCart}>
            PROCEED TO CHECKOUT
          </button>
        </div>

        <div className="cart-promo-code">
          <div>
            <p>If you have a promo code paste it here</p>
            <div className="cart-promo-code-input">
              <input type="text" placeholder="promo code..." />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
