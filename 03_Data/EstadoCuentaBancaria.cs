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
    
    public partial class EstadoCuentaBancaria
    {
        public int IdEstadoCuentaBancaria { get; set; }
        public Nullable<int> IdProyecto { get; set; }
        public Nullable<int> Anio { get; set; }
        public string Mes { get; set; }
        public string NombreArchivo { get; set; }
        public string RutaArchivo { get; set; }
        public Nullable<int> Estado { get; set; }
        public Nullable<int> IdUsuario_Add { get; set; }
        public Nullable<System.DateTime> Fecha_add { get; set; }
        public Nullable<int> IdUsuario_Upd { get; set; }
        public Nullable<System.DateTime> Fecha_Upd { get; set; }
    }
}
