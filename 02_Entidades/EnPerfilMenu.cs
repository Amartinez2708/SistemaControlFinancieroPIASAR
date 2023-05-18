using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnPerfilMenu
    {
        public int IdPerfilMenu { get; set; }
        public int IdPerfil { get; set; }
        public int IdMenuSistema { get; set; }
        public Nullable<bool> Permiso_lectura { get; set; }
        public Nullable<bool> Permiso_escritura { get; set; }
        public Nullable<bool> Permiso_eliminar { get; set; }
    }
}
