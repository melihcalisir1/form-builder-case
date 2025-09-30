import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function FormsListPage() {
    const [forms, setForms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:4000/api/forms", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setForms(res.data);
            } catch (err) {
                console.error("Formlar getirilemedi ❌", err);
            }
        };
        fetchForms();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Bu formu silmek istediğinize emin misiniz?")) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:4000/api/forms/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setForms(forms.filter((f) => f._id !== id)); // frontend listesinden çıkar
            alert("Form silindi ✅");
        } catch (err) {
            console.error("Form silinemedi ❌", err);
            alert("Form silinemedi ❌");
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                    <h3 className="mb-0">Formlarım</h3>
                    <small className="text-muted">Oluşturduğun tüm formlar listelenir</small>
                </div>
                <button className="btn btn-primary" onClick={() => navigate('/builder')}>Yeni Form</button>
            </div>
            {forms.length === 0 ? (
                <div className="app-card p-4">
                    <p className="mb-0">Henüz form oluşturmadınız.</p>
                </div>
            ) : (
                <div className="app-card p-0 overflow-hidden">
                    <table className="table table-striped mb-0">
                        <thead>
                        <tr>
                            <th>Başlık</th>
                            <th>Oluşturulma</th>
                            <th className="text-end">İşlemler</th>
                        </tr>
                        </thead>
                        <tbody>
                        {forms.map((form) => (
                            <tr key={form._id}>
                                <td>{form.title}</td>
                                <td>{new Date(form.createdAt).toLocaleString()}</td>
                                <td className="text-end">
                                    <Link
                                        to={`/forms/${form._id}`}
                                        className="btn btn-sm btn-outline-light me-2"
                                    >
                                        Görüntüle
                                    </Link>
                                    <button
                                        onClick={() => navigate(`/builder?id=${form._id}`)}
                                        className="btn btn-sm btn-warning me-2"
                                    >
                                        Düzenle
                                    </button>
                                    <button
                                        onClick={() => handleDelete(form._id)}
                                        className="btn btn-sm btn-danger"
                                    >
                                        Sil
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}