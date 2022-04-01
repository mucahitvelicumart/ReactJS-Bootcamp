import React from 'react'
import Categories from '../Components/Categories'
import '../assets/Global.css'
import '../assets/Product.css'
import { useContext,useEffect } from "react"
import ProductsContext from '../Context/ProductContext'
import { Product } from '../Components/Product'
import {baseService} from '../Services/network/services/baseService'
const HomePage = () => {
  const { products, setProducts } = useContext(ProductsContext)
  useEffect(() => {
    getProducts();
  }, [])
  const getProducts = async () => {
    const data = await baseService.get('/products')
    setProducts(data)
  }

  const tenItem = products.slice(products.length - 9, products.length)
  return (
    <div className='container'>
      <Categories />
      <div className={'products-wrapper'}>
        {tenItem !== null && (
          tenItem.map((product) => (
            <Product product={product} key={product.id}></Product>
          ))
        )}
      </div>
    </div>
  )
}
export default HomePage
