import React, { useState } from "react";
import axios from "axios";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:4000/api/auth/register", {
                username,
                email,
                password,
            });
            setMsg("Kayıt başarılı! Şimdi giriş yapabilirsin.");
        } catch (err) {
            setMsg(err.response?.data?.message || "Hata oluştu");
        }
    };

    return (
        <div className="auth-page">
            <div className="app-card auth-card p-4">
                <h3 className="mb-3">Kayıt Ol</h3>
                {msg && <div className="alert alert-info">{msg}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Kullanıcı Adı</label>
                        <input
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
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
                    <button className="btn btn-primary w-100">Kayıt Ol</button>
                </form>
            </div>
        </div>
    );
}