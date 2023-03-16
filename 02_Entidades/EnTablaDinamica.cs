using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnTablaDinamica
    {
        public virtual List<EnTablaDinamicaColumnas> Columnas { get; set; }
        public virtual List<EnTablaDinamicaColumnas> ColumnasSecundaria { get; set; }
        public virtual List<EnListSeguimientoDetalleActividades> DetalleActividades { get; set; }
    }
}
