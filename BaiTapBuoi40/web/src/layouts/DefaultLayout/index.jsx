import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SavedJobsFab from "../../components/SavedJobsFab";
import styles from "./DefaultLayout.module.css";

function DefaultLayout() {
    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.main}>
                <Outlet />
            </main>
            <Footer />
            <SavedJobsFab />
        </div>
    );
}

export default DefaultLayout;
