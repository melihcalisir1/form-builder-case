import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import FormResponsesModal from "../components/FormResponsesModal";

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userForms, setUserForms] = useState([]);
    const [responsesModal, setResponsesModal] = useState({ open: false, id: null, title: "", schema: [] });
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:4000/api/admin/users', { headers: { Authorization: `Bearer ${token}` } });
                setUsers(res.data || []);
            } catch (e) { /* ignore */ }
        };
        fetchUsers();
    }, []);

    const filteredUsers = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return users;
        return users.filter(u =>
            u.username?.toLowerCase().includes(q) ||
            u.email?.toLowerCase().includes(q) ||
            u.role?.toLowerCase().includes(q)
        );
    }, [users, query]);

    const loadForms = async (user) => {
        setSelectedUser(user);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`http://localhost:4000/api/admin/users/${user._id}/forms`, { headers: { Authorization: `Bearer ${token}` } });
            setUserForms(res.data || []);
        } catch (e) { setUserForms([]); }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                    <h3 className="mb-0">Kullanıcı Yönetimi</h3>
                    <small className="text-muted">Kullanıcıları ve formlarını görüntüleyin</small>
                </div>
                <span className="badge-soft">Toplam {users.length}</span>
            </div>

            <div className="row g-3">
                <div className="col-md-4">
                    <div className="card-gradient-wrap">
                        <div className="app-card p-0 overflow-hidden">
                            <div className="p-3 border-bottom" style={{borderColor:"var(--border)"}}>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ara: ad, email veya rol"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                            <ul className="user-list">
                                {filteredUsers.map(u => (
                                    <li key={u._id} className={`user-item ${selectedUser?._id===u._id ? 'active' : ''}`} onClick={() => loadForms(u)}>
                                        <span className="avatar">{(u.username || u.email || '?')[0].toUpperCase()}</span>
                                        <div className="flex-fill">
                                            <div className="fw-semibold">{u.username || '—'}</div>
                                            <div className="text-muted small">{u.email}</div>
                                        </div>
                                        <span className="badge-soft text-uppercase small">{u.role}</span>
                                    </li>
                                ))}
                                {filteredUsers.length === 0 && (
                                    <li className="user-item"><div className="empty-state">Aramanızla eşleşen kullanıcı bulunamadı</div></li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="app-card p-3">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <h5 className="mb-0">{selectedUser ? `${selectedUser.username} - Formlar` : 'Kullanıcı seçin'}</h5>
                        </div>
                        {selectedUser && (
                            userForms.length === 0 ? (
                                <div className="empty-state"><div className="title">Form bulunamadı</div><div>Seçili kullanıcının henüz formu yok.</div></div>
                            ) : (
                                <div className="row g-3">
                                    {userForms.map(f => (
                                        <div className="col-md-6" key={f._id}>
                                            <div className="form-card h-100 d-flex flex-column">
                                                <div className="title">{f.title}</div>
                                                <div className="meta mb-3">{new Date(f.createdAt).toLocaleString()}</div>
                                                <div className="mt-auto d-flex justify-content-end">
                                                    <button className="btn btn-sm btn-outline-light" onClick={() => setResponsesModal({ open: true, id: f._id, title: `${f.title} - Gönderilen Veriler`, schema: f.schema })}>Gönderiler</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
            <FormResponsesModal open={responsesModal.open} formId={responsesModal.id} title={responsesModal.title} schema={responsesModal.schema} onClose={() => setResponsesModal({ open: false, id: null, title: '', schema: [] })} />
        </div>
    );
}


