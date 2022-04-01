import React from 'react'
import { useContext, useState,useEffect } from "react"
import ProductsContext from '../Context/ProductContext'
import { Product } from '../Components/Product'
import { useParams } from 'react-router-dom'
import { baseService } from '../Services/network/services/baseService'
import CategoryContext from '../Context/CategoryContext'

const ProductsPage = () => {
  const pageLimit = 10
  const dataLimit = 9
  const currentCategory = useParams();
  const { products, setProducts } = useContext(ProductsContext)
  const { categories, setCategories } = useContext(CategoryContext)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    getProducts();
    getCategories();
  }, [])
  const getProducts = async () => {
    const data = await baseService.get('/products')
    setProducts(data)
  }
  const getCategories = async () => {
    const data = await baseService.get('/categories')
    setCategories(data)
  }

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }
  function goToPreviousPage() {
    (currentPage - 1) < 1 ? setCurrentPage(0) : setCurrentPage((page) => page - 1);
  }
  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    if (pageNumber < 0) {
      setCurrentPage(1);
    }
    setCurrentPage(pageNumber);
  }
  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    if(currentCategory.id !== "all"){
      let currentProducts = products.filter(item => item.categoryId === parseInt(currentCategory.id))
      return currentProducts.slice(startIndex, endIndex);
    }
    return products.slice(startIndex, endIndex);
    
  };
  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  
  
  return (
    <div >
      {currentCategory.id === "all" ?
        <div className={'product-title-all'}>{(currentCategory.id)?.toUpperCase() +" PRODUCTS"}</div>
        :
        <div className={'product-title-all'}>{((categories.find(q => q.id === parseInt(currentCategory.id)))?.name)?.toUpperCase()}</div>}
      <div className={'products-wrapper'}>
        {products !== null && (
          getPaginatedData().map((product) => (
            <Product product={product} key={product.id}></Product>
          ))
        )}

      </div>
      <div className="pagination-cont" style={{ display: 'flex', flexDirection: 'row' }}>
        <button onClick={goToPreviousPage}>Previous</button>
        {getPaginationGroup().map((item, index) => {
          return (<div key={index} onClick={changePage}>{item}</div>)
        })}
        <button onClick={goToNextPage}>Next</button>
      </div>
    </div>
  )
}

export default ProductsPage;
