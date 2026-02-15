import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { toggleTheme } from "../slices/themeSlice"

const Navbar = () => {

    const dispatch = useDispatch()
    const { darkMode } = useSelector(state => state.theme)
    const { cartItems } = useSelector(state => state.cart)
    const { isAuthenticated, user } = useSelector(state => state.auth)

    return (
        <nav className="bg-white px-6 py-4 flex justify-between items-center">
            <Link to={'/'} className="text-xl font-bold text-gray-800">E-Comm Store</Link>
            <div className="flex items-center gap-6">
                <Link to={'/'} className="relative text-gray-600">Home</Link>
                <Link to={'/cart'} className="relative text-gray-600">Cart</Link>
                {
                    user && user.role === 'admin' && (
                        <Link to={'/dashboard'}>Dashboard</Link>
                    )
                }
                <button onClick={() => dispatch(toggleTheme())}>{darkMode ? 'Light': 'Dark'}</button>
            </div>
        </nav>
    )
}

export default Navbar