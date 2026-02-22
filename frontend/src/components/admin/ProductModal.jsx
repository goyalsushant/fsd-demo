import { useEffect, useState } from "react"

const ProductModal = ({ isOpen, onClose, onSubmit, categories, editProduct }) => {

    const [formData, setFormData] = useState({})

    useEffect(() => {
        if (editProduct) {
            setFormData(editProduct)
        }
        else {
            setFormData({})
        }
    }, [editProduct])

    if (!isOpen) return null

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleProductSubmit = () => {
        onSubmit(formData)
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white dark:bg-gray-900 p-6 rounded w-96">
                <h3 className="text-xl font-bold mb-4">Add Product</h3>

                <input type="text" name="title" placeholder="Product Title" value={formData.title || ''} onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
                <input type="text" name="description" placeholder="Product Description" value={formData.description || ''} onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
                <input type="text" name="mrp" placeholder="MRP" value={formData.mrp || ''} onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
                <input type="text" name="discountedPrice" placeholder="Discounted Price" value={formData.discountedPrice || ''} onChange={handleChange} className="w-full p-2 mb-2 border rounded" />

                <div className="flex justify-end gap-2 mt-4">
                    <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>Cancel</button>
                    <button className="bg-black text-white px-4 py-2 rounded" onClick={handleProductSubmit}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default ProductModal