import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../components/Cart"
import { useCart } from "./CartProvider";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken")
        navigate("/login")
    }

    const data = useCart()
    const [showCart, setShowCart] = useState(false)

    const toggleCart = () => {
        setShowCart((prevShowCart) => !prevShowCart)
    }
    return (
        <>
            <nav className="relative flex w-full flex-wrap items-center justify-between bg-teal-600 py-4 text-white shadow-lg">
                <div className="flex items-center justify-between w-full">
                    <div>
                        <span className="ml-2 text-4xl font-medium leading-tight" style={{ fontFamily: "initial" }}>FoodNow</span>
                        <Link to="/myOrders"><button className="bg-green-300 hover:bg-green-700 text-white font-semibold py-1 px-1 ml-5 rounded-lg text-lg focus:outline-none" style={{ fontFamily: "monospace", cursor: "pointer" }}>My Orders</button></Link>
                    </div>
                    {showCart ? <Cart setShowCart={setShowCart} toggleCart={toggleCart} /> : ""}
                    {localStorage.getItem("authToken") ?
                        <>
                            <div className="flex items-center">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 mr-5 rounded-lg text-lg focus:outline-none" onClick={toggleCart}>My Cart
                                    {data.length == 0 ? "" : <span
                                        className="ml-2 inline-block whitespace-nowrap rounded-[0.27rem] bg-red-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-red-700"
                                    >{data.length}</span>
                                    }
                                </button>
                                <button className="bg-red-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 mr-5 rounded-lg text-lg focus:outline-none" onClick={handleLogout}>Logout</button>
                            </div>
                        </> :
                        <>
                            <div className="flex items-center">
                                <Link to="/login" className="ml-5"><button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-lg focus:outline-none">
                                    Login
                                </button>
                                </Link>
                                <Link to="/createuser" className="ml-5">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-lg focus:outline-none">
                                        Signup
                                    </button>
                                </Link>
                            </div>
                        </>
                    }
                </div>
            </nav>
        </>
    );
}

export default Navbar;


