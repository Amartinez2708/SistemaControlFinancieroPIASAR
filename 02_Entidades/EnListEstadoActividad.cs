using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnListEstadoActividad
    {
        public int IdProyecto { get; set; }
        public string SNIP { get; set; }
        public string CUI { get; set; }
        public string Ubigeo { get; set; }
        public string cod_dep { get; set; }
        public string cod_prov { get; set; }
        public string cod_dist { get; set; }
        public string PROGRAMA { get; set; }
        public string DEPARTAMENTO { get; set; }
        public string PROVINCIA { get; set; }
        public string DISTRITO { get; set; }
        public string PROYECTO { get; set; }
        public string LOCALIDAD { get; set; }
        public string MTO_PROYECTO { get; set; }
        public string TOTAL_AUTORIZACION { get; set; }
        public string TOTAL_MANIFIESTO { get; set; }
        public string fecha_ult_act { get; set; }
        public Nullable<int> estado { get; set; }
    }
}
