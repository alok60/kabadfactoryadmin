import React from "react";
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react";

const iconByType = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
  confirm: AlertTriangle
};

export default function AdminAlert({ alert, onClose, onConfirm }) {
  if (!alert) return null;
  const Icon = iconByType[alert.type] || Info;
  const destructive = alert.variant === "danger";

  return (
    <div className="alertOverlay" role="dialog" aria-modal="true">
      <div className={`alertDialog ${alert.type}`}>
        <button className="alertClose" onClick={onClose} type="button" aria-label="Close dialog">
          <X size={18} />
        </button>
        <div className="alertIcon">
          <Icon size={28} />
        </div>
        <h2>{alert.title}</h2>
        {alert.message ? <p>{alert.message}</p> : null}
        <div className="alertActions">
          {alert.confirm ? (
            <>
              <button className="ghostButton" onClick={onClose} type="button" disabled={alert.loading}>
                {alert.cancelText || "Cancel"}
              </button>
              <button className={destructive ? "dangerButton" : "primaryButton"} onClick={onConfirm} type="button" disabled={alert.loading}>
                {alert.loading ? "Please wait..." : alert.confirmText || "Confirm"}
              </button>
            </>
          ) : (
            <button className="primaryButton" onClick={onClose} type="button">
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
