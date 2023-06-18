using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnPersonaProyecto
    {
        public int IdPersonaProyecto { get; set; }
        public int IdPersona { get; set; }
        public int IdProyecto { get; set; }
        public string Proyecto { get; set; }
    }
}
