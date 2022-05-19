using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnIndicador
    {
        public int IdIndicador { get; set; }
        public int IdComponente { get; set; }
        public Nullable<int> NroIndicador { get; set; }
        public string Descripcion { get; set; }

        public string NroIndicadorText { get; set; }
        public int Cantidad { get; set; }
        public decimal Monto { get; set; }
    }
}
