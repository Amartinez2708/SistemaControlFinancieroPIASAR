using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnMANIFIESTO_GASTO
    {
        public int IDMANIFIESTO { get; set; }
        public string NRO_MANIFIESTO { get; set; }
        public int IDPROYECTO { get; set; }
        public Nullable<System.DateTime> FECHA_MANIFIESTO { get; set; }
        public string RUBRO { get; set; }
        public string CORRESPONDE_AL_MES { get; set; }
        public Nullable<int> CORRESPONDE_AL_ANIO { get; set; }
        public string OBSERVACION { get; set; }
        public Nullable<decimal> MONTO_MANIFIESTO { get; set; }
        public Nullable<int> ESTADO_DOCUMENTO { get; set; }
        public string IdsComprobante { get; set; }
        public string Snip { get; set; }
        public string NombreInforme { get; set; }
        public string NombreReal { get; set; }
        public string RutaDocumento { get; set; }
        public string ObservacionDocumento { get; set; }
        public int IdUsuario { get; set; }
        public string PerteneceAl { get; set; }
        public string String_Fecha_Manifiesto { get; set; }
        public string StringEstado_documento { get; set; }
        public string Documento { get; set; }
    }
}
