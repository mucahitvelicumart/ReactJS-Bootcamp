import React from 'react'
import '../assets/Product.css'
import { useContext,useEffect } from "react"
import ProductsContext from '../Context/ProductContext'
import { useParams } from 'react-router-dom'
import CategoryContext from '../Context/CategoryContext'
import CartContext from '../Context/CartContext'
import { baseService } from '../Services/network/services/baseService'

export const ProductDetailPage = () => {
  const { products, setProducts } = useContext(ProductsContext)
  const { categories, setCategories } = useContext(CategoryContext)
  const { cart, setCart } = useContext(CartContext)
  const currentId = useParams()
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
  const addItemIntoCart = (product) => {
    let cartProduct = cart?.find(q => q.id === product.id)
    if (cartProduct) {
        cartProduct.quantity += 1
        setCart([...cart])
    } else {
        const cartProduct = {
            id: product.id,
            name: product.name,
            price: product.unitPrice,
            quantity: 1,
            categoryId: product.categoryId
        }
        setCart(prev => [...prev, cartProduct])
    }
}
let currentProduct = products.find(item => item.id === parseInt(currentId.id))
  return (
    <>
    {currentProduct ? <div key={currentProduct.id} className="products-detail-wrapper">
        <div className={'product-image-wrapper'}>
            <img alt={'product-' + currentProduct.id} src={require('../Images/' + currentProduct.categoryId + ".png")} width={225} height={225} />

        </div>
        
        <div className={'product-info-wrapper'}>
            <div className={'product-detail-title'}>
                    {currentProduct.name}
            </div>
            <div className={'product-properties-info-wrapper'}>
                <div className={'product-properties-element'}>
                    <div className={'product-properties-label'}>
                        Category:
                    </div>
                    <div className={'product-properties-value'}>
                        {(categories.find(q => q.id === currentProduct.categoryId))?.name}
                    </div>
                </div>
                <div className={'product-properties-element'}>
                    <div className={'product-properties-label'}>
                        Per Unit:
                    </div>
                    <div className={'product-properties-value'}>
                        {currentProduct.quantityPerUnit}
                    </div>
                </div>
                <div className={'product-properties-element'}>
                    <div className={'product-properties-label'}>
                        Units In Stock:
                    </div>
                    <div className={'product-properties-value'}>
                        {currentProduct.unitsInStock}
                    </div>
                </div>
                <div className={'product-properties-element'}>
                    <div className={'product-properties-label'}>
                        Units on Order:
                    </div>
                    <div className={'product-properties-value'}>
                        {currentProduct.unitsOnOrder}
                    </div>
                </div>
                <div className={'product-properties-element'}>
                    <div className={'product-properties-label'}>
                        Reorder Level:
                    </div>
                    <div className={'product-properties-value'}>
                        {currentProduct.reorderLevel}
                    </div>
                </div>
                <div className={'product-properties-element'}>
                    <div className={'product-properties-label'}>
                        Supplier Id:
                    </div>
                    <div className={'product-properties-value'}>
                        {currentProduct.supplierId}
                    </div>
                </div>

            </div>
            <div className={'product-price-info-wrapper'}>
                <div className={'product-price-element'}>
                    {currentProduct.unitPrice.toFixed(2)} TL
                </div>

            </div>
        </div>
        <div className={'product-add-cart-wrapper'}>
            <button className={'product-button'} onClick={() => addItemIntoCart(currentProduct)}>
                Sepete Ekle
            </button>
        </div>

    </div>:null}</>
)
}
