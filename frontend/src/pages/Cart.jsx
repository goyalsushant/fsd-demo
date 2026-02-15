import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { removeCartItem } from "../slices/cartSlice"

const Cart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { cartItems } = useSelector(state => state.cart)

    const handleQuantity = (product_id, value) => {
        if (value < 1) return

        // TBD - updates and qunatity
        dispatch(setCartItems({
            product_id,
            value
        }))
    }

    const handleRemove = (product_id) => {
        dispatch(removeCartItem(product_id))
    }

    const subTotal = cartItems.reduce((acc, item) => acc + item.price.discountedPrice, 0)

    if (cartItems.length == 0) {
        return (
            <div>
                <h2>Cart is Empty.</h2>
                <Link to={'/'}>Continue Shopping</Link>
            </div>
        )
    }

    return (
        <div className="">
            <h2>Shopping Cart</h2>
            <div>
                {cartItems.length && cartItems.map(item => (
                    <div key={item._id}>
                        <img />
                        <div>
                            <Link to={'/'}>{item.title}</Link>
                            <p>{item.category}</p>
                            <p>{item.price.discountedPrice.toFixed(2)}</p>
                            <div>
                                <input type="number" min="1" value={item.quantity} onChange={(e) => handleQuantity(item._id, parseInt(e.target.value))} />
                                <button onClick={() => handleRemove(item._id)}>Remove</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            
        </div>
    )
}

export default Cart