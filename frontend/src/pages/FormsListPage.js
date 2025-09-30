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
            <h3>Formlarım</h3>
            {forms.length === 0 ? (
                <p>Henüz form oluşturmadınız.</p>
            ) : (
                <table className="table table-striped mt-3">
                    <thead>
                    <tr>
                        <th>Başlık</th>
                        <th>Oluşturulma</th>
                        <th>İşlemler</th>
                    </tr>
                    </thead>
                    <tbody>
                    {forms.map((form) => (
                        <tr key={form._id}>
                            <td>{form.title}</td>
                            <td>{new Date(form.createdAt).toLocaleString()}</td>
                            <td>
                                <Link
                                    to={`/forms/${form._id}`}
                                    className="btn btn-sm btn-primary me-2"
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
            )}
        </div>
    );
}