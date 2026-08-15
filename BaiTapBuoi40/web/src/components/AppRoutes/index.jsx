import { BrowserRouter as Router, Routes, Route } from "react-router";
import Homepage from "../../pages/Homepage";
import JobSearchResults from "../../pages/JobSearchResults";
import JobDetail from "../../pages/JobDetail";
import DefaultLayout from "../../layouts/DefaultLayout";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<Homepage />} />
                    <Route path="viec-lam" element={<JobSearchResults />} />
                    <Route path="viec-lam/:slug" element={<JobDetail />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default AppRoutes;
