using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnUsuarioPerfil
    {
        public int IdUsuarioPerfil { get; set; }
        public Nullable<int> IdUsuario { get; set; }
        public Nullable<int> IdPerfil { get; set; }
    }
}
