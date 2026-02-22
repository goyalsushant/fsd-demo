import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { removeCartItem, updateQuantity } from "../slices/cartSlice"

const Cart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { cartItems } = useSelector(state => state.cart)

    const handleQuantity = (product_id, quantity) => {
        if (quantity < 1) return

        // TBD - updates and qunatity
        dispatch(updateQuantity({
            product_id,
            quantity
        }))
    }

    const handleRemove = (product_id) => {
        dispatch(removeCartItem(product_id))
    }

    const subTotal = cartItems.reduce((acc, item) => acc + (item.price.discountedPrice * item.quantity), 0)

    if (cartItems.length == 0) {
        return (
            <div className="flex flex-col items-center justify-center text-gray-800 dark:text-white">
                <h2 className="text-2xl font-bold mb-4">Cart is Empty.</h2>
                <Link to={'/'} className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Continue Shopping</Link>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Shopping Cart</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 flex flex-col gap-4">
                    {cartItems.length && cartItems.map(item => (
                        <div key={item._id} className="flex gap-4 bg-white dark:bg-gray-900 p-4 rounded shadow-md items-center">
                            <img src={item.images[0]} alt={item.title} className="w-24 h-24 object-cover rounded" />
                            <div className="flex-1 flex flex-col">
                                <Link to={'/'} className="font-bold text-gray-800 dark:text-white hover:underline">{item.title}</Link>
                                <p className="text-gray-500 dark:text-gray-300">{item.category}</p>
                                <p className="mt-1 text-black dark:text-white font-bold">{item.price.discountedPrice.toFixed(2)}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <input type="number" min="1" value={item.quantity} onChange={(e) => handleQuantity(item._id, parseInt(e.target.value))} className="w-16 p-1 border rounded dark:bg-gray-700 dark:text-white" />
                                    <button onClick={() => handleRemove(item._id)} className="text-red-500 hover:text-red-600">Remove</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white dark:bg-gray-900 p-4 rounded shadow-md flex flex-col gap-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    Order Summary
                </h3>
                <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-bold text-black dark:text-white">
                        ${subTotal.toFixed(2)}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span className="font-bold text-black dark:text-white">$0.00</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${subTotal.toFixed(2)}</span>
                </div>
                <button
                    onClick={() => navigate("/checkout")}
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                    Proceed to Checkout
                </button>
            </div>

        </div >
    )
}

export default Cart