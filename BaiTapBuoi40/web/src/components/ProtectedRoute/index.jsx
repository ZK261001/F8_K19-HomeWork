import { Navigate, Outlet, useLocation } from "react-router";

import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ allowedRoles }) {
    const { isAuthenticated, user } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/dang-nhap" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/khong-co-quyen" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
