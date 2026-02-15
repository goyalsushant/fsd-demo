// import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'

function App() {

  return (
    <BrowserRouter>
      <Layout >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
