using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnDevengadoMensual
    {
        public int IdDevengadoMensual { get; set; }
        public int IdSeguimientoEjecucionProyectosInversion { get; set; }
        public Nullable<decimal> DevengadoAcumulado { get; set; }
        public Nullable<decimal> DiferenciaGasto { get; set; }
        public Nullable<decimal> PorcentajeAvanceGasto { get; set; }
        public string DetalleGastoMensual { get; set; }
    }
}
