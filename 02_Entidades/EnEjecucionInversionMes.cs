using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnEjecucionInversionMes
    {
        public int IdEjecucionInversionMes { get; set; }
        public int IdEjecucionInversion { get; set; }
        public Nullable<int> Mes { get; set; }
        public Nullable<System.DateTime> Fecha { get; set; }
        public Nullable<decimal> ProgramadoMes { get; set; }
        public Nullable<decimal> EjecutadoMes { get; set; }
        public Nullable<decimal> Porcentage { get; set; }
        public Nullable<decimal> PorEjecutar { get; set; }

        public string MesText { get; set; }
        public Nullable<decimal> ProgramadoMesPIASAR { get; set; }
        public Nullable<decimal> EjecutadoMesPIASAR { get; set; }
        public Nullable<decimal> PorcentagePIASAR { get; set; }
        public Nullable<decimal> PorEjecutarPIASAR { get; set; }

        public Nullable<decimal> ProgramadoMesAR { get; set; }
        public Nullable<decimal> EjecutadoMesAR { get; set; }
        public Nullable<decimal> PorcentageAR { get; set; }
        public Nullable<decimal> PorEjecutarAR { get; set; }

        public Nullable<decimal> ProgramadoMesUTP { get; set; }
        public Nullable<decimal> EjecutadoMesUTP { get; set; }
        public Nullable<decimal> PorcentageUTP { get; set; }
        public Nullable<decimal> PorEjecutarUTP { get; set; }
    }
}
