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
    
    public partial class ProductoAnio
    {
        public int IdProductoAnio { get; set; }
        public int IdProducto { get; set; }
        public Nullable<int> NroAnio { get; set; }
        public Nullable<int> Anio { get; set; }
        public Nullable<decimal> Programado { get; set; }
        public Nullable<decimal> Avanzado { get; set; }
        public Nullable<bool> Activo { get; set; }
        public Nullable<int> IdUsuario_add { get; set; }
        public Nullable<System.DateTime> Fecha_add { get; set; }
        public Nullable<int> IdUsuario_upd { get; set; }
        public Nullable<System.DateTime> Fecha_upd { get; set; }
        public Nullable<decimal> ProgramadoAjustado { get; set; }
    
        public virtual Producto Producto { get; set; }
    }
}
