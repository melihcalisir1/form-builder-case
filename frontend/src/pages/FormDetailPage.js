import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ReactFormGenerator } from "react-form-builder2";
import "react-form-builder2/dist/app.css";

export default function FormDetailPage() {
    const { id } = useParams(); // URL’den formId al
    const [form, setForm] = useState(null);

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`http://localhost:4000/api/forms/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setForm(res.data);
            } catch (err) {
                console.error("Form getirme hatası:", err);
            }
        };
        fetchForm();
    }, [id]);

    const handleSubmit = async (data) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(
                `http://localhost:4000/api/forms/${id}/responses`,
                { answers: data }, // cevaplar buradan geliyor
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Form başarıyla gönderildi ✅");
            console.log("Saved response:", res.data);
        } catch (err) {
            console.error("Response save error:", err);
            alert("Form gönderilirken hata ❌");
        }
    };

    if (!form) return <p>Yükleniyor...</p>;

    return (
        <div className="container mt-4">
            <div className="app-card p-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <div>
                        <h2 className="mb-0">{form.title}</h2>
                        <small className="text-muted">Formu doldurun ve gönderin</small>
                    </div>
                </div>
                <ReactFormGenerator
                    data={form.schema}
                    answer_data={{}}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}