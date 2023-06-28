using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnContratoAdenda
    {
        public int IdContratoAdenda { get; set; }
        public int IdContrato { get; set; }
        public Nullable<int> AnioAdenda { get; set; }
        public string NroAdenda { get; set; }
        public Nullable<int> TipoAdenda { get; set; }
        public Nullable<System.DateTime> FechaInicio { get; set; }
        public Nullable<System.DateTime> FechaFin { get; set; }
        public Nullable<decimal> MontoAdenda { get; set; }
        public Nullable<int> IdRepresentanteLegal { get; set; }
        public string RepresentanteLegal { get; set; }
    }
}
