import React, { useContext } from 'react'
import { baseService } from '../Services/network/services/baseService'
import CartContext from '../Context/CartContext'
import '../assets/Basket.css'
import '../assets/Product.css'
export const BasketConfirmPage = () => {

  const { cart, setCart } = useContext(CartContext)
  let totalPrice = 0;
  cart?.map((product) => (
    totalPrice += product.quantity * product.price
  ))
  const removeItemFromCart = (product) => {

    if (product.quantity > 1) {
      product.quantity -= 1
      setCart([...cart])
    } else if (product.quantity === 1) {
      let newCart = cart.filter(item => item.id !== product.id)
      setCart(prev => [...newCart])
    }
  }
  const removeAllItemFromCart = (product) => {
    if (cart.length > 0) {
      let confirmAction = window.confirm("Do you want to empty your Cart?");
      if (confirmAction) {
        setCart(prev => [])
        alert("Successfull");
      } else {
        alert("Canceled");
      }
    }
  }

  const confirmCart = () => {
    let confirmAction = window.confirm("Do you confirm your Cart?");

    if (confirmAction) {
      cart?.map((product) => {
        let date = new Date();
        let stringDate = date.toString();
        let newOrder = {
          customerId: "Mucahit",
          orderDate: stringDate,
          productId: product.id,
          productName: product.name,
          quantity: product.quantity,
          productPrice: (product.price).toFixed(2),
          productCategoryId: product.categoryId,
          totalPrice: (product.quantity * product.price).toFixed(2)
        }
        baseService.post("/orders", newOrder)
      })
      setCart(prev => [])
      alert("Successfull");
    } else {
      alert("Canceled");
    }


  }

  return (
    <>
      <button
        className={'basketpage-button-wrapper'}
        onClick={removeAllItemFromCart}>
        Empty the cart
      </button>

      <button
        className={'basketpage-button-wrapper'}
        onClick={confirmCart}>
        Confirm Cart
      </button>

      <div className={'basketpage-wrapper'} >
        Total Amount: {totalPrice.toFixed(2)} TL
      </div>

      <div className={'products-wrapper'}>

        {cart?.length > 0 ? (
          cart?.map((product) => (

            <div key={'product-' + product.id} className={'product-wrapper'}>
              <div className={'product-image-wrapper'}>
                <img alt={'product-' + product.id} src={require('../Images/' + product.categoryId + ".png")} width={225} height={225} />
              </div>
              <div className={'product-info-wrapper'}>
                <div className={'product-title'}>
                  {product.name}
                </div>
                <div className={'basket-product-title'}>
                  {'Quantity: ' + product.quantity}
                </div>
                <div className={'basket-product-price'}>
                  {'Total Price: ' + (product.quantity * product.price).toFixed(2) + ' TL'}
                </div>
                <div className={'product-remove-wrapper'}>
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
          <div className={'basketpage-empty-wrapper'}>
            <div className={'basketpage-empty-message'}>
              There are no products in your cart.
            </div>
          </div>
        )
        }


      </div>
    </>
  )
}
