import { useState, useRef } from "react";

// ─── INITIAL DATA ────────────────────────────────────────────────────────────
const initData = {
  products: [
    { id: 1, name: "500ml Pure Water", sku: "WB-500", buyPrice: 4, sellPrice: 10, stock: 1200, hsn: "2201", gst: 12, category: "500ml" },
    { id: 2, name: "1L Pure Water", sku: "WB-1000", buyPrice: 7, sellPrice: 18, stock: 800, hsn: "2201", gst: 12, category: "1L" },
    { id: 3, name: "2L Pure Water", sku: "WB-2000", buyPrice: 12, sellPrice: 28, stock: 450, hsn: "2201", gst: 12, category: "2L" },
    { id: 4, name: "5L Gallon Water", sku: "WB-5000", buyPrice: 20, sellPrice: 45, stock: 300, hsn: "2201", gst: 12, category: "5L" },
    { id: 5, name: "20L Dispenser", sku: "WB-20000", buyPrice: 55, sellPrice: 120, stock: 150, hsn: "2201", gst: 18, category: "20L" },
  ],
  customers: [
    { id: 1, name: "Metro Mart", phone: "9800111111", email: "metro@mart.com", address: "12, MG Road, Delhi", gstin: "07AABCU9603R1ZP", type: "Retail", state: "Delhi", credit: 0, totalPurchased: 50000 },
    { id: 2, name: "Sunshine Hotel", phone: "9800222222", email: "sunshine@hotel.com", address: "45, Connaught Place, Delhi", gstin: "07AADCH1234R1ZK", type: "Hotel", state: "Delhi", credit: 5000, totalPurchased: 32000 },
    { id: 3, name: "City Office", phone: "9800333333", email: "admin@cityoffice.com", address: "Sector 18, Noida, UP", gstin: "09AABCU9603R1ZQ", type: "Corporate", state: "Uttar Pradesh", credit: 3600, totalPurchased: 18000 },
    { id: 4, name: "Fresh Foods", phone: "9800444444", email: "fresh@foods.com", address: "23, Lajpat Nagar, Delhi", gstin: "07AACCE1234F1ZL", type: "Retail", state: "Delhi", credit: 0, totalPurchased: 22000 },
    { id: 5, name: "BlueStar Corp", phone: "9800555555", email: "purchase@bluestar.com", address: "Plot 5, Gurugram, Haryana", gstin: "06AABCU9603R1ZR", type: "Corporate", state: "Haryana", credit: 2250, totalPurchased: 15000 },
  ],
  vendors: [
    { id: 1, name: "PolyPack Ltd", phone: "9900111111", email: "sales@polypack.com", address: "Industrial Area, Faridabad", gstin: "06AABCP1234R1ZM", category: "Raw Material", state: "Haryana", balance: 0 },
    { id: 2, name: "CapMakers", phone: "9900222222", email: "info@capmakers.com", address: "Noida Phase 2, UP", gstin: "09AABCC1234R1ZN", category: "Raw Material", state: "Uttar Pradesh", balance: 5000 },
    { id: 3, name: "LabelPrint", phone: "9900333333", email: "orders@labelprint.com", address: "Okhla, Delhi", gstin: "07AABCL1234R1ZO", category: "Packaging", state: "Delhi", balance: 6400 },
    { id: 4, name: "Utility Board", phone: "9900444444", email: "billing@utility.gov", address: "Civil Lines, Delhi", gstin: "", category: "Utilities", state: "Delhi", balance: 0 },
    { id: 5, name: "FuelStation", phone: "9900555555", email: "fleet@fuel.com", address: "NH-8, Gurugram", gstin: "06AABCF1234R1ZP", category: "Logistics", state: "Haryana", balance: 0 },
  ],
  invoices: [
    { id: "INV-001", date: "2026-02-20", customerId: 1, items: [{ productId: 1, qty: 200, rate: 10 }], status: "Paid", notes: "" },
    { id: "INV-002", date: "2026-02-21", customerId: 2, items: [{ productId: 2, qty: 100, rate: 18 }], status: "Paid", notes: "" },
    { id: "INV-003", date: "2026-02-22", customerId: 3, items: [{ productId: 5, qty: 30, rate: 120 }], status: "Unpaid", notes: "Net 30 days" },
    { id: "INV-004", date: "2026-02-23", customerId: 4, items: [{ productId: 3, qty: 150, rate: 28 }], status: "Paid", notes: "" },
    { id: "INV-005", date: "2026-02-24", customerId: 5, items: [{ productId: 4, qty: 50, rate: 45 }], status: "Unpaid", notes: "" },
  ],
  expenses: [
    { id: 1, date: "2026-02-01", category: "Raw Material", description: "Empty bottles & caps", amount: 25000, vendorId: 1 },
    { id: 2, date: "2026-02-05", category: "Utilities", description: "Water purification & electricity", amount: 12000, vendorId: 4 },
    { id: 3, date: "2026-02-10", category: "Salaries", description: "Staff salaries Feb", amount: 35000, vendorId: null },
    { id: 4, date: "2026-02-15", category: "Logistics", description: "Delivery trucks fuel", amount: 8000, vendorId: 5 },
    { id: 5, date: "2026-02-18", category: "Maintenance", description: "Plant maintenance", amount: 5500, vendorId: null },
    { id: 6, date: "2026-02-22", category: "Marketing", description: "Promotional flyers", amount: 3000, vendorId: null },
  ],
  warehouse: [
    { id: 1, zone: "A", productId: 1, capacity: 2000, current: 1200, location: "A-01", lastUpdated: "2026-02-25" },
    { id: 2, zone: "A", productId: 2, capacity: 1500, current: 800, location: "A-02", lastUpdated: "2026-02-25" },
    { id: 3, zone: "B", productId: 3, capacity: 1000, current: 450, location: "B-01", lastUpdated: "2026-02-24" },
    { id: 4, zone: "B", productId: 4, capacity: 600, current: 300, location: "B-02", lastUpdated: "2026-02-24" },
    { id: 5, zone: "C", productId: 5, capacity: 300, current: 150, location: "C-01", lastUpdated: "2026-02-23" },
  ],
  company: { name: "AquaFlow Pure Water Pvt. Ltd.", address: "Plot 12, Industrial Area, Phase-1, Delhi - 110001", phone: "9811000000", email: "info@aquaflow.in", gstin: "07AABCA1234R1ZV", state: "Delhi", bank: "HDFC Bank", account: "50100123456789", ifsc: "HDFC0001234" },
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const C = { blue: "#1d4ed8", teal: "#0d9488", green: "#16a34a", amber: "#d97706", red: "#dc2626", purple: "#7c3aed", slate: "#475569", indigo: "#4338ca" };
const f = n => "₹" + Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2 });
const today = () => new Date().toISOString().split("T")[0];
const validateGST = g => !g || /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(g.toUpperCase());
const nextInvId = invoices => { const nums = invoices.map(i => parseInt(i.id.split("-")[1])); return "INV-" + String(Math.max(...nums, 0) + 1).padStart(3, "0"); };

// Calculate invoice totals
const calcInvoice = (inv, products, company, customer) => {
  let subtotal = 0;
  const lines = inv.items.map(it => {
    const p = products.find(x => x.id === it.productId);
    const amount = it.qty * it.rate;
    subtotal += amount;
    const gstAmt = amount * (p?.gst || 18) / 100;
    return { ...it, product: p, amount, gstAmt, gstRate: p?.gst || 18 };
  });
  const sameState = company.state === customer?.state;
  const totalGst = lines.reduce((s, l) => s + l.gstAmt, 0);
  const cgst = sameState ? totalGst / 2 : 0;
  const sgst = sameState ? totalGst / 2 : 0;
  const igst = !sameState ? totalGst : 0;
  const total = subtotal + totalGst;
  return { lines, subtotal, cgst, sgst, igst, totalGst, total, sameState };
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────
const Badge = ({ s }) => {
  const map = { Paid: [C.green, "#f0fdf4"], Unpaid: [C.red, "#fef2f2"], Pending: [C.amber, "#fffbeb"], Received: [C.blue, "#eff6ff"], Overdue: [C.red, "#fef2f2"] };
  const [col, bg] = map[s] || [C.slate, "#f8fafc"];
  return <span style={{ background: bg, color: col, borderRadius: 20, padding: "3px 12px", fontSize: 11, fontWeight: 700, border: `1px solid ${col}30` }}>{s}</span>;
};

const Modal = ({ title, onClose, children, wide }) => (
  <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={onClose}>
    <div style={{ background: "#fff", borderRadius: 20, padding: 28, width: "100%", maxWidth: wide ? 800 : 520, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 25px 50px rgba(0,0,0,0.25)" }} onClick={e => e.stopPropagation()}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, borderBottom: "1px solid #e2e8f0", paddingBottom: 16 }}>
        <h3 style={{ margin: 0, color: "#0f172a", fontSize: 17, fontWeight: 700 }}>{title}</h3>
        <button onClick={onClose} style={{ border: "none", background: "#f1f5f9", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 18, color: "#64748b" }}>×</button>
      </div>
      {children}
    </div>
  </div>
);

const Field = ({ label, error, children }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#475569", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
    {children}
    {error && <div style={{ fontSize: 11, color: C.red, marginTop: 4 }}>⚠ {error}</div>}
  </div>
);

const inp = { width: "100%", padding: "9px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, color: "#1e293b", outline: "none", boxSizing: "border-box", background: "#fafafa", fontFamily: "inherit" };

const Inp = ({ label, error, ...p }) => <Field label={label} error={error}><input {...p} style={inp} /></Field>;
const Sel = ({ label, options, error, ...p }) => <Field label={label} error={error}><select {...p} style={inp}>{options.map(o => <option key={o.v || o} value={o.v || o}>{o.l || o}</option>)}</select></Field>;
const Txt = ({ label, ...p }) => <Field label={label}><textarea {...p} style={{ ...inp, minHeight: 70, resize: "vertical" }} /></Field>;

const Tbl = ({ cols, rows, empty = "No records found" }) => (
  <div style={{ overflowX: "auto", borderRadius: 10, border: "1px solid #e2e8f0" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead><tr style={{ background: "#f8fafc" }}>{cols.map((c, i) => <th key={i} style={{ padding: "11px 14px", textAlign: "left", color: "#64748b", fontWeight: 700, whiteSpace: "nowrap", borderBottom: "2px solid #e2e8f0", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>{c}</th>)}</tr></thead>
      <tbody>
        {rows.length === 0 ? <tr><td colSpan={cols.length} style={{ textAlign: "center", padding: 32, color: "#94a3b8" }}>{empty}</td></tr>
          : rows.map((r, i) => <tr key={i} style={{ borderBottom: "1px solid #f1f5f9", background: i % 2 ? "#fafafa" : "#fff" }}>{r.map((c, j) => <td key={j} style={{ padding: "10px 14px", color: "#334155", verticalAlign: "middle" }}>{c}</td>)}</tr>)}
      </tbody>
    </table>
  </div>
);

const Btn = ({ onClick, color = C.blue, children, sm, outline }) => (
  <button onClick={onClick} style={{ background: outline ? "transparent" : color, color: outline ? color : "#fff", border: `2px solid ${color}`, borderRadius: 8, padding: sm ? "5px 12px" : "8px 16px", fontWeight: 700, cursor: "pointer", fontSize: sm ? 12 : 13, fontFamily: "inherit" }}>{children}</button>
);

const SearchBar = ({ value, onChange, placeholder }) => (
  <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder || "Search..."} style={{ ...inp, maxWidth: 260, paddingLeft: 32, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.35-4.35'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "10px center" }} />
);

const StatCard = ({ label, value, sub, color, icon }) => (
  <div style={{ background: "#fff", borderRadius: 14, padding: "18px 20px", boxShadow: "0 1px 8px rgba(0,0,0,0.07)", borderLeft: `4px solid ${color}`, display: "flex", gap: 14, alignItems: "center" }}>
    <div style={{ width: 44, height: 44, borderRadius: 10, background: color + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{icon}</div>
    <div>
      <div style={{ fontSize: 20, fontWeight: 800, color: "#0f172a" }}>{value}</div>
      <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 11, color: color }}>{sub}</div>
    </div>
  </div>
);

// ─── INVOICE PRINT ───────────────────────────────────────────────────────────
const printInvoice = (inv, products, company, customer) => {
  const calc = calcInvoice(inv, products, company, customer);
  const html = `<!DOCTYPE html><html><head><title>Invoice ${inv.id}</title>
  <style>body{font-family:Arial,sans-serif;margin:0;padding:20px;font-size:13px;color:#1e293b}
  .header{display:flex;justify-content:space-between;border-bottom:3px solid #1d4ed8;padding-bottom:16px;margin-bottom:20px}
  .company h1{font-size:22px;color:#1d4ed8;margin:0 0 4px}
  .inv-title{text-align:right}.inv-title h2{font-size:28px;color:#1d4ed8;margin:0}
  .parties{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px}
  .party{background:#f8fafc;padding:12px;border-radius:8px;border-left:3px solid #1d4ed8}
  .party h4{margin:0 0 8px;color:#1d4ed8;font-size:12px;text-transform:uppercase}
  table{width:100%;border-collapse:collapse;margin-bottom:16px}
  th{background:#1d4ed8;color:white;padding:10px;text-align:left;font-size:12px}
  td{padding:9px 10px;border-bottom:1px solid #e2e8f0}
  .totals{float:right;width:300px}.totals table td{padding:6px 10px}
  .total-row td{font-weight:bold;background:#f8fafc;font-size:15px}
  .gst-row td{color:#1d4ed8}.footer{margin-top:40px;border-top:1px solid #e2e8f0;padding-top:12px;font-size:11px;color:#64748b}
  @media print{body{padding:0}}</style></head><body>
  <div class="header">
    <div class="company"><h1>💧 ${company.name}</h1><div>${company.address}</div><div>Ph: ${company.phone} | ${company.email}</div><div><b>GSTIN:</b> ${company.gstin}</div></div>
    <div class="inv-title"><h2>TAX INVOICE</h2><div><b>Invoice #:</b> ${inv.id}</div><div><b>Date:</b> ${inv.date}</div><div><b>Due:</b> ${inv.status === "Paid" ? "✅ PAID" : "On Receipt"}</div></div>
  </div>
  <div class="parties">
    <div class="party"><h4>Bill To</h4><b>${customer?.name}</b><br>${customer?.address}<br>Ph: ${customer?.phone}<br>GSTIN: ${customer?.gstin || "N/A"}</div>
    <div class="party"><h4>Bank Details</h4><b>${company.bank}</b><br>A/C: ${company.account}<br>IFSC: ${company.ifsc}<br>State: ${company.state}</div>
  </div>
  <table><thead><tr><th>#</th><th>Product</th><th>HSN</th><th>Qty</th><th>Rate</th><th>Amount</th><th>GST%</th><th>GST Amt</th><th>Total</th></tr></thead>
  <tbody>${calc.lines.map((l, i) => `<tr><td>${i + 1}</td><td>${l.product?.name}</td><td>${l.product?.hsn}</td><td>${l.qty}</td><td>${f(l.rate)}</td><td>${f(l.amount)}</td><td>${l.gstRate}%</td><td>${f(l.gstAmt)}</td><td>${f(l.amount + l.gstAmt)}</td></tr>`).join("")}</tbody></table>
  <div class="totals"><table>
    <tr><td>Subtotal</td><td style="text-align:right">${f(calc.subtotal)}</td></tr>
    ${calc.sameState ? `<tr class="gst-row"><td>CGST</td><td style="text-align:right">${f(calc.cgst)}</td></tr><tr class="gst-row"><td>SGST</td><td style="text-align:right">${f(calc.sgst)}</td></tr>` : `<tr class="gst-row"><td>IGST</td><td style="text-align:right">${f(calc.igst)}</td></tr>`}
    <tr class="total-row"><td><b>TOTAL</b></td><td style="text-align:right"><b>${f(calc.total)}</b></td></tr>
  </table></div>
  <div style="clear:both"></div>
  ${inv.notes ? `<div style="margin-top:16px;background:#fffbeb;padding:10px;border-radius:6px"><b>Notes:</b> ${inv.notes}</div>` : ""}
  <div class="footer"><b>Terms:</b> Payment due on receipt. This is a computer generated invoice.<br><b>${company.name}</b> — Authorized Signatory</div>
  </body></html>`;
  const w = window.open("", "_blank");
  w.document.write(html);
  w.document.close();
  w.print();
};

// ─── CSV EXPORT ──────────────────────────────────────────────────────────────
const downloadCSV = (data, filename) => {
  const csv = data.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = filename; a.click();
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("Dashboard");
  const [data, setData] = useState(initData);
  const [modal, setModal] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const [viewInv, setViewInv] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };
  const setF = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const openModal = (type, item = null) => {
    setModal(type); setEditItem(item);
    setErrors({});
    if (item) setForm({ ...item });
    else {
      if (type === "invoice") setForm({ date: today(), items: [{ productId: data.products[0].id, qty: 1, rate: data.products[0].sellPrice }], status: "Unpaid", notes: "", customerId: data.customers[0].id });
      else setForm({});
    }
  };

  // ── INVOICE CALC ──
  const invCalc = viewInv ? calcInvoice(viewInv, data.products, data.company, data.customers.find(c => c.id === viewInv.customerId)) : null;

  // ── INVOICE ITEMS ──
  const addInvItem = () => setF("items", [...(form.items || []), { productId: data.products[0].id, qty: 1, rate: data.products[0].sellPrice }]);
  const removeInvItem = i => setF("items", form.items.filter((_, idx) => idx !== i));
  const updateInvItem = (i, k, v) => {
    const items = [...form.items];
    items[i] = { ...items[i], [k]: k === "productId" ? parseInt(v) : parseFloat(v) || 0 };
    if (k === "productId") { const p = data.products.find(x => x.id === items[i].productId); if (p) items[i].rate = p.sellPrice; }
    setF("items", items);
  };

  // ── SAVE CUSTOMER ──
  const saveCustomer = () => {
    const e = {};
    if (!form.name) e.name = "Required";
    if (!form.phone) e.phone = "Required";
    if (form.gstin && !validateGST(form.gstin)) e.gstin = "Invalid GSTIN format (e.g. 07AABCU9603R1ZP)";
    if (Object.keys(e).length) { setErrors(e); return; }
    if (editItem) setData(d => ({ ...d, customers: d.customers.map(c => c.id === editItem.id ? { ...form, id: editItem.id } : c) }));
    else setData(d => ({ ...d, customers: [...d.customers, { ...form, id: Date.now(), credit: 0, totalPurchased: 0 }] }));
    setModal(null); showToast(editItem ? "Customer updated!" : "Customer added!");
  };

  // ── SAVE VENDOR ──
  const saveVendor = () => {
    const e = {};
    if (!form.name) e.name = "Required";
    if (form.gstin && !validateGST(form.gstin)) e.gstin = "Invalid GSTIN format";
    if (Object.keys(e).length) { setErrors(e); return; }
    if (editItem) setData(d => ({ ...d, vendors: d.vendors.map(v => v.id === editItem.id ? { ...form, id: editItem.id } : v) }));
    else setData(d => ({ ...d, vendors: [...d.vendors, { ...form, id: Date.now(), balance: 0 }] }));
    setModal(null); showToast(editItem ? "Vendor updated!" : "Vendor added!");
  };

  // ── SAVE PRODUCT ──
  const saveProduct = () => {
    const e = {};
    if (!form.name) e.name = "Required";
    if (!form.sellPrice) e.sellPrice = "Required";
    if (Object.keys(e).length) { setErrors(e); return; }
    const prod = { ...form, id: editItem?.id || Date.now(), buyPrice: parseFloat(form.buyPrice) || 0, sellPrice: parseFloat(form.sellPrice), stock: parseInt(form.stock) || 0, gst: parseInt(form.gst) || 18 };
    if (editItem) setData(d => ({ ...d, products: d.products.map(p => p.id === editItem.id ? prod : p) }));
    else setData(d => ({ ...d, products: [...d.products, prod] }));
    setModal(null); showToast(editItem ? "Product updated!" : "Product added!");
  };

  // ── SAVE INVOICE ──
  const saveInvoice = () => {
    if (!form.customerId || !form.items?.length) { showToast("Select customer and add items", "error"); return; }
    const inv = { ...form, id: editItem?.id || nextInvId(data.invoices), customerId: parseInt(form.customerId) };
    if (editItem) setData(d => ({ ...d, invoices: d.invoices.map(i => i.id === editItem.id ? inv : i) }));
    else setData(d => ({ ...d, invoices: [inv, ...d.invoices] }));
    setModal(null); showToast("Invoice saved!");
  };

  // ── SAVE EXPENSE ──
  const saveExpense = () => {
    if (!form.description || !form.amount) { showToast("Fill required fields", "error"); return; }
    const exp = { ...form, id: editItem?.id || Date.now(), amount: parseFloat(form.amount), vendorId: form.vendorId ? parseInt(form.vendorId) : null };
    if (editItem) setData(d => ({ ...d, expenses: d.expenses.map(e => e.id === editItem.id ? exp : e) }));
    else setData(d => ({ ...d, expenses: [exp, ...d.expenses] }));
    setModal(null); showToast("Expense saved!");
  };

  const deleteItem = (type, id) => { if (!window.confirm("Delete this record?")) return; setData(d => ({ ...d, [type]: d[type].filter(x => x.id !== id) })); showToast("Deleted!"); };

  // ── TOTALS ──
  const totalRev = data.invoices.reduce((s, inv) => { const c = calcInvoice(inv, data.products, data.company, data.customers.find(x => x.id === inv.customerId)); return s + c.total; }, 0);
  const totalExp = data.expenses.reduce((s, e) => s + e.amount, 0);
  const unpaidAmt = data.invoices.filter(i => i.status === "Unpaid").reduce((s, inv) => { const c = calcInvoice(inv, data.products, data.company, data.customers.find(x => x.id === inv.customerId)); return s + c.total; }, 0);

  const TABS = ["Dashboard", "Invoices", "Sales", "Products", "Warehouse", "Expenses", "Customers", "Vendors", "Reports"];
  const ICONS = { Dashboard: "🏠", Invoices: "🧾", Sales: "💰", Products: "🍶", Warehouse: "🏭", Expenses: "💸", Customers: "👥", Vendors: "🏪", Reports: "📊" };

  const filtered = (arr, keys) => arr.filter(item => keys.some(k => String(item[k] || "").toLowerCase().includes(search.toLowerCase())));

  // ════════════════════════════════════════════════════════════════════════════
  // RENDERS
  // ════════════════════════════════════════════════════════════════════════════

  const renderDash = () => (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14, marginBottom: 24 }}>
        <StatCard label="Total Revenue" value={f(totalRev)} sub="All invoices" color={C.blue} icon="💰" />
        <StatCard label="Unpaid Invoices" value={f(unpaidAmt)} sub={`${data.invoices.filter(i => i.status === "Unpaid").length} pending`} color={C.red} icon="⏳" />
        <StatCard label="Net Profit" value={f(totalRev - totalExp)} sub={`${Math.round(((totalRev - totalExp) / (totalRev || 1)) * 100)}% margin`} color={C.green} icon="📈" />
        <StatCard label="Total Expenses" value={f(totalExp)} sub="This month" color={C.amber} icon="📊" />
        <StatCard label="Customers" value={data.customers.length} sub="Active accounts" color={C.purple} icon="👥" />
        <StatCard label="Vendors" value={data.vendors.length} sub="Suppliers" color={C.teal} icon="🏪" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <div style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 1px 8px rgba(0,0,0,0.07)" }}>
          <h3 style={{ margin: "0 0 14px", fontSize: 15, color: "#0f172a" }}>🧾 Recent Invoices</h3>
          <Tbl cols={["Invoice", "Customer", "Amount", "Status"]} rows={data.invoices.slice(0, 5).map(inv => {
            const c = calcInvoice(inv, data.products, data.company, data.customers.find(x => x.id === inv.customerId));
            return [inv.id, data.customers.find(x => x.id === inv.customerId)?.name, f(c.total), <Badge s={inv.status} />];
          })} />
        </div>
        <div style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 1px 8px rgba(0,0,0,0.07)" }}>
          <h3 style={{ margin: "0 0 14px", fontSize: 15, color: "#0f172a" }}>📦 Stock Levels</h3>
          {data.warehouse.map(w => {
            const p = data.products.find(x => x.id === w.productId);
            const pct = Math.round(w.current / w.capacity * 100);
            const col = pct > 60 ? C.green : pct > 30 ? C.amber : C.red;
            return (
              <div key={w.id} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#334155" }}>{p?.name}</span>
                  <span style={{ fontSize: 11, color: "#64748b" }}>{w.current}/{w.capacity}</span>
                </div>
                <div style={{ height: 7, background: "#e2e8f0", borderRadius: 4 }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: col, borderRadius: 4 }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderInvoices = () => {
    const invs = data.invoices.filter(inv => {
      const c = data.customers.find(x => x.id === inv.customerId);
      return !search || inv.id.toLowerCase().includes(search.toLowerCase()) || c?.name.toLowerCase().includes(search.toLowerCase());
    });
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
          <div><h2 style={{ margin: 0, color: "#0f172a" }}>Invoice Management</h2><p style={{ margin: "3px 0 0", color: "#64748b", fontSize: 13 }}>{data.invoices.length} invoices • {f(totalRev)} total</p></div>
          <div style={{ display: "flex", gap: 10 }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Search invoices..." />
            <Btn onClick={() => openModal("invoice")}>+ New Invoice</Btn>
          </div>
        </div>
        <div style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 1px 8px rgba(0,0,0,0.07)" }}>
          <Tbl cols={["Invoice #", "Date", "Customer", "GSTIN", "Subtotal", "GST", "Total", "Status", "Actions"]}
            rows={invs.map(inv => {
              const cust = data.customers.find(x => x.id === inv.customerId);
              const c = calcInvoice(inv, data.products, data.company, cust);
              return [
                <b style={{ color: C.blue }}>{inv.id}</b>, inv.date, cust?.name,
                <code style={{ fontSize: 11, background: "#f1f5f9", padding: "2px 6px", borderRadius: 4 }}>{cust?.gstin || "—"}</code>,
                f(c.subtotal), f(c.totalGst), <b>{f(c.total)}</b>, <Badge s={inv.status} />,
                <div style={{ display: "flex", gap: 6 }}>
                  <Btn sm onClick={() => setViewInv(inv)}>View</Btn>
                  <Btn sm onClick={() => printInvoice(inv, data.products, data.company, cust)}>🖨 Print</Btn>
                  <Btn sm outline color={C.blue} onClick={() => openModal("invoice", inv)}>Edit</Btn>
                  <Btn sm outline color={C.red} onClick={() => deleteItem("invoices", inv.id)}>Del</Btn>
                </div>
              ];
            })} />
        </div>
      </div>
    );
  };

  const renderCustomers = () => {
    const custs = filtered(data.customers, ["name", "phone", "email", "gstin", "type"]);
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
          <div><h2 style={{ margin: 0, color: "#0f172a" }}>Customer Management</h2><p style={{ margin: "3px 0 0", color: "#64748b", fontSize: 13 }}>{data.customers.length} customers registered</p></div>
          <div style={{ display: "flex", gap: 10 }}>
            <SearchBar value={search} onChange={setSearch} />
            <Btn onClick={() => openModal("customer")}>+ Add Customer</Btn>
          </div>
        </div>
        <div style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 1px 8px rgba(0,0,0,0.07)" }}>
          <Tbl cols={["Name", "Phone", "Email", "GSTIN", "GST Valid", "Type", "State", "Outstanding", "Actions"]}
            rows={custs.map(c => [
              <b>{c.name}</b>, c.phone, c.email,
              <code style={{ fontSize: 11, background: "#f1f5f9", padding: "2px 6px", borderRadius: 4 }}>{c.gstin || "—"}</code>,
              c.gstin ? (validateGST(c.gstin) ? <span style={{ color: C.green }}>✅ Valid</span> : <span style={{ color: C.red }}>❌ Invalid</span>) : "—",
              c.type, c.state,
              <span style={{ color: c.credit > 0 ? C.red : C.green, fontWeight: 700 }}>{f(c.credit)}</span>,
              <div style={{ display: "flex", gap: 6 }}>
                <Btn sm outline color={C.blue} onClick={() => openModal("customer", c)}>Edit</Btn>
                <Btn sm outline color={C.red} onClick={() => deleteItem("customers", c.id)}>Del</Btn>
              </div>
            ])} />
        </div>
      </div>
    );
  };

  const renderVendors = () => {
    const vends = filtered(data.vendors, ["name", "phone", "email", "gstin", "category"]);
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
          <div><h2 style={{ margin: 0, color: "#0f172a" }}>Vendor Management</h2><p style={{ margin: "3px 0 0", color: "#64748b", fontSize: 13 }}>{data.vendors.length} vendors registered</p></div>
          <div style={{ display: "flex", gap: 10 }}>
            <SearchBar value={search} onChange={setSearch} />
            <Btn onClick={() => openModal("vendor")}>+ Add Vendor</Btn>
          </div>
        </div>
        <div style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 1px 8px rgba(0,0,0,0.07)" }}>
          <Tbl cols={["Name", "Phone", "Email", "GSTIN", "GST Valid", "Category", "State", "Balance", "Actions"]}
            rows={vends.map(v => [
              <b>{v.name}</b>, v.phone, v.email,
              <code style={{ fontSize: 11, background: "#f1f5f9", padding: "2px 6px", borderRadius: 4 }}>{v.gstin || "—"}</code>,
              v.gstin ? (validateGST(v.gstin) ? <span style={{ color: C.green }}>✅ Valid</span> : <span style={{ color: C.red }}>❌ Invalid</span>) : "—",
              v.category, v.state,
              <span style={{ color: v.balance > 0 ? C.amber : C.green, fontWeight: 700 }}>{f(v.balance)}</span>,
              <div style={{ display: "flex", gap: 6 }}>
                <Btn sm outline color={C.blue} onClick={() => openModal("vendor", v)}>Edit</Btn>
                <Btn sm outline color={C.red} onClick={() => deleteItem("vendors", v.id)}>Del</Btn>
              </div>
            ])} />
        </div>
      </div>
    );
  };

  const renderProducts = () => {
    const prods = filtered(data.products, ["name", "sku", "category"]);
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
          <div><h2 style={{ margin: 0, color: "#0f172a" }}>Product Catalog</h2><p style={{ margin: "3px 0 0", color: "#64748b", fontSize: 13 }}>{data.products.length} SKUs</p></div>
          <div style={{ display: "flex", gap: 10 }}>
            <SearchBar value={search} onChange={setSearch} />
            <Btn onClick={() => openModal("product")}>+ Add Product</Btn>
          </div>
        </div>
        <div style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 1px 8px rgba(0,0,0,0.07)" }}>
          <Tbl cols={["SKU", "Name", "HSN", "Buy ₹", "Sell ₹", "GST%", "Margin", "Stock", "Stock Value", "Actions"]}
            rows={prods.map(p => [
              <code style={{ fontSize: 11, background: "#eff6ff", color: C.blue, padding: "2px 7px", borderRadius: 4 }}>{p.sku}</code>,
              <b>{p.name}</b>, p.hsn || "—", f(p.buyPrice), f(p.sellPrice),
              <Badge s={`${p.gst}%`} />,
              <span style={{ color: C.green, fontWeight: 700 }}>{Math.round((p.sellPrice - p.buyPrice) / p.sellPrice * 100)}%</span>,
              <span style={{ color: p.stock < 200 ? C.red : C.green, fontWeight: 700 }}>{p.stock.toLocaleString()}</span>,
              f(p.sellPrice * p.stock),
              <div style={{ display: "flex", gap: 6 }}>
                <Btn sm outline color={C.blue} onClick={() => openModal("product", p)}>Edit</Btn>
                <Btn sm outline color={C.red} onClick={() => deleteItem("products", p.id)}>Del</Btn>
              </div>
            ])} />
        </div>
      </div>
    );
  };

  const renderExpenses = () => {
    const exps = filtered(data.expenses, ["category", "description"]);
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
          <div><h2 style={{ margin: 0, color: "#0f172a" }}>Expense Management</h2><p style={{ margin: "3px 0 0", color: "#64748b", fontSize: 13 }}>Total: {f(totalExp)}</p></div>
          <div style={{ display: "flex", gap: 10 }}>
            <SearchBar value={search} onChange={setSearch} />
            <Btn color={C.red} onClick={() => openModal("expense")}>+ Add Expense</Btn>
          </div>
        </div>
        <div style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 1px 8px rgba(0,0,0,0.07)" }}>
          <Tbl cols={["Date", "Category", "Description", "Vendor", "Amount", "Actions"]}
            rows={exps.map(e => [
              e.date, e.category, e.description,
              data.vendors.find(v => v.id === e.vendorId)?.name || "—",
              <b style={{ color: C.red }}>{f(e.amount)}</b>,
              <div style={{ display: "flex", gap: 6 }}>
                <Btn sm outline color={C.blue} onClick={() => openModal("expense", e)}>Edit</Btn>
                <Btn sm outline color={C.red} onClick={() => deleteItem("expenses", e.id)}>Del</Btn>
              </div>
            ])} />
        </div>
      </div>
    );
  };

  const renderWarehouse = () => (
    <div>
      <h2 style={{ margin: "0 0 18px", color: "#0f172a" }}>Warehouse Management</h2>
      <div style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 1px 8px rgba(0,0,0,0.07)" }}>
        <Tbl cols={["Zone", "Location", "Product", "HSN", "Capacity", "Current", "Available", "Utilization", "Last Updated"]}
          rows={data.warehouse.map(w => {
            const p = data.products.find(x => x.id === w.productId);
            const pct = Math.round(w.current / w.capacity * 100);
            const col = pct > 60 ? C.green : pct > 30 ? C.amber : C.red;
            return [
              <b style={{ color: C.blue }}>Zone {w.zone}</b>, w.location, p?.name, p?.hsn,
              w.capacity.toLocaleString(), <b>{w.current.toLocaleString()}</b>,
              (w.capacity - w.current).toLocaleString(),
              <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 120 }}>
                <div style={{ flex: 1, height: 8, background: "#e2e8f0", borderRadius: 4 }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: col, borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 12, color: col, fontWeight: 700, width: 35 }}>{pct}%</span>
              </div>,
              w.lastUpdated
            ];
          })} />
      </div>
    </div>
  );

  const renderSales = () => {
    const invRows = data.invoices.filter(i => i.status === "Paid");
    return (
      <div>
        <h2 style={{ margin: "0 0 18px", color: "#0f172a" }}>Sales Overview</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14, marginBottom: 20 }}>
          <StatCard label="Total Sales" value={f(totalRev)} sub={`${data.invoices.length} invoices`} color={C.blue} icon="💰" />
          <StatCard label="Collected" value={f(invRows.reduce((s, inv) => { const c = calcInvoice(inv, data.products, data.company, data.customers.find(x => x.id === inv.customerId)); return s + c.total; }, 0))} sub={`${invRows.length} paid`} color={C.green} icon="✅" />
          <StatCard label="Outstanding" value={f(unpaidAmt)} sub={`${data.invoices.filter(i => i.status === "Unpaid").length} unpaid`} color={C.red} icon="⏳" />
        </div>
        <div style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 1px 8px rgba(0,0,0,0.07)" }}>
          <Tbl cols={["Invoice", "Date", "Customer", "Products", "Subtotal", "GST", "Total", "Status"]}
            rows={data.invoices.map(inv => {
              const cust = data.customers.find(x => x.id === inv.customerId);
              const c = calcInvoice(inv, data.products, data.company, cust);
              return [inv.id, inv.date, cust?.name, inv.items.map(it => data.products.find(p => p.id === it.productId)?.name).join(", "), f(c.subtotal), f(c.totalGst), <b>{f(c.total)}</b>, <Badge s={inv.status} />];
            })} />
        </div>
      </div>
    );
  };

  const renderReports = () => {
    const grossProfit = totalRev - totalExp;
    const byCat = data.expenses.reduce((acc, e) => { acc[e.category] = (acc[e.category] || 0) + e.amount; return acc; }, {});
    const byProduct = data.products.map(p => {
      const rev = data.invoices.reduce((s, inv) => {
        const it = inv.items.find(i => i.productId === p.id);
        if (!it) return s;
        const c = calcInvoice(inv, data.products, data.company, data.customers.find(x => x.id === inv.customerId));
        const l = c.lines.find(l => l.productId === p.id);
        return s + (l?.amount + l?.gstAmt || 0);
      }, 0);
      return { ...p, revenue: rev };
    }).sort((a, b) => b.revenue - a.revenue);

    const exportPL = () => downloadCSV([
      ["P&L Report — AquaFlow Pro"],
      ["Item", "Amount"],
      ["Total Revenue", totalRev],
      ["Total Expenses", totalExp],
      ["Gross Profit", grossProfit],
      [], ["Expense Breakdown"],
      ...Object.entries(byCat).map(([k, v]) => [k, v]),
    ], "PL_Report.csv");

    const exportInvoices = () => downloadCSV([
      ["Invoice Report"],
      ["Invoice#", "Date", "Customer", "Subtotal", "GST", "Total", "Status"],
      ...data.invoices.map(inv => {
        const c = calcInvoice(inv, data.products, data.company, data.customers.find(x => x.id === inv.customerId));
        return [inv.id, inv.date, data.customers.find(x => x.id === inv.customerId)?.name, c.subtotal, c.totalGst, c.total, inv.status];
      })
    ], "Invoice_Report.csv");

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h2 style={{ margin: 0, color: "#0f172a" }}>Reports & Analytics</h2>
          <div style={{ display: "flex", gap: 10 }}>
            <Btn outline color={C.green} onClick={exportPL}>⬇ P&L CSV</Btn>
            <Btn outline color={C.blue} onClick={exportInvoices}>⬇ Invoices CSV</Btn>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14, marginBottom: 20 }}>
          <StatCard label="Gross Revenue" value={f(totalRev)} sub="All invoices" color={C.blue} icon="📈" />
          <StatCard label="Total Expenses" value={f(totalExp)} sub="All categories" color={C.red} icon="💸" />
          <StatCard label="Net Profit" value={f(grossProfit)} sub={`${Math.round(grossProfit / (totalRev || 1) * 100)}% margin`} color={C.green} icon="🏆" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 1px 8px rgba(0,0,0,0.07)" }}>
            <h3 style={{ margin: "0 0 14px", fontSize: 15 }}>📊 P&L Summary</h3>
            {[["Total Revenue", f(totalRev), C.blue], ["Total Expenses", f(totalExp), C.red], ["Net Profit", f(grossProfit), C.green]].map(([l, v, col]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f1f5f9" }}>
                <span style={{ fontWeight: 600, color: "#475569", fontSize: 13 }}>{l}</span>
                <span style={{ fontWeight: 800, color: col, fontSize: 14 }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop: 16 }}><h4 style={{ fontSize: 13, color: "#64748b", marginBottom: 10 }}>Expense Breakdown</h4>
              {Object.entries(byCat).map(([cat, amt]) => (
                <div key={cat} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #f8fafc" }}>
                  <span style={{ fontSize: 13, color: "#475569" }}>{cat}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.red }}>{f(amt)}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 1px 8px rgba(0,0,0,0.07)" }}>
            <h3 style={{ margin: "0 0 14px", fontSize: 15 }}>🏆 Top Products by Revenue</h3>
            {byProduct.map(p => (
              <div key={p.id} style={{ marginBottom: 13 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>{p.name}</span>
                  <span style={{ fontSize: 12, color: C.blue, fontWeight: 700 }}>{f(p.revenue)}</span>
                </div>
                <div style={{ height: 7, background: "#e2e8f0", borderRadius: 4 }}>
                  <div style={{ height: "100%", width: `${Math.round(p.revenue / (byProduct[0].revenue || 1) * 100)}%`, background: C.blue, borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ── CONTENT MAP ──
  const pages = { Dashboard: renderDash, Invoices: renderInvoices, Sales: renderSales, Products: renderProducts, Warehouse: renderWarehouse, Expenses: renderExpenses, Customers: renderCustomers, Vendors: renderVendors, Reports: renderReports };

  // ════════════════════════════════════════════════════════════════════════════
  return (
    <div style={{ minHeight: "100vh", background: "#f0f4f8", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg,#0f172a,#1e3a5f)", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, position: "sticky", top: 0, zIndex: 200, boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, background: "#1d4ed8", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>💧</div>
          <div><div style={{ color: "#fff", fontWeight: 800, fontSize: 15 }}>AquaFlow Pro</div><div style={{ color: "#93c5fd", fontSize: 10 }}>Water Management System</div></div>
        </div>
        <div style={{ color: "#93c5fd", fontSize: 12 }}>GSTIN: {data.company.gstin} &nbsp;|&nbsp; {data.company.name}</div>
      </div>

      {/* NAV */}
      <div style={{ background: "#fff", padding: "0 20px", display: "flex", gap: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", overflowX: "auto" }}>
        {TABS.map(t => (
          <button key={t} onClick={() => { setTab(t); setSearch(""); }} style={{ border: "none", background: "transparent", padding: "13px 14px", cursor: "pointer", fontWeight: tab === t ? 700 : 500, color: tab === t ? C.blue : "#64748b", borderBottom: `2.5px solid ${tab === t ? C.blue : "transparent"}`, fontSize: 12, display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" }}>
            {ICONS[t]} {t}
          </button>
        ))}
      </div>

      {/* MAIN */}
      <div style={{ padding: 24, maxWidth: 1400, margin: "0 auto" }}>{pages[tab]?.()}</div>

      {/* TOAST */}
      {toast && <div style={{ position: "fixed", bottom: 24, right: 24, background: toast.type === "error" ? C.red : C.green, color: "#fff", padding: "12px 20px", borderRadius: 12, fontWeight: 700, fontSize: 13, boxShadow: "0 8px 24px rgba(0,0,0,0.2)", zIndex: 9999 }}>{toast.type === "error" ? "❌" : "✅"} {toast.msg}</div>}

      {/* ── VIEW INVOICE MODAL ── */}
      {viewInv && (() => {
        const cust = data.customers.find(c => c.id === viewInv.customerId);
        const c = calcInvoice(viewInv, data.products, data.company, cust);
        return (
          <Modal title={`Invoice ${viewInv.id}`} onClose={() => setViewInv(null)} wide>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div style={{ background: "#eff6ff", borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 11, color: "#64748b", fontWeight: 700, marginBottom: 6 }}>FROM</div>
                <div style={{ fontWeight: 700 }}>{data.company.name}</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>{data.company.address}</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>GSTIN: {data.company.gstin}</div>
              </div>
              <div style={{ background: "#f0fdf4", borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 11, color: "#64748b", fontWeight: 700, marginBottom: 6 }}>BILL TO</div>
                <div style={{ fontWeight: 700 }}>{cust?.name}</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>{cust?.address}</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>GSTIN: {cust?.gstin || "N/A"}</div>
              </div>
            </div>
            <Tbl cols={["Product", "HSN", "Qty", "Rate", "Amount", `GST ${c.sameState ? "(CGST+SGST)" : "(IGST)"}`, "Total"]}
              rows={c.lines.map(l => [l.product?.name, l.product?.hsn, l.qty, f(l.rate), f(l.amount), `${f(l.gstAmt)} (${l.gstRate}%)`, f(l.amount + l.gstAmt)])} />
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
              <div style={{ background: "#f8fafc", borderRadius: 10, padding: 16, minWidth: 260 }}>
                {[["Subtotal", f(c.subtotal)], c.sameState ? ["CGST", f(c.cgst)] : null, c.sameState ? ["SGST", f(c.sgst)] : null, !c.sameState ? ["IGST", f(c.igst)] : null].filter(Boolean).map(([l, v]) => (
                  <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #e2e8f0", fontSize: 13 }}>
                    <span style={{ color: "#64748b" }}>{l}</span><span style={{ color: C.blue, fontWeight: 700 }}>{v}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", fontSize: 16, fontWeight: 800 }}>
                  <span>TOTAL</span><span style={{ color: C.green }}>{f(c.total)}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
              <Badge s={viewInv.status} />
              <Btn onClick={() => printInvoice(viewInv, data.products, data.company, cust)}>🖨 Print / Download PDF</Btn>
            </div>
          </Modal>
        );
      })()}

      {/* ── INVOICE FORM MODAL ── */}
      {modal === "invoice" && (
        <Modal title={editItem ? "Edit Invoice" : "Create New Invoice"} onClose={() => setModal(null)} wide>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
            <Field label="Customer">
              <select value={form.customerId || ""} onChange={e => setF("customerId", parseInt(e.target.value))} style={inp}>
                {data.customers.map(c => <option key={c.id} value={c.id}>{c.name} ({c.gstin || "No GSTIN"})</option>)}
              </select>
            </Field>
            <Inp label="Date" type="date" value={form.date || today()} onChange={e => setF("date", e.target.value)} />
            <Field label="Status">
              <select value={form.status || "Unpaid"} onChange={e => setF("status", e.target.value)} style={inp}>
                {["Unpaid", "Paid"].map(s => <option key={s}>{s}</option>)}
              </select>
            </Field>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: "#475569", textTransform: "uppercase" }}>Line Items</label>
              <Btn sm onClick={addInvItem}>+ Add Item</Btn>
            </div>
            <div style={{ border: "1px solid #e2e8f0", borderRadius: 8, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead><tr style={{ background: "#f8fafc" }}>
                  {["Product", "HSN", "GST%", "Qty", "Rate ₹", "Amount", ""].map((h, i) => <th key={i} style={{ padding: "8px 10px", textAlign: "left", fontSize: 11, color: "#64748b", fontWeight: 700, borderBottom: "1px solid #e2e8f0" }}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {(form.items || []).map((it, i) => {
                    const p = data.products.find(x => x.id === it.productId);
                    return (
                      <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "6px 8px" }}>
                          <select value={it.productId} onChange={e => updateInvItem(i, "productId", e.target.value)} style={{ ...inp, padding: "6px 8px" }}>
                            {data.products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                          </select>
                        </td>
                        <td style={{ padding: "6px 8px", color: "#64748b", fontSize: 12 }}>{p?.hsn}</td>
                        <td style={{ padding: "6px 8px", color: C.blue, fontWeight: 700, fontSize: 12 }}>{p?.gst}%</td>
                        <td style={{ padding: "6px 8px" }}><input type="number" value={it.qty} onChange={e => updateInvItem(i, "qty", e.target.value)} style={{ ...inp, width: 70, padding: "6px 8px" }} /></td>
                        <td style={{ padding: "6px 8px" }}><input type="number" value={it.rate} onChange={e => updateInvItem(i, "rate", e.target.value)} style={{ ...inp, width: 90, padding: "6px 8px" }} /></td>
                        <td style={{ padding: "6px 8px", fontWeight: 700 }}>{f(it.qty * it.rate)}</td>
                        <td style={{ padding: "6px 8px" }}><button onClick={() => removeInvItem(i)} style={{ background: "#fee2e2", color: C.red, border: "none", borderRadius: 6, width: 26, height: 26, cursor: "pointer", fontSize: 14 }}>×</button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {form.items?.length > 0 && form.customerId && (() => {
            const cust = data.customers.find(c => c.id === parseInt(form.customerId));
            const c = calcInvoice(form, data.products, data.company, cust);
            return (
              <div style={{ background: "#f0f9ff", borderRadius: 10, padding: 14, marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 13 }}>
                  <span>Subtotal: <b>{f(c.subtotal)}</b> &nbsp;|&nbsp;</span>
                  {c.sameState ? <span style={{ color: C.blue }}>CGST: <b>{f(c.cgst)}</b> | SGST: <b>{f(c.sgst)}</b></span> : <span style={{ color: C.indigo }}>IGST: <b>{f(c.igst)}</b></span>}
                </div>
                <div style={{ fontSize: 17, fontWeight: 800, color: C.green }}>Total: {f(c.total)}</div>
              </div>
            );
          })()}
          <Txt label="Notes (optional)" value={form.notes || ""} onChange={e => setF("notes", e.target.value)} placeholder="Payment terms, special instructions..." />
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn outline color={C.slate} onClick={() => setModal(null)}>Cancel</Btn>
            <Btn onClick={saveInvoice}>💾 Save Invoice</Btn>
          </div>
        </Modal>
      )}

      {/* ── CUSTOMER FORM ── */}
      {modal === "customer" && (
        <Modal title={editItem ? "Edit Customer" : "Add New Customer"} onClose={() => setModal(null)} wide>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Inp label="Business Name *" value={form.name || ""} onChange={e => setF("name", e.target.value)} error={errors.name} placeholder="e.g. Metro Mart" />
            <Inp label="Phone *" value={form.phone || ""} onChange={e => setF("phone", e.target.value)} error={errors.phone} placeholder="10-digit mobile" />
            <Inp label="Email" value={form.email || ""} onChange={e => setF("email", e.target.value)} placeholder="email@example.com" type="email" />
            <Field label="Customer Type">
              <select value={form.type || "Retail"} onChange={e => setF("type", e.target.value)} style={inp}>
                {["Retail", "Wholesale", "Hotel", "Corporate", "Government"].map(t => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Inp label="State" value={form.state || ""} onChange={e => setF("state", e.target.value)} placeholder="e.g. Delhi" />
            <div>
              <Inp label="GSTIN (15-digit)" value={form.gstin || ""} onChange={e => setF("gstin", e.target.value.toUpperCase())} error={errors.gstin} placeholder="e.g. 07AABCU9603R1ZP" />
              {form.gstin && <div style={{ fontSize: 11, marginTop: -10, marginBottom: 10, fontWeight: 700, color: validateGST(form.gstin) ? C.green : C.red }}>
                {validateGST(form.gstin) ? "✅ Valid GSTIN format" : "❌ Invalid GSTIN format"}
              </div>}
            </div>
          </div>
          <Inp label="Address" value={form.address || ""} onChange={e => setF("address", e.target.value)} placeholder="Full address" />
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn outline color={C.slate} onClick={() => setModal(null)}>Cancel</Btn>
            <Btn color={C.purple} onClick={saveCustomer}>💾 {editItem ? "Update" : "Add"} Customer</Btn>
          </div>
        </Modal>
      )}

      {/* ── VENDOR FORM ── */}
      {modal === "vendor" && (
        <Modal title={editItem ? "Edit Vendor" : "Add New Vendor"} onClose={() => setModal(null)} wide>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Inp label="Vendor Name *" value={form.name || ""} onChange={e => setF("name", e.target.value)} error={errors.name} />
            <Inp label="Phone" value={form.phone || ""} onChange={e => setF("phone", e.target.value)} />
            <Inp label="Email" value={form.email || ""} onChange={e => setF("email", e.target.value)} type="email" />
            <Field label="Category">
              <select value={form.category || "Raw Material"} onChange={e => setF("category", e.target.value)} style={inp}>
                {["Raw Material", "Packaging", "Utilities", "Logistics", "Maintenance", "Other"].map(c => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Inp label="State" value={form.state || ""} onChange={e => setF("state", e.target.value)} />
            <div>
              <Inp label="GSTIN (15-digit)" value={form.gstin || ""} onChange={e => setF("gstin", e.target.value.toUpperCase())} error={errors.gstin} placeholder="Leave blank if unregistered" />
              {form.gstin && <div style={{ fontSize: 11, marginTop: -10, marginBottom: 10, fontWeight: 700, color: validateGST(form.gstin) ? C.green : C.red }}>
                {validateGST(form.gstin) ? "✅ Valid GSTIN format" : "❌ Invalid GSTIN format"}
              </div>}
            </div>
          </div>
          <Inp label="Address" value={form.address || ""} onChange={e => setF("address", e.target.value)} />
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn outline color={C.slate} onClick={() => setModal(null)}>Cancel</Btn>
            <Btn color={C.teal} onClick={saveVendor}>💾 {editItem ? "Update" : "Add"} Vendor</Btn>
          </div>
        </Modal>
      )}

      {/* ── PRODUCT FORM ── */}
      {modal === "product" && (
        <Modal title={editItem ? "Edit Product" : "Add Product"} onClose={() => setModal(null)}>
          <Inp label="Product Name *" value={form.name || ""} onChange={e => setF("name", e.target.value)} error={errors.name} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Inp label="SKU" value={form.sku || ""} onChange={e => setF("sku", e.target.value)} placeholder="e.g. WB-500" />
            <Inp label="HSN Code" value={form.hsn || ""} onChange={e => setF("hsn", e.target.value)} placeholder="e.g. 2201" />
            <Inp label="Buy Price ₹" type="number" value={form.buyPrice || ""} onChange={e => setF("buyPrice", e.target.value)} />
            <Inp label="Sell Price ₹ *" type="number" value={form.sellPrice || ""} onChange={e => setF("sellPrice", e.target.value)} error={errors.sellPrice} />
            <Sel label="GST %" options={[{v:0,l:"0%"},{v:5,l:"5%"},{v:12,l:"12%"},{v:18,l:"18%"},{v:28,l:"28%"}]} value={form.gst || 18} onChange={e => setF("gst", e.target.value)} />
            <Inp label="Opening Stock" type="number" value={form.stock || ""} onChange={e => setF("stock", e.target.value)} />
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
            <Btn outline color={C.slate} onClick={() => setModal(null)}>Cancel</Btn>
            <Btn color={C.teal} onClick={saveProduct}>💾 {editItem ? "Update" : "Add"} Product</Btn>
          </div>
        </Modal>
      )}

      {/* ── EXPENSE FORM ── */}
      {modal === "expense" && (
        <Modal title={editItem ? "Edit Expense" : "Add Expense"} onClose={() => setModal(null)}>
          <Inp label="Date" type="date" value={form.date || today()} onChange={e => setF("date", e.target.value)} />
          <Sel label="Category" options={["Raw Material","Utilities","Salaries","Logistics","Maintenance","Marketing","Other"]} value={form.category || "Raw Material"} onChange={e => setF("category", e.target.value)} />
          <Inp label="Description *" value={form.description || ""} onChange={e => setF("description", e.target.value)} />
          <Field label="Vendor (optional)">
            <select value={form.vendorId || ""} onChange={e => setF("vendorId", e.target.value)} style={inp}>
              <option value="">— No Vendor —</option>
              {data.vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
            </select>
          </Field>
          <Inp label="Amount ₹ *" type="number" value={form.amount || ""} onChange={e => setF("amount", e.target.value)} />
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn outline color={C.slate} onClick={() => setModal(null)}>Cancel</Btn>
            <Btn color={C.red} onClick={saveExpense}>💾 Save Expense</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}