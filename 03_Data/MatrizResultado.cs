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
    
    public partial class MatrizResultado
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public MatrizResultado()
        {
            this.MatrizResultadoProducto = new HashSet<MatrizResultadoProducto>();
            this.ResultadoEsperado = new HashSet<ResultadoEsperado>();
        }
    
        public int IdMatrizResultado { get; set; }
        public Nullable<int> NroResultado { get; set; }
        public string Resultado { get; set; }
        public Nullable<bool> Activo { get; set; }
        public Nullable<int> IdUsuario_add { get; set; }
        public Nullable<System.DateTime> Fecha_add { get; set; }
        public Nullable<int> IdUsuario_upd { get; set; }
        public Nullable<System.DateTime> Fecha_upd { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MatrizResultadoProducto> MatrizResultadoProducto { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ResultadoEsperado> ResultadoEsperado { get; set; }
    }
}
