using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnSubComponente
    {
        public int IdSubComponente { get; set; }
        public Nullable<int> IdTituloSubComponente { get; set; }
        public string NroSubComponente { get; set; }
        public string NombreSubComponente { get; set; }
        public string Indicador { get; set; }
        public string Unidad { get; set; }
        public string Progreso { get; set; }
    }
}
