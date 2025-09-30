import React, { useEffect, useState } from "react";
import axios from "axios";
import FormResponsesModal from "../components/FormResponsesModal";

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userForms, setUserForms] = useState([]);
    const [responsesModal, setResponsesModal] = useState({ open: false, id: null, title: "", schema: [] });

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
            <div className="row g-3">
                <div className="col-md-5">
                    <div className="app-card p-0 overflow-hidden">
                        <table className="table table-striped mb-0">
                            <thead>
                                <tr>
                                    <th>Kullanıcı</th>
                                    <th>Rol</th>
                                    <th>Oluşturulma</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u._id} role="button" onClick={() => loadForms(u)}>
                                        <td>{u.username} <div className="text-muted small">{u.email}</div></td>
                                        <td>{u.role}</td>
                                        <td>{new Date(u.createdAt).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="app-card p-3">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <h5 className="mb-0">{selectedUser ? `${selectedUser.username} - Formlar` : 'Kullanıcı seçin'}</h5>
                        </div>
                        {selectedUser && (
                            userForms.length === 0 ? (
                                <div className="text-muted">Bu kullanıcının formu yok.</div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-striped mb-0">
                                        <thead>
                                        <tr>
                                            <th>Başlık</th>
                                            <th>Tarih</th>
                                            <th className="text-end">İşlemler</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {userForms.map(f => (
                                            <tr key={f._id}>
                                                <td>{f.title}</td>
                                                <td>{new Date(f.createdAt).toLocaleString()}</td>
                                                <td className="text-end">
                                                    <button className="btn btn-sm btn-outline-dark" onClick={() => setResponsesModal({ open: true, id: f._id, title: `${f.title} - Gönderilen Veriler`, schema: f.schema })}>Gönderiler</button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
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


