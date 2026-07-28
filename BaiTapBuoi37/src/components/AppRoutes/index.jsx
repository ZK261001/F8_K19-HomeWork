import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "../../pages/Home";
import HomeDetail from "../../pages/HomeDetail";

function AppRoutes() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" index element={<Home />} />
                    <Route path=":id" element={<HomeDetail />} />
                </Routes>
            </Router>
        </>
    );
}

export default AppRoutes;
