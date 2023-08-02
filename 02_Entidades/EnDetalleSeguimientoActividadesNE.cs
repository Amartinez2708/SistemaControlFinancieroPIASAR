using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnDetalleSeguimientoActividadesNE
    {
        public int IdDetalleSeguimientoActividadesNE { get; set; }
        public int IdSeguimientoActividadesNE { get; set; }
        public int IdCronogramaActividades { get; set; }
        public Nullable<System.DateTime> Fecha { get; set; }
        public Nullable<int> NroHombres { get; set; }
        public Nullable<int> NroMujeres { get; set; }
        public Nullable<int> Total { get; set; }
        public string CUI { get; set; }
        public string Actividades { get; set; }
        public string FechaString { get; set; }
        public string Archivos { get; set; }
    }
}
