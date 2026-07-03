import React, { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import Chart from 'chart.js/auto';

export default function Dashboard(){
  const auth = useAuth();
  const usuario = auth.getUsuarioActual();
  const estadisticas = { ventasTotal:15450, productosVendidos:342, clientesRegistrados:128, ingresoMensual:3250 };
  const actividadReciente = [
    { fecha:'2026-05-25 14:30', accion:'Nueva venta registrada', monto:299.90 },
    { fecha:'2026-05-25 13:15', accion:'Nuevo cliente registrado', monto:0 },
    { fecha:'2026-05-25 12:00', accion:'Producto agotado: Mouse Inalámbrico', monto:0 },
    { fecha:'2026-05-24 16:45', accion:'Devolución procesada', monto:-89.90 }
  ];

  const chartLineRef = useRef(null);
  const chartDonutRef = useRef(null);

  useEffect(()=>{
    try{
      if (chartLineRef.current) {
        new Chart(chartLineRef.current, {
          type: 'line', data: { labels:['Ene','Feb','Mar','Abr','May','Jun','Jul'], datasets:[{label:'Ingresos (USD)', data:[1200,1500,1800,1400,3250,2900,3600], borderColor:'rgba(43,140,255,0.95)', backgroundColor:'rgba(43,140,255,0.12)', tension:0.3, pointRadius:4}]}, options:{responsive:true, maintainAspectRatio:false, scales:{y:{beginAtZero:true}}, plugins:{legend:{display:false}}}
        });
      }

      if (chartDonutRef.current) {
        new Chart(chartDonutRef.current, { type:'doughnut', data:{ labels:['Cursos','Productos','Suscripciones'], datasets:[{data:[55,30,15], backgroundColor:['#2b8cff','#00c2b8','#ffc107']}] }, options:{responsive:true, maintainAspectRatio:false} });
      }
    }catch(err){ console.warn('Chart error', err); }
  },[]);

  function cerrarSesion(){ auth.cerrarSesion(); }

  return (
    <div className="dashboard-container" style={{padding:20}}>
      <div className="container-fluid py-5">
        <div className="row mb-5">
          <div className="col-md-8"><h1 className="mb-2">Panel de administración</h1><p className="text-muted">Bienvenido, {usuario?.nombre}</p></div>
          <div className="col-md-4 text-end"><button className="btn btn-outline-danger" onClick={cerrarSesion}>Cerrar sesión</button></div>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-md-6 col-lg-3"><div className="stat-card"><div className="stat-icon bg-primary"><i className="fas fa-dollar-sign"></i></div><div className="stat-content"><p className="stat-label">Ventas total</p><h4 className="stat-value">{estadisticas.ventasTotal}</h4></div></div></div>
          <div className="col-md-6 col-lg-3"><div className="stat-card"><div className="stat-icon bg-success"><i className="fas fa-box"></i></div><div className="stat-content"><p className="stat-label">Productos vendidos</p><h4 className="stat-value">{estadisticas.productosVendidos}</h4></div></div></div>
          <div className="col-md-6 col-lg-3"><div className="stat-card"><div className="stat-icon bg-info"><i className="fas fa-users"></i></div><div className="stat-content"><p className="stat-label">Clientes registrados</p><h4 className="stat-value">{estadisticas.clientesRegistrados}</h4></div></div></div>
          <div className="col-md-6 col-lg-3"><div className="stat-card"><div className="stat-icon bg-warning"><i className="fas fa-chart-pie"></i></div><div className="stat-content"><p className="stat-label">Ingreso este mes</p><h4 className="stat-value">{estadisticas.ingresoMensual}</h4></div></div></div>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-md-8"><div className="card chart-card"><div className="card-header bg-primary text-white"><h5 className="mb-0">Ingresos mensuales</h5></div><div className="card-body"><canvas ref={chartLineRef} id="chartLine" height="120"></canvas></div></div></div>
          <div className="col-md-4"><div className="card chart-card"><div className="card-header bg-primary text-white"><h5 className="mb-0">Distribución de ventas</h5></div><div className="card-body d-flex justify-content-center align-items-center"><canvas ref={chartDonutRef} id="chartDonut" width="200" height="200"></canvas></div></div></div>
        </div>

        <div className="row"><div className="col-md-8 mb-4"><div className="card shadow-sm"><div className="card-header bg-primary text-white"><h5 className="mb-0">Actividad reciente</h5></div><div className="table-responsive"><table className="table mb-0"><thead className="table-light"><tr><th>Fecha y Hora</th><th>Acción</th><th>Monto</th></tr></thead><tbody>{actividadReciente.map(a=> (<tr key={a.fecha}><td className="text-muted small">{a.fecha}</td><td>{a.accion}</td><td><span className={a.monto>=0 ? 'text-success' : 'text-danger'}>{a.monto>=0?'+':''}{a.monto.toFixed(2)}</span></td></tr>))}</tbody></table></div></div></div>
        <div className="col-md-4"><div className="card shadow-sm mb-3"><div className="card-header bg-primary text-white"><h5 className="mb-0">Acciones</h5></div><div className="card-body"><button className="btn btn-primary w-100 mb-2" onClick={()=>alert('Generando reporte...')}>Generar reporte</button><button className="btn btn-outline-primary w-100 mb-2">Configuración</button><button className="btn btn-outline-primary w-100">Gestionar usuarios</button></div></div><div className="card shadow-sm"><div className="card-header bg-primary text-white"><h5 className="mb-0">Perfil</h5></div><div className="card-body"><p><strong>Usuario:</strong> {usuario?.nombre}</p><p><strong>Correo:</strong> {usuario?.correo}</p><p><strong>Rol:</strong> <span className="badge bg-primary">{usuario?.role?.toUpperCase()}</span></p></div></div></div></div>
      </div>
    </div>
  );
}
