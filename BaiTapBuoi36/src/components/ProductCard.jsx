const formatVnd = (n) => `${Math.round(n).toLocaleString("vi-VN")}đ`;

function ProductCard({ product }) {
    const hasDiscount = product.discountPrice < product.originalPrice;
    const discountPercent = hasDiscount
        ? Math.round(
              ((product.originalPrice - product.discountPrice) /
                  product.originalPrice) *
                  100,
          )
        : 0;

    return (
        <div className="group bg-white border border-gray-100 rounded-2xl flex flex-col overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
            <div className="relative bg-gray-50">
                {hasDiscount && (
                    <span className="absolute top-2 left-2 z-10 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-md">
                        Giảm {discountPercent}%
                    </span>
                )}
                <span className="absolute top-2 right-2 z-10 bg-sky-50 text-sky-600 text-[10px] font-bold px-2 py-1 rounded-md">
                    Trả góp 0%
                </span>
                <img
                    src={product.img}
                    alt={product.name}
                    className="h-40 sm:h-48 w-full object-contain p-3 group-hover:scale-110 transition-transform duration-200"
                />
            </div>
            <div className="p-3 flex flex-col gap-1.5 flex-1">
                <h3 className="line-clamp-2 font-semibold text-sm text-gray-800 min-h-10">
                    {product.name}
                </h3>
                <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-red-600 font-bold text-base">
                        {formatVnd(product.discountPrice)}
                    </span>
                    {hasDiscount && (
                        <span className="line-through text-gray-400 text-xs">
                            {formatVnd(product.originalPrice)}
                        </span>
                    )}
                </div>
                <div className="bg-blue-50 text-blue-600 rounded-lg px-2 py-1.5 text-[11px] font-medium">
                    Smember giảm đến 500.000đ
                </div>
                <div className="bg-violet-50 text-violet-600 rounded-lg px-2 py-1.5 text-[11px] font-medium">
                    S-Student giảm thêm{" "}
                    {formatVnd(product.discountPrice * 0.01)}
                </div>
                <p className="text-[10px] text-gray-400 leading-snug">
                    Trả góp 0% - 0đ phụ phí - 0đ trả trước - kỳ hạn đến 12
                    tháng
                </p>
                <div className="flex justify-between items-center text-gray-400 mt-auto pt-2 border-t border-gray-50">
                    <div className="flex items-center gap-1.5 text-xs">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="w-4 h-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 16.5V6.75A.75.75 0 0 1 3.75 6h9.5a.75.75 0 0 1 .75.75V16.5m-11 0a1.5 1.5 0 0 0 1.5 1.5h.5a1.5 1.5 0 0 0 1.5-1.5m-3.5 0h-1M14 16.5h4m-4 0a1.5 1.5 0 0 0 1.5 1.5h.5a1.5 1.5 0 0 0 1.5-1.5m-3.5 0V10h3.25a.75.75 0 0 1 .6.3l2.15 2.867a.75.75 0 0 1 .15.45V16.5m0 0h1"
                            />
                        </svg>
                        <span>2 giờ</span>
                        <span>⭐{product.rating}</span>
                    </div>
                    <button
                        type="button"
                        aria-label="Yêu thích"
                        className="hover:text-red-500 transition-colors cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 20.25c-.34 0-.68-.09-.98-.28C7.14 17.4 3 14.06 3 9.75 3 7.13 5.13 5 7.75 5c1.4 0 2.73.62 3.63 1.68l.62.73.62-.73A4.76 4.76 0 0 1 16.25 5C18.87 5 21 7.13 21 9.75c0 4.31-4.14 7.65-8.02 10.22-.3.19-.64.28-.98.28Z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ProductCard;
