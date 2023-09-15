import React, { useState } from "react";
import { useCart, useDispatch } from "./CartProvider";

function Cards({ foodItem }) {

    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()
    const data = useCart()

    const handleCart = async () => {

        const existingItem = data.find((item) => item._id === foodItem._id);

        if (existingItem) {
            const updatedQty = existingItem.qty + parseInt(qty);
            const updatedPrice = parseInt(foodItem.price) * updatedQty;

            dispatch({
                type: "UPDATE",
                _id: foodItem._id,
                qty: updatedQty,
                price: updatedPrice,
            });
        } else {

            dispatch({
                type: "ADD",
                _id: foodItem._id,
                name: foodItem.name,
                category: foodItem.category,
                image: foodItem.image,
                qty: qty,
                price: foodItem.price * qty,
            });

        }
    };



    return (
        <div className="m-4">
            <div className="block rounded-lg h-auto max-w-sm bg-white shadow-lg dark:bg-neutral-700">
                <div
                    className="relative overflow-hidden bg-cover bg-no-repeat"
                    style={{ height: "300px", objectFit: "fill" }}
                >
                    <img className="rounded-t-lg" src={foodItem.image} alt={name} style={{ height: "auto", objectFit: "fill" }} />
                    <a href="#!">
                        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                    </a>
                </div>
                <div className="p-6">
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                        {foodItem.name}
                    </h5>
                    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                        {foodItem.category}
                    </p>
                    <div className="flex justify-between items-center">
                        <select className="rounded bg-blue-200 text-blue-900" onChange={(e) => setQty(e.target.value)}>
                            {Array.from({ length: 5 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                        <div className="text-black">Total Price: ₹{(qty * (foodItem.price)).toFixed(2)}</div>
                    </div>
                </div>
                <hr />
                <button className="bg-teal-500 hover:bg-blue-700 text-white font-semibold my-2 mx-4 py-2 px-4 rounded-lg text-lg focus:outline-none" onClick={handleCart}>Add to Cart  </button>
            </div>
        </div>
    );
}

export default Cards;

