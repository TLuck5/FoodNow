import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import Search from "../components/Search";

function Home() {
    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState("");
    const [catData, setCatData] = useState([]);

    const loadData = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/fooditems");
            setData(response.data[0]);
            setCatData(response.data[1]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSearchClick = (value) => {
        setSearchData(value);
    };

    return (
        <div>
            <Navbar />
            <div className="mt-10">
                <Search handleSearchClick={handleSearchClick} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {catData &&
                    catData.map((item) => (
                        <div key={item.category} className="w-full p-4 rounded-md border border-gray-300">
                            <div className="text-3xl text-orange-700 font-semibold mb-4">
                                {item.category}
                            </div>
                            <hr className="my-2" />
                            {data &&
                                data
                                    .filter(
                                        (elem) =>
                                            elem.category === item.category &&
                                            elem.name.toLowerCase().includes(searchData)
                                    )
                                    .map((filterItem) => (
                                        <div key={filterItem._id} className="mb-4">
                                            <Cards foodItem={filterItem} />
                                        </div>
                                    ))}
                        </div>
                    ))}
            </div>
            <Footer />
        </div>
    );
}

export default Home;


