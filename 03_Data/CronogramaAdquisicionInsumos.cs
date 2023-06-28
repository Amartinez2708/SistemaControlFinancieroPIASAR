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
    
    public partial class CronogramaAdquisicionInsumos
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public CronogramaAdquisicionInsumos()
        {
            this.CronogramaAdquisicionInsumosDetalle = new HashSet<CronogramaAdquisicionInsumosDetalle>();
        }
    
        public int IdCronogramaAdquisicionInsumos { get; set; }
        public Nullable<int> IdProyecto { get; set; }
        public Nullable<System.DateTime> Fecha { get; set; }
        public Nullable<decimal> MontoTotalProgramado { get; set; }
        public Nullable<int> NroMeses { get; set; }
        public Nullable<int> Estado { get; set; }
        public Nullable<bool> Activo { get; set; }
        public Nullable<int> IdUsuario_add { get; set; }
        public Nullable<System.DateTime> Fecha_add { get; set; }
        public Nullable<int> IdUsuario_upd { get; set; }
        public Nullable<System.DateTime> Fecha_upd { get; set; }
    
        public virtual Proyecto Proyecto { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CronogramaAdquisicionInsumosDetalle> CronogramaAdquisicionInsumosDetalle { get; set; }
    }
}
