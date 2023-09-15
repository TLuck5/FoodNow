import axios from "axios";
import { useCart, useDispatch } from "./CartProvider"

export default function Cart({ setShowCart, toggleCart }) {

    const data = useCart()
    const dispatch = useDispatch()
    const totalPrice = data.reduce((acc, item) => acc + item.price, 0);

    const handleCheckout = async () => {

        if (data.length === 0) {
            alert("Your cart is empty. Please add items to your cart before checking out.");
            return;
        }

        const response = await axios.post("http://localhost:5000/api/orderData", { order_data: data, email: localStorage.getItem("userEmail"), order_date: new Date().toDateString() })

        if (response.status == 200) {
            dispatch({ type: "DROP" })
            toggleCart()
        }
    }

    return (
        <div>

            <div className="fixed inset-0 overflow-hidden z-50 flex justify-center items-center">

                <div className="absolute inset-0 bg-gray-800 opacity-75"></div>

                <div className="relative z-50 bg-white rounded-lg shadow-xl p-6 w-96">

                    <div className="text-xl font-semibold mb-4 text-gray-700">Your Cart</div>
                    {data.length == 0 ? <div className="text-lg font-semibold text-blue-900">Your Cart is Empty</div> : data.map((item, index) => (
                        <>
                            <div className="divide-y divide-gray-200 space-y-4" key={index}>

                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-4 mb-5">

                                        <div>
                                            <div className="text-lg font-semibold text-orange-600">{item.name}</div>
                                            <div className="text-gray-600">{item.price}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-8">

                                        <span className="text-lg font-semibold text-blue-300">{item.qty}</span>
                                        <button className="text-gray-500 focus:outline-none " onClick={() => dispatch({ type: "REMOVE", index: index })}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </>
                    ))}
                    <div className="mt-4 flex justify-between">
                        <div className="text-lg font-semibold text-gray-900">Total:</div>
                        <div className="text-xl font-bold text-gray-500">₹ {totalPrice}</div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button onClick={handleCheckout}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                        >
                            Checkout
                        </button>
                    </div>


                    <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={() => toggleCart()}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"

                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>

        </div>
    )
}
