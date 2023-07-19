using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnSeguimientoDetalleArchivo
    {
        public int IdSeguimientoDetalleArchivo { get; set; }
        public string TipoSeguimiento { get; set; }
        public Nullable<int> IdSeguimiento { get; set; }
        public Nullable<int> IdDetalleSeguimiento { get; set; }
        public string NombreArchivo { get; set; }
        public string NombreRealArchivo { get; set; }
        public string FolderPath { get; set; }
        public string TamanioArchivo { get; set; }
    }
}
