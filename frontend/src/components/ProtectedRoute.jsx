import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children, isAdmin = false }) => {
    const { isAuthenticated, user } = useSelector(state => state.auth)

    if (!isAuthenticated) {
        return <Navigate to={'/login'} />
    }

    if (isAdmin && user.role !== 'admin') {
        return <Navigate to={'/'} />
    }

    return children
}

export default ProtectedRoute