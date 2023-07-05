using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnContrato
    {
        public int IdContrato { get; set; }
        public int IdPersona { get; set; }
        public string DireccionContrato { get; set; }
        public Nullable<int> AnioContrato { get; set; }
        public string NroContrato { get; set; }
        public Nullable<int> IdTipoContrato { get; set; }
        public Nullable<int> IdCargo { get; set; }
        public Nullable<int> IdOficinaDependencia { get; set; }
        public string EjecucionTrabajoSupervision { get; set; }
        public Nullable<System.DateTime> FechaInicio { get; set; }
        public Nullable<System.DateTime> FechaFin { get; set; }
        public Nullable<int> IdLugarPrestacionServicios { get; set; }
        public Nullable<decimal> MontoContrato { get; set; }
        public Nullable<decimal> MontoMensual { get; set; }
        public string FormaPago { get; set; }
        public Nullable<int> IdRepresentanteLegal { get; set; }
        public string Estado { get; set; }

        public string Persona { get; set; }
        public string TipoContrato { get; set; }
        public string Cargo { get; set; }
        public string OficinaDependencia { get; set; }
        public string LugarPrestacionServicios { get; set; }
        public string RepresentanteLegal { get; set; }
        public string FechaInicioString { get; set; }
        public string FechaFinString { get; set; }
        public string PersonaDNI { get; set; }
        public string Plazo { get; set; }
        public string FechaInicioLetras { get; set; }
        public string FechaFinLetras { get; set; }
        public string MontoContratoLetras { get; set; }
        public string NroCelularPersona { get; set; }
        public string EmailPersona { get; set; }
    }
}
