import AppRoutes from "./components/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { SavedJobsProvider } from "./context/SavedJobsContext";
function App() {
    return (
        <AuthProvider>
            <SavedJobsProvider>
                <AppRoutes />
            </SavedJobsProvider>
        </AuthProvider>
    );
}

export default App;
