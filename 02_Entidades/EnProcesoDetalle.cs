using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnProcesoDetalle
    {
        public int IdProcesoDetalle { get; set; }
        public int IdProceso { get; set; }
        public Nullable<int> AnioProcesoDetalle { get; set; }
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

        public int CantidadEnero { get; set; }
        public int CantidadFebrero { get; set; }
        public int CantidadMarzo { get; set; }
        public int CantidadAbril { get; set; }
        public int CantidadMayo { get; set; }
        public int CantidadJunio { get; set; }
        public int CantidadJulio { get; set; }
        public int CantidadAgosto { get; set; }
        public int CantidadSeptiembre { get; set; }
        public int CantidadOctubre { get; set; }
        public int CantidadNoviembre { get; set; }
        public int CantidadDiciembre { get; set; }

        public string Mes { get; set; }
        public int Cantidad { get; set; }
        public decimal Monto { get; set; }
    }
}
