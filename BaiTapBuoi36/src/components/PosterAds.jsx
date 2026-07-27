function PosterAds() {
    return (
        <div className="flex flex-col gap-5 w-full">
            <div className="relative rounded-2xl overflow-hidden bg-linear-to-br from-violet-600 via-fuchsia-600 to-purple-800 text-white p-5 flex flex-col gap-3 shadow-md">
                <p className="text-xs font-bold tracking-wide">
                    #LƯỚT MƯỢT GHÉ! LÊN ĐỜI DỄ
                </p>
                <div className="flex justify-center py-4 text-6xl drop-shadow-lg">
                    📱
                </div>
                <p className="text-sm font-semibold text-center"> iPhone 17</p>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
                    <p className="text-[11px]">Lên đời chỉ từ</p>
                    <p className="text-2xl font-extrabold">20.08 triệu</p>
                    <p className="text-[11px]">
                        Hoặc góp từ{" "}
                        <span className="font-bold">55K/ngày</span>
                    </p>
                </div>
                <button
                    type="button"
                    className="bg-white text-purple-700 font-bold rounded-full py-2 text-sm hover:bg-purple-50 transition-colors cursor-pointer"
                >
                    Mua ngay
                </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-linear-to-br from-gray-900 via-gray-800 to-black text-white p-5 flex flex-col gap-3 shadow-md">
                <p className="text-xs font-bold tracking-[0.2em] text-gray-300">
                    SAMSUNG
                </p>
                <p className="text-lg font-extrabold leading-tight">
                    Galaxy
                    <br />
                    Unpacked
                </p>
                <p className="text-[11px] text-gray-300">
                    20:00 · Sắp diễn ra
                </p>
                <div className="bg-white/10 rounded-xl p-3 text-center">
                    <p className="text-[11px] text-gray-300">
                        Đăng ký sớm nhận ưu đãi
                    </p>
                    <p className="text-xl font-extrabold text-sky-300">
                        Voucher 500.000đ
                    </p>
                </div>
                <button
                    type="button"
                    className="bg-sky-400 text-gray-900 font-bold rounded-full py-2 text-sm hover:bg-sky-300 transition-colors cursor-pointer"
                >
                    Đăng ký ngay
                </button>
            </div>
        </div>
    );
}

export default PosterAds;
