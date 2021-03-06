//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace _03_Data
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class BD_NucleosEjecutoresEntities : DbContext
    {
        public BD_NucleosEjecutoresEntities()
            : base("name=BD_NucleosEjecutoresEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Menu_Sistema> Menu_Sistema { get; set; }
        public virtual DbSet<Presupuesto_obra> Presupuesto_obra { get; set; }
        public virtual DbSet<ROLES_SISTEMA> ROLES_SISTEMA { get; set; }
        public virtual DbSet<TABLA> TABLA { get; set; }
        public virtual DbSet<TABLA_DETALLE> TABLA_DETALLE { get; set; }
        public virtual DbSet<Ubigeo> Ubigeo { get; set; }
        public virtual DbSet<MANIFIESTO_GASTO_DETALLE> MANIFIESTO_GASTO_DETALLE { get; set; }
        public virtual DbSet<Comprobante> Comprobante { get; set; }
        public virtual DbSet<AUTORIZACION_GASTO_DETALLE> AUTORIZACION_GASTO_DETALLE { get; set; }
        public virtual DbSet<ComprobanteDetalle> ComprobanteDetalle { get; set; }
        public virtual DbSet<CentroPoblado> CentroPoblado { get; set; }
        public virtual DbSet<Departamento> Departamento { get; set; }
        public virtual DbSet<Distrito> Distrito { get; set; }
        public virtual DbSet<Provincia> Provincia { get; set; }
        public virtual DbSet<ListDepa> ListDepa { get; set; }
        public virtual DbSet<ListDist> ListDist { get; set; }
        public virtual DbSet<ListProv> ListProv { get; set; }
        public virtual DbSet<ListEstadoActividad> ListEstadoActividad { get; set; }
        public virtual DbSet<ListEstadoPresupuesto> ListEstadoPresupuesto { get; set; }
        public virtual DbSet<ListEstadoProyecto> ListEstadoProyecto { get; set; }
        public virtual DbSet<ListMontoProyectoVSPresupuesto> ListMontoProyectoVSPresupuesto { get; set; }
        public virtual DbSet<Desembolso> Desembolso { get; set; }
        public virtual DbSet<HistoricoMonitoreo> HistoricoMonitoreo { get; set; }
        public virtual DbSet<Proyecto> Proyecto { get; set; }
        public virtual DbSet<DesembolsoVSJustificado> DesembolsoVSJustificado { get; set; }
        public virtual DbSet<Componente> Componente { get; set; }
        public virtual DbSet<ProgresoSubComponente> ProgresoSubComponente { get; set; }
        public virtual DbSet<SubComponente> SubComponente { get; set; }
        public virtual DbSet<TituloSubComponente> TituloSubComponente { get; set; }
        public virtual DbSet<ProyectosSeguimiento> ProyectosSeguimiento { get; set; }
        public virtual DbSet<SeguimientoEjecucionProyectosInversion> SeguimientoEjecucionProyectosInversion { get; set; }
        public virtual DbSet<DevengadoMensual> DevengadoMensual { get; set; }
        public virtual DbSet<ProgramadoEjecutadoMensual> ProgramadoEjecutadoMensual { get; set; }
        public virtual DbSet<DesembolsoProgramadoAnual> DesembolsoProgramadoAnual { get; set; }
        public virtual DbSet<DesembolsoProgramadoMensual> DesembolsoProgramadoMensual { get; set; }
        public virtual DbSet<USUARIO_SISTEMA> USUARIO_SISTEMA { get; set; }
        public virtual DbSet<Indicador> Indicador { get; set; }
        public virtual DbSet<ProcesoDetalle> ProcesoDetalle { get; set; }
        public virtual DbSet<Autorizacion_Gasto> Autorizacion_Gasto { get; set; }
        public virtual DbSet<MANIFIESTO_GASTO> MANIFIESTO_GASTO { get; set; }
        public virtual DbSet<Movimiento_Documento> Movimiento_Documento { get; set; }
        public virtual DbSet<Movimiento_Documento_Detalle> Movimiento_Documento_Detalle { get; set; }
        public virtual DbSet<Personal> Personal { get; set; }
        public virtual DbSet<Proceso> Proceso { get; set; }
        public virtual DbSet<EjecucionInversion> EjecucionInversion { get; set; }
        public virtual DbSet<EjecucionInversionMes> EjecucionInversionMes { get; set; }
        public virtual DbSet<MonitoreoObras> MonitoreoObras { get; set; }
    
        public virtual ObjectResult<sp_ListAutorizacionRubro_Result> sp_ListAutorizacionRubro(string ids)
        {
            var idsParameter = ids != null ?
                new ObjectParameter("Ids", ids) :
                new ObjectParameter("Ids", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sp_ListAutorizacionRubro_Result>("sp_ListAutorizacionRubro", idsParameter);
        }
    }
}
