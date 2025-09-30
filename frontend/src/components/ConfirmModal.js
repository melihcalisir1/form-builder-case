import React from "react";

// variant: 'confirm' | 'success' | 'error' | 'info'
export default function ConfirmModal({
    open,
    title = "Onay",
    message,
    variant = "confirm",
    confirmText = "Onayla",
    cancelText = "Vazgeç",
    onConfirm,
    onClose,
}) {
    if (!open) return null;

    const isConfirm = variant === "confirm";
    const color = variant === "success" ? "#16a34a" : variant === "error" ? "#dc2626" : variant === "info" ? "#2563eb" : "var(--text)";
    const icon = variant === "success" ? "✔" : variant === "error" ? "✕" : variant === "info" ? "ℹ" : "?";

    return (
        <div className="modal-backdrop-custom" role="dialog" aria-modal="true">
            <div className="modal-card app-card">
                <div className="modal-header d-flex align-items-center justify-content-between p-3">
                    <div className="d-flex align-items-center gap-2">
                        <span className="modal-icon" aria-hidden>{icon}</span>
                        <h5 className="mb-0">{title}</h5>
                    </div>
                    <button className="btn btn-outline-light btn-sm" onClick={onClose} aria-label="Kapat">✕</button>
                </div>
                <div className="modal-body p-3">
                    <p className="mb-0">{message}</p>
                </div>
                <div className="modal-footer d-flex justify-content-end gap-2 p-3">
                    {isConfirm ? (
                        <>
                            <button className="btn btn-outline-light" onClick={onClose}>{cancelText}</button>
                            <button className="btn btn-primary" onClick={() => { onConfirm?.(); onClose?.(); }}>{confirmText}</button>
                        </>
                    ) : (
                        <button className="btn btn-primary" onClick={onClose}>Tamam</button>
                    )}
                </div>
            </div>
            <style>{`
                .modal-backdrop-custom { position: fixed; inset: 0; background: rgba(2,6,23,0.35); display: flex; align-items: center; justify-content: center; z-index: 1050; }
                .modal-card { width: 420px; border-radius: 14px; overflow: hidden; border: 1px solid var(--border); box-shadow: var(--shadow); background: var(--panel); color: var(--text); }
                .modal-icon { width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; background: rgba(0,0,0,0.04); color: ${color}; font-weight: 700; }
            `}</style>
        </div>
    );
}


