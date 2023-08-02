using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnActividadReciente
    {
        public string Tipo { get; set; }
        public int IdDetalleSeguimiento { get; set; }
        public int IdSeguimiento { get; set; }
        public int IdCronograma { get; set; }
        public Nullable<System.DateTime> Fecha { get; set; }
        public Nullable<System.DateTime> Fecha_add { get; set; }
    }
}
