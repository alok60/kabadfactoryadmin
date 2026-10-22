import React, { useMemo, useState } from "react";
import { CheckCircle2, Edit3, ImageIcon, KeyRound, Plus, Save, Trash2, X } from "lucide-react";

const emptyByModule = {
  users: { name: "", mobile: "", email: "", password: "", status: "Active" },
  pickups: { customer: "", scrap: "", slot: "", executive: "Unassigned", executiveId: "", status: "Pending" },
  categories: { category: "", materialCategory: "Other", unit: "kg", price: "", description: "", status: "Active", iconUrl: "", iconFile: null, removeIcon: false },
  stores: { name: "", address: "", city: "", state: "", pincode: "", status: "Active" },
  pickupCharges: { minDistanceKm: "0", maxDistanceKm: "", pickupCharge: "", status: "Active" },
  pincodeChargeCache: { pincode: "", nearestStore: "", storePincode: "", rawDistanceKm: "", distanceBufferKm: "", chargeableDistanceKm: "", pickupCharge: "", configurationVersion: "", status: "", calculatedAt: "" },
  executives: { name: "", mobile: "", area: "", password: "", assigned: "0", status: "Available" },
  executiveReports: { name: "", mobile: "", totalAssigned: "0", pending: "0", inProgress: "0", scrapCollected: "0", completed: "0", cancelled: "0", completionPercentage: "0", lastActivity: "" },
  offers: { title: "", audience: "", start: "", end: "", status: "Draft" },
  notifications: { title: "", type: "Offer", audience: "", sent: "0", status: "Draft" },
  support: { customer: "", mobile: "", subject: "", category: "", message: "", status: "Open", adminNote: "", created: "" },
  faqs: { question: "", answer: "", category: "General", displayOrder: "100", status: "Active" },
  privacy: { title: "Privacy Policy", content: "", version: "1", status: "Draft", createdAt: "", updatedAt: "" },
  terms: { title: "Terms and Conditions", content: "", version: "1", status: "Draft", createdAt: "", updatedAt: "" },
  payments: { order: "", customer: "", mode: "UPI", amount: "", status: "Pending" }
};

const displayFieldsByModule = {
  pickups: ["id", "customer", "scrap", "slot", "executive", "pickupCharge", "status"],
  users: ["name", "mobile", "email", "status", "passwordAction"],
  categories: ["iconUrl", "category", "materialCategory", "unit", "price", "description", "status"],
  stores: ["name", "address", "city", "state", "pincode", "status"],
  pickupCharges: ["minDistanceKm", "maxDistanceKm", "pickupCharge", "distance", "status"],
  pincodeChargeCache: ["pincode", "nearestStore", "storePincode", "rawDistanceKm", "distanceBufferKm", "chargeableDistanceKm", "pickupCharge", "configurationVersion", "status", "calculatedAt"],
  executives: ["name", "mobile", "area", "assigned", "status", "passwordAction"],
  executiveReports: ["name", "mobile", "totalAssigned", "pending", "inProgress", "scrapCollected", "completed", "cancelled", "completionPercentage", "lastActivity"],
  offers: ["title", "audience", "start", "end", "status"],
  notifications: ["title", "type", "audience", "sent", "status"],
  support: ["customer", "mobile", "subject", "category", "message", "status", "adminNote", "created"],
  faqs: ["question", "answer", "category", "displayOrder", "status"],
  privacy: ["title", "content", "version", "status", "createdAt", "updatedAt"],
  terms: ["title", "content", "version", "status", "createdAt", "updatedAt"],
  payments: ["order", "customer", "mode", "amount", "pickupCharge", "status"]
};

const fieldOptionsByModule = {
  users: {
    status: ["Active", "Blocked"]
  },
  pickups: {
    status: ["Confirmed", "Executive Assigned", "Executive Reached", "Scrap Collected", "Payment Completed", "Completed", "Cancelled"]
  },
  categories: {
    status: ["Active", "Hidden"],
    unit: ["kg", "piece"],
    materialCategory: ["Paper", "Plastic", "Metal", "E-waste", "Glass", "Rubber", "Other", "Textile"]
  },
  stores: {
    status: ["Active", "Hidden"]
  },
  pickupCharges: {
    status: ["Active", "Hidden"]
  },
  executives: {
    status: ["Available", "Busy", "Blocked"]
  },
  offers: {
    status: ["Active", "Draft"]
  },
  notifications: {
    status: ["Draft", "Sent", "Read"],
    type: ["Pickup", "Offer", "Order", "System"]
  },
  support: {
    status: ["Open", "In Progress", "Resolved", "Closed"]
  },
  faqs: {
    status: ["Active", "Inactive"]
  },
  privacy: {
    status: ["Draft", "Active"]
  },
  terms: {
    status: ["Draft", "Active"]
  },
  payments: {
    status: ["Pending", "Completed"],
    mode: ["cash", "upi", "razorpay"]
  }
};

export default function ModulePage({ moduleKey, config, rows, pagination, listState, setListState, reload, executiveOptions = [], alertApi, addRow, updateRow, deleteRow }) {
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState(emptyByModule[moduleKey]);
  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState({});
  const [passwordTarget, setPasswordTarget] = useState(null);
  const [passwordDraft, setPasswordDraft] = useState("");
  const [saving, setSaving] = useState(false);

  const fields = useMemo(() => Object.keys(emptyByModule[moduleKey]).filter((field) => !["iconUrl", "iconFile", "removeIcon"].includes(field)), [moduleKey]);
  const displayFields = displayFieldsByModule[moduleKey];
  const fieldOptions = fieldOptionsByModule[moduleKey] || {};
  const canCreate = config.canCreate !== false;
  const canEdit = config.canEdit !== false;
  const readOnlyFields = config.readOnlyFields || [];
  const effectiveReadOnlyFields = moduleKey === "privacy" || moduleKey === "terms" ? [...readOnlyFields, "createdAt", "updatedAt"] : moduleKey === "pickups" ? [...readOnlyFields, "customer", "scrap", "slot"] : readOnlyFields;

  async function submitForm(event) {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    try {
      await addRow(moduleKey, draft);
      setDraft(emptyByModule[moduleKey]);
      setShowForm(false);
      alertApi?.success(`${singular(config.title)} saved successfully.`);
    } catch (error) {
      alertApi?.error(cleanError(error, `Could not save ${singular(config.title).toLowerCase()}. Please try again.`));
    } finally {
      setSaving(false);
    }
  }

  function startEdit(row) {
    setEditingId(row.id);
    setEditDraft({ ...row, executiveId: row.executiveId || "" });
  }

  async function saveEdit() {
    if (saving) return;
    const original = rows.find((row) => row.id === editingId);
    if (moduleKey === "pickups" && original?.executiveId && String(original.executiveId) !== String(editDraft.executiveId || "")) {
      const selected = executiveOptions.find((item) => String(item.id) === String(editDraft.executiveId || ""));
      const confirmed = await alertApi?.confirm({
        title: "Assign executive?",
        message: `Are you sure you want to assign this pickup request to ${selected?.name || editDraft.executive || "the selected executive"}?`,
        confirmText: "Assign"
      });
      if (!confirmed) return;
    }
    setSaving(true);
    try {
      await updateRow(moduleKey, editingId, editDraft);
      alertApi?.success(moduleKey === "pickups" ? "Executive assigned successfully." : `${singular(config.title)} updated successfully.`);
      setEditingId(null);
      setEditDraft({});
    } catch (error) {
      alertApi?.error(cleanError(error, `Could not update ${singular(config.title).toLowerCase()}. Please try again.`));
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <header className="topbar">
        <div>
          <h1>{config.title}</h1>
          <p>{config.subtitle}</p>
        </div>
        {canCreate && (
          <button className="primaryButton" onClick={() => setShowForm((value) => !value)}>
            {showForm ? <X size={18} /> : <Plus size={18} />}
            {showForm ? "Cancel" : config.action}
          </button>
        )}
      </header>

      {showForm && (
        <form className="formPanel" onSubmit={submitForm}>
          {moduleKey === "categories" && (
            <CategoryIconControl
              value={draft.iconUrl}
              file={draft.iconFile}
              removeIcon={draft.removeIcon}
              onFile={(file) => setDraft((current) => ({ ...current, iconFile: file, removeIcon: false }))}
              onRemove={() => setDraft((current) => ({ ...current, iconFile: null, iconUrl: "", removeIcon: true }))}
            />
          )}
          {fields.map((field) => (
            <label key={field}>
              <span>{humanize(field)}</span>
              <FieldControl
                field={field}
                value={draft[field]}
                options={fieldOptions[field]}
                multiline={["answer", "content", "message", "adminNote"].includes(field)}
                onChange={(value) => setDraft((current) => ({ ...current, [field]: value }))}
                required={!["email", "description", "password"].includes(field)}
              />
            </label>
          ))}
          <button className="primaryButton" type="submit" disabled={saving}>
            <Save size={18} />
            {saving ? "Saving..." : "Save"}
          </button>
        </form>
      )}

      <section className="panel">
        <div className="panelHeader">
          <h2>{config.title}</h2>
          <span className="countPill">{pagination?.totalRecords ?? rows.length} records</span>
        </div>
        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                {config.columns.map((column) => (
                  <th key={column}>
                    <button className="sortHeader" type="button" onClick={() => toggleSort(column, listState, setListState, reload)}>
                      {column}
                      <span>{sortIndicator(column, listState)}</span>
                    </button>
                  </th>
                ))}
                {canEdit && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  {displayFields.map((field) => (
                    <td key={`${row.id}-${field}`}>
                      {field === "passwordAction" ? (
                        <button className="ghostButton smallButton" type="button" onClick={() => { setPasswordTarget(row); setPasswordDraft(""); }}>
                          <KeyRound size={15} />
                          Reset
                        </button>
                      ) : editingId === row.id && field !== "id" && !effectiveReadOnlyFields.includes(field) ? (
                        field === "executive" && moduleKey === "pickups" ? (
                          <ExecutiveSelect
                            value={editDraft.executiveId || ""}
                            disabled={["Completed", "Cancelled"].includes(row.status)}
                            options={executiveOptions}
                            onChange={(value) => {
                              const selected = executiveOptions.find((item) => String(item.id) === String(value));
                              setEditDraft((current) => ({ ...current, executiveId: value, executive: selected ? selected.name : "Unassigned" }));
                            }}
                          />
                        ) : field === "iconUrl" ? (
                          <CategoryIconControl
                            compact
                            value={editDraft.iconUrl}
                            file={editDraft.iconFile}
                            removeIcon={editDraft.removeIcon}
                            onFile={(file) => setEditDraft((current) => ({ ...current, iconFile: file, removeIcon: false }))}
                            onRemove={() => setEditDraft((current) => ({ ...current, iconFile: null, iconUrl: "", removeIcon: true }))}
                          />
                        ) : (
                          <FieldControl
                            className="inlineInput"
                            field={field}
                            value={editDraft[field] || ""}
                            options={fieldOptions[field]}
                            multiline={["answer", "content", "message", "adminNote"].includes(field)}
                            onChange={(value) => setEditDraft((current) => ({ ...current, [field]: value }))}
                          />
                        )
                      ) : field === "status" ? (
                        <span className="status">{row[field]}</span>
                      ) : field === "iconUrl" ? (
                        <CategoryIconPreview src={row.iconUrl} />
                      ) : (
                        row[field]
                      )}
                    </td>
                  ))}
                  {canEdit && (
                    <td>
                      {editingId === row.id ? (
                        <button className="iconButton" onClick={saveEdit} title="Save" type="button" disabled={saving}>
                          <CheckCircle2 size={18} />
                        </button>
                      ) : (
                        <div className="rowActions">
                          <button className="iconButton" onClick={() => startEdit(row)} title="Edit" type="button">
                            <Edit3 size={18} />
                          </button>
                          {config.canDelete && (
                            <button className="iconButton dangerIcon" onClick={() => confirmDelete(moduleKey, row.id, deleteRow, alertApi, config)} title="Delete" type="button" disabled={saving}>
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={config.columns.length + (canEdit ? 1 : 0)}>No records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      {pagination && (
        <PaginationControls
          pagination={pagination}
          listState={listState}
          setListState={setListState}
          reload={reload}
        />
      )}
      {passwordTarget && (
        <PasswordResetPanel
          row={passwordTarget}
          password={passwordDraft}
          setPassword={setPasswordDraft}
          saving={saving}
          onClose={() => {
            setPasswordTarget(null);
            setPasswordDraft("");
          }}
          onSave={() => resetPassword(moduleKey, passwordTarget, passwordDraft, updateRow, alertApi, setSaving, () => {
            setPasswordTarget(null);
            setPasswordDraft("");
          })}
        />
      )}
    </>
  );
}

function ExecutiveSelect({ value, options, onChange, disabled }) {
  return (
    <select className="selectInput executiveSelect" value={value || ""} onChange={(event) => onChange(event.target.value)} disabled={disabled}>
      <option value="">Unassigned</option>
      {options.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name || "Executive"} - {item.mobile} ({item.availability}, {item.activeAssigned} active)
        </option>
      ))}
    </select>
  );
}

function CategoryIconControl({ value, file, removeIcon, onFile, onRemove, compact = false }) {
  const [error, setError] = useState("");
  const preview = file ? URL.createObjectURL(file) : removeIcon ? "" : value;

  function handleFile(event) {
    const selected = event.target.files?.[0];
    if (!selected) return;
    const allowed = ["image/png", "image/jpeg", "image/webp"];
    if (!allowed.includes(selected.type)) {
      setError("Use PNG, JPG, JPEG, or WebP.");
      event.target.value = "";
      return;
    }
    if (selected.size > 2 * 1024 * 1024) {
      setError("Icon must be 2 MB or smaller.");
      event.target.value = "";
      return;
    }
    setError("");
    onFile(selected);
  }

  return (
    <label className={compact ? "iconUpload compact" : "iconUpload"}>
      <span>Category Icon</span>
      <div className="iconUploadRow">
        <CategoryIconPreview src={preview} />
        <div className="iconUploadActions">
          <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleFile} />
          {preview && (
            <button type="button" className="ghostButton" onClick={onRemove}>
              Remove
            </button>
          )}
          <small>Optional. PNG, JPG, JPEG, or WebP. Max 2 MB.</small>
          {error && <small className="fieldError">{error}</small>}
        </div>
      </div>
    </label>
  );
}

function CategoryIconPreview({ src }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="categoryIconPreview">
      {src && !failed ? <img src={src} alt="Category icon preview" onError={() => setFailed(true)} /> : <ImageIcon size={20} />}
    </div>
  );
}

function PaginationControls({ pagination, listState, setListState, reload }) {
  const currentPage = Number(pagination.page || listState.page || 1);
  const totalPages = Math.max(Number(pagination.totalPages || 1), 1);
  const totalRecords = Number(pagination.totalRecords ?? pagination.total ?? 0);

  function go(page) {
    const nextPage = Math.min(Math.max(Number(page), 1), totalPages);
    const next = { ...listState, page: nextPage };
    setListState(next);
  }
  function changeLimit(event) {
    const next = { ...listState, page: 1, limit: Number(event.target.value) };
    setListState(next);
  }
  return (
    <div className="paginationBar">
      <span>
        Page {currentPage} of {totalPages} - {totalRecords} records
      </span>
      <select value={listState.limit} onChange={changeLimit} className="selectInput pageSize">
        {[10, 20, 50, 100].map((size) => <option key={size} value={size}>{size} / page</option>)}
      </select>
      <button className="ghostButton" disabled={currentPage <= 1} onClick={() => go(currentPage - 1)}>Previous</button>
      <div className="pageNumbers" aria-label="Pagination pages">
        {pageNumbers(currentPage, totalPages).map((page) => (
          <button
            key={page}
            type="button"
            className={page === currentPage ? "pageNumber active" : "pageNumber"}
            onClick={() => go(page)}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ))}
      </div>
      <button className="ghostButton" disabled={currentPage >= totalPages} onClick={() => go(currentPage + 1)}>Next</button>
    </div>
  );
}

function pageNumbers(currentPage, totalPages) {
  const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
  const end = Math.min(totalPages, start + 4);
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function PasswordResetPanel({ row, password, setPassword, saving, onClose, onSave }) {
  return (
    <div className="alertOverlay" role="dialog" aria-modal="true">
      <div className="alertDialog passwordDialog">
        <button className="alertClose" type="button" onClick={onClose}>
          <X size={18} />
        </button>
        <div className="alertIcon info">
          <KeyRound size={22} />
        </div>
        <h2>Reset Password</h2>
        <p>Set a new password for {row.name || row.mobile}. The old password will not be shown.</p>
        <label className="passwordField">
          <span>New Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Minimum 6 characters"
            minLength={6}
            maxLength={20}
            autoFocus
          />
        </label>
        <div className="alertActions">
          <button className="secondaryButton" type="button" onClick={onClose} disabled={saving}>Cancel</button>
          <button className="primaryButton" type="button" onClick={onSave} disabled={saving}>
            <KeyRound size={16} />
            {saving ? "Saving..." : "Reset Password"}
          </button>
        </div>
      </div>
    </div>
  );
}

const sortKeys = {
  Order: "createdAt",
  Customer: "customer",
  Executive: "executive",
  Status: "status",
  Category: "name",
  Name: "name",
  Mobile: "mobile",
  Assigned: "assigned",
  Pending: "pending",
  Completed: "completed",
  "Completion %": "completionPercentage",
  "Last Activity": "lastActivity"
};

function toggleSort(column, listState, setListState, reload) {
  const sortBy = sortKeys[column];
  if (!sortBy) return;
  const sortOrder = listState.sortBy === sortBy && listState.sortOrder === "asc" ? "desc" : "asc";
  const next = { ...listState, sortBy, sortOrder, page: 1 };
  setListState(next);
}

function sortIndicator(column, listState) {
  const sortBy = sortKeys[column];
  if (!sortBy || listState.sortBy !== sortBy) return "";
  return listState.sortOrder === "asc" ? " ↑" : " ↓";
}

function FieldControl({ className = "", field, value, options, onChange, required = false, multiline = false }) {
  if (options?.length) {
    return (
      <select className={className || "selectInput"} value={value || options[0]} onChange={(event) => onChange(event.target.value)} required={required}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  if (multiline) {
    return (
      <textarea
        className={className || "textAreaInput"}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={humanize(field)}
        required={required}
      />
    );
  }

  return (
    <input
      type={field === "password" || field === "newPassword" ? "password" : "text"}
      className={className}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={humanize(field)}
      required={required}
      maxLength={field === "password" || field === "newPassword" ? 20 : undefined}
    />
  );
}

async function resetPassword(moduleKey, row, password, updateRow, alertApi, setSaving, onDone) {
  if (!password || password.length < 6) {
    alertApi?.error("Password must be at least 6 characters.");
    return;
  }
  const confirmed = await alertApi?.confirm({
    title: "Reset password?",
    message: `Set a new password for ${row.name || row.mobile}?`,
    confirmText: "Reset"
  });
  if (!confirmed) return;
  setSaving(true);
  try {
    await updateRow(moduleKey, row.id, { ...row, newPassword: password });
    alertApi?.success("Password updated successfully.");
    onDone?.();
  } catch (error) {
    alertApi?.error(cleanError(error, "Could not update password. Please try again."));
  } finally {
    setSaving(false);
  }
}

async function confirmDelete(moduleKey, id, deleteRow, alertApi, config) {
  if (!deleteRow) return;
  const confirmed = await alertApi?.confirm({
    title: `Delete ${singular(config.title).toLowerCase()}?`,
    message: "This action cannot be undone.",
    confirmText: "Delete",
    variant: "danger",
    type: "warning"
  });
  if (!confirmed) return;
  try {
    await deleteRow(moduleKey, id);
    alertApi?.success(`${singular(config.title)} deleted successfully.`);
  } catch (error) {
    alertApi?.error(cleanError(error, `Could not delete ${singular(config.title).toLowerCase()}. Please try again.`));
  }
}

function humanize(value) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}

function singular(value = "record") {
  return String(value).replace(/Management|Reports|Requests/g, "").trim() || "Record";
}

function cleanError(error, fallback) {
  const message = error?.response?.data?.message || error?.message || fallback;
  if (/sql|unknown column|syntax|stack|database/i.test(message)) return fallback;
  return message;
}
