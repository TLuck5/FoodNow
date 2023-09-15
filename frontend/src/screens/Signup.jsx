import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        location: "",
    });

    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault();
        if (userData.name == "" || userData.email == "" || userData.password == "" || userData.location == "") {
            alert("Enter details before signing up")
            return
        }
        if (userData.password.length < 3) {
            alert("Password must be strong and greater than 3 characters")
            setUserData({ password: "" })
            return
        }

        try {

            const response = await axios.post("http://localhost:5000/api/createuser", userData);
            if (response.data.success) {
                alert("User created")
                navigate("/login")
            } else {
                response.data.errors.map((item) => {
                    alert(item.msg)
                    return
                })
            }


        } catch (error) {
            alert(error.message)
            console.error("Error:", error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form className="w-full max-w-md bg-gray-300 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitHandler}>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                            Full Name
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="input-field text-gray-900 text-semibold"
                            id="inline-full-name"
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-email">
                            Email
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="input-field text-gray-900 text-semibold"
                            id="inline-email"
                            type="text"
                            name="email"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4 " htmlFor="inline-password">
                            Password
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="input-field text-gray-900 text-semibold"
                            id="inline-password"
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        />

                    </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-location">
                            Location
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="input-field text-gray-900 text-semibold"
                            id="inline-location"
                            type="text"
                            name="location"
                            value={userData.location}
                            onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                        />
                    </div>
                </div>

                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 border rounded shadow my-3">
                            Sign Up
                        </button>
                    </div>
                </div>

                <span style={{ marginLeft: "50px", color: "goldenrod" }}>
                    Already have an account? <Link className="text-blue-500" to="/login">Login here</Link>
                </span>
            </form>
        </div>
    );
}
