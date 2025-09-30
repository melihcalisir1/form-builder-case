import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function FormsListPage() {
    const [forms, setForms] = useState([]);

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
                    </tr>
                    </thead>
                    <tbody>
                    {forms.map((form) => (
                        <tr key={form._id}>
                            <td>{form.title}</td>
                            <td>{new Date(form.createdAt).toLocaleString()}</td>
                            <td>
                                <Link to={`/forms/${form._id}`} className="btn btn-sm btn-primary">
                                    Görüntüle
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}