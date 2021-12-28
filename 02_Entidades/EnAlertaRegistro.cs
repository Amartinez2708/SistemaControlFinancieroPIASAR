using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnAlertaRegistro
    {
        public string CUI { get; set; }
        public string Departamento { get; set; }
        public string Provincia { get; set; }
        public string Distrito { get; set; }
        public string Localidad { get; set; }
        public string Nro { get; set; }
        public string Fecha { get; set; }
        public decimal Monto { get; set; }
        public string Liquidador { get; set; }
        public string TipoSolicitud { get; set; }
    }
}
