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

            <p className="mb-4">Thank you for shopping with us.</p>
            <p className="mb-4"> Your Order ID is: {orderId}</p>

            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">Order Details</h3>
            <div className="bg-white dark:bg-gray-900 p-4 rounded shadow-md flex flex-col gap-2">
                {
                    orderDetails.products.map(product => (
                        <div key={product._id} className="flex justify-between">
                            <span>{product.product.title} X {product.quantity}</span>
                            <span></span>

                            <span>${(product.product.price.discountedPrice * product.quantity).toFixed(2)}</span>
                        </div>
                    ))
                }

                <div className="flex justify-between mt-2 font-bold">
                    <span>Total:</span>
                    <span>{subTotal.toFixed(2)}</span>
                </div>
            </div>
            <Link to={'/orders'} className="mt-6 inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-800">View All Orders</Link>
        </div>
    )
}

export default OrderConfirmation