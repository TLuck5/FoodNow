import React, { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/myOrders", { email: localStorage.getItem("userEmail") });
            setOrders(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-3xl font-semibold mb-4 ml-2 text-red-400" style={{ fontFamily: "initial" }}>My Orders</h1>
            {loading ? (
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent h-14 w-14 mb-4"></div>
                    <p className="text-blue-500">Loading...</p>
                </div>
            ) : (
                <div>
                    {orders.length === 0 ? (
                        <p className="text-4xl mt-10" style={{ display: "flex", justifyContent: "center", font: "caption" }}>No orders found.</p>
                    ) : (
                        <ul>
                            {orders.map((order, index) => (
                                <li key={index} className="mb-4">
                                    {order.date ? (
                                        <div className="bg-blue-100 p-4 rounded-lg">
                                            <p className="text-blue-500 font-semibold">Date: {order.date}</p>
                                        </div>
                                    ) : (
                                        <div className="bg-white p-4 rounded-lg shadow-md">
                                            <p className="text-xl font-semibold text-pink-800">{order.name}</p>
                                            <p style={{ color: "GrayText" }}>Quantity: {order.qty}</p>
                                            <p style={{ color: "ActiveBorder" }}>Price: ₹{order.price ? order.price.toFixed(2) : "N/A"}</p>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default MyOrders;





