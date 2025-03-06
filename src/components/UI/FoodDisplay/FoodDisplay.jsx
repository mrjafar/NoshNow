/* eslint-disable react/prop-types */
import { useContext } from 'react'
import "./FoodDisplay.css"
import { StoreContext } from '../../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext);

  return (
    <div className='food-display' id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((curItem, index) => {
          if(category === "All" || category === curItem.category)
             
            return <FoodItem key={index} curItem={curItem}/>
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
