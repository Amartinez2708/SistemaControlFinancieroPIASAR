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
    
    public partial class ComprobanteDetalle
    {
        public int IdComprobantePagoDetalle { get; set; }
        public Nullable<int> IdComprobante { get; set; }
        public Nullable<int> IdAutorizacion { get; set; }
        public Nullable<int> IdRubro { get; set; }
        public Nullable<int> IdItem { get; set; }
        public string Item_Insumo_Servicio { get; set; }
        public string Descripcion_Insumo_Servicio { get; set; }
        public string Unidad { get; set; }
        public Nullable<decimal> Cantidad { get; set; }
        public Nullable<decimal> PreciUnitario { get; set; }
        public Nullable<decimal> Importe { get; set; }
        public Nullable<decimal> SaldoCantidad { get; set; }
        public Nullable<decimal> SaldoImporte { get; set; }
        public Nullable<int> Estado { get; set; }
        public Nullable<bool> Activo { get; set; }
        public Nullable<int> IdUsuario_add { get; set; }
        public Nullable<System.DateTime> Fecha_add { get; set; }
        public Nullable<int> IdUsuario_upd { get; set; }
        public Nullable<System.DateTime> Fecha_upd { get; set; }
    
        public virtual Comprobante Comprobante { get; set; }
    }
}
