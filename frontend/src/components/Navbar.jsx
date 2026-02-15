import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { toggleTheme } from "../slices/themeSlice"
import { logout } from "../slices/authSlice"

const Navbar = () => {

    const dispatch = useDispatch()
    const { darkMode } = useSelector(state => state.theme)
    const { cartItems } = useSelector(state => state.cart)
    const { isAuthenticated, user } = useSelector(state => state.auth)

    return (
        <nav className="bg-white dark:bg-gray-900 px-6 py-4 flex justify-between items-center">
            <Link to={'/'} className="text-xl font-bold text-gray-800 dark:text-white">E-Comm Store</Link>
            <div className="flex items-center gap-6">
                <Link to={'/'} className="relative text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">Home</Link>
                <Link to={'/cart'} className="relative text-gray-600 dark:text-gray-300">
                    Cart
                    {cartItems.length > 0 && (
                        <span className="absolute -top-2 -right-3 bg-black text-white text-xs px-2 py-0.5 rounded-full">
                            {cartItems.length}
                        </span>
                    )}

                </Link>
                {
                    user && user.role === 'admin' && (
                        <Link to={'/dashboard'}>Dashboard</Link>
                    )
                }
                <button
                    onClick={() => dispatch(toggleTheme())}
                    className="px-3 py-1 border rounded text-sm dark:border-gray-600 dark:text-white">
                    {darkMode ? 'Light' : 'Dark'}
                </button>
                {isAuthenticated ? (
                    <button
                        onClick={() => dispatch(logout())}
                        className="bg-black text-white px-4 py-1 rounded"
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className="bg-black text-white px-4 py-1 rounded"
                    >
                        Login
                    </Link>
                )}

            </div>
        </nav>
    )
}

export default Navbar