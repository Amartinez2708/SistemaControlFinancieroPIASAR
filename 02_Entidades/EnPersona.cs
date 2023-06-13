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
        public Nullable<int> TipoDocumento { get; set; }
        public string NroDocumento { get; set; }
        public string ApePaterno { get; set; }
        public string ApeMaterno { get; set; }
        public string Nombres { get; set; }
        public string Sexo { get; set; }
        public Nullable<int> TipoSangre { get; set; }
        public Nullable<System.DateTime> FechaNacimiento { get; set; }
        public Nullable<int> EstadoCivil { get; set; }
        public string UbigeoDireccion { get; set; }
        public string Direccion { get; set; }
        public string Referencia { get; set; }
        public Nullable<int> IdCargo { get; set; }
        public Nullable<int> IdNivelProfesional { get; set; }
        public Nullable<int> IdProfesion { get; set; }
        public string Email1 { get; set; }
        public string Email2 { get; set; }
        public string Celular1 { get; set; }
        public string Celular2 { get; set; }
        public string FechaNacimientoString { get; set; }
        public string Personal { get; set; }
        public string FechaFinConsultoria { get; set; }
        public string EstadoConsultoria { get; set; }
        public string Cargo { get; set; }
        public string NivelProfesional { get; set; }
        public string Profesion { get; set; }
        public string TipoNroDcto { get; set; }
    }
}
