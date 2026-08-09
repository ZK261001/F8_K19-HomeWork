import { BrowserRouter as Router, Routes, Route } from "react-router";
import Homepage from "../../pages/Homepage";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
