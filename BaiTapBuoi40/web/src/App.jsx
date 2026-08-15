import AppRoutes from "./components/AppRoutes";
import { SavedJobsProvider } from "./context/SavedJobsContext";
function App() {
    return (
        <SavedJobsProvider>
            <AppRoutes />
        </SavedJobsProvider>
    );
}

export default App;
