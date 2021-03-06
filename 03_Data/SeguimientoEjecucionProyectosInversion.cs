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
    
    public partial class SeguimientoEjecucionProyectosInversion
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SeguimientoEjecucionProyectosInversion()
        {
            this.DevengadoMensual = new HashSet<DevengadoMensual>();
            this.ProgramadoEjecutadoMensual = new HashSet<ProgramadoEjecutadoMensual>();
        }
    
        public int IdSeguimientoEjecucionProyectosInversion { get; set; }
        public int IdProyectosSeguimiento { get; set; }
        public Nullable<int> AnioEjecucion { get; set; }
        public Nullable<int> Mes { get; set; }
        public Nullable<System.DateTime> Fecha { get; set; }
        public Nullable<decimal> PIM { get; set; }
        public Nullable<bool> Activo { get; set; }
        public Nullable<int> IdUsuario_add { get; set; }
        public Nullable<System.DateTime> Fecha_add { get; set; }
        public Nullable<int> IdUsuario_upd { get; set; }
        public Nullable<System.DateTime> Fecha_upd { get; set; }
    
        public virtual ProyectosSeguimiento ProyectosSeguimiento { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DevengadoMensual> DevengadoMensual { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ProgramadoEjecutadoMensual> ProgramadoEjecutadoMensual { get; set; }
    }
}
