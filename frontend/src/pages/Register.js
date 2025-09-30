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
        <div className="container" style={{ maxWidth: "400px" }}>
            <h3 className="mb-3">Register</h3>
            {msg && <div className="alert alert-info">{msg}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Kullanıcı Adı</label>
                    <input
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Şifre</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary w-100">Register</button>
            </form>
        </div>
    );
}