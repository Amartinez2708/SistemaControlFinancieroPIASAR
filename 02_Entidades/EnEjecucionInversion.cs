using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnEjecucionInversion
    {
        public int IdEjecucionInversion { get; set; }
        public Nullable<int> IdCategoriaGasto { get; set; }
        public string CategoriaGasto { get; set; }
        public Nullable<int> Orden { get; set; }
        public Nullable<int> Nivel { get; set; }
        public string GenericaGasto { get; set; }
        public Nullable<decimal> PIM { get; set; }
        public Nullable<decimal> Certificado { get; set; }
        public Nullable<decimal> AvanceCertificadoPorcentage { get; set; }
        public Nullable<decimal> Compromiso { get; set; }
        public Nullable<decimal> AvanceCompromiso { get; set; }
        public Nullable<decimal> Devengado { get; set; }
        public Nullable<decimal> AvanceDevengadoPorcentage { get; set; }
        public Nullable<int> Anio { get; set; }
        public Nullable<int> Mes { get; set; }
        public Nullable<System.DateTime> Fecha { get; set; }
        public Nullable<decimal> ProgramadoMes { get; set; }
        public Nullable<decimal> EjecutadoMes { get; set; }
        public Nullable<decimal> Porcentage { get; set; }
        public Nullable<decimal> PorEjecutar { get; set; }
    }
}
