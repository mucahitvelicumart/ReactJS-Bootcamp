import React, { useContext } from 'react'
import CartContext from '../Context/CartContext';
import '../assets/Basket.css'
import {Link} from 'react-router-dom'

export default function Basket() {
  const { cart, setCart } = useContext(CartContext)
  let itemCountInBasket = cart?.length;
  let totalPrice = 0;
  cart?.map((product) => (
    totalPrice += product.quantity * product.price
  ))


  const removeItemFromCart = (product) => {

    if (product.quantity > 1) {
      product.quantity -= 1
      setCart([...cart])
    } else if (product.quantity == 1) {
      let newCart = cart.filter(item => item.id != product.id)
      setCart(prev => [...newCart])
    }
  }
  const removeAllItemFromCart = (product) => {
    setCart(prev => [])
  }
  return (
    <>
      <div className={'basket-wrapper'}>
        {
          itemCountInBasket > 0 && (
            <i className="basket-count">{itemCountInBasket}</i>
          )
        }
        <div className="basket-button">
          <div>CART</div>
        </div>
        <div className={'basket-opened'}>
          {cart?.length > 0 ? (
            cart?.map((product) => (

              <div key={'product-' + product.id} className={'basket-opened-element'}>
                <div className={'basket-product-image-wrapper'}>
                  <img alt={'product-' + product.id} src={require('../Images/' + product.categoryId + ".png")} width={40} height={59} />
                </div>
                <div className={'basket-product-info-wrapper'}>
                  <div className={'basket-product-title'}>
                    {product.name}
                  </div>
                  <div className={'basket-product-title'}>
                    {'Quantity: ' + product.quantity}
                  </div>
                  <div className={'basket-product-price'}>
                    {'Total Price: ' + (product.quantity * product.price).toFixed(2) + ' TL'}
                  </div>
                  <div className={'basket-product-remove-wrapper'}>
                    <button
                      id={'remove-' + product.id}
                      className={'basket-remove-button'}
                      onClick={() => removeItemFromCart(product)}>
                      REMOVE
                    </button>
                  </div>

                </div>
              </div>

            ))

          ) : (
            <div className={'basket-empty-wrapper'}>
              <div className={'basket-empty'}>
                There are no products in your cart.
              </div>
            </div>
          )
          }
          {totalPrice !== 0 ?
            <div className={'basket-product-price'}>
              Total Amount: {totalPrice.toFixed(2)} TL
            </div>
            : null}
          {totalPrice !== 0 ?
            <div className={'basket-button-wrapper'}>

              <button
                className={'basket-remove-button'}
                onClick={removeAllItemFromCart}>
                Empty the cart
              </button>

              <button
                className={'basket-confirm-button'}
                onClick={()=> console.log("GALATASARAY")}>
                <Link className={'basket-button-wrapper'}
                  to={{
                    pathname: '/basket/',
                    state: { stateParam: true }
                  }}
                >
                  Confirm Cart
                </Link>
              </button>
            </div>
            : null}
        </div>
      </div>
    </>
  )
}