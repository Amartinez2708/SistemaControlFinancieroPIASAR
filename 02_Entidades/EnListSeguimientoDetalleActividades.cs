using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnListSeguimientoDetalleActividades
    {
        public string CUI { get; set; }
        public string Ubigeo { get; set; }
        public string Departamento { get; set; }
        public string Provincia { get; set; }
        public string Distrito { get; set; }
        public string Localidad { get; set; }
        public string Fecha { get; set; }
        public Nullable<int> NroHombres { get; set; }
        public Nullable<int> NroMujeres { get; set; }
        public Nullable<int> Total { get; set; }
        public Nullable<decimal> PorcentageTotal { get; set; }
        public Nullable<int> TotalSAP { get; set; }
        public Nullable<decimal> PorcentageTotalSAP { get; set; }
        public string Tipo { get; set; }
        public Nullable<int> TotalProgramado { get; set; }
        public Nullable<int> TotalAvanzado { get; set; }
        public Nullable<decimal> PorcentageAvanzado { get; set; }
        public int Anio { get; set; }
        public string Acta { get; set; }

    }
}
