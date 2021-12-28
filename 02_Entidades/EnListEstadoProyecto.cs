using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnListEstadoProyecto
    {
        public int IdProyecto { get; set; }
        public string Programa { get; set; }
        public string Departamento { get; set; }
        public string Provincia { get; set; }
        public string Distrito { get; set; }
        public string Ubigeo { get; set; }
        public string cod_dep { get; set; }
        public string cod_prov { get; set; }
        public string cod_dist { get; set; }
        public string SNIP { get; set; }
        public string CUI { get; set; }
        public string Proyecto { get; set; }
        public string Localidad { get; set; }
        public string Fecha_de_Aprobación_Estudio_Pre_Inversión { get; set; }
        public string Fecha_de_Verificación_Estudio_Pre_Inversión { get; set; }
        public string Fecha_de_Aprobación_Expediente_Técnico { get; set; }
        public string Fecha_de_Suscripción_del_Convenio { get; set; }
        public string Fecha_de_Inicio_Programado { get; set; }
        public string Fecha_de_Inicio_Real { get; set; }
        public string Fecha_de_Fin_Programado { get; set; }
        public string Fecha_de_Fin_Real { get; set; }
        public string Fecha_de_Ultima_Actualización { get; set; }
        public decimal PorcentajeAvance { get; set; }
    }
}
