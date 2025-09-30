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
            <div className="dashboard-hero app-card p-4 mb-3">
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <h3 className="mb-1">Admin Panel</h3>
                        <div className="text-muted">Özet ve yönetim sayfalarına hızlı erişim</div>
                    </div>
                    <div className="d-flex gap-2">
                        <a className="btn btn-outline-dark" href="/admin/users">Kullanıcılar</a>
                    </div>
                </div>
            </div>

            <div className="stat-tiles mb-3">
                <div className="stat-tile">
                    <div className="icon-badge icon-blue">F</div>
                    <div>
                        <div className="label">Toplam Form</div>
                        <div className="value">{stats.formsCount}</div>
                    </div>
                </div>
                <div className="stat-tile">
                    <div className="icon-badge icon-green">C</div>
                    <div>
                        <div className="label">Toplam Cevap</div>
                        <div className="value">{stats.responsesCount}</div>
                    </div>
                </div>
                <div className="stat-tile">
                    <div className="icon-badge icon-purple">U</div>
                    <div>
                        <div className="label">Kullanıcı</div>
                        <div className="value">{stats.usersCount}</div>
                    </div>
                </div>
            </div>

            <div className="link-tiles">
                <a href="/admin/users" className="link-tile">
                    <div className="title">Kullanıcılar</div>
                    <div className="desc">Kullanıcıları görüntüle ve formlarına eriş</div>
                </a>
                <a href="/forms" className="link-tile">
                    <div className="title">Formlar</div>
                    <div className="desc">Tüm formları yönet</div>
                </a>
                <a href="/builder" className="link-tile">
                    <div className="title">Yeni Form</div>
                    <div className="desc">Hızlıca form oluştur</div>
                </a>
            </div>
        </div>
    );
}


