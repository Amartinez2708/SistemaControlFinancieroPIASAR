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
    
    public partial class PersonaProyecto
    {
        public int IdPersonaProyecto { get; set; }
        public int IdPersona { get; set; }
        public int IdProyecto { get; set; }
        public bool Activo { get; set; }
        public int IdUsuario_add { get; set; }
        public System.DateTime Fecha_add { get; set; }
        public int IdUsuario_upd { get; set; }
        public System.DateTime Fecha_upd { get; set; }
    
        public virtual Persona Persona { get; set; }
        public virtual Proyecto Proyecto { get; set; }
    }
}
