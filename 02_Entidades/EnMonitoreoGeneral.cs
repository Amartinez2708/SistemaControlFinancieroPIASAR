using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnMonitoreoGeneral
    {
        public int Mes { get; set; }
        public int Anio { get; set; }
        public string fecha { get; set; }
        public string MesAnio { get; set; }
        public string MesS { get; set; }
        public Nullable<decimal> MetaMes_CT { get; set; }
        public Nullable<decimal> ResultadoMes_CT { get; set; }
        public Nullable<decimal> PorcentajeMes_CT { get; set; }
        public Nullable<decimal> MetaMes_CA { get; set; }
        public Nullable<decimal> ResultadoMes_CA { get; set; }
        public Nullable<decimal> PorcentajeMes_CA { get; set; }
        public Nullable<decimal> MetaMes_C2 { get; set; }
        public Nullable<decimal> ResultadoMes_C2 { get; set; }
        public Nullable<decimal> PorcentajeMes_C2 { get; set; }
        public Nullable<decimal> MetaMes_T { get; set; }
        public Nullable<decimal> ResultadoMes_T { get; set; }
        public Nullable<decimal> PorcentajeMes_T { get; set; }
    }
}
