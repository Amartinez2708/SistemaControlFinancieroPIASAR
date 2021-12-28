using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _02_Entidades
{
    public class EnListProv
    {
        public string cod_depa { get; set; }
        public string cod_prov { get; set; }
        public string Provincia { get; set; }
        public int NroProyectos { get; set; }
        public decimal CostoInversion { get; set; }
        public decimal TotalAutorizacion { get; set; }
        public decimal TotalManifiesto { get; set; }
    }
}