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
    
    public partial class Persona
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Persona()
        {
            this.PersonaFamilia = new HashSet<PersonaFamilia>();
            this.Usuario = new HashSet<Usuario>();
            this.PersonaProyecto = new HashSet<PersonaProyecto>();
        }
    
        public int IdPersona { get; set; }
        public Nullable<int> TipoDocumento { get; set; }
        public string NroDocumento { get; set; }
        public string ApePaterno { get; set; }
        public string ApeMaterno { get; set; }
        public string Nombres { get; set; }
        public string Sexo { get; set; }
        public string TipoSangre { get; set; }
        public Nullable<System.DateTime> FechaNacimiento { get; set; }
        public Nullable<int> EstadoCivil { get; set; }
        public string UbigeoDireccion { get; set; }
        public string Direccion { get; set; }
        public string Referencia { get; set; }
        public Nullable<int> IdCargo { get; set; }
        public Nullable<int> IdNivelProfesional { get; set; }
        public Nullable<int> IdProfesion { get; set; }
        public string Email1 { get; set; }
        public string Email2 { get; set; }
        public string Celular1 { get; set; }
        public string Celular2 { get; set; }
        public bool Activo { get; set; }
        public int IdUsuario_add { get; set; }
        public System.DateTime Fecha_add { get; set; }
        public int IdUsuario_upd { get; set; }
        public System.DateTime Fecha_upd { get; set; }
    
        public virtual Cargo Cargo { get; set; }
        public virtual NivelProfesional NivelProfesional { get; set; }
        public virtual Profesion Profesion { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PersonaFamilia> PersonaFamilia { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Usuario> Usuario { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PersonaProyecto> PersonaProyecto { get; set; }
    }
}
