using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnProgramadoEjecutadoMensual
    {
        public int IdProgramadoEjecutadoMensual { get; set; }
        public int IdSeguimientoEjecucionProyectosInversion { get; set; }
        public Nullable<decimal> ProgramadoMes { get; set; }
        public Nullable<decimal> ProgramadoSemanaUno { get; set; }
        public Nullable<decimal> EjecutadoSemanaUno { get; set; }
        public Nullable<decimal> ProgramadoSemanaDos { get; set; }
        public Nullable<decimal> EjecutadoSemanaDos { get; set; }
        public Nullable<decimal> ProgramadoSemanaTres { get; set; }
        public Nullable<decimal> EjecutadoSemanaTres { get; set; }
        public Nullable<decimal> ProgramadoSemanaCuatro { get; set; }
        public Nullable<decimal> EjecutadoSemanaCuatro { get; set; }
        public Nullable<decimal> ProgramadoSemanaCinco { get; set; }
        public Nullable<decimal> EjecutadoSemanaCinco { get; set; }
        public Nullable<decimal> TotalProgramado { get; set; }
    }
}
