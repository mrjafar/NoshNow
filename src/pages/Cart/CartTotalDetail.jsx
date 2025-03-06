/* eslint-disable react/prop-types */


const CartTotalDetail = ({getTotalCartAmount}) => {
  return (
    <div className="cart-total">
      <h2>Cart Total</h2>
      <div>
        <div className="cart-total-details">
          <p>Subtotal</p>
          <p>${getTotalCartAmount}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <p>Delivery Fee</p>
          <p>${2}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <b>Total</b>
          <b>${getTotalCartAmount}</b>
        </div>
      </div>
      <button onClick={() => navigate("/order")}>PROCEED TO CHECKOUT</button>
    </div>
  );
};

export default CartTotalDetail;
