using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnIndicadoresInicio
    {
        public int NroProyectos { get; set; }
        public int NroProyectosAsignados { get; set; }
        public int NroRegistrosRealizados { get; set; }
        public int NroActividadesFamilias { get; set; }
        public int NroActividadesNE { get; set; }
        public int NroActividadesJASS { get; set; }
        public int NroActividadesATM { get; set; }
        public string AreaIntervencion { get; set; }
        public int NroLocalidadesIntervenidad { get; set; }
        public string Personal { get; set; }
        public int NroRegistrosFamilias { get; set; }
        public string FechaUltimaActualizacionFamilias { get; set; }
        public int NroRegistrosNE { get; set; }
        public string FechaUltimaActualizacionNE { get; set; }
        public int NroRegistrosJASS { get; set; }
        public string FechaUltimaActualizacionJASS { get; set; }
        public int NroRegistrosATM { get; set; }
        public string FechaUltimaActualizacionATM { get; set; }
        public int Orden { get; set; }
        public int NroRegistroPrincipal { get; set; }
        public string Principal { get; set; }
        public int NroRegistroFamilias { get; set; }
        public decimal PRFamilia { get; set; }
        public int NroRegistroNE { get; set; }
        public decimal PRNE { get; set; }
        public int NroRegistroJASS { get; set; }
        public decimal PRJASS { get; set; }
        public int NroRegistroATM { get; set; }
        public decimal PRATM { get; set; }

    }
}
