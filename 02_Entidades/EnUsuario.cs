using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnUsuario
    {
        public int IdUsuario { get; set; }
        public int IdPersonal { get; set; }
        public string Usuario1 { get; set; }
        public string Password { get; set; }
        public System.DateTime FechaCaducidad { get; set; }

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

        public int IdPerfil { get; set; }
        public string Perfil { get; set; }

        public string NombreCompleto { get; set; }
    }
}
