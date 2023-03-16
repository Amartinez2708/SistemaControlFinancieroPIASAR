using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnListSeguimientoDetalle
    {
        public string CUI { get; set; }
        public string Ubigeo { get; set; }
        public string Departamento { get; set; }
        public string Provincia { get; set; }
        public string Distrito { get; set; }
        public string Localidad { get; set; }
        public int IdTipoSeguimiento { get; set; }
        public string TipoSeguimiento { get; set; }
        public int IdTipoBienArticulo { get; set; }
        public string TipoBienArticulo { get; set; }
        public int check { get; set; }
        public decimal PorcentageAvance { get; set; }
        public string Fecha { get; set; }
        public Nullable<int>  NroHombres { get; set; }
        public Nullable<int> NroMujeres { get; set; }
        public Nullable<int> Total { get; set; }
        public Nullable<decimal>  PorcentageTotal { get; set; }
        public Nullable<int>  TotalSAP { get; set; }
        public Nullable<decimal>  PorcentageTotalSAP { get; set; }

        //public string TipoBienArticulo2 { get; set; }
        //public int check2 { get; set; }

        //public string TipoBienArticulo3 { get; set; }
        //public int check3 { get; set; }

        //public string TipoBienArticulo4 { get; set; }
        //public int check4 { get; set; }

        //public string TipoBienArticulo5 { get; set; }
        //public int check5 { get; set; }

        //public string TipoBienArticulo6 { get; set; }
        //public int check6 { get; set; }

        //public string TipoBienArticulo7 { get; set; }
        //public int check7 { get; set; }
    }
}
