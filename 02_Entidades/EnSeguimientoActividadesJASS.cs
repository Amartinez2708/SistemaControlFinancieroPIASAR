using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnSeguimientoActividadesJASS
    {
        public int IdSeguimientoActividadesJASS { get; set; }
        public string CUI { get; set; }
        public Nullable<int> NroAsociadosMujeres { get; set; }
        public Nullable<int> NroAsociadosHombres { get; set; }
        public Nullable<int> TotalAsociados { get; set; }
        public Nullable<int> TotalViviendasValidadas { get; set; }
        public Nullable<int> TotalInstitucionesValidadas { get; set; }
        public Nullable<int> TotalInstitucionesViviendasValidadas { get; set; }
        public Nullable<int> NroOperadoresSAPMujeres { get; set; }
        public Nullable<int> NroOperadoresSAPHombres { get; set; }
        public Nullable<int> TotalOperadores{ get; set; }
        public Nullable<int> TotalAutoridadesLideres { get; set; }
        public Nullable<int> NroIdentificacionLideres { get; set; }
    }
}
