import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FormBuilderPage from "./pages/FormBuilderPage";
import FormsListPage from "./pages/FormsListPage";
import FormDetailPage from "./pages/FormDetailPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminGuard from "./components/AdminGuard";
import AdminUsersPage from "./pages/AdminUsersPage";

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
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container">
                    <Link className="navbar-brand fw-bold" to="/">Form Builder</Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMain">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navMain">
                        <div className="ms-auto d-flex gap-2">
                            {!isAuthenticated ? (
                                <>
                                    <Link className="btn btn-outline-light" to="/login">Login</Link>
                                    <Link className="btn btn-outline-light" to="/register">Register</Link>
                                </>
                            ) : (
                                <>
                                    <Link className="btn btn-primary" to="/builder">Form Oluştur</Link>
                                    <Link className="btn btn-outline-light" to="/forms">Formlarım</Link>
                                    {(() => {
                                        try {
                                            const user = JSON.parse(localStorage.getItem('user') || 'null');
                                            return user?.role === 'admin' ? (
                                                <Link className="btn btn-outline-dark" to="/admin">Admin</Link>
                                            ) : null;
                                        } catch { return null; }
                                    })()}
                                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                                </>
                            )}
                        </div>
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
                    <Route path="/admin" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
                    <Route path="/admin/users" element={<AdminGuard><AdminUsersPage /></AdminGuard>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;