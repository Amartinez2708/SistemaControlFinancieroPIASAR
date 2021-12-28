using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnEstadoFinanciero
    {
        public int orden { get; set; }
        public string Departamento { get; set; }
        public decimal PendienteAutorizacionAbreviado { get; set; }
        public decimal PendienteRendicionAbreviado { get; set; }
        public decimal PendienteAutorizacion { get; set; }
        public decimal PendienteRendicion { get; set; }
        public decimal TotalAutorizacion { get; set; }
        public decimal TotalRendicion { get; set; }
        public decimal TotalPorEjecutar { get; set; }
        public decimal PorcentajeTotalPorEjecutar { get; set; }
    }
}
