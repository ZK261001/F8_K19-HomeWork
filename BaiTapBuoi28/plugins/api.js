const API_URL = "https://dummyjson.com";

const post = async (endpoint, body) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
        alert("get data failed");
        return;
    }

    try {
        const res = await fetch(`${API_URL}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(body),
        });

        if (res.status === 401) {
            await getNewAccessToken();
            return await post(endpoint, body);
        }

        return await res.json();
    } catch (e) {
        alert("1get data failed");
    }
};

const get = async (endpoint) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
        alert("get data failed");
        return;
    }

    try {
        const res = await fetch(`${API_URL}/${endpoint}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (res.status === 401) {
            await getNewAccessToken();
            return await get(endpoint);
        }

        return await res.json();
    } catch (e) {
        alert("get data failed");
    }
};

const getNewAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
        alert("Get data failed");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                refreshToken: `${localStorage.getItem("refreshToken")}`, // Optional, if not provided, the server will use the cookie
            }),
        });

        const data = await response.json();
        const { accessToken, refreshToken } = data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
    } catch (e) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "../login/index.html";
    }
};

const login = async (username, password) => {
    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        return await res.json();
    } catch {
        alert("Sai tài khoản hoặc mật khẩu");
    }
};

export { post, get, login };
