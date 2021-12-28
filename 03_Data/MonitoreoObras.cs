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
    using System.Collections.Generic;
    
    public partial class MonitoreoObras
    {
        public int IdMonitoreoObras { get; set; }
        public int IdProyecto { get; set; }
        public Nullable<int> PoblacionSNIP { get; set; }
        public Nullable<int> Modalidad { get; set; }
        public Nullable<int> TipoProyecto { get; set; }
        public Nullable<int> TipoEmpresa { get; set; }
        public string ConsorcioContratista { get; set; }
        public Nullable<decimal> MontoContratado { get; set; }
        public Nullable<System.DateTime> FechaInicioObra { get; set; }
        public Nullable<int> PlazoContractual { get; set; }
        public Nullable<decimal> PorcentajeAvanceObra { get; set; }
        public Nullable<decimal> PorcentajeAvanceFinancieroReal { get; set; }
        public Nullable<int> Estado { get; set; }
        public Nullable<int> SubEstado { get; set; }
        public Nullable<int> SubEstado2 { get; set; }
        public string DetalleSituacional { get; set; }
        public Nullable<int> ConexionesNuevasAgua { get; set; }
        public Nullable<int> ConexionesRehabilitadasAgua { get; set; }
        public Nullable<int> ConexionesNuevasAlcantarillado { get; set; }
        public Nullable<int> ConexionesRehabilitadasAlcantarillado { get; set; }
        public Nullable<bool> Activo { get; set; }
        public Nullable<int> IdUsuario_add { get; set; }
        public Nullable<System.DateTime> Fecha_add { get; set; }
        public Nullable<int> IdUsuario_upd { get; set; }
        public Nullable<System.DateTime> Fecha_upd { get; set; }
        public Nullable<decimal> DevengadoAcumulado { get; set; }
    
        public virtual Proyecto Proyecto { get; set; }
    }
}
