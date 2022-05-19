using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnProceso
    {
        public int IdProceso { get; set; }
        public int IdComponente { get; set; }
        public string NroProceso { get; set; }
        public string NombreProceso { get; set; }
        public int IdIndicador { get; set; }
        public Nullable<int> AnioProceso { get; set; }
        public Nullable<int> TipoAntiguedad { get; set; }
        public decimal MontoProceso { get; set; }
        public int IdUnidadResponsable { get; set; }
        public string Responsable1 { get; set; }
        public string Responsable2 { get; set; }
        public Nullable<int> TipoProceso { get; set; }
        public Nullable<int> EstrategiaProcesoAdquisicion { get; set; }
        public string Hito1 { get; set; }
        public string Hito2 { get; set; }
        public Nullable<int> ElaboroETTDR { get; set; }
        public bool Revisado { get; set; }
        public Nullable<int> Estado { get; set; }
        public bool HT { get; set; }
        public string NumeroHT { get; set; }
        public bool CCP { get; set; }
        public string Observacion { get; set; }
        public string EstadoString { get; set; }
        public int Cantidad { get; set; }
        public string TextIndicador { get; set; }
        public string TextAntiguedad { get; set; }
        public string TextUnidadResponsable { get; set; }
        public string TextTipoProceso { get; set; }
        public string TextEstrategiaProcesoAdquisicion { get; set; }
        public string TextElaboroETTDR { get; set; }      
        public string TextRevisado { get; set; }
        public string TextHT { get; set; }
        public string TextCCP { get; set; }


        public decimal Enero { get; set; }
        public decimal Febrero { get; set; }
        public decimal Marzo { get; set; }
        public decimal Abril { get; set; }
        public decimal Mayo { get; set; }
        public decimal Junio { get; set; }
        public decimal Julio { get; set; }
        public decimal Agosto { get; set; }
        public decimal Septiembre { get; set; }
        public decimal Octubre { get; set; }
        public decimal Noviembre { get; set; }
        public decimal Diciembre { get; set; }
        public Nullable<int> Semestre { get; set; }
        public string TextSemestre { get; set; }
    }
}
