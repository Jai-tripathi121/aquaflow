import { useState, useEffect } from "react";

const initialData = {
  products: [
    { id: 1, name: "500ml Pure Water", sku: "WB-500", buyPrice: 4, sellPrice: 10, stock: 1200, category: "500ml" },
    { id: 2, name: "1L Pure Water", sku: "WB-1000", buyPrice: 7, sellPrice: 18, stock: 800, category: "1L" },
    { id: 3, name: "2L Pure Water", sku: "WB-2000", buyPrice: 12, sellPrice: 28, stock: 450, category: "2L" },
    { id: 4, name: "5L Gallon Water", sku: "WB-5000", buyPrice: 20, sellPrice: 45, stock: 300, category: "5L" },
    { id: 5, name: "20L Dispenser", sku: "WB-20000", buyPrice: 55, sellPrice: 120, stock: 150, category: "20L" },
  ],
  sales: [
    { id: 1, date: "2026-02-20", customer: "Metro Mart", product: "500ml Pure Water", qty: 200, unit: 10, total: 2000, status: "Paid" },
    { id: 2, date: "2026-02-21", customer: "Sunshine Hotel", product: "1L Pure Water", qty: 100, unit: 18, total: 1800, status: "Paid" },
    { id: 3, date: "2026-02-22", customer: "City Office", product: "20L Dispenser", qty: 30, unit: 120, total: 3600, status: "Pending" },
    { id: 4, date: "2026-02-23", customer: "Fresh Foods", product: "2L Pure Water", qty: 150, unit: 28, total: 4200, status: "Paid" },
    { id: 5, date: "2026-02-24", customer: "BlueStar Corp", product: "5L Gallon Water", qty: 50, unit: 45, total: 2250, status: "Pending" },
    { id: 6, date: "2026-02-25", customer: "Metro Mart", product: "500ml Pure Water", qty: 300, unit: 10, total: 3000, status: "Paid" },
  ],
  expenses: [
    { id: 1, date: "2026-02-01", category: "Raw Material", description: "Empty bottles & caps", amount: 25000, vendor: "PolyPack Ltd" },
    { id: 2, date: "2026-02-05", category: "Utilities", description: "Water purification & electricity", amount: 12000, vendor: "Utility Board" },
    { id: 3, date: "2026-02-10", category: "Salaries", description: "Staff salaries Feb", amount: 35000, vendor: "Internal" },
    { id: 4, date: "2026-02-15", category: "Logistics", description: "Delivery trucks fuel", amount: 8000, vendor: "FuelStation" },
    { id: 5, date: "2026-02-18", category: "Maintenance", description: "Plant maintenance", amount: 5500, vendor: "FixIt Co." },
    { id: 6, date: "2026-02-22", category: "Marketing", description: "Promotional flyers", amount: 3000, vendor: "PrintMedia" },
  ],
  warehouse: [
    { id: 1, zone: "A", product: "500ml Pure Water", capacity: 2000, current: 1200, location: "A-01", lastUpdated: "2026-02-25" },
    { id: 2, zone: "A", product: "1L Pure Water", capacity: 1500, current: 800, location: "A-02", lastUpdated: "2026-02-25" },
    { id: 3, zone: "B", product: "2L Pure Water", capacity: 1000, current: 450, location: "B-01", lastUpdated: "2026-02-24" },
    { id: 4, zone: "B", product: "5L Gallon Water", capacity: 600, current: 300, location: "B-02", lastUpdated: "2026-02-24" },
    { id: 5, zone: "C", product: "20L Dispenser", capacity: 300, current: 150, location: "C-01", lastUpdated: "2026-02-23" },
  ],
  customers: [
    { id: 1, name: "Metro Mart", phone: "+91-98001-11111", email: "metro@mart.com", type: "Retail", credit: 0, totalPurchased: 50000 },
    { id: 2, name: "Sunshine Hotel", phone: "+91-98001-22222", email: "sunshine@hotel.com", type: "Hotel", credit: 5000, totalPurchased: 32000 },
    { id: 3, name: "City Office", phone: "+91-98001-33333", email: "admin@cityoffice.com", type: "Corporate", credit: 3600, totalPurchased: 18000 },
    { id: 4, name: "Fresh Foods", phone: "+91-98001-44444", email: "fresh@foods.com", type: "Retail", credit: 0, totalPurchased: 22000 },
    { id: 5, name: "BlueStar Corp", phone: "+91-98001-55555", email: "purchase@bluestar.com", type: "Corporate", credit: 2250, totalPurchased: 15000 },
  ],
  purchases: [
    { id: 1, date: "2026-02-01", vendor: "PolyPack Ltd", item: "500ml Empty Bottles", qty: 5000, unitCost: 2.5, total: 12500, status: "Received" },
    { id: 2, date: "2026-02-05", vendor: "PolyPack Ltd", item: "1L Empty Bottles", qty: 3000, unitCost: 3.5, total: 10500, status: "Received" },
    { id: 3, date: "2026-02-12", vendor: "CapMakers", item: "Bottle Caps (Mix)", qty: 10000, unitCost: 0.5, total: 5000, status: "Received" },
    { id: 4, date: "2026-02-20", vendor: "LabelPrint", item: "Brand Labels", qty: 8000, unitCost: 0.8, total: 6400, status: "Pending" },
  ],
};

const COLORS = {
  blue: "#0ea5e9",
  teal: "#14b8a6",
  green: "#22c55e",
  amber: "#f59e0b",
  red: "#ef4444",
  purple: "#a855f7",
  indigo: "#6366f1",
  gray: "#64748b",
};

const statCard = (label, value, sub, color, icon) => (
  <div key={label} style={{
    background: "#fff", borderRadius: 16, padding: "20px 24px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.07)", borderTop: `4px solid ${color}`,
    display: "flex", alignItems: "flex-start", gap: 16, minWidth: 0
  }}>
    <div style={{
      width: 48, height: 48, borderRadius: 12,
      background: color + "18", display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 22, flexShrink: 0
    }}>{icon}</div>
    <div>
      <div style={{ fontSize: 22, fontWeight: 700, color: "#1e293b" }}>{value}</div>
      <div style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 11, color: color, marginTop: 2 }}>{sub}</div>
    </div>
  </div>
);

function Badge({ status }) {
  const colors = { Paid: "#22c55e", Pending: "#f59e0b", Received: "#0ea5e9", Overdue: "#ef4444" };
  const bg = colors[status] || "#64748b";
  return (
    <span style={{
      background: bg + "18", color: bg, borderRadius: 20, padding: "2px 12px",
      fontSize: 12, fontWeight: 700, border: `1px solid ${bg}40`
    }}>{status}</span>
  );
}

function Table({ headers, rows, color = COLORS.blue }) {
  return (
    <div style={{ overflowX: "auto", borderRadius: 12, border: "1px solid #e2e8f0" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: color + "0e" }}>
            {headers.map(h => (
              <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "#475569", fontWeight: 700, whiteSpace: "nowrap", borderBottom: "1px solid #e2e8f0" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #f1f5f9", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: "10px 16px", color: "#334155", whiteSpace: "nowrap" }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProgressBar({ value, max, color }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const col = pct > 80 ? COLORS.green : pct > 40 ? COLORS.amber : COLORS.red;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ flex: 1, height: 8, background: "#e2e8f0", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: col, borderRadius: 4, transition: "width 0.5s" }} />
      </div>
      <span style={{ fontSize: 12, color: "#64748b", width: 36, textAlign: "right" }}>{pct}%</span>
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20
    }} onClick={onClose}>
      <div style={{
        background: "#fff", borderRadius: 20, padding: 32, maxWidth: 540, width: "100%",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)", maxHeight: "80vh", overflowY: "auto"
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h3 style={{ margin: 0, color: "#1e293b", fontSize: 18, fontWeight: 700 }}>{title}</h3>
          <button onClick={onClose} style={{ border: "none", background: "#f1f5f9", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16 }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 6 }}>{label}</label>
      <input {...props} style={{
        width: "100%", padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10,
        fontSize: 13, color: "#1e293b", outline: "none", boxSizing: "border-box",
        background: "#fafafa", fontFamily: "inherit"
      }} />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 6 }}>{label}</label>
      <select {...props} style={{
        width: "100%", padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10,
        fontSize: 13, color: "#1e293b", outline: "none", boxSizing: "border-box",
        background: "#fafafa", fontFamily: "inherit"
      }}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("Dashboard");
  const [data, setData] = useState(initialData);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [search, setSearch] = useState("");

  const f = (n) => "₹" + n.toLocaleString("en-IN");

  const totalRevenue = data.sales.reduce((s, r) => s + r.total, 0);
  const totalExpenses = data.expenses.reduce((s, r) => s + r.amount, 0);
  const totalStock = data.products.reduce((s, p) => s + p.stock, 0);
  const pendingPayments = data.sales.filter(s => s.status === "Pending").reduce((s, r) => s + r.total, 0);

  const nav = ["Dashboard", "Sales", "Products", "Warehouse", "Expenses", "Purchases", "Customers", "Reports"];

  const openModal = (type) => {
    setModal(type);
    setForm({});
  };

  const handleAddSale = () => {
    const product = data.products.find(p => p.name === form.product);
    if (!product || !form.qty || !form.customer) return;
    const qty = parseInt(form.qty);
    const total = qty * product.sellPrice;
    const newSale = {
      id: data.sales.length + 1,
      date: new Date().toISOString().split("T")[0],
      customer: form.customer,
      product: form.product,
      qty,
      unit: product.sellPrice,
      total,
      status: "Pending"
    };
    setData(d => ({
      ...d,
      sales: [newSale, ...d.sales],
      products: d.products.map(p => p.name === form.product ? { ...p, stock: p.stock - qty } : p),
      warehouse: d.warehouse.map(w => w.product === form.product ? { ...w, current: w.current - qty } : w)
    }));
    setModal(null);
  };

  const handleAddExpense = () => {
    if (!form.description || !form.amount || !form.category) return;
    const newExp = {
      id: data.expenses.length + 1,
      date: new Date().toISOString().split("T")[0],
      category: form.category,
      description: form.description,
      amount: parseFloat(form.amount),
      vendor: form.vendor || "—"
    };
    setData(d => ({ ...d, expenses: [newExp, ...d.expenses] }));
    setModal(null);
  };

  const handleAddProduct = () => {
    if (!form.name || !form.buyPrice || !form.sellPrice) return;
    const newProd = {
      id: data.products.length + 1,
      name: form.name,
      sku: "WB-" + Math.floor(Math.random() * 9000 + 1000),
      buyPrice: parseFloat(form.buyPrice),
      sellPrice: parseFloat(form.sellPrice),
      stock: parseInt(form.stock) || 0,
      category: form.category || "Other"
    };
    setData(d => ({ ...d, products: [...d.products, newProd] }));
    setModal(null);
  };

  const renderDashboard = () => (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 28 }}>
        {statCard("Total Revenue (Feb)", f(totalRevenue), "+12.3% vs last month", COLORS.blue, "💰")}
        {statCard("Total Expenses (Feb)", f(totalExpenses), "Fixed + Variable", COLORS.red, "📊")}
        {statCard("Net Profit", f(totalRevenue - totalExpenses), `Margin: ${Math.round(((totalRevenue - totalExpenses) / totalRevenue) * 100)}%`, COLORS.green, "📈")}
        {statCard("Pending Payments", f(pendingPayments), `${data.sales.filter(s => s.status === "Pending").length} invoices`, COLORS.amber, "⏳")}
        {statCard("Total Stock Units", totalStock.toLocaleString(), "Across all SKUs", COLORS.teal, "📦")}
        {statCard("Active Customers", data.customers.length, "Retail + Corporate", COLORS.purple, "👥")}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
          <h3 style={{ margin: "0 0 16px", color: "#1e293b", fontSize: 16 }}>📦 Warehouse Stock Levels</h3>
          {data.warehouse.map(w => (
            <div key={w.id} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 13, color: "#334155", fontWeight: 600 }}>{w.product}</span>
                <span style={{ fontSize: 12, color: "#64748b" }}>{w.current.toLocaleString()} / {w.capacity.toLocaleString()}</span>
              </div>
              <ProgressBar value={w.current} max={w.capacity} />
            </div>
          ))}
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
          <h3 style={{ margin: "0 0 16px", color: "#1e293b", fontSize: 16 }}>💸 Expense Breakdown</h3>
          {data.expenses.slice(0, 5).map(e => (
            <div key={e.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f1f5f9" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>{e.category}</div>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>{e.description}</div>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.red }}>{f(e.amount)}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
        <h3 style={{ margin: "0 0 16px", color: "#1e293b", fontSize: 16 }}>🧾 Recent Sales</h3>
        <Table
          headers={["Date", "Customer", "Product", "Qty", "Amount", "Status"]}
          rows={data.sales.slice(0, 5).map(s => [s.date, s.customer, s.product, s.qty, f(s.total), <Badge status={s.status} />])}
          color={COLORS.blue}
        />
      </div>
    </div>
  );

  const renderSales = () => (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ margin: 0, color: "#1e293b" }}>Sales Management</h2>
          <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 13 }}>{data.sales.length} total orders • {f(totalRevenue)} revenue</p>
        </div>
        <button onClick={() => openModal("sale")} style={{
          background: COLORS.blue, color: "#fff", border: "none", borderRadius: 12,
          padding: "10px 20px", fontWeight: 700, cursor: "pointer", fontSize: 13
        }}>+ New Sale</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
        {statCard("Total Sales", f(totalRevenue), `${data.sales.length} orders`, COLORS.blue, "💰")}
        {statCard("Collected", f(data.sales.filter(s => s.status === "Paid").reduce((a, s) => a + s.total, 0)), `${data.sales.filter(s => s.status === "Paid").length} paid`, COLORS.green, "✅")}
        {statCard("Pending", f(pendingPayments), `${data.sales.filter(s => s.status === "Pending").length} outstanding`, COLORS.amber, "⏳")}
      </div>
      <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
        <Table
          headers={["#", "Date", "Customer", "Product", "Qty", "Unit Price", "Total", "Status"]}
          rows={data.sales.map(s => [s.id, s.date, s.customer, s.product, s.qty, f(s.unit), <strong>{f(s.total)}</strong>, <Badge status={s.status} />])}
          color={COLORS.blue}
        />
      </div>
    </div>
  );

  const renderProducts = () => (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ margin: 0, color: "#1e293b" }}>Product Catalog</h2>
          <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 13 }}>{data.products.length} SKUs active</p>
        </div>
        <button onClick={() => openModal("product")} style={{
          background: COLORS.teal, color: "#fff", border: "none", borderRadius: 12,
          padding: "10px 20px", fontWeight: 700, cursor: "pointer", fontSize: 13
        }}>+ Add Product</button>
      </div>
      <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
        <Table
          headers={["SKU", "Product Name", "Category", "Buy Price", "Sell Price", "Margin", "Stock", "Stock Value"]}
          rows={data.products.map(p => [
            <code style={{ background: "#f1f5f9", padding: "2px 8px", borderRadius: 6, fontSize: 12 }}>{p.sku}</code>,
            p.name, p.category, f(p.buyPrice), f(p.sellPrice),
            <span style={{ color: COLORS.green, fontWeight: 700 }}>{Math.round(((p.sellPrice - p.buyPrice) / p.sellPrice) * 100)}%</span>,
            <span style={{ color: p.stock < 200 ? COLORS.red : COLORS.green, fontWeight: 600 }}>{p.stock.toLocaleString()}</span>,
            f(p.sellPrice * p.stock)
          ])}
          color={COLORS.teal}
        />
      </div>
    </div>
  );

  const renderWarehouse = () => (
    <div>
      <h2 style={{ margin: "0 0 8px", color: "#1e293b" }}>Warehouse Management</h2>
      <p style={{ margin: "0 0 20px", color: "#64748b", fontSize: 13 }}>Zone-wise inventory tracking</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 24 }}>
        {["A", "B", "C"].map(zone => {
          const items = data.warehouse.filter(w => w.zone === zone);
          const totalCap = items.reduce((s, w) => s + w.capacity, 0);
          const totalCurr = items.reduce((s, w) => s + w.current, 0);
          const zoneColors = { A: COLORS.blue, B: COLORS.teal, C: COLORS.purple };
          return (
            <div key={zone} style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", borderLeft: `4px solid ${zoneColors[zone]}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontWeight: 700, color: "#1e293b", fontSize: 16 }}>Zone {zone}</span>
                <span style={{ fontSize: 12, color: "#64748b" }}>{totalCurr}/{totalCap} units</span>
              </div>
              <ProgressBar value={totalCurr} max={totalCap} />
              <div style={{ marginTop: 12 }}>
                {items.map(w => (
                  <div key={w.id} style={{ fontSize: 12, color: "#64748b", padding: "4px 0", display: "flex", justifyContent: "space-between" }}>
                    <span>{w.product}</span>
                    <span style={{ fontWeight: 600, color: "#334155" }}>{w.current.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
        <h3 style={{ margin: "0 0 16px", color: "#1e293b", fontSize: 16 }}>Detailed Stock Overview</h3>
        <Table
          headers={["Zone", "Location", "Product", "Capacity", "Current Stock", "Available Space", "Utilization", "Last Updated"]}
          rows={data.warehouse.map(w => [
            <span style={{ fontWeight: 700, color: COLORS.blue }}>Zone {w.zone}</span>,
            w.location, w.product, w.capacity.toLocaleString(),
            <strong>{w.current.toLocaleString()}</strong>,
            (w.capacity - w.current).toLocaleString(),
            <ProgressBar value={w.current} max={w.capacity} />,
            w.lastUpdated
          ])}
          color={COLORS.teal}
        />
      </div>
    </div>
  );

  const renderExpenses = () => {
    const byCategory = data.expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {});
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <h2 style={{ margin: 0, color: "#1e293b" }}>Expense Management</h2>
            <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 13 }}>Total: {f(totalExpenses)} this month</p>
          </div>
          <button onClick={() => openModal("expense")} style={{
            background: COLORS.red, color: "#fff", border: "none", borderRadius: 12,
            padding: "10px 20px", fontWeight: 700, cursor: "pointer", fontSize: 13
          }}>+ Add Expense</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 20 }}>
          {Object.entries(byCategory).map(([cat, amt]) => (
            <div key={cat} style={{ background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", textAlign: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.red }}>{f(amt)}</div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>{cat}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
          <Table
            headers={["#", "Date", "Category", "Description", "Vendor", "Amount"]}
            rows={data.expenses.map(e => [e.id, e.date, e.category, e.description, e.vendor, <strong style={{ color: COLORS.red }}>{f(e.amount)}</strong>])}
            color={COLORS.red}
          />
        </div>
      </div>
    );
  };

  const renderPurchases = () => (
    <div>
      <h2 style={{ margin: "0 0 20px", color: "#1e293b" }}>Purchase Management</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
        {statCard("Total Purchases", f(data.purchases.reduce((s, p) => s + p.total, 0)), `${data.purchases.length} orders`, COLORS.indigo, "🛒")}
        {statCard("Received", `${data.purchases.filter(p => p.status === "Received").length}`, "Orders confirmed", COLORS.green, "✅")}
        {statCard("Pending", `${data.purchases.filter(p => p.status === "Pending").length}`, "Awaiting delivery", COLORS.amber, "🚚")}
      </div>
      <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
        <Table
          headers={["#", "Date", "Vendor", "Item", "Qty", "Unit Cost", "Total", "Status"]}
          rows={data.purchases.map(p => [p.id, p.date, p.vendor, p.item, p.qty.toLocaleString(), f(p.unitCost), <strong>{f(p.total)}</strong>, <Badge status={p.status} />])}
          color={COLORS.indigo}
        />
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div>
      <h2 style={{ margin: "0 0 20px", color: "#1e293b" }}>Customer Management</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 20 }}>
        {data.customers.map(c => (
          <div key={c.id} style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", borderTop: `3px solid ${COLORS.purple}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <div style={{ fontWeight: 700, color: "#1e293b", fontSize: 15 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>{c.type}</div>
              </div>
              <span style={{ background: COLORS.purple + "18", color: COLORS.purple, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>{c.type}</span>
            </div>
            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>📞 {c.phone}</div>
            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 12 }}>✉️ {c.email}</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.blue }}>{f(c.totalPurchased)}</div>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>Total Bought</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: c.credit > 0 ? COLORS.red : COLORS.green }}>{f(c.credit)}</div>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>Outstanding</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReports = () => {
    const grossProfit = totalRevenue - data.purchases.reduce((s, p) => s + p.total, 0);
    const netProfit = totalRevenue - totalExpenses;
    return (
      <div>
        <h2 style={{ margin: "0 0 20px", color: "#1e293b" }}>Reports & Analytics</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 24 }}>
          {statCard("Gross Revenue", f(totalRevenue), "Feb 2026", COLORS.blue, "📈")}
          {statCard("Gross Profit", f(grossProfit), "After COGS", COLORS.teal, "💹")}
          {statCard("Operating Expenses", f(totalExpenses), "Feb 2026", COLORS.red, "💸")}
          {statCard("Net Profit", f(netProfit), `${Math.round((netProfit / totalRevenue) * 100)}% margin`, COLORS.green, "🏆")}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
            <h3 style={{ margin: "0 0 16px", color: "#1e293b", fontSize: 16 }}>📊 P&L Summary</h3>
            {[
              ["Revenue", f(totalRevenue), COLORS.blue],
              ["Cost of Goods Sold", f(data.purchases.reduce((s, p) => s + p.total, 0)), COLORS.red],
              ["Gross Profit", f(grossProfit), COLORS.teal],
              ["Operating Expenses", f(totalExpenses - data.purchases.reduce((s, p) => s + p.total, 0)), COLORS.amber],
              ["Net Profit", f(netProfit), COLORS.green],
            ].map(([label, value, color]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f1f5f9" }}>
                <span style={{ fontSize: 13, color: "#475569", fontWeight: 600 }}>{label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color }}>{value}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
            <h3 style={{ margin: "0 0 16px", color: "#1e293b", fontSize: 16 }}>🏆 Top Products by Revenue</h3>
            {data.products.map(p => {
              const rev = data.sales.filter(s => s.product === p.name).reduce((a, s) => a + s.total, 0);
              return (
                <div key={p.id} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 13, color: "#334155", fontWeight: 600 }}>{p.name}</span>
                    <span style={{ fontSize: 12, color: COLORS.blue, fontWeight: 700 }}>{f(rev)}</span>
                  </div>
                  <ProgressBar value={rev} max={totalRevenue || 1} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const content = {
    Dashboard: renderDashboard,
    Sales: renderSales,
    Products: renderProducts,
    Warehouse: renderWarehouse,
    Expenses: renderExpenses,
    Purchases: renderPurchases,
    Customers: renderCustomers,
    Reports: renderReports,
  };

  const tabIcons = {
    Dashboard: "🏠", Sales: "🧾", Products: "🍶", Warehouse: "🏭",
    Expenses: "💸", Purchases: "🛒", Customers: "👥", Reports: "📊"
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f0f7ff", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)",
        padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 64, boxShadow: "0 4px 20px rgba(0,0,0,0.15)", position: "sticky", top: 0, zIndex: 100
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 40, height: 40, background: "rgba(255,255,255,0.15)", borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20
          }}>💧</div>
          <div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 16, letterSpacing: "-0.3px" }}>AquaFlow Pro</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>Packaged Water Management System</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>📅 Feb 26, 2026</div>
          <div style={{
            width: 36, height: 36, background: "rgba(255,255,255,0.2)", borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16
          }}>👤</div>
        </div>
      </div>

      {/* Nav */}
      <div style={{
        background: "#fff", padding: "0 24px", display: "flex", gap: 4,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)", overflowX: "auto"
      }}>
        {nav.map(n => (
          <button key={n} onClick={() => setTab(n)} style={{
            border: "none", background: "transparent", padding: "14px 16px",
            cursor: "pointer", fontWeight: tab === n ? 700 : 500,
            color: tab === n ? COLORS.blue : "#64748b",
            borderBottom: tab === n ? `2.5px solid ${COLORS.blue}` : "2.5px solid transparent",
            fontSize: 13, display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap",
            transition: "all 0.2s"
          }}>
            <span>{tabIcons[n]}</span>{n}
          </button>
        ))}
      </div>

      {/* Main */}
      <div style={{ padding: 24, maxWidth: 1280, margin: "0 auto" }}>
        {content[tab]?.()}
      </div>

      {/* Modals */}
      {modal === "sale" && (
        <Modal title="New Sale Order" onClose={() => setModal(null)}>
          <Input label="Customer Name" placeholder="Enter customer name" onChange={e => setForm(f => ({ ...f, customer: e.target.value }))} />
          <Select label="Product" options={data.products.map(p => p.name)} onChange={e => setForm(f => ({ ...f, product: e.target.value }))} />
          <Input label="Quantity" type="number" placeholder="Enter quantity" onChange={e => setForm(f => ({ ...f, qty: e.target.value }))} />
          {form.product && form.qty && (
            <div style={{ background: "#f0fdf4", borderRadius: 10, padding: 12, marginBottom: 16, fontSize: 13 }}>
              <strong>Total: {f(parseInt(form.qty || 0) * (data.products.find(p => p.name === form.product)?.sellPrice || 0))}</strong>
            </div>
          )}
          <button onClick={handleAddSale} style={{
            width: "100%", background: COLORS.blue, color: "#fff", border: "none",
            borderRadius: 10, padding: "12px", fontWeight: 700, cursor: "pointer", fontSize: 14
          }}>Create Sale Order</button>
        </Modal>
      )}

      {modal === "expense" && (
        <Modal title="Add Expense" onClose={() => setModal(null)}>
          <Select label="Category" options={["Raw Material", "Utilities", "Salaries", "Logistics", "Maintenance", "Marketing", "Other"]} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
          <Input label="Description" placeholder="Description" onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          <Input label="Vendor / Party" placeholder="Vendor name" onChange={e => setForm(f => ({ ...f, vendor: e.target.value }))} />
          <Input label="Amount (₹)" type="number" placeholder="Enter amount" onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} />
          <button onClick={handleAddExpense} style={{
            width: "100%", background: COLORS.red, color: "#fff", border: "none",
            borderRadius: 10, padding: "12px", fontWeight: 700, cursor: "pointer", fontSize: 14
          }}>Add Expense</button>
        </Modal>
      )}

      {modal === "product" && (
        <Modal title="Add New Product" onClose={() => setModal(null)}>
          <Input label="Product Name" placeholder="e.g. 500ml Pure Water" onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          <Select label="Category" options={["500ml", "1L", "2L", "5L", "20L", "Other"]} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
          <Input label="Buy Price (₹)" type="number" onChange={e => setForm(f => ({ ...f, buyPrice: e.target.value }))} />
          <Input label="Sell Price (₹)" type="number" onChange={e => setForm(f => ({ ...f, sellPrice: e.target.value }))} />
          <Input label="Opening Stock" type="number" onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} />
          <button onClick={handleAddProduct} style={{
            width: "100%", background: COLORS.teal, color: "#fff", border: "none",
            borderRadius: 10, padding: "12px", fontWeight: 700, cursor: "pointer", fontSize: 14
          }}>Add Product</button>
        </Modal>
      )}
    </div>
  );
}