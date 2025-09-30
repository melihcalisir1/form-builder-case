import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import FormResponsesModal from "../components/FormResponsesModal";

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

    const [confirm, setConfirm] = useState({ open: false, id: null });
    const [responsesModal, setResponsesModal] = useState({ open: false, id: null, title: "" });

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:4000/api/forms/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setForms(forms.filter((f) => f._id !== id));
        } catch (err) {
            console.error("Form silinemedi ❌", err);
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
                                        onClick={() => setResponsesModal({ open: true, id: form._id, title: `${form.title} - Gönderilen Veriler`, schema: form.schema })}
                                        className="btn btn-sm btn-outline-dark me-2"
                                    >
                                        Gönderilen Veriler
                                    </button>
                                    <button
                                        onClick={() => setConfirm({ open: true, id: form._id })}
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
            <ConfirmModal
                open={confirm.open}
                title="Formu sil"
                message="Bu formu silmek istediğine emin misin? Bu işlem geri alınamaz."
                confirmText="Evet, sil"
                cancelText="Vazgeç"
                onConfirm={() => handleDelete(confirm.id)}
                onClose={() => setConfirm({ open: false, id: null })}
            />
            <FormResponsesModal
                open={responsesModal.open}
                formId={responsesModal.id}
                title={responsesModal.title}
                schema={responsesModal.schema}
                onClose={() => setResponsesModal({ open: false, id: null, title: "" })}
            />
        </div>
    );
}