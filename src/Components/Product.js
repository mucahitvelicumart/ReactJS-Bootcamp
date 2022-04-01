import React from 'react'
import { useContext } from 'react'
import CartContext from '../Context/CartContext'
import CategoryContext from '../Context/CategoryContext'
import { Link } from 'react-router-dom'
export const Product = (props) => {
    const product = props.product
    const { cart, setCart } = useContext(CartContext)
    const { categories, setCategory } = useContext(CategoryContext)

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

    return (
        <div key={product.id} className="product-wrapper">

            <div className={'product-image-wrapper'}>
                <img alt={'product-' + product.id} src={require('../Images/' + product.categoryId + ".png")} width={225} height={225} />

            </div>
            <div className={'product-info-wrapper'}>
                <div className={'product-title'}>
                    <Link className={'filter-option'}
                        to={{
                            pathname: '/details/' + product.id,
                            state: { stateParam: true }
                        }}
                    >
                        {product.name}
                    </Link>
                </div>
                <div className={'product-properties-info-wrapper'}>
                    <div className={'product-properties-element'}>
                        <div className={'product-properties-label'}>
                            Category:
                        </div>
                        <div className={'product-properties-value'}>
                            {(categories.find(q => q.id === product.categoryId))?.name}
                        </div>
                    </div>
                    <div className={'product-properties-element'}>
                        <div className={'product-properties-label'}>
                            Per Unit:
                        </div>
                        <div className={'product-properties-value'}>
                            {product.quantityPerUnit}
                        </div>
                    </div>
                </div>
                <div className={'product-price-info-wrapper'}>
                    <div className={'product-price-element'}>
                        {product.unitPrice.toFixed(2)} TL
                    </div>

                </div>
            </div>
            <div className={'product-add-cart-wrapper'}>
                <button className={'product-button'} onClick={() => addItemIntoCart(product)}>
                    Sepete Ekle
                </button>
            </div>

        </div>
    )
}
