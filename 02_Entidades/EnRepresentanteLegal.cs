using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnRepresentanteLegal
    {
        public int IdRepresentanteLegal { get; set; }
        public Nullable<int> IdPersona { get; set; }
        public string AbreviaturaProfesional { get; set; }
        public string Persona { get; set; }
    }
}
