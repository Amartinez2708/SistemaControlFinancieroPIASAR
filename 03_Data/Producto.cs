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
    
    public partial class Producto
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Producto()
        {
            this.MatrizResultadoProducto = new HashSet<MatrizResultadoProducto>();
            this.ProductoAnio = new HashSet<ProductoAnio>();
        }
    
        public int IdProducto { get; set; }
        public Nullable<int> NroProducto { get; set; }
        public string Producto1 { get; set; }
        public int IdComponente { get; set; }
        public Nullable<decimal> CostoEstimado { get; set; }
        public string UnidadMedida { get; set; }
        public string IconoUnidadMedida { get; set; }
        public Nullable<int> LineaBase { get; set; }
        public Nullable<decimal> Meta { get; set; }
        public string MedioVerificacion { get; set; }
        public string Observaciones { get; set; }
        public Nullable<bool> Activo { get; set; }
        public Nullable<int> IdUsuario_add { get; set; }
        public Nullable<System.DateTime> Fecha_add { get; set; }
        public Nullable<int> IdUsuario_upd { get; set; }
        public Nullable<System.DateTime> Fecha_upd { get; set; }
    
        public virtual Componente Componente { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MatrizResultadoProducto> MatrizResultadoProducto { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ProductoAnio> ProductoAnio { get; set; }
    }
}