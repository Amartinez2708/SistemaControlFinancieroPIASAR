using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnDesembolsoVSJustificado
    {
        public Nullable<long> Nro { get; set; }
        public int IdProyecto { get; set; }
        public string Programa { get; set; }
        public string Ubigeo { get; set; }
        public string cod_dep { get; set; }
        public string cod_prov { get; set; }
        public string cod_dist { get; set; }
        public string Departamento { get; set; }
        public string Provincia { get; set; }
        public string Distrito { get; set; }
        public string Localidad { get; set; }
        public string Snip { get; set; }
        public string CUI { get; set; }
        public string Nom_proyecto { get; set; }
        public Nullable<decimal> Mto_proyecto { get; set; }
        public decimal Desembolso { get; set; }
        public decimal Autorizacion { get; set; }
        public decimal AutorizacionGestionada { get; set; }
        public decimal Manifiesto { get; set; }
        public decimal ManifiestoGestionado { get; set; }
        public decimal Porcentaje { get; set; }
        public string Liquidador { get; set; }
        public int Anio { get; set; }
        public string Grupo { get; set; }
        public string FechaUltAut { get; set; }
        public string FechaUltMan { get; set; }
        public int NroDias { get; set; }
        public int Estado { get; set; }
        public decimal PendienteAutorizacion { get; set; }
        public decimal PendienteRendicion { get; set; }
        public decimal PorcentajePendienteAutorizacion { get; set; }
        public decimal PorcentajePendienteRendicion { get; set; }
        public string PorcentajeAvanceFisico { get; set; }

    }
}
