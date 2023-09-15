import { useState } from "react";

export default function Search(props) {
    const [searchData, setSearchData] = useState("");

    const SearchClick = () => {
        props.handleSearchClick(searchData)
        setSearchData("")
    };

    return (
        <div className="mb-6">
            <div className="relative w-2/3 mx-auto">
                <input
                    type="search"
                    className="block w-full px-4 py-3 rounded-t-md border border-gray-900 text-red-500 focus:outline-none focus:border-primary"

                    aria-label="Search"
                    value={searchData}
                    onChange={(e) => setSearchData(e.target.value)}
                />

                <button
                    onClick={SearchClick}
                    className="absolute top-0 right-0 bg-primary mr-10 px-6 py-3 rounded-b-md hover:bg-primary-dark text-gray-900 focus:outline-none focus:bg-primary-dark transition duration-300"
                    type="button"
                >
                    Search
                </button>
            </div>
        </div>
    );
}



