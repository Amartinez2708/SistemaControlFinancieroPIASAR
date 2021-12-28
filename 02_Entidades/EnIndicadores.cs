using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnIndicadores
    {
        public int NroObras { get; set; }
        public decimal MontoObras { get; set; }
        public decimal MtoAutorizacion { get; set; }
        public decimal MtoManifiesto { get; set; }
        public decimal MtoAutorizacionGestionada { get; set; }
        public decimal MtoManifiestoGestionada { get; set; }
        public decimal MtoDesembolso { get; set; }
        public decimal PorcentajeJustificacion { get; set; }
        public decimal PendienteAutorizacion { get; set; }
        public decimal PendienteRendicion { get; set; }
        public decimal PorcentajePendienteAutorizacion { get; set; }
        public decimal PorcentajePendienteRendicion { get; set; }
        public decimal MtoAutorizacionAnterior { get; set; }
        public decimal MtoManifiestoAnterior { get; set; }
        public decimal MtoDesembolsoAnterior { get; set; }
        public string FechaAnterior { get; set; }
        public string FechaActual { get; set; }
        public int NroActosPrevios { get; set; }
        public int NroConcluido { get; set; }
        public int NroEjecucion { get; set; }
        public int NroElaboracion { get; set; }
        public int NroPostEjecucion { get; set; }
        public int NroActosPreviosET { get; set; }
        public int NroConcluidoET { get; set; }
        public int NroElaboracionET { get; set; }


        public int NroRecepcionada { get; set; }
        public int NroRecepcionObservada { get; set; }
        public int NroPorRecepcionar { get; set; }
        public int NroOtaPorIniciar { get; set; }
        public int NroOtaEjecucion { get; set; }
        public int NroOtaConcluida { get; set; }
        public int NroOtaLiquidada { get; set; }
        public int NroEnLiquidacion { get; set; }
    }
}
