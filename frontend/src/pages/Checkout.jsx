import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { setOrders } from "../slices/orderSlice";
import { removeCartItem } from "../slices/cartSlice";

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const subTotal = cartItems.reduce((acc, item) => acc + (item.price.discountedPrice * item.quantity), 0)

    const handleCheckout = async () => {
        if (!cartItems.length) return

        setLoading(true)

        try {
            const products = cartItems.map(item => ({
                product: item._id,
                quantity: item.quantity
            }))

            const orderDetails = {
                products,
                amount: subTotal
            }

            const response = await api.post('/orders', orderDetails, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            dispatch(setOrders(response.data))

            cartItems.forEach(item => dispatch(removeCartItem(item._id)))

            navigate('/orders')
        }
        catch (err) {
            // console.log(err)
            setError('Failed to create order. Try again later.')
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Checkout</h2>

            {error &&
                <p className="text-red-500 mb-4">{error}</p>}

            <div>
                <h3>Order Summary</h3>
                <div>
                    <span>Subtotal</span>
                    <span>${subTotal.toFixed(2)}</span>
                </div>
                <div>
                    <span>Shipping:</span>
                    <span>$0.00</span>
                </div>
                <div>
                    <span>Total</span>
                    <span>${subTotal.toFixed(2)}</span>
                </div>

                <button onClick={handleCheckout}>{loading ? 'Processing Order' : 'Place Order'}</button>
            </div>

            <div>
                <h3>Shipping Info</h3>
                <p>User: {user.email}</p>
            </div>
        </div>
    )
}

export default Checkout