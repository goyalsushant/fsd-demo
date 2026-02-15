import Navbar from "./Navbar"

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
            <Navbar />
            <main className="flex-1 p-6 flex justify-center items-center">{children}</main>
        </div>
    )
}

export default Layout