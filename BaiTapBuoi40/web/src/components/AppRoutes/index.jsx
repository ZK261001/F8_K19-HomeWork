import { BrowserRouter as Router, Routes, Route } from "react-router";
import Homepage from "../../pages/Homepage";
import JobSearchResults from "../../pages/JobSearchResults";
import JobDetail from "../../pages/JobDetail";
import CompanyList from "../../pages/CompanyList";
import CompanyDetail from "../../pages/CompanyDetail";
import CategoryDetail from "../../pages/CategoryDetail";
import Profile from "../../pages/Profile";
import Register from "../../pages/Register";
import Login from "../../pages/Login";
import PostJob from "../../pages/PostJob";
import DefaultLayout from "../../layouts/DefaultLayout";
import ProtectedRoute from "../ProtectedRoute";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<Homepage />} />
                    <Route path="viec-lam" element={<JobSearchResults />} />
                    <Route path="viec-lam/:slug" element={<JobDetail />} />
                    <Route path="danh-sach-cong-ty" element={<CompanyList />} />
                    <Route path="cong-ty/:id" element={<CompanyDetail />} />
                    <Route path="linh-vuc/:slug" element={<CategoryDetail />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="nha-tuyen-dung" element={<PostJob />} />
                        <Route path="ho-so" element={<Profile />} />
                    </Route>
                </Route>
                <Route path="dang-ky" element={<Register />} />
                <Route path="dang-nhap" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
