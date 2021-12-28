using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnMonitoreoObras
    {
        public int IdMonitoreoObras { get; set; }
        public int IdProyecto { get; set; }
        public Nullable<int> PoblacionSNIP { get; set; }
        public Nullable<int> Modalidad { get; set; }
        public Nullable<int> TipoProyecto { get; set; }
        public Nullable<int> TipoEmpresa { get; set; }
        public string ConsorcioContratista { get; set; }
        public Nullable<decimal> MontoContratado { get; set; }
        public Nullable<System.DateTime> FechaInicioObra { get; set; }
        public Nullable<int> PlazoContractual { get; set; }
        public Nullable<decimal> PorcentajeAvanceObra { get; set; }
        public Nullable<decimal> PorcentajeAvanceFinancieroReal { get; set; }
        public Nullable<int> Estado { get; set; }
        public Nullable<int> SubEstado { get; set; }
        public Nullable<int> SubEstado2 { get; set; }
        public string DetalleSituacional { get; set; }
        public Nullable<int> ConexionesNuevasAgua { get; set; }
        public Nullable<int> ConexionesRehabilitadasAgua { get; set; }
        public Nullable<int> ConexionesNuevasAlcantarillado { get; set; }
        public Nullable<int> ConexionesRehabilitadasAlcantarillado { get; set; }
        public string FechaInicioObraString { get; set; }
        public string NombreObra { get; set; }
        public string FechaActualizacion { get; set; }
        public string Usuario { get; set; }
        public int IdUsuario { get; set; }
        public Nullable<decimal> DevengadoAcumulado { get; set; }
    }
}
