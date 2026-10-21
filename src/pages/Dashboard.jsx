import React from "react";
import { IndianRupee, PackageCheck, Timer, Truck, Users } from "lucide-react";

export default function Dashboard({ data, setActiveModule }) {
  const dashboard = data.dashboard || {};
  const pickups = data.pickups || [];
  const stats = [
    ["Total Users", dashboard.totalUsers ?? data.users.length, Users],
    ["Total Orders", dashboard.totalOrders ?? pickups.length, Truck],
    ["Revenue", `Rs ${dashboard.revenue ?? 0}`, IndianRupee],
    ["Pending Pickups", dashboard.pendingPickups ?? 0, Timer],
    ["Completed", dashboard.completedPickups ?? 0, PackageCheck]
  ];

  return (
    <>
      <header className="topbar">
        <div>
          <h1>Dashboard</h1>
          <p>Live overview from your MySQL database.</p>
        </div>
        <button className="primaryButton" onClick={() => setActiveModule("offers")}>
          Create Offer
        </button>
      </header>

      <section className="statsGrid">
        {stats.map(([label, value, Icon]) => (
          <article className="stat" key={label}>
            <Icon size={22} />
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </section>

      <section className="panel">
        <div className="panelHeader">
          <h2>Latest Pickup Requests</h2>
          <button className="ghostButton" onClick={() => setActiveModule("pickups")}>
            View All
          </button>
        </div>
        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Scrap</th>
                <th>Slot</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pickups.slice(0, 8).map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.customer}</td>
                  <td>{row.scrap}</td>
                  <td>{row.slot}</td>
                  <td>
                    <span className="status">{row.status}</span>
                  </td>
                </tr>
              ))}
              {pickups.length === 0 && (
                <tr>
                  <td colSpan="5">No pickup requests in database yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
