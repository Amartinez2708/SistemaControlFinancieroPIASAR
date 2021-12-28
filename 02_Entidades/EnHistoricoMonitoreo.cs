using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnHistoricoMonitoreo
    {
        public int IdHistoricoMonitoreo { get; set; }
        public Nullable<decimal> MontoTotalTransferido { get; set; }
        public Nullable<decimal> MontoTotalAutorizaciones { get; set; }
        public Nullable<decimal> MontoTotalRendiciones { get; set; }
        public Nullable<System.DateTime> FechaActualizacion { get; set; }
        public String StringFechaActualizacion { get; set; }
        public String Mes { get; set; }
        public Nullable<decimal> MontoTransferidoPorcentaje { get; set; }
        public Nullable<decimal> MontoAutorizacionesPorcentaje { get; set; }
        public Nullable<decimal> MontoRendicionesPorcentaje { get; set; }
    }
}
