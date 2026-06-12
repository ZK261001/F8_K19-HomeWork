import { get } from "../../plugins/api.js";

const getProfile = async () => {
    const profile = await get("auth/me");
    console.log(profile);
};

const init = () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
        window.location.href = "../login/index.html";
        return;
    }

    getProfile();
};

init();
