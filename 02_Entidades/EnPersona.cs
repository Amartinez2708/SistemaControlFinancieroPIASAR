using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnPersona
    {
        public int IdPersona { get; set; }
        public string Dni { get; set; }
        public string ApePaterno { get; set; }
        public string ApeMaterno { get; set; }
        public string Nombres { get; set; }
        public string Sexo { get; set; }
        public int IdCargo { get; set; }
        public string Email1 { get; set; }
        public string Email2 { get; set; }
        public string Celular1 { get; set; }
        public string Celular2 { get; set; }
    }
}
