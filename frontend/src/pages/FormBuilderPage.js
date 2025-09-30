import React, { useState } from "react";
import { ReactFormBuilder } from "react-form-builder2";
import "react-form-builder2/dist/app.css";
import axios from "axios";

export default function FormBuilderPage() {
    const [formData, setFormData] = useState([]);

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log("Token:", token);
            const res = await axios.post(
                "http://localhost:4000/api/forms",
                {
                    title: "Benim Formum", // şimdilik sabit, sonra input ekleriz
                    schema: formData,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("Form kaydedildi ✅");
            console.log("Saved form:", res.data);
        } catch (err) {
            alert("Form kaydedilirken hata oluştu ❌");
            console.error(err);
        }
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-3">Form Oluştur</h3>

            <div className="builder-wrapper">
                <div className="form-area">
                    <ReactFormBuilder
                        onPost={(data) => {
                            console.log("Form JSON:", data.task_data);
                            setFormData(data.task_data);
                        }}
                    />
                </div>
            </div>

            <button className="btn btn-success mt-3" onClick={handleSave}>
                Kaydet
            </button>
        </div>
    );
}