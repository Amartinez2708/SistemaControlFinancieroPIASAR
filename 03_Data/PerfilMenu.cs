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
    
    public partial class PerfilMenu
    {
        public int IdPerfilMenu { get; set; }
        public int IdPerfil { get; set; }
        public int IdMenuSistema { get; set; }
        public Nullable<bool> Permiso_lectura { get; set; }
        public Nullable<bool> Permiso_escritura { get; set; }
        public Nullable<bool> Permiso_eliminar { get; set; }
        public bool Activo { get; set; }
        public int IdUsuario_add { get; set; }
        public System.DateTime Fecha_add { get; set; }
        public int IdUsuario_upd { get; set; }
        public System.DateTime Fecha_upd { get; set; }
    
        public virtual MenuSistema MenuSistema { get; set; }
        public virtual Perfil Perfil { get; set; }
    }
}
