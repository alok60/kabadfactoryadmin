import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Bell,
  Boxes,
  CreditCard,
  FileQuestion,
  Headphones,
  LayoutDashboard,
  LogOut,
  Megaphone,
  PackagePlus,
  RefreshCcw,
  Search,
  ShieldCheck,
  FileText,
  BarChart3,
  MapPin,
  IndianRupee,
  Database,
  Truck,
  Users
} from "lucide-react";
import { api, setAdminToken } from "./api/client.js";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import ModulePage from "./pages/ModulePage.jsx";
import AdminAlert from "./components/AdminAlert.jsx";

const modules = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "users", label: "Users", icon: Users },
  { key: "pickups", label: "Pickup Requests", icon: Truck },
  { key: "stores", label: "Store Locations", icon: MapPin },
  { key: "pickupCharges", label: "Pickup Charges", icon: IndianRupee },
  { key: "pincodeChargeCache", label: "PIN Charge Cache", icon: Database },
  { key: "categories", label: "Scrap Categories", icon: Boxes },
  { key: "executives", label: "Executives", icon: PackagePlus },
  { key: "executiveReports", label: "Executive Reports", icon: BarChart3 },
  { key: "offers", label: "Offers", icon: Megaphone },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "support", label: "Support Queries", icon: Headphones },
  { key: "faqs", label: "FAQ Management", icon: FileQuestion },
  { key: "privacy", label: "Privacy Policy", icon: ShieldCheck },
  { key: "terms", label: "Terms & Conditions", icon: FileText },
  { key: "payments", label: "Payment Reports", icon: CreditCard }
];

const pageConfig = {
  users: {
    title: "User Management",
    subtitle: "Database customers from the users table.",
    action: "Add User",
    columns: ["Name", "Mobile", "Email", "Status", "Password"]
  },
  pickups: {
    title: "Pickup Request Management",
    subtitle: "Live bookings joined with users, executives, and booking items.",
    action: "Create Pickup",
    columns: ["Order", "Customer", "Scrap", "Slot", "Executive", "Pickup Charge", "Status"],
    canCreate: false
  },
  categories: {
    title: "Scrap Categories",
    subtitle: "Database category names, prices, units, and visibility.",
    action: "Add Category",
    columns: ["Icon", "Category", "Unit", "Price", "Description", "Status"]
  },
  stores: {
    title: "Store Locations",
    subtitle: "Active stores used for nearest-store pickup charge calculations.",
    action: "Add Store",
    columns: ["Store", "Address", "City", "State", "PIN Code", "Status"],
    apiPath: "/admin/stores"
  },
  pickupCharges: {
    title: "Pickup Charges",
    subtitle: "Distance-based pickup charge slabs used by the scheduling flow.",
    action: "Add Slab",
    columns: ["Min Km", "Max Km", "Charge", "Distance", "Status"],
    apiPath: "/admin/pickup-charges"
  },
  pincodeChargeCache: {
    title: "PIN Charge Cache",
    subtitle: "Read-only cached nearest-store and pickup-charge results by customer PIN code.",
    action: "Refresh",
    columns: ["PIN Code", "Nearest Store", "Store PIN", "Raw Distance", "Buffer", "Chargeable Distance", "Pickup Charge", "Version", "Status", "Calculated"],
    apiPath: "/admin/pincode-pickup-charge-cache",
    canCreate: false,
    canEdit: false
  },
  executives: {
    title: "Executive Management",
    subtitle: "Pickup executives stored as users with role executive.",
    action: "Add Executive",
    columns: ["Name", "Mobile", "Area", "Assigned", "Status", "Password"]
  },
  executiveReports: {
    title: "Executive Reports",
    subtitle: "Executive workload, performance, and pickup status breakdown.",
    action: "Export",
    columns: ["Executive", "Mobile", "Assigned", "Pending", "In Progress", "Collected", "Completed", "Cancelled", "Completion %", "Last Activity"],
    apiPath: "/admin/executive-reports",
    canCreate: false,
    canEdit: false
  },
  offers: {
    title: "Offers",
    subtitle: "Promotions from the offers table.",
    action: "Create Offer",
    columns: ["Title", "Audience", "Start", "End", "Status"]
  },
  notifications: {
    title: "Notifications",
    subtitle: "Records from the notifications table.",
    action: "Send Notification",
    columns: ["Title", "Type", "Audience", "Sent", "Status"]
  },
  support: {
    title: "Support Queries",
    subtitle: "Customer help requests submitted from the mobile app.",
    action: "Create Query",
    columns: ["Customer", "Mobile", "Subject", "Category", "Message", "Status", "Admin Note", "Created"],
    canCreate: false,
    readOnlyFields: ["customer", "mobile", "subject", "category", "message", "created"]
  },
  faqs: {
    title: "FAQ Management",
    subtitle: "Create, edit, delete, activate, deactivate, categorize, and order FAQs.",
    action: "Add FAQ",
    columns: ["Question", "Answer", "Category", "Display Order", "Status"],
    canDelete: true
  },
  privacy: {
    title: "Privacy Policy Management",
    subtitle: "Manage privacy policy versions and publish one active version.",
    action: "Add Version",
    columns: ["Title", "Content", "Version", "Status", "Created", "Updated"],
    apiPath: "/admin/cms/privacy"
  },
  terms: {
    title: "Terms and Conditions Management",
    subtitle: "Manage terms versions and publish one active version.",
    action: "Add Version",
    columns: ["Title", "Content", "Version", "Status", "Created", "Updated"],
    apiPath: "/admin/cms/terms"
  },
  payments: {
    title: "Payment Reports",
    subtitle: "Payment view generated from booking totals and payment mode.",
    action: "Export Report",
    columns: ["Order", "Customer", "Mode", "Amount", "Pickup Charge", "Status"],
    canCreate: false,
    canEdit: false
  }
};

const emptyData = {
  dashboard: null,
  users: [],
  pickups: [],
  categories: [],
  stores: [],
  pickupCharges: [],
  pincodeChargeCache: [],
  executives: [],
  executiveReports: [],
  offers: [],
  notifications: [],
  support: [],
  faqs: [],
  privacy: [],
  terms: [],
  payments: []
};

export default function App() {
  const [activeModule, setActiveModule] = useState("dashboard");
  const [query, setQuery] = useState("");
  const [data, setData] = useState(emptyData);
  const [session, setSession] = useState(() => {
    const token = localStorage.getItem("kabadAdminToken");
    if (token) {
      setAdminToken(token);
      return { token };
    }
    return null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({});
  const [listState, setListState] = useState({ page: 1, limit: 10, sortBy: "createdAt", sortOrder: "desc", status: "" });
  const [executiveOptions, setExecutiveOptions] = useState([]);
  const [alertState, setAlertState] = useState(null);

  const alertApi = useMemo(() => ({
    success(message, title = "Success") {
      setAlertState({ type: "success", title, message });
    },
    error(message, title = "Something went wrong") {
      setAlertState({ type: "error", title, message });
    },
    info(message, title = "Information") {
      setAlertState({ type: "info", title, message });
    },
    confirm(options) {
      return new Promise((resolve) => {
        setAlertState({
          type: options.type || "confirm",
          title: options.title || "Are you sure?",
          message: options.message,
          confirm: true,
          confirmText: options.confirmText || "Confirm",
          cancelText: options.cancelText || "Cancel",
          variant: options.variant,
          onResolve: resolve
        });
      });
    }
  }), []);

  function closeAlert() {
    if (alertState?.confirm) alertState.onResolve?.(false);
    setAlertState(null);
  }

  function confirmAlert() {
    alertState?.onResolve?.(true);
    setAlertState(null);
  }

  const logout = useCallback(() => {
    localStorage.removeItem("kabadAdminToken");
    setAdminToken(null);
    setSession(null);
    setData(emptyData);
  }, []);

  const loadDashboard = useCallback(async () => {
    const [dashboard, pickups, users, payments] = await Promise.all([
      api.get("/admin/dashboard"),
      api.get("/admin/pickups"),
      api.get("/admin/users"),
      api.get("/admin/payments")
    ]);

    setData((current) => ({
      ...current,
      dashboard: dashboard.data,
      pickups: pickups.data.data,
      users: users.data.data,
      payments: payments.data.data
    }));
  }, []);

  const loadModule = useCallback(async (moduleKey, overrides = {}) => {
    if (moduleKey === "dashboard") {
      await loadDashboard();
      return;
    }

    const nextState = { ...listState, ...overrides };
    const path = pageConfig[moduleKey]?.apiPath || `/admin/${moduleKey}`;
    let requestedState = nextState;
    let response = await api.get(path, {
      params: {
        page: requestedState.page,
        limit: requestedState.limit,
        search: query,
        sortBy: requestedState.sortBy,
        sortOrder: requestedState.sortOrder,
        status: requestedState.status
      }
    });

    let responsePagination = response.data.pagination || null;
    if (responsePagination && requestedState.page > responsePagination.totalPages) {
      requestedState = { ...requestedState, page: responsePagination.totalPages };
      setListState(requestedState);
      response = await api.get(path, {
        params: {
          page: requestedState.page,
          limit: requestedState.limit,
          search: query,
          sortBy: requestedState.sortBy,
          sortOrder: requestedState.sortOrder,
          status: requestedState.status
        }
      });
      responsePagination = response.data.pagination || null;
    }

    setData((current) => ({ ...current, [moduleKey]: response.data.data }));
    setPagination((current) => ({ ...current, [moduleKey]: responsePagination }));
  }, [listState, loadDashboard, query]);

  const loadExecutiveOptions = useCallback(async () => {
    const response = await api.get("/admin/executive-options");
    setExecutiveOptions(response.data.data || []);
  }, []);

  useEffect(() => {
    if (!session) return;

    let ignore = false;
    setLoading(true);
    setError("");
    const timer = setTimeout(() => {
      loadModule(activeModule)
      .catch((err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          logout();
          return;
        }
        if (!ignore) setError(err.response?.data?.message || "Could not load admin data");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    }, 350);

    return () => {
      ignore = true;
      clearTimeout(timer);
    };
  }, [activeModule, loadModule, logout, session]);

  useEffect(() => {
    if (!session) return;
    loadExecutiveOptions().catch(() => {});
  }, [loadExecutiveOptions, session]);

  useEffect(() => {
    if (!session?.token) return;

    api.get("/admin/auth/me").catch((err) => {
      if (err.response?.status === 401 || err.response?.status === 403) {
        logout();
      }
    });
  }, [logout, session]);

  const activeMeta = modules.find((module) => module.key === activeModule);
  const filteredRows = useMemo(() => data[activeModule] || [], [activeModule, data]);

  async function addRow(moduleKey, row) {
    const response = await api.post(pageConfig[moduleKey]?.apiPath || `/admin/${moduleKey}`, serializeRow(moduleKey, row));
    setData((current) => ({
      ...current,
      [moduleKey]: [response.data, ...(current[moduleKey] || [])]
    }));
    await loadDashboard();
    return response;
  }

  async function updateRow(moduleKey, id, patch) {
    const apiId = patch.rawId || String(id).replace(/\D/g, "") || id;
    const path = pageConfig[moduleKey]?.apiPath || `/admin/${moduleKey}`;
    await api.patch(`${path}/${apiId}`, serializeRow(moduleKey, patch));
    await loadModule(moduleKey);
    await loadDashboard();
  }

  async function deleteRow(moduleKey, id) {
    const path = pageConfig[moduleKey]?.apiPath || `/admin/${moduleKey}`;
    await api.delete(`${path}/${id}`);
    await loadModule(moduleKey);
  }

  if (!session) {
    return <Login onLogin={setSession} />;
  }

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brandMark">
            <img src="/assets/kabad-factory-logo.png" alt="Kabad Factory" />
          </div>
          <div>
            <span>Admin Console</span>
          </div>
        </div>
        <nav>
          {modules.map(({ key, label, icon: Icon }) => (
            <button
              className={activeModule === key ? "navItem active" : "navItem"}
              key={key}
              onClick={() => {
                setActiveModule(key);
                setQuery("");
                setListState({ page: 1, limit: 10, sortBy: key === "executiveReports" ? "lastActivity" : "createdAt", sortOrder: "desc", status: "" });
              }}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="main">
        <div className="utilityBar">
          <div className="searchBox">
            <Search size={18} />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setListState((current) => ({ ...current, page: 1 }));
              }}
              placeholder={`Search ${activeMeta?.label || "records"}`}
            />
          </div>
          <div className="utilityActions">
            <button className="ghostButton" onClick={() => loadModule(activeModule)} disabled={loading}>
              <RefreshCcw size={16} />
              Refresh
            </button>
            <button className="ghostButton" onClick={logout}>
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {error && <div className="errorBox">{error}</div>}
        {loading && <div className="loadingBox">Loading database data...</div>}

        {activeModule === "dashboard" ? (
          <Dashboard setActiveModule={setActiveModule} data={data} />
        ) : (
          <ModulePage
            moduleKey={activeModule}
            config={pageConfig[activeModule]}
            rows={filteredRows}
            pagination={pagination[activeModule]}
            listState={listState}
            setListState={setListState}
            reload={(overrides) => loadModule(activeModule, overrides)}
            executiveOptions={executiveOptions}
            alertApi={alertApi}
            addRow={addRow}
            updateRow={updateRow}
            deleteRow={deleteRow}
          />
        )}
      </main>
      <AdminAlert alert={alertState} onClose={closeAlert} onConfirm={confirmAlert} />
    </div>
  );
}

function serializeRow(moduleKey, row) {
  if (moduleKey !== "categories") return row;

  const formData = new FormData();
  Object.entries(row).forEach(([key, value]) => {
    if (key === "iconUrl" || value === undefined || value === null) return;
    if (key === "iconFile") {
      if (value) formData.append("iconFile", value);
      return;
    }
    formData.append(key, value);
  });
  return formData;
}
