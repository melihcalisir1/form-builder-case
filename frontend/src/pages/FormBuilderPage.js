import React, { useState, useEffect } from "react";
import { ReactFormBuilder } from "react-form-builder2";
import "react-form-builder2/dist/app.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";

export default function FormBuilderPage() {
    const [formData, setFormData] = useState([]);
    const [builderKey, setBuilderKey] = useState(0);
    const [formId, setFormId] = useState(null);
    const [title, setTitle] = useState("Benim Formum");
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const id = params.get("id");
        if (id) {
            setFormId(id);
            fetchForm(id);
        }
    }, [location]);

    const fetchForm = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`http://localhost:4000/api/forms/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTitle(res.data.title);
            const initialSchema = Array.isArray(res.data?.schema) ? res.data.schema : [];
            setFormData(initialSchema);
            setBuilderKey((k) => k + 1); // Dropzone içeriğini zorla yeniden yükle
            console.log("Backend’den gelen schema:", res.data.schema);
        } catch (err) {
            console.error("Form yüklenemedi ❌", err);
        }
    };

    const [notify, setNotify] = useState({ open: false, variant: "success", title: "", message: "" });

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");

            if (formId) {
                await axios.put(
                    `http://localhost:4000/api/forms/${formId}`,
                    { title, schema: formData },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setNotify({ open: true, variant: "success", title: "Başarılı", message: "Form güncellendi." });
            } else {
                await axios.post(
                    "http://localhost:4000/api/forms",
                    { title, schema: formData },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setNotify({ open: true, variant: "success", title: "Başarılı", message: "Form kaydedildi." });
            }
            setTimeout(() => navigate("/forms"), 600);
        } catch (err) {
            setNotify({ open: true, variant: "error", title: "Hata", message: "Form kaydedilirken bir hata oluştu." });
            console.error(err);
        }
    };

    return (
        <div className="container mt-4">
            <div className="app-card p-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <div>
                        <h3 className="mb-0">{formId ? "Formu Düzenle" : "Form Oluştur"}</h3>
                        <small className="text-muted">Bileşenleri sürükleyip bırakın, ardından kaydedin</small>
                    </div>
                    <button className="btn btn-success" onClick={handleSave}>
                        {formId ? "Güncelle" : "Kaydet"}
                    </button>
                </div>

                <div className="mb-3">
                    <label className="form-label">Form Başlığı</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="builder-wrapper">
                    <div className="form-area">
                        <ReactFormBuilder
                            key={builderKey}
                            data={formData}
                            onPost={(data) => {
                                const nextSchema = Array.isArray(data) ? data : (data?.task_data || []);
                                console.log("Form JSON:", nextSchema);
                                setFormData(nextSchema);
                            }}
                        />
                    </div>
                </div>
            </div>
            <ConfirmModal
                open={notify.open}
                variant={notify.variant}
                title={notify.title}
                message={notify.message}
                onClose={() => setNotify({ open: false, variant: "success", title: "", message: "" })}
            />
        </div>
    );
}