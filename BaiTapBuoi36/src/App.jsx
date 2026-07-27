import { useState } from "react";
import { products } from "./Data/Data";
import ProductCard from "./components/ProductCard";
import PosterAds from "./components/PosterAds";

function App() {
    const [type, setType] = useState("Điện thoại");
    const [brand, setBrand] = useState("Tất cả");
    const arrBrand = [
        "Tất cả",
        ...new Set(
            products
                .filter((p) => {
                    return p.type === type;
                })
                .map((p) => p.brand),
        ),
    ];
    const handleChangeType = (type) => {
        setType(type);
        setBrand("Tất cả");
    };
    const filteredProduct = products.filter((p) => {
        const matchType = p.type === type;
        const matchBrand = brand === "Tất cả" || p.brand === brand;
        return matchType && matchBrand;
    });
    const renderBrand = (arr) => {
        return arr.map((b, index) => (
            <button
                type="button"
                key={index}
                className={`shrink-0 py-2 px-4 rounded-full font-semibold text-sm cursor-pointer transition-colors duration-150 border ${
                    brand === b
                        ? "bg-red-600 border-red-600 text-white shadow-sm shadow-red-200"
                        : "bg-white border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-600"
                }`}
                onClick={() => setBrand(b)}
            >
                {b}
            </button>
        ));
    };
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-linear-to-r from-red-600 to-red-500 sticky top-0 z-10 shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
                    <span className="text-2xl">📱</span>
                    <h1 className="text-xl font-extrabold tracking-tight text-white">
                        Tech<span className="text-red-950">Store</span>
                    </h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-5 items-start">
                <aside className="hidden lg:block w-55 shrink-0 sticky top-20">
                    <PosterAds />
                </aside>

                <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 w-full flex-1">
                    <div className="flex border-b-2 border-gray-100">
                        <button
                            type="button"
                            className={`text-center py-3 px-6 rounded-t-lg transition-colors cursor-pointer font-bold text-sm sm:text-base ${
                                type === "Điện thoại"
                                    ? "bg-red-50 text-red-600"
                                    : "text-gray-400 hover:text-red-500"
                            }`}
                            onClick={() => handleChangeType("Điện thoại")}
                        >
                            ĐIỆN THOẠI
                        </button>

                        <button
                            type="button"
                            className={`text-center py-3 px-6 rounded-t-lg transition-colors cursor-pointer font-bold text-sm sm:text-base ${
                                type === "Máy tính bảng"
                                    ? "bg-red-50 text-red-600"
                                    : "text-gray-400 hover:text-red-500"
                            }`}
                            onClick={() => handleChangeType("Máy tính bảng")}
                        >
                            MÁY TÍNH BẢNG
                        </button>
                    </div>

                    <div className="flex flex-nowrap gap-2.5 pt-5 overflow-x-auto pb-1">
                        {renderBrand(arrBrand)}
                    </div>

                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredProduct.map((p, index) => {
                            return <ProductCard key={index} product={p} />;
                        })}
                    </div>

                    {filteredProduct.length === 0 && (
                        <p className="text-center text-gray-400 py-10">
                            Không có sản phẩm phù hợp.
                        </p>
                    )}
                </div>
            </main>
        </div>
    );
}

export default App;
