import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FormBuilderPage from "./pages/FormBuilderPage";
import FormsListPage from "./pages/FormsListPage";
import FormDetailPage from "./pages/FormDetailPage";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token); // varsa true, yoksa false
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        window.location.href = "/login"; // logout sonrası login’e at
    };

    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand fw-bold" to="/">Form Builder</Link>

                    <div className="d-flex">
                        {!isAuthenticated ? (
                            <>
                                <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
                                <Link className="btn btn-outline-light me-2" to="/register">Register</Link>
                            </>
                        ) : (
                            <>
                                <Link className="btn btn-outline-success me-2" to="/builder">Form Oluştur</Link>
                                <Link className="btn btn-outline-info me-2" to="/forms">Formlarım</Link>
                                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<h2>Hoşgeldin 👋</h2>} />
                    <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/builder" element={<FormBuilderPage />} />
                    <Route path="/forms" element={<FormsListPage />} />
                    <Route path="/forms/:id" element={<FormDetailPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;