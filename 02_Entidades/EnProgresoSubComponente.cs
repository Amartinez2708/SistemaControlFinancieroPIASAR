using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnProgresoSubComponente
    {
        public int IdProgresoSubComponente { get; set; }
        public Nullable<int> IdSubComponente { get; set; }
        public Nullable<decimal> P { get; set; }
        public Nullable<decimal> PA { get; set; }
        public Nullable<decimal> A { get; set; }
        public Nullable<decimal> PorcentajeProgreso { get; set; }
        public Nullable<int> Anio { get; set; }
        public int IdComponente { get; set; }
        public string NroComponente { get; set; }
        public string NombreComponente { get; set; }
        public int IdTituloSubComponente { get; set; }
        public string NroTituloSubComponente { get; set; }
        public string NombreTituloSubComponente { get; set; }
        public string NroSubComponente { get; set; }
        public string NombreSubComponente { get; set; }
        public string Indicador { get; set; }
        public string Unidad { get; set; }
        public string Progreso { get; set; }
        public int IdUsuario { get; set; }
    }
}
