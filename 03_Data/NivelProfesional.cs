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
    
    public partial class NivelProfesional
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public NivelProfesional()
        {
            this.Persona = new HashSet<Persona>();
        }
    
        public int IdNivelProfesional { get; set; }
        public string NivelProfesional1 { get; set; }
        public bool Activo { get; set; }
        public int IdUsuario_add { get; set; }
        public System.DateTime Fecha_add { get; set; }
        public int IdUsuario_upd { get; set; }
        public System.DateTime Fecha_upd { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Persona> Persona { get; set; }
    }
}
