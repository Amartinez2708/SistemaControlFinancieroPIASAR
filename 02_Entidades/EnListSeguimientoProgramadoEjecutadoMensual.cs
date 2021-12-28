using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnListSeguimientoProgramadoEjecutadoMensual
    {
        public int IdProyectosSeguimiento { get; set; }
        public Nullable<int> CodGrupo { get; set; }
        public string dgpp { get; set; }
        public string ProyectoInversion { get; set; }
        public int IdSeguimientoEjecucionProyectosInversion { get; set; }
        public Nullable<int> AnioEjecucion { get; set; }
        public Nullable<int> Mes { get; set; }
        public Nullable<System.DateTime> Fecha { get; set; }
        public Nullable<decimal> PIM { get; set; }
        public int IdProgramadoEjecutadoMensual { get; set; }
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
        public int IdDevengadoMensual { get; set; }
        public Nullable<decimal> DevengadoAcumulado { get; set; }
        public Nullable<decimal> DiferenciaGasto { get; set; }
        public Nullable<decimal> PorcentajeAvanceGasto { get; set; }
        public string DetalleGastoMensual { get; set; }
        public int IdUsuario { get; set; }
        public string FechaString { get; set; }
    }
}
