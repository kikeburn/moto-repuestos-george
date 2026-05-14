import { useState, useEffect, useRef } from "react";

// ─── STYLES ───────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Exo+2:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0c10;
    --surface: #111318;
    --surface2: #181c24;
    --border: #1e2430;
    --accent: #f97316;
    --accent2: #fb923c;
    --gold: #fbbf24;
    --text: #e8eaf0;
    --muted: #6b7280;
    --danger: #ef4444;
    --success: #22c55e;
    --info: #3b82f6;
    --font-head: 'Rajdhani', sans-serif;
    --font-body: 'Exo 2', sans-serif;
  }

  body { background: var(--bg); color: var(--text); font-family: var(--font-body); }

  .app { display: flex; min-height: 100vh; }

  /* ── SIDEBAR ── */
  .sidebar {
    width: 240px; min-height: 100vh; background: var(--surface);
    border-right: 1px solid var(--border); display: flex; flex-direction: column;
    position: fixed; left: 0; top: 0; z-index: 100;
  }
  .sidebar-logo {
    padding: 24px 20px 16px; border-bottom: 1px solid var(--border);
  }
  .logo-badge {
    display: flex; align-items: center; gap: 10px;
  }
  .logo-icon {
    width: 42px; height: 42px; background: var(--accent);
    border-radius: 10px; display: flex; align-items: center; justify-content: center;
    font-size: 22px;
  }
  .logo-text { line-height: 1.1; }
  .logo-text strong {
    display: block; font-family: var(--font-head); font-size: 18px;
    font-weight: 700; color: var(--accent); letter-spacing: 1px;
  }
  .logo-text span { font-size: 10px; color: var(--muted); letter-spacing: 2px; text-transform: uppercase; }
  .ruc { padding: 8px 20px; font-size: 10px; color: var(--muted); border-bottom: 1px solid var(--border); }

  .nav { flex: 1; padding: 12px 0; }
  .nav-item {
    display: flex; align-items: center; gap: 12px; padding: 11px 20px;
    cursor: pointer; font-size: 14px; font-weight: 500; color: var(--muted);
    transition: all .2s; border-left: 3px solid transparent; letter-spacing: .3px;
  }
  .nav-item:hover { color: var(--text); background: var(--surface2); }
  .nav-item.active { color: var(--accent); border-left-color: var(--accent); background: rgba(249,115,22,.07); }
  .nav-item .icon { font-size: 18px; width: 22px; text-align: center; }

  .sidebar-footer { padding: 16px 20px; border-top: 1px solid var(--border); }
  .version { font-size: 10px; color: var(--muted); }

  /* ── MAIN ── */
  .main { margin-left: 240px; flex: 1; min-height: 100vh; }
  .topbar {
    height: 60px; background: var(--surface); border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 28px; position: sticky; top: 0; z-index: 50;
  }
  .topbar-title { font-family: var(--font-head); font-size: 20px; font-weight: 700; letter-spacing: .5px; }
  .topbar-date { font-size: 12px; color: var(--muted); }
  .content { padding: 28px; }

  /* ── CARDS ── */
  .card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; overflow: hidden;
  }
  .card-header {
    padding: 16px 20px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .card-title { font-family: var(--font-head); font-size: 16px; font-weight: 700; letter-spacing: .5px; }
  .card-body { padding: 20px; }

  /* ── STAT CARDS ── */
  .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 24px; }
  .stat-card {
    background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
    padding: 20px; position: relative; overflow: hidden;
  }
  .stat-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  }
  .stat-card.orange::before { background: var(--accent); }
  .stat-card.gold::before { background: var(--gold); }
  .stat-card.green::before { background: var(--success); }
  .stat-card.red::before { background: var(--danger); }
  .stat-card.blue::before { background: var(--info); }
  .stat-label { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
  .stat-value { font-family: var(--font-head); font-size: 26px; font-weight: 700; }
  .stat-sub { font-size: 11px; color: var(--muted); margin-top: 4px; }
  .stat-icon { position: absolute; right: 16px; top: 16px; font-size: 28px; opacity: .15; }

  /* ── BUTTONS ── */
  .btn {
    display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px;
    border-radius: 8px; font-family: var(--font-body); font-size: 13px;
    font-weight: 600; cursor: pointer; border: none; transition: all .2s; letter-spacing: .3px;
  }
  .btn-primary { background: var(--accent); color: #fff; }
  .btn-primary:hover { background: var(--accent2); }
  .btn-outline { background: transparent; border: 1px solid var(--border); color: var(--text); }
  .btn-outline:hover { border-color: var(--accent); color: var(--accent); }
  .btn-danger { background: var(--danger); color: #fff; }
  .btn-danger:hover { opacity: .85; }
  .btn-success { background: var(--success); color: #fff; }
  .btn-success:hover { opacity: .85; }
  .btn-sm { padding: 5px 10px; font-size: 12px; }
  .btn-icon { padding: 6px 8px; }

  /* ── TABLE ── */
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  thead th {
    text-align: left; padding: 10px 14px; font-size: 11px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 1px; color: var(--muted);
    border-bottom: 1px solid var(--border); white-space: nowrap;
  }
  tbody td { padding: 11px 14px; border-bottom: 1px solid var(--border); vertical-align: middle; }
  tbody tr:last-child td { border-bottom: none; }
  tbody tr:hover td { background: var(--surface2); }

  /* ── FORMS ── */
  .form-group { margin-bottom: 16px; }
  .form-label { display: block; font-size: 12px; font-weight: 600; color: var(--muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: .5px; }
  .form-control {
    width: 100%; padding: 9px 12px; background: var(--bg); border: 1px solid var(--border);
    border-radius: 8px; color: var(--text); font-family: var(--font-body); font-size: 13px;
    transition: border-color .2s; outline: none;
  }
  .form-control:focus { border-color: var(--accent); }
  .form-control::placeholder { color: var(--muted); }
  .form-row { display: grid; gap: 16px; }
  .form-row.cols-2 { grid-template-columns: 1fr 1fr; }
  .form-row.cols-3 { grid-template-columns: 1fr 1fr 1fr; }
  .form-row.cols-4 { grid-template-columns: 1fr 1fr 1fr 1fr; }

  /* ── BADGE ── */
  .badge {
    display: inline-block; padding: 2px 8px; border-radius: 999px; font-size: 11px; font-weight: 600;
  }
  .badge-green { background: rgba(34,197,94,.15); color: var(--success); }
  .badge-red { background: rgba(239,68,68,.15); color: var(--danger); }
  .badge-orange { background: rgba(249,115,22,.15); color: var(--accent); }
  .badge-blue { background: rgba(59,130,246,.15); color: var(--info); }

  /* ── MODAL ── */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,.7); z-index: 1000;
    display: flex; align-items: center; justify-content: center; padding: 20px;
  }
  .modal {
    background: var(--surface); border: 1px solid var(--border); border-radius: 16px;
    width: 100%; max-width: 600px; max-height: 90vh; overflow-y: auto;
  }
  .modal-header {
    padding: 20px 24px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .modal-title { font-family: var(--font-head); font-size: 18px; font-weight: 700; }
  .modal-body { padding: 24px; }
  .modal-footer { padding: 16px 24px; border-top: 1px solid var(--border); display: flex; gap: 10px; justify-content: flex-end; }

  /* ── ALERTS ── */
  .alert { padding: 12px 16px; border-radius: 8px; font-size: 13px; margin-bottom: 16px; }
  .alert-success { background: rgba(34,197,94,.1); border: 1px solid rgba(34,197,94,.3); color: var(--success); }
  .alert-danger { background: rgba(239,68,68,.1); border: 1px solid rgba(239,68,68,.3); color: var(--danger); }
  .alert-info { background: rgba(59,130,246,.1); border: 1px solid rgba(59,130,246,.3); color: var(--info); }

  /* ── INVOICE ── */
  .invoice-preview {
    background: #fff; color: #111; padding: 32px; border-radius: 8px;
    font-family: Arial, sans-serif; font-size: 13px; max-width: 680px; margin: 0 auto;
  }
  .invoice-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px; }
  .invoice-company { }
  .invoice-company h2 { font-size: 22px; font-weight: 800; color: #ea580c; margin-bottom: 4px; }
  .invoice-company p { font-size: 12px; color: #555; line-height: 1.6; }
  .invoice-meta { text-align: right; }
  .invoice-meta h3 { font-size: 16px; font-weight: 700; color: #111; margin-bottom: 6px; }
  .invoice-meta p { font-size: 12px; color: #555; }
  .invoice-divider { border: none; border-top: 2px solid #ea580c; margin: 16px 0; }
  .invoice-client { background: #f9f9f9; padding: 12px 16px; border-radius: 6px; margin-bottom: 20px; }
  .invoice-client strong { display: block; margin-bottom: 4px; color: #111; }
  .inv-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
  .inv-table th { background: #ea580c; color: #fff; padding: 8px 12px; text-align: left; font-size: 12px; }
  .inv-table td { padding: 8px 12px; border-bottom: 1px solid #eee; font-size: 12px; }
  .inv-table tr:last-child td { border-bottom: none; }
  .invoice-totals { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; margin-bottom: 24px; }
  .inv-total-row { display: flex; gap: 60px; font-size: 13px; }
  .inv-total-row.grand { font-weight: 800; font-size: 16px; color: #ea580c; border-top: 2px solid #ea580c; padding-top: 8px; }
  .invoice-footer { text-align: center; font-size: 11px; color: #888; margin-top: 20px; padding-top: 16px; border-top: 1px solid #eee; }

  /* ── TABS ── */
  .tabs { display: flex; gap: 4px; margin-bottom: 20px; }
  .tab {
    padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 600;
    cursor: pointer; border: 1px solid transparent; transition: all .2s;
    color: var(--muted);
  }
  .tab.active { background: var(--accent); color: #fff; }
  .tab:not(.active):hover { border-color: var(--border); color: var(--text); }

  /* ── MISC ── */
  .empty { text-align: center; padding: 48px; color: var(--muted); }
  .empty-icon { font-size: 40px; margin-bottom: 12px; }
  .divider { border: none; border-top: 1px solid var(--border); margin: 20px 0; }
  .text-right { text-align: right; }
  .text-center { text-align: center; }
  .fw-bold { font-weight: 700; }
  .text-accent { color: var(--accent); }
  .text-success { color: var(--success); }
  .text-danger { color: var(--danger); }
  .text-muted { color: var(--muted); }
  .mt-4 { margin-top: 16px; }
  .mb-4 { margin-bottom: 16px; }
  .flex { display: flex; }
  .gap-2 { gap: 8px; }
  .gap-3 { gap: 12px; }
  .items-center { align-items: center; }
  .justify-between { justify-content: space-between; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .low-stock { background: rgba(239,68,68,.07); }
  .search-bar { position: relative; }
  .search-bar input { padding-left: 36px; }
  .search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: var(--muted); font-size: 14px; }
  select.form-control option { background: var(--surface); }
  @media (max-width: 768px) {
    .sidebar { width: 60px; }
    .sidebar .logo-text, .sidebar .ruc, .nav-item span, .sidebar-footer { display: none; }
    .main { margin-left: 60px; }
    .form-row.cols-3, .form-row.cols-4 { grid-template-columns: 1fr 1fr; }
    .form-row.cols-2 { grid-template-columns: 1fr; }
  }
`;

// ─── DATA HELPERS ────────────────────────────────────────────────────────────
const STORAGE_KEY = "mrg_data_v1";

const initialData = {
  inventory: [
    { id: "MC-001", nombre: "Filtro de Aceite Universal", cantidad: 15, costo: 3.5, precio: 7.0, stock_min: 5 },
    { id: "MC-002", nombre: "Bujía NGK CR7E", cantidad: 4, costo: 2.8, precio: 5.5, stock_min: 10 },
    { id: "MC-003", nombre: "Pastilla de Freno Delantera", cantidad: 20, costo: 6.0, precio: 12.0, stock_min: 8 },
    { id: "MC-004", nombre: "Cadena 420 x 120 Eslabones", cantidad: 8, costo: 12.0, precio: 22.0, stock_min: 5 },
    { id: "MC-005", nombre: "Aceite Motor 4T 10W40 1L", cantidad: 30, costo: 4.5, precio: 8.5, stock_min: 10 },
  ],
  ventas: [],
  gastos: [],
};

function loadData() {
  try {
    const d = localStorage.getItem(STORAGE_KEY);
    return d ? JSON.parse(d) : initialData;
  } catch { return initialData; }
}
function saveData(d) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); } catch {}
}

const formatMoney = (n) => `$${Number(n || 0).toFixed(2)}`;
const today = () => new Date().toISOString().split("T")[0];
const now = () => new Date().toLocaleString("es-PA");

function genInvoiceNum() {
  const last = parseInt(localStorage.getItem("mrg_last_invoice") || "0");
  const next = last + 1;
  localStorage.setItem("mrg_last_invoice", String(next));
  return "MRG-" + String(next).padStart(3, "0");
}

// ─── PDF GENERATOR (browser) ─────────────────────────────────────────────────
function generateInvoicePDF(venta) {
  const content = `
    <html><head><style>
      body{font-family:Arial,sans-serif;font-size:13px;color:#111;padding:32px}
      h2{color:#ea580c;font-size:22px;margin-bottom:4px}
      .sub{color:#555;font-size:12px;line-height:1.8}
      hr{border:none;border-top:2px solid #ea580c;margin:14px 0}
      .row{display:flex;justify-content:space-between}
      .client{background:#f9f9f9;padding:12px;border-radius:6px;margin-bottom:16px}
      table{width:100%;border-collapse:collapse;margin-bottom:16px}
      th{background:#ea580c;color:#fff;padding:7px 10px;text-align:left;font-size:12px}
      td{padding:7px 10px;border-bottom:1px solid #eee;font-size:12px}
      .totals{text-align:right}
      .grand{font-weight:800;font-size:16px;color:#ea580c}
      .footer{text-align:center;color:#888;font-size:11px;margin-top:24px;border-top:1px solid #eee;padding-top:12px}
    </style></head><body>
      <div class="row">
        <div>
          <h2>🏍 MOTO REPUESTOS GEORGE</h2>
          <div class="sub">RUC: 1-32-422 D.V. 86<br>David, Chiriquí<br>Tel: +507 6478-5258</div>
        </div>
        <div style="text-align:right">
          <strong style="font-size:16px">${venta.numero}</strong><br>
          <div class="sub">Fecha: ${venta.fecha}<br>Hora: ${venta.hora}</div>
        </div>
      </div>
      <hr>
      <div class="client">
        <strong>Cliente: ${venta.cliente}</strong>
      </div>
      <table>
        <tr><th>Código</th><th>Producto</th><th>Cant.</th><th>Precio</th><th>Subtotal</th></tr>
        ${venta.items.map(i => `<tr>
          <td>${i.codigo}</td><td>${i.nombre}</td>
          <td>${i.cantidad}</td><td>${formatMoney(i.precio)}</td>
          <td>${formatMoney(i.subtotal)}</td>
        </tr>`).join("")}
      </table>
      <div class="totals">
        <div>Subtotal: <strong>${formatMoney(venta.subtotal)}</strong></div>
        <div>ITBMS (7%): <strong>${formatMoney(venta.itbms)}</strong></div>
        <div class="grand">TOTAL: ${formatMoney(venta.total)}</div>
      </div>
      <div class="footer">¡Gracias por su compra! · Moto Repuestos George · RUC 1-32-422</div>
    </body></html>`;
  const w = window.open("", "_blank");
  if (w) { w.document.write(content); w.document.close(); w.print(); }
}

// ─── WHATSAPP ────────────────────────────────────────────────────────────────
function sendWhatsApp(venta, phone) {
  const msg = encodeURIComponent(
    `🏍 *MOTO REPUESTOS GEORGE*\n` +
    `RUC: 1-32-422 D.V. 86\n\n` +
    `*Factura:* ${venta.numero}\n*Cliente:* ${venta.cliente}\n*Fecha:* ${venta.fecha}\n\n` +
    venta.items.map(i => `• ${i.nombre} x${i.cantidad} = ${formatMoney(i.subtotal)}`).join("\n") +
    `\n\n*Subtotal:* ${formatMoney(venta.subtotal)}\n*ITBMS 7%:* ${formatMoney(venta.itbms)}\n*TOTAL:* ${formatMoney(venta.total)}\n\n¡Gracias por su compra! 🙏`
  );
  window.open(`https://wa.me/${phone.replace(/\D/g, "")}?text=${msg}`, "_blank");
}

// ══════════════════════════════════════════════════════════════════════════════
// MÓDULO: INICIO
// ══════════════════════════════════════════════════════════════════════════════
function Inicio({ data }) {
  const today_str = today();
  const ventasHoy = data.ventas.filter(v => v.fecha === today_str);
  const gastosHoy = data.gastos.filter(g => g.fecha === today_str);
  const ingresoHoy = ventasHoy.reduce((s, v) => s + v.total, 0);
  const gastoHoy = gastosHoy.reduce((s, g) => s + g.monto, 0);
  const utilidad = ingresoHoy - gastoHoy;
  const stockBajo = data.inventory.filter(p => p.cantidad <= p.stock_min);

  // Últimas ventas
  const ultVentas = [...data.ventas].reverse().slice(0, 5);

  return (
    <div>
      <div className="stats-grid">
        <div className="stat-card orange">
          <div className="stat-icon">💰</div>
          <div className="stat-label">Ventas Hoy</div>
          <div className="stat-value text-accent">{formatMoney(ingresoHoy)}</div>
          <div className="stat-sub">{ventasHoy.length} transacción(es)</div>
        </div>
        <div className="stat-card red">
          <div className="stat-icon">📤</div>
          <div className="stat-label">Gastos Hoy</div>
          <div className="stat-value text-danger">{formatMoney(gastoHoy)}</div>
          <div className="stat-sub">{gastosHoy.length} gasto(s)</div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon">📈</div>
          <div className="stat-label">Utilidad Hoy</div>
          <div className={`stat-value ${utilidad >= 0 ? "text-success" : "text-danger"}`}>{formatMoney(utilidad)}</div>
          <div className="stat-sub">Ingresos - Gastos</div>
        </div>
        <div className="stat-card blue">
          <div className="stat-icon">📦</div>
          <div className="stat-label">Productos</div>
          <div className="stat-value">{data.inventory.length}</div>
          <div className="stat-sub">{stockBajo.length} con stock bajo</div>
        </div>
        <div className="stat-card gold">
          <div className="stat-icon">🏍</div>
          <div className="stat-label">Total Ventas</div>
          <div className="stat-value">{data.ventas.length}</div>
          <div className="stat-sub">Historial completo</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Últimas Ventas</span>
          </div>
          <div className="table-wrap">
            {ultVentas.length === 0 ? (
              <div className="empty"><div className="empty-icon">🛒</div>Sin ventas aún</div>
            ) : (
              <table>
                <thead><tr><th>Factura</th><th>Cliente</th><th>Total</th></tr></thead>
                <tbody>
                  {ultVentas.map(v => (
                    <tr key={v.numero}>
                      <td><span className="text-accent">{v.numero}</span></td>
                      <td>{v.cliente}</td>
                      <td className="fw-bold">{formatMoney(v.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">⚠️ Stock Bajo</span>
          </div>
          <div className="table-wrap">
            {stockBajo.length === 0 ? (
              <div className="empty"><div className="empty-icon">✅</div>Todo en orden</div>
            ) : (
              <table>
                <thead><tr><th>Producto</th><th>Stock</th><th>Mínimo</th></tr></thead>
                <tbody>
                  {stockBajo.map(p => (
                    <tr key={p.id} className="low-stock">
                      <td>{p.nombre}</td>
                      <td><span className="badge badge-red">{p.cantidad}</span></td>
                      <td className="text-muted">{p.stock_min}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MÓDULO: INVENTARIO
// ══════════════════════════════════════════════════════════════════════════════
function Inventario({ data, setData }) {
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ id: "", nombre: "", cantidad: "", costo: "", precio: "", stock_min: "" });
  const [alert, setAlert] = useState(null);

  const filtered = data.inventory.filter(p =>
    p.nombre.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase())
  );

  function openNew() {
    setEditing(null);
    setForm({ id: "", nombre: "", cantidad: "", costo: "", precio: "", stock_min: "5" });
    setModal(true);
  }
  function openEdit(p) {
    setEditing(p.id);
    setForm({ ...p });
    setModal(true);
  }
  function saveProduct() {
    if (!form.id || !form.nombre || !form.precio) { setAlert({ type: "danger", msg: "Complete los campos obligatorios." }); return; }
    const prod = { ...form, cantidad: +form.cantidad || 0, costo: +form.costo || 0, precio: +form.precio || 0, stock_min: +form.stock_min || 5 };
    let inv;
    if (editing) {
      inv = data.inventory.map(p => p.id === editing ? prod : p);
    } else {
      if (data.inventory.find(p => p.id === form.id)) { setAlert({ type: "danger", msg: "Código ya existe." }); return; }
      inv = [...data.inventory, prod];
    }
    const nd = { ...data, inventory: inv };
    setData(nd); saveData(nd);
    setModal(false);
    setAlert({ type: "success", msg: editing ? "Producto actualizado." : "Producto agregado." });
    setTimeout(() => setAlert(null), 3000);
  }
  function deleteProduct(id) {
    if (!confirm("¿Eliminar este producto?")) return;
    const nd = { ...data, inventory: data.inventory.filter(p => p.id !== id) };
    setData(nd); saveData(nd);
  }

  return (
    <div>
      {alert && <div className={`alert alert-${alert.type}`}>{alert.msg}</div>}
      <div className="card">
        <div className="card-header">
          <span className="card-title">📦 Inventario</span>
          <div className="flex gap-2">
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input className="form-control" style={{ paddingLeft: 36 }} placeholder="Buscar..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <button className="btn btn-primary" onClick={openNew}>+ Nuevo</button>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Código</th><th>Nombre</th><th>Cant.</th>
                <th>P. Costo</th><th>P. Público</th><th>Margen</th><th>Estado</th><th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const margen = p.costo > 0 ? (((p.precio - p.costo) / p.costo) * 100).toFixed(0) : "-";
                const low = p.cantidad <= p.stock_min;
                return (
                  <tr key={p.id} className={low ? "low-stock" : ""}>
                    <td><span className="text-accent fw-bold">{p.id}</span></td>
                    <td>{p.nombre}</td>
                    <td><span className={`badge ${low ? "badge-red" : "badge-green"}`}>{p.cantidad}</span></td>
                    <td>{formatMoney(p.costo)}</td>
                    <td className="fw-bold">{formatMoney(p.precio)}</td>
                    <td>{margen}%</td>
                    <td>{low ? <span className="badge badge-red">Stock Bajo</span> : <span className="badge badge-green">OK</span>}</td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-outline btn-sm btn-icon" onClick={() => openEdit(p)}>✏️</button>
                        <button className="btn btn-danger btn-sm btn-icon" onClick={() => deleteProduct(p.id)}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan="8" className="text-center text-muted" style={{ padding: 32 }}>Sin resultados</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <span className="modal-title">{editing ? "Editar Producto" : "Nuevo Producto"}</span>
              <button className="btn btn-outline btn-sm" onClick={() => setModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              {alert && <div className={`alert alert-${alert.type}`}>{alert.msg}</div>}
              <div className="form-row cols-2">
                <div className="form-group">
                  <label className="form-label">Código *</label>
                  <input className="form-control" value={form.id} onChange={e => setForm({ ...form, id: e.target.value })} disabled={!!editing} />
                </div>
                <div className="form-group">
                  <label className="form-label">Stock Mínimo</label>
                  <input className="form-control" type="number" value={form.stock_min} onChange={e => setForm({ ...form, stock_min: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Nombre *</label>
                <input className="form-control" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} />
              </div>
              <div className="form-row cols-3">
                <div className="form-group">
                  <label className="form-label">Cantidad</label>
                  <input className="form-control" type="number" value={form.cantidad} onChange={e => setForm({ ...form, cantidad: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">P. Costo ($)</label>
                  <input className="form-control" type="number" step="0.01" value={form.costo} onChange={e => setForm({ ...form, costo: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">P. Público ($) *</label>
                  <input className="form-control" type="number" step="0.01" value={form.precio} onChange={e => setForm({ ...form, precio: e.target.value })} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setModal(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={saveProduct}>💾 Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MÓDULO: VENTAS
// ══════════════════════════════════════════════════════════════════════════════
function Ventas({ data, setData }) {
  const [tab, setTab] = useState("nueva");
  const [cliente, setCliente] = useState("");
  const [fecha, setFecha] = useState(today());
  const [items, setItems] = useState([]);
  const [selCode, setSelCode] = useState("");
  const [selQty, setSelQty] = useState(1);
  const [selPrice, setSelPrice] = useState("");
  const [alert, setAlert] = useState(null);
  const [invoiceModal, setInvoiceModal] = useState(null);
  const [wpPhone, setWpPhone] = useState("");
  const [search, setSearch] = useState("");

  const subtotal = items.reduce((s, i) => s + i.subtotal, 0);
  const itbms = subtotal * 0.07;
  const total = subtotal + itbms;

  function addItem() {
    const prod = data.inventory.find(p => p.id === selCode);
    if (!prod) { setAlert({ type: "danger", msg: "Seleccione un producto válido." }); return; }
    const qty = +selQty;
    const price = selPrice !== "" ? +selPrice : prod.precio;
    if (qty <= 0 || isNaN(qty)) { setAlert({ type: "danger", msg: "Cantidad inválida." }); return; }
    if (prod.cantidad < qty) { setAlert({ type: "danger", msg: `Stock insuficiente. Disponible: ${prod.cantidad}` }); return; }
    const existing = items.findIndex(i => i.codigo === selCode);
    if (existing >= 0) {
      const newItems = [...items];
      newItems[existing] = { ...newItems[existing], cantidad: newItems[existing].cantidad + qty, precio: price, subtotal: (newItems[existing].cantidad + qty) * price };
      setItems(newItems);
    } else {
      setItems([...items, { codigo: prod.id, nombre: prod.nombre, cantidad: qty, precio: price, subtotal: qty * price }]);
    }
    setSelCode(""); setSelQty(1); setSelPrice(""); setAlert(null);
  }

  function removeItem(idx) { setItems(items.filter((_, i) => i !== idx)); }

  function finalizarVenta() {
    if (!cliente) { setAlert({ type: "danger", msg: "Ingrese el nombre del cliente." }); return; }
    if (items.length === 0) { setAlert({ type: "danger", msg: "Agregue al menos un producto." }); return; }
    const numero = genInvoiceNum();
    const venta = { numero, cliente, fecha, hora: new Date().toLocaleTimeString("es-PA"), items, subtotal, itbms, total };
    // Descontar inventario
    const newInv = data.inventory.map(p => {
      const item = items.find(i => i.codigo === p.id);
      return item ? { ...p, cantidad: p.cantidad - item.cantidad } : p;
    });
    const nd = { ...data, ventas: [...data.ventas, venta], inventory: newInv };
    setData(nd); saveData(nd);
    setInvoiceModal(venta);
    setCliente(""); setItems([]); setFecha(today());
    setAlert({ type: "success", msg: `Venta ${numero} registrada exitosamente.` });
    setTimeout(() => setAlert(null), 4000);
  }

  const filteredVentas = [...data.ventas].reverse().filter(v =>
    v.cliente.toLowerCase().includes(search.toLowerCase()) || v.numero.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="tabs">
        <div className={`tab ${tab === "nueva" ? "active" : ""}`} onClick={() => setTab("nueva")}>🛒 Nueva Venta</div>
        <div className={`tab ${tab === "historial" ? "active" : ""}`} onClick={() => setTab("historial")}>📋 Historial</div>
      </div>

      {tab === "nueva" && (
        <div>
          {alert && <div className={`alert alert-${alert.type}`}>{alert.msg}</div>}
          <div className="card mb-4">
            <div className="card-header"><span className="card-title">Datos del Cliente</span></div>
            <div className="card-body">
              <div className="form-row cols-2">
                <div className="form-group">
                  <label className="form-label">Cliente *</label>
                  <input className="form-control" placeholder="Nombre del cliente" value={cliente} onChange={e => setCliente(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Fecha</label>
                  <input className="form-control" type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-header"><span className="card-title">Agregar Producto</span></div>
            <div className="card-body">
              <div className="form-row cols-4">
                <div className="form-group">
                  <label className="form-label">Producto</label>
                  <select className="form-control" value={selCode} onChange={e => {
                    const p = data.inventory.find(x => x.id === e.target.value);
                    setSelCode(e.target.value);
                    setSelPrice(p ? p.precio : "");
                  }}>
                    <option value="">-- Seleccionar --</option>
                    {data.inventory.filter(p => p.cantidad > 0).map(p => (
                      <option key={p.id} value={p.id}>{p.id} - {p.nombre}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Cantidad</label>
                  <input className="form-control" type="number" min="1" value={selQty} onChange={e => setSelQty(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Precio ($) <span className="text-muted" style={{ fontSize: 10 }}>Ajustable</span></label>
                  <input className="form-control" type="number" step="0.01" value={selPrice} onChange={e => setSelPrice(e.target.value)} placeholder="Auto" />
                </div>
                <div className="form-group">
                  <label className="form-label">&nbsp;</label>
                  <button className="btn btn-primary" style={{ width: "100%" }} onClick={addItem}>+ Agregar</button>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-header"><span className="card-title">Artículos</span></div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>Código</th><th>Nombre</th><th>Cant.</th><th>Precio</th><th>Subtotal</th><th></th></tr>
                </thead>
                <tbody>
                  {items.length === 0 ? (
                    <tr><td colSpan="6" className="text-center text-muted" style={{ padding: 24 }}>Sin artículos</td></tr>
                  ) : items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="text-accent">{item.codigo}</td>
                      <td>{item.nombre}</td>
                      <td>{item.cantidad}</td>
                      <td>{formatMoney(item.precio)}</td>
                      <td className="fw-bold">{formatMoney(item.subtotal)}</td>
                      <td><button className="btn btn-danger btn-sm btn-icon" onClick={() => removeItem(idx)}>✕</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {items.length > 0 && (
              <div className="card-body" style={{ borderTop: "1px solid var(--border)" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                  <div className="flex gap-3"><span className="text-muted">Subtotal:</span><span>{formatMoney(subtotal)}</span></div>
                  <div className="flex gap-3"><span className="text-muted">ITBMS 7%:</span><span>{formatMoney(itbms)}</span></div>
                  <div className="flex gap-3" style={{ fontSize: 20, fontWeight: 700, color: "var(--accent)" }}>
                    <span>TOTAL:</span><span>{formatMoney(total)}</span>
                  </div>
                </div>
                <div className="mt-4 text-right">
                  <button className="btn btn-success" style={{ fontSize: 15, padding: "10px 28px" }} onClick={finalizarVenta}>
                    ✅ Finalizar Venta
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "historial" && (
        <div className="card">
          <div className="card-header">
            <span className="card-title">Historial de Ventas</span>
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input className="form-control" style={{ paddingLeft: 36 }} placeholder="Buscar..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Factura</th><th>Fecha</th><th>Cliente</th><th>Items</th><th>Total</th><th>Acciones</th></tr>
              </thead>
              <tbody>
                {filteredVentas.map(v => (
                  <tr key={v.numero}>
                    <td className="text-accent fw-bold">{v.numero}</td>
                    <td>{v.fecha}</td>
                    <td>{v.cliente}</td>
                    <td>{v.items.length}</td>
                    <td className="fw-bold">{formatMoney(v.total)}</td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-outline btn-sm" onClick={() => setInvoiceModal(v)}>🧾 Factura</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredVentas.length === 0 && (
                  <tr><td colSpan="6" className="text-center text-muted" style={{ padding: 32 }}>Sin ventas</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {invoiceModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setInvoiceModal(null)}>
          <div className="modal" style={{ maxWidth: 720 }}>
            <div className="modal-header">
              <span className="modal-title">🧾 Factura {invoiceModal.numero}</span>
              <button className="btn btn-outline btn-sm" onClick={() => setInvoiceModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="invoice-preview">
                <div className="invoice-header">
                  <div className="invoice-company">
                    <h2>🏍 MOTO REPUESTOS GEORGE</h2>
                    <p>RUC: 1-32-422 D.V. 86<br />David - Chiriquí<br />Tel: +507 64785258</p>
                  </div>
                  <div className="invoice-meta">
                    <h3>{invoiceModal.numero}</h3>
                    <p>Fecha: {invoiceModal.fecha}<br />Hora: {invoiceModal.hora || ""}</p>
                  </div>
                </div>
                <hr className="invoice-divider" />
                <div className="invoice-client">
                  <strong>Cliente: {invoiceModal.cliente}</strong>
                </div>
                <table className="inv-table">
                  <thead><tr><th>Código</th><th>Producto</th><th>Cant.</th><th>Precio</th><th>Subtotal</th></tr></thead>
                  <tbody>
                    {invoiceModal.items.map((i, idx) => (
                      <tr key={idx}>
                        <td>{i.codigo}</td><td>{i.nombre}</td>
                        <td>{i.cantidad}</td><td>{formatMoney(i.precio)}</td><td>{formatMoney(i.subtotal)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="invoice-totals">
                  <div className="inv-total-row"><span>Subtotal</span><span>{formatMoney(invoiceModal.subtotal)}</span></div>
                  <div className="inv-total-row"><span>ITBMS 7%</span><span>{formatMoney(invoiceModal.itbms)}</span></div>
                  <div className="inv-total-row grand"><span>TOTAL</span><span>{formatMoney(invoiceModal.total)}</span></div>
                </div>
                <div className="invoice-footer">¡Gracias por su compra! · Moto Repuestos George · RUC 1-32-422</div>
              </div>

              <div className="mt-4">
                <label className="form-label">📱 Número WhatsApp (para enviar)</label>
                <div className="flex gap-2">
                  <input className="form-control" placeholder="+507 6478-5258" value={wpPhone} onChange={e => setWpPhone(e.target.value)} />
                  <button className="btn btn-success" onClick={() => sendWhatsApp(invoiceModal, wpPhone)} disabled={!wpPhone}>
                    📲 WhatsApp
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setInvoiceModal(null)}>Cerrar</button>
              <button className="btn btn-primary" onClick={() => generateInvoicePDF(invoiceModal)}>🖨️ Imprimir / PDF</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MÓDULO: GASTOS
// ══════════════════════════════════════════════════════════════════════════════
const CATEGORIAS = ["Alquiler", "Servicios", "Compras", "Transporte", "Salarios", "Mantenimiento", "Publicidad", "Otros"];

function Gastos({ data, setData }) {
  const [form, setForm] = useState({ descripcion: "", monto: "", categoria: "Otros", fecha: today(), observaciones: "" });
  const [alert, setAlert] = useState(null);
  const [search, setSearch] = useState("");

  function saveGasto() {
    if (!form.descripcion || !form.monto) { setAlert({ type: "danger", msg: "Complete descripción y monto." }); return; }
    const g = { id: Date.now(), ...form, monto: +form.monto };
    const nd = { ...data, gastos: [...data.gastos, g] };
    setData(nd); saveData(nd);
    setForm({ descripcion: "", monto: "", categoria: "Otros", fecha: today(), observaciones: "" });
    setAlert({ type: "success", msg: "Gasto guardado correctamente." });
    setTimeout(() => setAlert(null), 3000);
  }

  function deleteGasto(id) {
    if (!confirm("¿Eliminar este gasto?")) return;
    const nd = { ...data, gastos: data.gastos.filter(g => g.id !== id) };
    setData(nd); saveData(nd);
  }

  const filtered = [...data.gastos].reverse().filter(g =>
    g.descripcion.toLowerCase().includes(search.toLowerCase()) ||
    g.categoria.toLowerCase().includes(search.toLowerCase())
  );
  const totalGastos = filtered.reduce((s, g) => s + g.monto, 0);

  return (
    <div>
      {alert && <div className={`alert alert-${alert.type}`}>{alert.msg}</div>}
      <div className="card mb-4">
        <div className="card-header"><span className="card-title">➕ Registrar Gasto</span></div>
        <div className="card-body">
          <div className="form-row cols-2">
            <div className="form-group">
              <label className="form-label">Descripción *</label>
              <input className="form-control" placeholder="Ej: Pago de alquiler" value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Monto ($) *</label>
              <input className="form-control" type="number" step="0.01" value={form.monto} onChange={e => setForm({ ...form, monto: e.target.value })} />
            </div>
          </div>
          <div className="form-row cols-2">
            <div className="form-group">
              <label className="form-label">Categoría</label>
              <select className="form-control" value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value })}>
                {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Fecha</label>
              <input className="form-control" type="date" value={form.fecha} onChange={e => setForm({ ...form, fecha: e.target.value })} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Observaciones</label>
            <textarea className="form-control" rows="2" value={form.observaciones} onChange={e => setForm({ ...form, observaciones: e.target.value })} />
          </div>
          <div className="text-right">
            <button className="btn btn-primary" onClick={saveGasto}>💾 Guardar Gasto</button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">📋 Gastos Registrados <span className="text-muted" style={{ fontSize: 13 }}>— Total: <span className="text-danger">{formatMoney(totalGastos)}</span></span></span>
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input className="form-control" style={{ paddingLeft: 36 }} placeholder="Buscar..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Fecha</th><th>Descripción</th><th>Categoría</th><th>Monto</th><th>Observaciones</th><th></th></tr>
            </thead>
            <tbody>
              {filtered.map(g => (
                <tr key={g.id}>
                  <td>{g.fecha}</td>
                  <td>{g.descripcion}</td>
                  <td><span className="badge badge-orange">{g.categoria}</span></td>
                  <td className="fw-bold text-danger">{formatMoney(g.monto)}</td>
                  <td className="text-muted" style={{ fontSize: 12 }}>{g.observaciones || "—"}</td>
                  <td><button className="btn btn-danger btn-sm btn-icon" onClick={() => deleteGasto(g.id)}>🗑️</button></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="6" className="text-center text-muted" style={{ padding: 32 }}>Sin gastos registrados</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MÓDULO: REPORTES
// ══════════════════════════════════════════════════════════════════════════════
function Reportes({ data }) {
  const [tab, setTab] = useState("ventas");
  const [period, setPeriod] = useState("diario");

  function filterByPeriod(items, dateKey) {
    const now_d = new Date();
    return items.filter(item => {
      const d = new Date(item[dateKey] + "T00:00:00");
      if (period === "diario") {
        return item[dateKey] === today();
      } else if (period === "semanal") {
        const diff = (now_d - d) / 86400000;
        return diff >= 0 && diff < 7;
      } else {
        return d.getMonth() === now_d.getMonth() && d.getFullYear() === now_d.getFullYear();
      }
    });
  }

  const ventasFilt = filterByPeriod(data.ventas, "fecha");
  const gastosFilt = filterByPeriod(data.gastos, "fecha");

  const totalVentas = ventasFilt.reduce((s, v) => s + v.total, 0);
  const totalGastos = gastosFilt.reduce((s, g) => s + g.monto, 0);
  const utilidad = totalVentas - totalGastos;

  // Inventario total
  const invValor = data.inventory.reduce((s, p) => s + p.costo * p.cantidad, 0);
  const invPrecio = data.inventory.reduce((s, p) => s + p.precio * p.cantidad, 0);

  function printReport() {
    const content = `<html><head><style>
      body{font-family:Arial;font-size:13px;padding:28px;color:#111}
      h2{color:#ea580c}h3{margin:20px 0 8px}
      table{width:100%;border-collapse:collapse;margin-bottom:16px}
      th{background:#ea580c;color:#fff;padding:7px 10px;text-align:left;font-size:12px}
      td{padding:7px 10px;border-bottom:1px solid #eee;font-size:12px}
      .total{font-weight:700;font-size:15px}
      .footer{text-align:center;font-size:11px;color:#888;margin-top:24px}
    </style></head><body>
      <h2>🏍 MOTO REPUESTOS GEORGE — REPORTE</h2>
      <p>RUC: 1-32-422 D.V. 86 | Período: ${period.toUpperCase()} | Generado: ${now()}</p>
      <hr>
      <h3>📊 Resumen</h3>
      <table><tr><th>Concepto</th><th>Valor</th></tr>
        <tr><td>Total Ventas</td><td>$${totalVentas.toFixed(2)}</td></tr>
        <tr><td>Total Gastos</td><td>$${totalGastos.toFixed(2)}</td></tr>
        <tr><td class="total">Utilidad</td><td class="total" style="color:${utilidad >= 0 ? "green" : "red"}">$${utilidad.toFixed(2)}</td></tr>
      </table>
      <h3>🧾 Ventas (${ventasFilt.length})</h3>
      <table><tr><th>Factura</th><th>Fecha</th><th>Cliente</th><th>Total</th></tr>
        ${ventasFilt.map(v => `<tr><td>${v.numero}</td><td>${v.fecha}</td><td>${v.cliente}</td><td>$${v.total.toFixed(2)}</td></tr>`).join("")}
      </table>
      <h3>📤 Gastos (${gastosFilt.length})</h3>
      <table><tr><th>Fecha</th><th>Descripción</th><th>Categoría</th><th>Monto</th></tr>
        ${gastosFilt.map(g => `<tr><td>${g.fecha}</td><td>${g.descripcion}</td><td>${g.categoria}</td><td>$${g.monto.toFixed(2)}</td></tr>`).join("")}
      </table>
      <h3>📦 Inventario</h3>
      <table><tr><th>Código</th><th>Nombre</th><th>Cant.</th><th>P. Costo</th><th>P. Público</th><th>Valor Stock</th></tr>
        ${data.inventory.map(p => `<tr><td>${p.id}</td><td>${p.nombre}</td><td>${p.cantidad}</td><td>$${p.costo.toFixed(2)}</td><td>$${p.precio.toFixed(2)}</td><td>$${(p.costo * p.cantidad).toFixed(2)}</td></tr>`).join("")}
      </table>
      <div class="footer">Moto Repuestos George · RUC 1-32-422 · Generado con sistema de gestión</div>
    </body></html>`;
    const w = window.open("", "_blank");
    if (w) { w.document.write(content); w.document.close(); w.print(); }
  }

  // Gastos por categoría
  const porCategoria = {};
  gastosFilt.forEach(g => { porCategoria[g.categoria] = (porCategoria[g.categoria] || 0) + g.monto; });

  // Productos más vendidos
  const prodVentas = {};
  ventasFilt.forEach(v => v.items.forEach(i => { prodVentas[i.nombre] = (prodVentas[i.nombre] || 0) + i.cantidad; }));
  const topProds = Object.entries(prodVentas).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="tabs" style={{ marginBottom: 0 }}>
          <div className={`tab ${tab === "ventas" ? "active" : ""}`} onClick={() => setTab("ventas")}>📊 Ventas & Gastos</div>
          <div className={`tab ${tab === "inventario" ? "active" : ""}`} onClick={() => setTab("inventario")}>📦 Inventario</div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="tabs" style={{ marginBottom: 0 }}>
            {["diario", "semanal", "mensual"].map(p => (
              <div key={p} className={`tab ${period === p ? "active" : ""}`} onClick={() => setPeriod(p)} style={{ padding: "6px 12px", fontSize: 12 }}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </div>
            ))}
          </div>
          <button className="btn btn-primary" onClick={printReport}>🖨️ PDF</button>
        </div>
      </div>

      {tab === "ventas" && (
        <div>
          <div className="stats-grid">
            <div className="stat-card green">
              <div className="stat-label">Ventas ({period})</div>
              <div className="stat-value text-success">{formatMoney(totalVentas)}</div>
              <div className="stat-sub">{ventasFilt.length} transacciones</div>
            </div>
            <div className="stat-card red">
              <div className="stat-label">Gastos ({period})</div>
              <div className="stat-value text-danger">{formatMoney(totalGastos)}</div>
              <div className="stat-sub">{gastosFilt.length} registros</div>
            </div>
            <div className={`stat-card ${utilidad >= 0 ? "green" : "red"}`}>
              <div className="stat-label">Utilidad Neta</div>
              <div className={`stat-value ${utilidad >= 0 ? "text-success" : "text-danger"}`}>{formatMoney(utilidad)}</div>
              <div className="stat-sub">Ventas - Gastos</div>
            </div>
          </div>

          <div className="grid-2">
            <div className="card">
              <div className="card-header"><span className="card-title">🧾 Ventas del período</span></div>
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Factura</th><th>Cliente</th><th>Fecha</th><th>Total</th></tr></thead>
                  <tbody>
                    {ventasFilt.length === 0 ? (
                      <tr><td colSpan="4" className="text-center text-muted" style={{ padding: 24 }}>Sin ventas en este período</td></tr>
                    ) : ventasFilt.map(v => (
                      <tr key={v.numero}>
                        <td className="text-accent">{v.numero}</td>
                        <td>{v.cliente}</td>
                        <td>{v.fecha}</td>
                        <td className="fw-bold">{formatMoney(v.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card">
              <div className="card-header"><span className="card-title">📤 Gastos por Categoría</span></div>
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Categoría</th><th>Total</th></tr></thead>
                  <tbody>
                    {Object.keys(porCategoria).length === 0 ? (
                      <tr><td colSpan="2" className="text-center text-muted" style={{ padding: 24 }}>Sin gastos</td></tr>
                    ) : Object.entries(porCategoria).sort((a, b) => b[1] - a[1]).map(([cat, val]) => (
                      <tr key={cat}>
                        <td><span className="badge badge-orange">{cat}</span></td>
                        <td className="fw-bold text-danger">{formatMoney(val)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {topProds.length > 0 && (
            <div className="card mt-4">
              <div className="card-header"><span className="card-title">🏆 Productos Más Vendidos</span></div>
              <div className="table-wrap">
                <table>
                  <thead><tr><th>#</th><th>Producto</th><th>Unidades Vendidas</th></tr></thead>
                  <tbody>
                    {topProds.map(([nombre, qty], idx) => (
                      <tr key={nombre}>
                        <td><span className="badge badge-orange">#{idx + 1}</span></td>
                        <td>{nombre}</td>
                        <td className="fw-bold">{qty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "inventario" && (
        <div>
          <div className="stats-grid">
            <div className="stat-card blue">
              <div className="stat-label">Total Productos</div>
              <div className="stat-value">{data.inventory.length}</div>
            </div>
            <div className="stat-card orange">
              <div className="stat-label">Valor en Costo</div>
              <div className="stat-value text-accent">{formatMoney(invValor)}</div>
            </div>
            <div className="stat-card gold">
              <div className="stat-label">Valor en Venta</div>
              <div className="stat-value">{formatMoney(invPrecio)}</div>
            </div>
            <div className="stat-card green">
              <div className="stat-label">Ganancia Potencial</div>
              <div className="stat-value text-success">{formatMoney(invPrecio - invValor)}</div>
            </div>
            <div className="stat-card red">
              <div className="stat-label">Stock Bajo</div>
              <div className="stat-value text-danger">{data.inventory.filter(p => p.cantidad <= p.stock_min).length}</div>
              <div className="stat-sub">productos</div>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><span className="card-title">📦 Inventario Completo</span></div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>Código</th><th>Nombre</th><th>Cant.</th><th>P. Costo</th><th>P. Público</th><th>Valor Stock</th><th>Estado</th></tr>
                </thead>
                <tbody>
                  {data.inventory.map(p => {
                    const low = p.cantidad <= p.stock_min;
                    return (
                      <tr key={p.id} className={low ? "low-stock" : ""}>
                        <td className="text-accent fw-bold">{p.id}</td>
                        <td>{p.nombre}</td>
                        <td><span className={`badge ${low ? "badge-red" : "badge-green"}`}>{p.cantidad}</span></td>
                        <td>{formatMoney(p.costo)}</td>
                        <td>{formatMoney(p.precio)}</td>
                        <td>{formatMoney(p.costo * p.cantidad)}</td>
                        <td>{low ? <span className="badge badge-red">Stock Bajo</span> : <span className="badge badge-green">OK</span>}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// APP ROOT
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [data, setData] = useState(() => loadData());
  const [module, setModule] = useState("inicio");

  const nav = [
    { id: "inicio", icon: "🏠", label: "Inicio" },
    { id: "inventario", icon: "📦", label: "Inventario" },
    { id: "ventas", icon: "🛒", label: "Ventas" },
    { id: "gastos", icon: "📤", label: "Gastos" },
    { id: "reportes", icon: "📊", label: "Reportes" },
  ];

  const titles = { inicio: "Panel Principal", inventario: "Inventario", ventas: "Ventas", gastos: "Gastos", reportes: "Reportes" };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-badge">
              <div className="logo-icon">🏍</div>
              <div className="logo-text">
                <strong>MOTO REPUESTOS</strong>
                <span>GEORGE</span>
              </div>
            </div>
          </div>
          <div className="ruc">RUC: 1-32-422 D.V. 86</div>
          <nav className="nav">
            {nav.map(item => (
              <div key={item.id} className={`nav-item ${module === item.id ? "active" : ""}`} onClick={() => setModule(item.id)}>
                <span className="icon">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </nav>
          <div className="sidebar-footer">
            <div className="version">v1.0.0 · 2025</div>
          </div>
        </aside>

        <main className="main">
          <div className="topbar">
            <span className="topbar-title">{titles[module]}</span>
            <span className="topbar-date">{new Date().toLocaleDateString("es-PA", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
          </div>
          <div className="content">
            {module === "inicio" && <Inicio data={data} />}
            {module === "inventario" && <Inventario data={data} setData={setData} />}
            {module === "ventas" && <Ventas data={data} setData={setData} />}
            {module === "gastos" && <Gastos data={data} setData={setData} />}
            {module === "reportes" && <Reportes data={data} />}
          </div>
        </main>
      </div>
    </>
  );
}
