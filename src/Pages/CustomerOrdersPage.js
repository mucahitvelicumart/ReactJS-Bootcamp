import React from 'react'
import { useState, useEffect } from 'react'
import { baseService } from '../Services/network/services/baseService'
import '../assets/Table.css'
export const CustomerOrdersPage = () => {

    const [orders, setOrders] = useState([])
    useEffect(() => {
        getOrders()

    }, [])
    const getOrders = async () => {
        const data = await baseService.get('/orders')
        setOrders(data)
    }
    let myOrders = orders.filter(order => order.customerId === "Mucahit")
    console.log(myOrders)
    return (
        <div className="App">
            <table>
                <tbody>
                    <tr>
                        <th>Order Date</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Product Unit Price</th>
                        <th>Total Price</th>
                    </tr>
                </tbody>
                {myOrders.map((order, key) => {
                    return (
                        <tbody key={key}>
                            <tr >
                                <td>{order.orderDate}</td>
                                <td>{order.productName}</td>
                                <td>{order.quantity}</td>
                                <td>{order.productPrice} TL</td>
                                <td>{order.totalPrice} TL</td>
                            </tr>
                        </tbody>
                    )
                })}
            </table>
        </div>
    );
}

