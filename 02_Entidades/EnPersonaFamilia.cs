using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnPersonaFamilia
    {
        public int IdPersonaFamilia { get; set; }
        public int IdPersona { get; set; }
        public int IdTipoFamiliar { get; set; }
        public int TipoDocumento { get; set; }
        public string NroDocumento { get; set; }
        public string ApePaterno { get; set; }
        public string ApeMaterno { get; set; }
        public string Nombres { get; set; }
        public string Sexo { get; set; }
        public string TipoSangre { get; set; }
        public Nullable<System.DateTime> FechaNacimiento { get; set; }
        public string UbigeoDireccion { get; set; }
        public string Direccion { get; set; }
        public string Referencia { get; set; }
        public string Celular1 { get; set; }
        public string Celular2 { get; set; }
        public Nullable<bool> Emergencia { get; set; }
        public string TipoNroDcto { get; set; }
        public string Personal { get; set; }
        public string FechaNacimientoString { get; set; }
        public string TipoFamiliar { get; set; }
    }
}
