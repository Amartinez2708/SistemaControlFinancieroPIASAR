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
    
    public partial class Movimiento_Documento_Detalle
    {
        public int IdDocumento_detalle { get; set; }
        public int IdMovimiento { get; set; }
        public string Nombre_documento { get; set; }
        public string Nombre_real_documento { get; set; }
        public string Ruta_documento { get; set; }
        public string Cod_pagina { get; set; }
        public Nullable<bool> Estado { get; set; }
        public Nullable<int> IdUsuario_add { get; set; }
        public Nullable<System.DateTime> Fecha_add { get; set; }
        public Nullable<int> IdUsuario_upd { get; set; }
        public Nullable<System.DateTime> Fecha_upd { get; set; }
    
        public virtual Movimiento_Documento Movimiento_Documento { get; set; }
    }
}
