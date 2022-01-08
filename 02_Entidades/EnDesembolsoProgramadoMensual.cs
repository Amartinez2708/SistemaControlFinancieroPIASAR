using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnDesembolsoProgramadoMensual
    {
        public int IdDesembolsoProgramadoMensual { get; set; }
        public Nullable<int> IdProgramadoAnual { get; set; }
        public Nullable<int> Mes { get; set; }
        public Nullable<decimal> ROProgramado { get; set; }
        public Nullable<decimal> ROOCProgramado { get; set; }
        public Nullable<decimal> RO { get; set; }
        public Nullable<decimal> ROOC { get; set; }
        public string MesNombre { get; set; }
        public Nullable<decimal> TotalProgramado { get; set; }
        public Nullable<decimal> TotalEjecutado { get; set; }
        public Nullable<decimal> Diferencia { get; set; }
        public string CUI { get; set; }
        public string SNIP { get; set; }
        public string Localidad { get; set; }
    }
}
