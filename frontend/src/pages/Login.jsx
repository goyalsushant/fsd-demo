import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "../slices/authSlice"
import api from "../api/axios"

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            // wait for the login API
            const response = await api.post('/users/login', form)
            dispatch(login(response.data))
            navigate('/')
        }
        catch (err) {
            setError('Login Failed')
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="flex justify-center items-center bg-gray-100 h-full">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Login</h2>
                {error && (
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                )}
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white" required />
                <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white" required />
                <button type="submit" className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition" >Login</button>

            </form>
        </div>
    )
}

export default Login