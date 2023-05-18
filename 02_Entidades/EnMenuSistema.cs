using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnMenuSistema
    {
        public int IdMenuSistema { get; set; }
        public string Titulo_padre { get; set; }
        public string Descripcion { get; set; }
        public Nullable<int> IdMenu_padre { get; set; }
        public string Url { get; set; }
        public Nullable<int> Menu_jerarquia { get; set; }
        public string Icono { get; set; }
    }
}
