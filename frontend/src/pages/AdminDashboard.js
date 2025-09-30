import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
    const [stats, setStats] = useState({ usersCount: 0, formsCount: 0, responsesCount: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:4000/api/admin/stats', { headers: { Authorization: `Bearer ${token}` } });
                setStats(res.data || { usersCount: 0, formsCount: 0, responsesCount: 0 });
            } catch (e) { /* ignore */ }
        };
        fetchStats();
    }, []);
    return (
        <div className="container mt-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                    <h3 className="mb-0">Admin Panel</h3>
                    <small className="text-muted">Özet ve yönetim sayfalarına hızlı erişim</small>
                </div>
                <div className="d-flex gap-2">
                    <a className="btn btn-outline-dark" href="/admin/users">Kullanıcılar</a>
                </div>
            </div>
            <div className="row g-3">
                <div className="col-md-4">
                    <div className="app-card p-3">
                        <div className="text-muted">Toplam Form</div>
                        <div className="fs-3 fw-bold">{stats.formsCount}</div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="app-card p-3">
                        <div className="text-muted">Toplam Cevap</div>
                        <div className="fs-3 fw-bold">{stats.responsesCount}</div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="app-card p-3">
                        <div className="text-muted">Kullanıcı</div>
                        <div className="fs-3 fw-bold">{stats.usersCount}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}


