import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../../context/StoreContext';
import "./ViewMore.css";
import { assets } from '../../../assets/assets';
import { toast } from 'react-toastify';
import { GiCrossedBones } from 'react-icons/gi';

export const ViewMore = ({ curItem, setIsModalOpen }) => {
    const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
    const navigate = useNavigate();

    if (!curItem) {
        return <p>Loading...</p>;
    }

    if (!curItem._id) {
        return <p>Order not found. Please check the URL or go back to the main page.</p>;
    }

    const { _id, name, price, description, image, category, material, weight } = curItem;


    const handleAddToCartImage = () => {
        if (cartItems[_id]) {
            addToCart(_id);
        } else {
            console.log("Item not in cart, cannot increment via '+' button.");
            toast.info(`${name} not in cart. Add via 'Add to Cart' button first.`);
        }
    };

    const handleAddToCartButton = () => {
        if (!cartItems[_id]) {
            addToCart(_id);
            toast.success(`${name} added to cart`);
        } else {
            toast.info(`${name} quantity updated in cart`);
        }
    };

    return (
        <>
            <div className='view-more'>
                <GiCrossedBones
                    onClick={() => setIsModalOpen(false)} className='cross-icon' />
                <figure>
                    <img src={image} alt={name} width="400px" />
                </figure>
                <div className="item-detail">
                    <h1>{name}</h1>
                    <p className='food-item-description'>{description}</p>
                    <div className="other-content">
                        <div className='category-weight'>
                            <p className='category'>Category: {category}</p>
                            <p>Weight : {weight}gm</p>
                        </div>
                        <p className='material'>Material: {material}</p>
                    </div>
                    <div className='food-item-rating'>
                        <p className='food-item-price' style={{ fontSize: "1.5rem", margin: "0" }}>${price}</p>
                        <img src={assets.rating_starts} alt="" />
                    </div>
                    <p className='qty'>Quantity: <br />
                        {cartItems[_id] !== undefined ? (
                            <div className="food-item_counter">
                                <img
                                    onClick={() => removeFromCart(_id)}
                                    aria-disabled={cartItems[_id] === 0}
                                    src={assets.remove_icon_red}
                                    alt="Remove from cart"
                                />
                                <p>{cartItems[_id]}</p>
                                <img
                                    onClick={handleAddToCartImage}
                                    src={assets.add_icon_green}
                                    alt="Add to cart"
                                />
                            </div>
                        ) : (
                            <div className="food-item_counter">
                                <img
                                    src={assets.remove_icon_red}
                                    alt="Remove from cart"
                                    style={{ opacity: 0.5, cursor: 'not-allowed' }}
                                />
                                <p>1</p>
                                <img
                                    onClick={handleAddToCartImage}
                                    src={assets.add_icon_green}
                                    alt="Add to cart"
                                />
                            </div>
                        )}
                    </p>

                    <div className='cart-btn'>
                        <button onClick={handleAddToCartButton}>
                            {cartItems[_id] ? 'Update Cart' : 'Add to Cart'}
                        </button>
                        <button onClick={() => {
                            setIsModalOpen(false);
                            navigate('/cart');
                        }} style={{ backgroundColor: "lightblue", color: "black" }}>View Cart</button>
                    </div>
                </div>
            </div>
        </>
    );
}