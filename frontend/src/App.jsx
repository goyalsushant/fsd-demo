import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import ProtectedRoute from './components/ProtectedRoute'
import AdminDashboard from './pages/AdminDashboard'
import OrdersList from './pages/OrdersList'
import OrderConfirmation from './pages/OrderConfirmation'

function App() {
  return (
    <BrowserRouter>
      <Layout >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/cart' element={<Cart />} />

          {/* User Routes */}
          <Route path='/checkout' element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />

          <Route path='/orders' element={
            <ProtectedRoute>
              <OrdersList />
            </ProtectedRoute>
          } />

          <Route path='/orders/:orderId' element={
            <ProtectedRoute>
              <OrderConfirmation />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path='/dashboard' element={
            <ProtectedRoute isAdmin={true}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
