import React, { useState, useEffect } from "react";
import { ReactFormBuilder } from "react-form-builder2";
import "react-form-builder2/dist/app.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function FormBuilderPage() {
    const [formData, setFormData] = useState([]);
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
            setFormData(res.data.schema || []);
            console.log("Backend’den gelen schema:", res.data.schema);
        } catch (err) {
            console.error("Form yüklenemedi ❌", err);
        }
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");

            if (formId) {
                await axios.put(
                    `http://localhost:4000/api/forms/${formId}`,
                    { title, schema: formData },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                alert("Form güncellendi ✅");
            } else {
                await axios.post(
                    "http://localhost:4000/api/forms",
                    { title, schema: formData },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                alert("Form kaydedildi ✅");
            }

            navigate("/forms");
        } catch (err) {
            alert("Form kaydedilirken hata oluştu ❌");
            console.error(err);
        }
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-3">{formId ? "Formu Düzenle" : "Form Oluştur"}</h3>

            <div className="mb-3">
                <label>Form Başlığı</label>
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
                        onLoad={() => {
                            console.log("state’den gelen formData:", formData);

                            // Eğer backend schema düz array ise, task_data içine koy
                            return Promise.resolve([
                                {
                                    id: "loaded-data",
                                    task_data: formData || []
                                }
                            ]);
                        }}
                        onPost={(data) => {
                            console.log("Form JSON:", data.task_data);
                            setFormData(data.task_data);
                        }}
                    />
                </div>
            </div>

            <button className="btn btn-success mt-3" onClick={handleSave}>
                {formId ? "Güncelle" : "Kaydet"}
            </button>
        </div>
    );
}