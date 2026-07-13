import { login } from "../../plugins/api.js";

async function onLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await login(username, password);
    if (res) {
        const { accessToken, refreshToken } = res;
    }

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    window.location.href = "../home/index.html";
}

const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    onLogin();
});
