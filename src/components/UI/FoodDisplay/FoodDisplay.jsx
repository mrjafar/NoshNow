/* eslint-disable react/prop-types */
import { useContext } from 'react'
import "./FoodDisplay.css"
import { StoreContext } from '../../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem';
import { NavLink } from 'react-router-dom';

const FoodDisplay = ({ category }) => {

  const { food_list } = useContext(StoreContext);
  const filteredFoodList = category === "All"
    ? food_list
    : food_list.filter(item => item.category === category);

  return (
    <div className='food-display' id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {filteredFoodList.map((curItem, index) => {
          // if (category === "All" || category === curItem.category) 

          return (
            // <NavLink to={`/view-more/${curItem._id}`} key={index} className="food-display-item">
              <FoodItem key={index} curItem={curItem} />
            // </NavLink>
          )
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
