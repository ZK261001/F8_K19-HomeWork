import { Navigate, Outlet, useLocation } from "react-router";

import { useAuth } from "../../context/AuthContext";

function ProtectedRoute() {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/dang-nhap" state={{ from: location }} replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
