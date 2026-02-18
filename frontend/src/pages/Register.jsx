import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

const Register = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isAuthenticated } = useSelector(state => state.auth)

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        mobile: 0,
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (isAuthenticated) navigate('/')
    }, [isAuthenticated])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await api.post('/users/register', form)
            localStorage.setItem('token', response.data.token)
            dispatch(login(response.data.user))
            navigate('/')
        }
        catch (err) {
            // console.log(err.message)
            setError('Registration Failed')
        }
        finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="flex justify-center items-center bg-gray-100">
            <form className="bg-white dark:bg-gray-900 p-8 rounded shadow-md w-96" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Register</h2>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <input type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" required className="w-full p-2 mb-4 border rounded" />
                <input type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" required className="w-full p-2 mb-4 border rounded" />
                <input type="number" name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile Number" required className="w-full p-2 mb-4 border rounded" />
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full p-2 mb-4 border rounded" required />
                <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" className="w-full p-2 mb-4 border rounded" required />

                <button type="submit" className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition" disabled={loading}>{loading? 'Processing the Request': 'Register'}</button>
            </form>
        </div>
    )
}


export default Register