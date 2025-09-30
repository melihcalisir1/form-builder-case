import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:4000/api/auth/login", {
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            onLogin(); // App.js’deki state güncellensin
            navigate("/forms"); // login sonrası yönlendirme
            setMsg("Giriş başarılı!");
        } catch (err) {
            setMsg(err.response?.data?.message || "Hata oluştu");
        }
    };

    return (
        <div className="auth-page">
            <div className="app-card auth-card p-4">
                <h3 className="mb-3">Giriş Yap</h3>
                {msg && <div className="alert alert-info">{msg}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Şifre</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary w-100">Giriş Yap</button>
                </form>
            </div>
        </div>
    );
}