using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnComprobante
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public EnComprobante()
        {
            this.ComprobanteDetalle = new HashSet<EnComprobanteDetalle>();
        }
        public int IdComprobante { get; set; }
        public Nullable<int> IdClase { get; set; }
        public string NroComrpobante { get; set; }
        public string RazonSocial { get; set; }
        public Nullable<System.DateTime> Fecha { get; set; }
        public string Observacion { get; set; }
        public Nullable<int> Tipo { get; set; }
        public Nullable<int> Estado { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<EnComprobanteDetalle> ComprobanteDetalle { get; set; }
    }
}
