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
    
    public partial class ResultadoEsperadoAnio
    {
        public int IdResultadoEsperadoAnio { get; set; }
        public int IdResultadoEsperado { get; set; }
        public Nullable<int> NroAnio { get; set; }
        public Nullable<int> Anio { get; set; }
        public Nullable<decimal> Programado { get; set; }
        public Nullable<decimal> Avanzado { get; set; }
        public Nullable<bool> Activo { get; set; }
        public Nullable<int> IdUsuario_add { get; set; }
        public Nullable<System.DateTime> Fecha_add { get; set; }
        public Nullable<int> IdUsuario_upd { get; set; }
        public Nullable<System.DateTime> Fecha_upd { get; set; }
    
        public virtual ResultadoEsperado ResultadoEsperado { get; set; }
    }
}
