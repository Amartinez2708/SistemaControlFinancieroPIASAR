using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _02_Entidades
{
    public class ReporteObras
    {
        public string UbicacionGeografica { get; set; }
        public Nullable<decimal> NroTotalObras { get; set; }
        public Nullable<decimal> CostoTotalObras { get; set; }
        public Nullable<decimal> NroTotalBeneficiarios { get; set; }
        public Nullable<decimal> NroTotalConexionesAguas { get; set; }
        public Nullable<decimal> NroTotalConexionesSaneamiento { get; set; }
        public Nullable<decimal> MontoTotalAutorizaciones { get; set; }
        public Nullable<decimal> MontoTotalManifiestos { get; set; }
        public Nullable<decimal> MontoDesembolsado { get; set; }
        public Nullable<decimal> PorcentajeJustificado { get; set; }
    }
}