using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnTituloSubComponente
    {
        public int IdTituloSubComponente { get; set; }
        public Nullable<int> IdComponente { get; set; }
        public string NroTituloSubComponente { get; set; }
        public string NombreTituloSubComponente { get; set; }
    }
}
