import React, { useState } from 'react'
import "./Home.css"

import { ExploreMenu } from '../../components/UI/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/UI/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/UI/AppDownload/AppDownload'
import Header from '../../components/layout/Header/Header'

export const Home = () => {
  const [category, setCategory] = useState("All")
  return (
    <div>
        <Header />
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category} />
        <AppDownload/>
    </div>
  )
}
