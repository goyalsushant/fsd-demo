import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import api from "../api/axios"
import { setLoading, setProducts } from "../slices/productSlice"
import { addToCart } from "../slices/cartSlice"

const Home = () => {

    const dispatch = useDispatch()
    const { products, loading } = useSelector(state => state.products)

    useEffect(() => {
        const fetchProducts = async () => {
            dispatch(setLoading(true))

            try {
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
        fetchProducts()
    }, [])

    if (loading) {
        return (
            <div className="felx justify-center">
                Loading Products...
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1">
            {
                products && products.map((product) => (
                    <div className="bg-white p-4 rounded shadow-md flex flex-col" key={product._id}>
                        <img className="w-full h-48 object-cover mb-4" src={product.images[0] ?? 'https://placehold.co/600x400'} />
                        <h3 className="font-bold text-gray-500">{product.title}</h3>
                        <p className="text-gray-300">{product.category}</p>
                        <div className="mt-2 flex items-center justify-between">
                            <div>
                                <span className="mr-1">${product.price.discountedPrice.toFixed(2)}</span>
                                <span className="line-through">${product.price.mrp.toFixed(2)}</span>
                            </div>
                        </div>
                        <button
                            className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
                            onClick={() => dispatch(addToCart(product))}>
                            Add To Cart
                        </button>
                    </div>
                ))
            }
        </div>
    )
}

export default Home