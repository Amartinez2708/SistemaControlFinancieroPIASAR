using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnProyecto
    {
        public int IdProyecto { get; set; }
        public Nullable<int> Act_proy { get; set; }
        public Nullable<int> Cod_programa { get; set; }
        public Nullable<int> Cod_subprograma { get; set; }
        public string Nom_proyecto { get; set; }
        public string IdUbigeo { get; set; }
        public string Localidad { get; set; }
        public Nullable<int> Cod_modalidad { get; set; }
        public string Snip { get; set; }
        public Nullable<System.DateTime> Fecha_aprobacion_epi { get; set; }
        public Nullable<decimal> Monto_aprobacion_epi { get; set; }
        public Nullable<System.DateTime> Fecha_verificacion_epi { get; set; }
        public Nullable<decimal> Monto_verificacion_epi { get; set; }
        public Nullable<int> Nro_beneficiarios_epi { get; set; }
        public string Documento_aprobacion_et { get; set; }
        public Nullable<System.DateTime> Fecha_aprobacion_et { get; set; }
        public Nullable<decimal> Monto_aprobacion_et { get; set; }
        public Nullable<int> Nro_beneficiarios_et { get; set; }
        public Nullable<int> Nro_conexiones_agua_et { get; set; }
        public Nullable<int> Nro_conexiones_saneamiento_et { get; set; }
        public Nullable<int> Plazo_ejecucion_et { get; set; }
        public string Num_convenio_ne { get; set; }
        public Nullable<System.DateTime> Fecha_suscripcion_convenio { get; set; }
        public string Nombre_ne { get; set; }
        public string Nom_cuenta { get; set; }
        public string Num_cta_ahorros { get; set; }
        public Nullable<System.DateTime> Fecha_inicio_programado { get; set; }
        public Nullable<System.DateTime> Fecha_inicio_real { get; set; }
        public Nullable<System.DateTime> Fecha_fin_programado { get; set; }
        public Nullable<System.DateTime> Fecha_fin_real { get; set; }
        public Nullable<int> Plazo_ejecucion_obra { get; set; }
        public Nullable<System.DateTime> Fecha_estimada_termino_ampliacion { get; set; }
        public Nullable<System.DateTime> Fecha_estimada_termino_ampliacion_paralizacion { get; set; }
        public Nullable<decimal> Mto_proyecto { get; set; }
        public Nullable<decimal> Saldo_disponible_real { get; set; }
        public Nullable<decimal> Saldo_disponible { get; set; }
        public Nullable<decimal> Monto_acumulado_autorizacion_real { get; set; }
        public Nullable<decimal> Monto_acumulado_autorizacion { get; set; }
        public Nullable<decimal> Monto_acumulado_manifiesto_gasto_real { get; set; }
        public Nullable<decimal> Monto_acumulado_manifiesto_gasto { get; set; }
        public Nullable<decimal> Monto_transferido { get; set; }
        public Nullable<int> Estado { get; set; }
        public Nullable<int> IdUsuario_add { get; set; }
        public Nullable<System.DateTime> Fecha_add { get; set; }
        public Nullable<int> IdUsuario_upd { get; set; }
        public Nullable<System.DateTime> Fecha_upd { get; set; }
        public Nullable<System.DateTime> Fecha_aprobación_informe_inicial { get; set; }
        public Nullable<System.DateTime> Fecha_aprobación_primer_retiro_fondos { get; set; }
        public string CUI { get; set; }
        public Nullable<decimal> CostoInversionActualizado { get; set; }
        public Nullable<decimal> MontoDesembolso { get; set; }
        public Nullable<double> Latitud { get; set; }
        public Nullable<double> Longitud { get; set; }
        public string Departamento { get; set; }
        public string Provincia { get; set; }
        public string Distrito { get; set; }
        public string Programa { get; set; }
        public string SNIPNombreProyecto { get; set; }
        public string Fecha_inicio_programado_string { get; set; }
        public string Fecha_inicio_real_string { get; set; }
        public string Fecha_fin_programado_string { get; set; }
        public string Fecha_fin_real_string { get; set; }
        public string Grupo { get; set; }
        public Nullable<decimal> TotalAutorizadoAprobado { get; set; }
        public Nullable<decimal> TotalAutorizadoGestionado { get; set; }
        public Nullable<decimal> TotalRendicionAprobado { get; set; }
        public Nullable<decimal> TotalRendicionGestionado { get; set; }
        public string Modalidad { get; set; }
        public string Estados { get; set; }
        public string SubEstado { get; set; }
        public string Subestado2 { get; set; }
        public string PorcentajeAvanceFisico { get; set; }
        public Nullable<decimal> DevengadoAcumulado { get; set; }
        public string Comentarios { get; set; }
        public string TipoProyecto { get; set; }
        public int IdEstado { get; set; }
        public int IdSubEstado { get; set; }
        public int IdSubestado2 { get; set; }
        public int IdTipoProyecto { get; set; }
        public string DetalleSituacional { get; set; }

        public string EstrategiaAccion { get; set; }
        public decimal PorcentajeAvanceObraProgramado { get; set; }

    }
}
