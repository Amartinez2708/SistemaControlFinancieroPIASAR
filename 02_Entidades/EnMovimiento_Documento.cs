using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnMovimiento_Documento
    {
        public int IdMovimiento { get; set; }
        public Nullable<int> IdProyecto { get; set; }
        public string Tipo_documento { get; set; }
        public Nullable<int> IdDocumento { get; set; }
        public Nullable<int> IdMovimiento_anterior { get; set; }
        public Nullable<int> Tipo_envia_documento { get; set; }
        public Nullable<int> IdUsuario_envia_documento { get; set; }
        public Nullable<System.DateTime> Fecha_envia_documento { get; set; }
        public Nullable<int> Tipo_recibe_documento { get; set; }
        public Nullable<int> IdUsuario_recibe_documento { get; set; }
        public Nullable<System.DateTime> Fecha_recibe_documento { get; set; }
        public Nullable<System.DateTime> Fecha_atiende_documento { get; set; }
        public string Observacion_documento { get; set; }
        public string Nombre_documento_aprobacion { get; set; }
        public string Adjunto_observacion { get; set; }
        public Nullable<int> Estado_documento { get; set; }
        public Nullable<int> Estado { get; set; }
        public Nullable<int> Orden_envia { get; set; }
    }
}
