using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnAutorizacion_Gasto
    {
        public int IdAutorizacion { get; set; }
        public string Nro_autorizacion { get; set; }
        public int IdProyecto { get; set; }
        public Nullable<System.DateTime> Fecha_autorizacion { get; set; }
        public string Concepto { get; set; }
        public string Observacion { get; set; }
        public Nullable<decimal> Monto_acumulado_autorizaciones_anteriores { get; set; }
        public Nullable<decimal> Saldo_disponible_proyecto { get; set; }
        public Nullable<decimal> Monto_autorizacion { get; set; }
        public Nullable<decimal> Saldo_despues_autorizacion { get; set; }
        public Nullable<decimal> Distribucion_transferencia { get; set; }
        public Nullable<decimal> Distribucion_efectivo { get; set; }
        public Nullable<decimal> Distribucion_otros { get; set; }
        public string Ht { get; set; }
        public Nullable<int> Anio_ht { get; set; }
        public Nullable<int> Estado_documento { get; set; }
        public Nullable<int> Estado { get; set; }
        public Nullable<int> Tipo_autorizacion { get; set; }
        public int IdUsuario { get; set; }

        public string StringEstado_documento { get; set; }
        public string StringFecha_autorizacion { get; set; }
        public string Documento { get; set; }
    }
}
