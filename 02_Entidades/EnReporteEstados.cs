using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnReporteEstados
    {
        public string Departamento { get; set; }
        public int Concluidos { get; set; }
        public int EnEjecucion { get; set; }
        public int EnSuspensionPlazos { get; set; }
        public int PorIniciar { get; set; }
        public int SuscripcionContrato { get; set; }
        public int PorConvocar { get; set; }
        public int ActualizacionPresupuesto { get; set; }
        public int Reemplazo { get; set; }
        public int EnTramiteFirmaConvenio { get; set; }
        public int Total { get; set; }
    }
}
