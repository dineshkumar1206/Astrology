import React from 'react'
import Hero from '../home/Hero'
import Products from '../home/Products'
import AbtSara from '../home/AbtSara'

function Home({ cart, setCart, setIsCartOpen }) {
  return (
    <>
    <Hero/>
    <Products cart={cart} setCart={setCart} setIsCartOpen={setIsCartOpen}/>
    <AbtSara/>
    </>
  )
}

export default Home
