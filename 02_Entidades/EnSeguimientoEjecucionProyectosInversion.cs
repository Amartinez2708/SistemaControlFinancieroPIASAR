using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnSeguimientoEjecucionProyectosInversion
    {
        public int IdSeguimientoEjecucionProyectosInversion { get; set; }
        public int IdProyectosSeguimiento { get; set; }
        public Nullable<int> AnioEjecucion { get; set; }
        public Nullable<int> Mes { get; set; }
        public Nullable<System.DateTime> Fecha { get; set; }
        public Nullable<decimal> PIM { get; set; }
    }
}
