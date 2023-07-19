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
    
    public partial class ContratoAdenda
    {
        public int IdContratoAdenda { get; set; }
        public int IdContrato { get; set; }
        public Nullable<int> AnioAdenda { get; set; }
        public string NroAdenda { get; set; }
        public Nullable<int> TipoAdenda { get; set; }
        public Nullable<System.DateTime> FechaInicio { get; set; }
        public Nullable<System.DateTime> FechaFin { get; set; }
        public Nullable<decimal> MontoAdenda { get; set; }
        public Nullable<int> IdRepresentanteLegal { get; set; }
        public Nullable<bool> Activo { get; set; }
        public Nullable<int> IdUsuario_add { get; set; }
        public Nullable<System.DateTime> Fecha_add { get; set; }
        public Nullable<int> IdUsuario_upd { get; set; }
        public Nullable<System.DateTime> Fecha_upd { get; set; }
    
        public virtual RepresentanteLegal RepresentanteLegal { get; set; }
        public virtual Contrato Contrato { get; set; }
    }
}
