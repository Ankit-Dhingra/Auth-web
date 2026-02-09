import React from 'react'
import Hero from '../Components/Hero'
import Trending from '../Components/Trending'
import AllProducts from '../Components/AllProducts'

const HomePage = () => {
  return (
    <div className='p-3 m-4'>
      <Hero />
      <Trending />
      <AllProducts />
    </div>
  )
}

export default HomePage
