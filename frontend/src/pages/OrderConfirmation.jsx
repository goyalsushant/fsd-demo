import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import api from "../api/axios"
import { useSelector } from "react-redux"

const OrderConfirmation = () => {
    const { orderId } = useParams()
    const [loading, setLoading] = useState()
    const { orders } = useSelector(state => state.orders)

    const orderDetails = orders.find(item => item._id === orderId)
    console.log(orderDetails)
    const subTotal = orderDetails.products.reduce((acc, item) => acc + (item.product.price.discountedPrice * item.quantity), 0)

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Order Confirmed</h2>

            <p>Thank you for shopping with us.</p>
            <p> Your Order ID is: {orderId}</p>

            <h3>Order Details</h3>
            <div>
                {
                    orderDetails.products.map(product => (
                        <div key={product._id}>
                            <span>{product.title}</span>
                            <span>{product.quantity}</span>

                            <span>${(product.product.price.discountedPrice * product.quantity).toFixed(2)}</span>
                        </div>
                    ))
                }

                <div>
                    <span>Total:</span>
                    <span>{subTotal.toFixed(2)}</span>
                </div>
            </div>
            <Link to={'/orders'}>View All Orders</Link>
        </div>
    )
}

export default OrderConfirmation