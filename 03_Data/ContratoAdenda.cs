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