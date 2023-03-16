using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnListSeguimiento
    {
        public int Nivel { get; set; }
        public int IdTipoSeguimiento { get; set; }
        public string TipoSeguimiento { get; set; }
        public string TipoBienArticulo { get; set; }
        public int Cantidad { get; set; }
        public decimal Costo { get; set; }
        public decimal Avance { get; set; }

        public string CUI { get; set; }
        public string Localidad { get; set; }
        public int check { get; set; }
    }
}
