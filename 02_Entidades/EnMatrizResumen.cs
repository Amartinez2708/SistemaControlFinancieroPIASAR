using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnMatrizResumen
    {
        public int Nivel { get; set; }
        public int NroResultado { get; set; }
        public string Resultado { get; set; }
        public string ResultadoEsperado { get; set; }
        public int NroComponente { get; set; }
        public string Componente { get; set; }
        public int NroProducto { get; set; }
        public string Producto { get; set; }
        public decimal CostoEstimado { get; set; }
        public string ResultadoContribuye { get; set; }
        public string UnidadMedida { get; set; }
        public int LineaBase { get; set; }
        public int AnioLineaBase { get; set; }
        public int NroAnio1 { get; set; }
        public int Anio1 { get; set; }
        public decimal Anio1_A { get; set; }
        public decimal Anio1_P { get; set; }
        public int NroAnio2 { get; set; }
        public int Anio2 { get; set; }
        public decimal Anio2_A { get; set; }
        public decimal Anio2_P { get; set; }
        public int NroAnio3 { get; set; }
        public int Anio3 { get; set; }
        public decimal Anio3_A { get; set; }
        public decimal Anio3_P { get; set; }
        public int NroAnio4 { get; set; }
        public int Anio4 { get; set; }
        public decimal Anio4_A { get; set; }
        public decimal Anio4_P { get; set; }
        public int NroAnio5 { get; set; }
        public int Anio5 { get; set; }
        public decimal Anio5_A { get; set; }
        public decimal Anio5_P { get; set; }
        public decimal Meta_A { get; set; }
        public decimal Meta_P { get; set; }
        public string MedioVerificacion { get; set; }
        public string Observaciones { get; set; }
    }
}
