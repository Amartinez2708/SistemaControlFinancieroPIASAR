using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnComprobanteDetalle
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
        public string Rubro { get; set; }
        public string CodRubro { get; set; }
        public virtual EnComprobante Comprobante { get; set; }
        //public Nullable<decimal> SaldoImporte { get; set; }
    }
}
