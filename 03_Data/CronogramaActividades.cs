//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace _03_Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class CronogramaActividades
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public CronogramaActividades()
        {
            this.DetalleSeguimientoActividadesFamilias = new HashSet<DetalleSeguimientoActividadesFamilias>();
            this.DetalleSeguimientoActividadesNE = new HashSet<DetalleSeguimientoActividadesNE>();
            this.DetalleSeguimientoActividadesJASS = new HashSet<DetalleSeguimientoActividadesJASS>();
            this.DetalleSeguimientoActividadesATM = new HashSet<DetalleSeguimientoActividadesATM>();
        }
    
        public int IdCronogramaActividades { get; set; }
        public string Tipo { get; set; }
        public Nullable<int> NroMes { get; set; }
        public int IdTipoActividad { get; set; }
        public string Actividad { get; set; }
        public string Etapa { get; set; }
        public Nullable<bool> Activo { get; set; }
        public Nullable<int> IdUsuario_add { get; set; }
        public Nullable<System.DateTime> Fecha_add { get; set; }
        public Nullable<int> IdUsuario_upd { get; set; }
        public Nullable<System.DateTime> Fecha_upd { get; set; }
    
        public virtual TipoActividad TipoActividad { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DetalleSeguimientoActividadesFamilias> DetalleSeguimientoActividadesFamilias { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DetalleSeguimientoActividadesNE> DetalleSeguimientoActividadesNE { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DetalleSeguimientoActividadesJASS> DetalleSeguimientoActividadesJASS { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DetalleSeguimientoActividadesATM> DetalleSeguimientoActividadesATM { get; set; }
    }
}
