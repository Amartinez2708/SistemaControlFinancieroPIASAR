using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnSeguimientoActividadesFamilias
    {
        public int IdSeguimientoActividades { get; set; }
        public string CUI { get; set; }
        public string Paquete { get; set; }
        public Nullable<int> NroPoblacionMujeres { get; set; }
        public Nullable<int> NroPoblaciónHombres { get; set; }
        public Nullable<int> TotalPoblacion { get; set; }
        public Nullable<int> NroUsuariosMujeres { get; set; }
        public Nullable<int> NroUsuariosHombres { get; set; }
        public Nullable<int> TotalUsuarios { get; set; }
        public Nullable<int> NroPoblacionFlotante { get; set; }
        public Nullable<int> NroTotalViviendasValidadas { get; set; }
        public Nullable<int> NroTotalInstitucionesValidadas { get; set; }
        public Nullable<int> TotalInstitucionesViviendasValidadas { get; set; }
        public Nullable<int> NroCentrosEducativos { get; set; }
        public string NivelCentrosEducativos { get; set; }
        public string CentroSalud { get; set; }
    }
}
