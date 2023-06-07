using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnDetalleSeguimientoActividadesFamilias
    {
        public string CUI { get; set; }
        public int IdDetalleSeguimientoActividadesFamilias { get; set; }
        public int IdSeguimientoActividades { get; set; }
        public int IdCronogramaActividades { get; set; }
        public Nullable<System.DateTime> Fecha { get; set; }
        public Nullable<int> NroHombres { get; set; }
        public Nullable<int> NroMujeres { get; set; }
        public Nullable<int> Total { get; set; }
        public Nullable<decimal> PorcentageAsistencia { get; set; }
        public string Actividades { get; set; }
        public string FechaString { get; set; }
    }
}
