using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnSeguimientoActividadesNE
    {
        public int IdSeguimientoActividadesNE { get; set; }
        public string CUI { get; set; }
        public Nullable<int> NroMienbrosMujeres { get; set; }
        public Nullable<int> NroMienbrosHombres { get; set; }
        public Nullable<int> TotalMienbros { get; set; }
    }
}
