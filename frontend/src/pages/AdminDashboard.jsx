import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import api from "../api/axios"
import { setLoading, setProducts } from "../slices/productSlice"
import ProductModal from "../components/admin/ProductModal"

const AdminDashboard = () => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { products } = useSelector(state => state.products)
    const [categories, setCategories] = useState([])
    const [activeTab, setActiveTab] = useState('products')

    // Product states
    const [editProducts, setEditProducts] = useState(null)
    const [showProductModal, setShowProductModal] = useState(false)

    // Category states
    const [showCategoryModal, setShowCategoryModal] = useState(false)

    const [formData, setFormData] = useState({})

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/category')
                setCategories(response.data)
            }
            catch (err) {
                console.log(err)
            }
        }

        fetchCategories()
    }, [])

    const handleDeleteProduct = async (id) => {

        dispatch(setLoading(true))

        try {
            await api.delete(`/products/${id}`, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
            const response = await api.get('/products')
            dispatch(setProducts(response.data))
        }
        catch (err) {
            console.log(err)
        }
        finally {
            dispatch(setLoading(false))
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleProductSubmit = async (data) => {
        try {
            data.price = {
                mrp: data.mrp,
                discountedPrice: data.discountedPrice
            }
            await api.post('/products', data, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
            const response = await api.get('/products')
            dispatch(setProducts(response.data))
            setShowProductModal(false)
            setFormData({})
            setEditProducts({})
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleCategorySubmit = async () => {
        try {
            await api.post('/category', formData, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
            const response = await api.get('/category')
            setCategories(response.data)
            setShowCategoryModal(false)
            setFormData({})
        }
        catch (err) {

        }
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Admin Dashboard</h2>

            {/* Admin Options */}
            <div className="flex gap-4 mb-6">
                <button className={`px-4 py-2 ${activeTab === 'products' ? 'bg-black text-white' : 'bg-gray-300 dark:bg-gray-700'}`} onClick={() => setActiveTab('products')}>Products</button>
                <button className={`px-4 py-2 ${activeTab === 'categories' ? 'bg-black text-white' : 'bg-gray-300 dark:bg-gray-700'}`} onClick={() => setActiveTab('categories')}>Categories</button>
                <button className={`px-4 py-2 ${activeTab === 'users' ? 'bg-black text-white' : 'bg-gray-300 dark:bg-gray-700'}`} onClick={() => setActiveTab('users')}>User Management</button>
                <button className={`px-4 py-2 ${activeTab === 'orders' ? 'bg-black text-white' : 'bg-gray-300 dark:bg-gray-700'}`} onClick={() => setActiveTab('orders')}>Order Management</button>
            </div>

            {/* Products Tabs */}
            {
                activeTab == 'products' && (
                    <div>
                        <button className="bg-green-500 text-white px-4 py-2 rounded mb-4" onClick={() => setShowProductModal(true)}>Add a Product</button>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white dark:bg-gray-900 rounded shadow-md">
                                <thead>
                                    <tr className="bg-gray-200 dark:bg-gray-700">
                                        <th className="py-2 px-4">Title</th>
                                        <th className="py-2 px-4">Category</th>
                                        <th className="py-2 px-4">MRP</th>
                                        <th className="py-2 px-4">Discounted Price</th>
                                        <th className="py-2 px-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map(product => (
                                            <tr key={product._id}>
                                                <td className="border px-4 py-2">{product.title}</td>
                                                <td className="border px-4 py-2">{product.category ?? 'No Category'}</td>
                                                <td className="border px-4 py-2">{product.price.mrp}</td>
                                                <td className="border px-4 py-2">{product.price.discountedPrice}</td>
                                                <td className="border px-4 py-2 flex gap-2">
                                                    <button className="bg-yellow-500 text-white px-2 rounded" onClick={() => setEditProducts(product)}>Edit</button>
                                                    <button className="bg-red-500 text-white px-2 rounded" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }

            {/* Categories Tab */}
            {
                activeTab == 'categories' && (
                    <div>
                        <button className="bg-green-500 text-white px-4 py-2 rounded mb-4" onClick={() => setShowCategoryModal(true)}>Add a Category</button>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white dark:bg-gray-900 rounded shadow-md">
                                <thead>
                                    <tr className="bg-gray-200 dark:bg-gray-700">
                                        <th className="py-2 px-4">Name</th>
                                        <th className="py-2 px-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        categories.length > 0 && categories.map(category => (
                                            <tr key={category._id}>
                                                <td className="border px-4 py-2">{category.name}</td>
                                                <td className="border px-4 py-2 flex gap-2">
                                                    <button className="bg-yellow-500 text-white px-2 rounded" onClick={() => setEditProducts(product)}>Edit</button>
                                                    <button className="bg-red-500 text-white px-2 rounded" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }

            {/* Users Tab */}
            {
                activeTab == 'users' && (
                    <div>
                        <button className="bg-green-500 text-white px-4 py-2 rounded mb-4" onClick={() => setShowCategoryModal(true)}>Add a Category</button>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white dark:bg-gray-900 rounded shadow-md">
                                <thead>
                                    <tr className="bg-gray-200 dark:bg-gray-700">
                                        <th className="py-2 px-4">Name</th>
                                        <th className="py-2 px-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        categories.length > 0 && categories.map(category => (
                                            <tr key={category._id}>
                                                <td className="border px-4 py-2">{category.name}</td>
                                                <td className="border px-4 py-2 flex gap-2">
                                                    <button className="bg-yellow-500 text-white px-2 rounded" onClick={() => setEditProducts(product)}>Edit</button>
                                                    <button className="bg-red-500 text-white px-2 rounded" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }

            {/* Orders Tab */}

            {/* Products Modal */}
            {
                showProductModal && (
                    <ProductModal
                        isOpen={showProductModal}
                        onClose={() => {
                            setShowProductModal(false)
                            setFormData({})
                            setEditProducts({})
                        }}
                        onSubmit={handleProductSubmit}
                        editProduct={editProducts}
                        categories={categories}
                    />
                )
            }

            {/* Category Modal */}
            {
                showCategoryModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white dark:bg-gray-900 p-6 rounded w-96">
                            <h3 className="text-xl font-bold mb-4">Add Product</h3>

                            <input type="text" name="name" placeholder="Category Name" value={formData.name || ''} onChange={handleChange} className="w-full p-2 mb-2 border rounded" />

                            <div className="flex justify-end gap-2 mt-4">
                                <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => {
                                    setShowCategoryModal(false)
                                    setFormData({})
                                    setEditProducts({})
                                }}>Cancel</button>
                                <button className="bg-black text-white px-4 py-2 rounded" onClick={handleCategorySubmit}>Save</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default AdminDashboard