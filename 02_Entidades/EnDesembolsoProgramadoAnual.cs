using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnDesembolsoProgramadoAnual
    {
        public int IdProgramadoAnual { get; set; }
        public Nullable<int> IdProyecto { get; set; }
        public Nullable<int> Anio { get; set; }
        public Nullable<decimal> RO { get; set; }
        public Nullable<decimal> ROOC { get; set; }
    }
}
