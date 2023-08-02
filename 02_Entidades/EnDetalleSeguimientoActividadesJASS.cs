using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnDetalleSeguimientoActividadesJASS
    {
        public string CUI { get; set; }
        public int IdDetalleSeguimientoActividadesJASS { get; set; }
        public int IdSeguimientoActividadesJASS { get; set; }
        public int IdCronogramaActividades { get; set; }
        public Nullable<System.DateTime> Fecha { get; set; }
        public Nullable<int> NroHombres { get; set; }
        public Nullable<int> NroMujeres { get; set; }
        public Nullable<int> Total { get; set; }
        public Nullable<decimal> PorcentageTotal { get; set; }
        public Nullable<int> TotalSAP { get; set; }
        public Nullable<decimal> PorcentageSAP { get; set; }
        public string Comentarios { get; set; }
        public string Actividades { get; set; }
        public string FechaString { get; set; }
        public string Archivos { get; set; }
    }
}
