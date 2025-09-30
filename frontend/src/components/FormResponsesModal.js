import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FormResponsesModal({ open, formId, title = "Gönderilen Veriler", schema = [], onClose }) {
    const [loading, setLoading] = useState(false);
    const [responses, setResponses] = useState([]);

    // Build a map from schema to find labels by field key/id
    const labelByKey = React.useMemo(() => {
        const map = new Map();
        if (Array.isArray(schema)) {
            schema.forEach((item) => {
                const key = item?.field_name || item?.name || item?.id || item?.key || item?.unique_id;
                const label = item?.label || item?.text || item?.placeholder || item?.name || item?.id || "Alan";
                if (key) map.set(key, label);
            });
        }
        return map;
    }, [schema]);

    useEffect(() => {
        const fetchResponses = async () => {
            if (!open || !formId) return;
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`http://localhost:4000/api/forms/${formId}/responses`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setResponses(res.data || []);
            } catch (e) {
                setResponses([]);
            } finally {
                setLoading(false);
            }
        };
        fetchResponses();
    }, [open, formId]);

    if (!open) return null;
    return (
        <div className="modal-backdrop-custom" role="dialog" aria-modal="true">
            <div className="modal-card app-card" style={{ width: 720 }}>
                <div className="modal-header d-flex align-items-center justify-content-between p-3">
                    <h5 className="mb-0">{title}</h5>
                    <button className="btn btn-outline-light btn-sm" onClick={onClose} aria-label="Kapat">✕</button>
                </div>
                <div className="modal-body p-0">
                    {loading ? (
                        <div className="p-3">Yükleniyor...</div>
                    ) : responses.length === 0 ? (
                        <div className="p-3">Henüz gönderi yok.</div>
                    ) : (
                        <div className="p-3 d-flex flex-column gap-3">
                            {responses.map((r) => {
                                const answers = r?.answers;

                                // Normalize to label:value pairs using schema labels where possible
                                const toPairs = (ans) => {
                                    const pairs = [];
                                    if (Array.isArray(ans)) {
                                        ans.forEach((item, idx) => {
                                            const key = item?.name || item?.field_name || item?.id || item?.key;
                                            const label = labelByKey.get(key) || item?.label || item?.text || `Alan ${idx + 1}`;
                                            const value = item?.value ?? item?.answer ?? item?.content ?? item?.text_value ?? "";
                                            pairs.push([label, value]);
                                        });
                                    } else if (ans && typeof ans === 'object') {
                                        Object.entries(ans).forEach(([k, v]) => {
                                            const label = labelByKey.get(k) || k;
                                            pairs.push([label, v]);
                                        });
                                    } else {
                                        pairs.push(["Cevap", ans]);
                                    }
                                    return pairs;
                                };

                                const pairs = toPairs(answers).filter(([, v]) => v !== undefined && v !== null && `${v}` !== "");

                                return (
                                    <div key={r._id} className="app-card p-3">
                                        <div className="d-flex justify-content-between mb-2">
                                            <strong>{r.userId?.email || "Anonim"}</strong>
                                            <small className="text-muted">{new Date(r.createdAt).toLocaleString()}</small>
                                        </div>
                                        {pairs.length === 0 ? (
                                            <div className="text-muted">Boş cevap</div>
                                        ) : (
                                            <div>
                                                {pairs.map(([label, value], i) => (
                                                    <div key={i} className="d-flex align-items-start py-1">
                                                        <div style={{minWidth: 180}} className="text-muted">{label}</div>
                                                        <div className="fw-semibold">{typeof value === 'string' ? value : JSON.stringify(value)}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
                <div className="modal-footer d-flex justify-content-end gap-2 p-3">
                    <button className="btn btn-primary" onClick={onClose}>Kapat</button>
                </div>
            </div>
        </div>
    );
}


