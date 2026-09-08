import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SavedJobsFab from "../../components/SavedJobsFab";

function DefaultLayout() {
    return (
        <div>
            <Header />
            <div className="container">
                <Outlet />
            </div>
            <Footer />
            <SavedJobsFab />
        </div>
    );
}

export default DefaultLayout;
