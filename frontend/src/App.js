import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FormBuilderPage from "./pages/FormBuilderPage"; // ✨

function App() {
    return (
        <Router>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">Form Builder</Link>
                    <div>
                        <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
                        <Link className="btn btn-outline-light me-2" to="/register">Register</Link>
                        <Link className="btn btn-outline-success" to="/builder">Form Oluştur</Link>
                    </div>
                </div>
            </nav>

            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<h2>Hoşgeldin 👋</h2>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/builder" element={<FormBuilderPage />} /> {/* ✨ */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;