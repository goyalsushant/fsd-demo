import { useEffect, useState } from "react"
import api from "../api/axios"
import { useDispatch, useSelector } from "react-redux"
import { setOrders } from "../slices/orderSlice"
import { Link } from "react-router-dom"

const OrdersList = () => {

    const dispatch = useDispatch()
    const { orders } = useSelector(state => state.orders)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/orders', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                })

                dispatch(setOrders(response.data))
            }
            catch (err) {

            }
            finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [])

    if (loading) return <p>Loading Order History...</p>

    if (!orders.length) return <p>You have no orders yet.</p>

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">My Orders</h2>
            <div className="flex flex-col gap-4">
                {orders.length && orders.map(order => (
                    <div className="bg-white dark:bg-gray-900 p-4 rouded shadow-md flex justify-between items-center" key={order._id}>
                        <p>Order ID: <strong>{order._id}</strong></p>
                        <p>Status: <strong>{order.status}</strong></p>
                        <p>Total: <strong>{order.amount}</strong></p>
                        <p>Total Products: <strong>{order.products.length}</strong></p>
                        <Link to={`/orders/${order._id}`} className="text-blue-500 hover:underline">View Order Details</Link>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default OrdersList