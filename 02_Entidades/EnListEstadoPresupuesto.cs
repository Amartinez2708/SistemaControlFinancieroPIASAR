using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnListEstadoPresupuesto
    {
        public int IdProyecto { get; set; }
        public string Programa { get; set; }
        public string Departamento { get; set; }
        public string Provincia { get; set; }
        public string Distrito { get; set; }
        public string Ubigeo { get; set; }
        public string cod_dep { get; set; }
        public string cod_prov { get; set; }
        public string cod_dist { get; set; }
        public string SNIP { get; set; }
        public string CUI { get; set; }
        public string Proyecto { get; set; }
        public string Localidad { get; set; }
        public string Presupuesto { get; set; }
        public string Fecha_Actualización_Presupuesto { get; set; }
        public decimal PorcentajeAvance { get; set; }
    }
}
