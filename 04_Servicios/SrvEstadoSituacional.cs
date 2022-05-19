using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using _02_Entidades;
using _03_Data;

namespace _04_Servicios
{
    public class SrvEstadoSituacional
    {
        BD_NucleosEjecutoresEntities context = new BD_NucleosEjecutoresEntities();

        public EnIndicadores Indicadores()
        {
            EnIndicadores result = new EnIndicadores();

            var obj = context.MonitoreoObras.Where(x => x.Activo == true).ToList();

            //Concluidas
            result.NroPorRecepcionar = obj.Where(x => x.TipoProyecto == 2 && x.Estado == 2 && x.SubEstado == 12).Count();
            result.NroRecepcionada = obj.Where(x => x.TipoProyecto == 2 && x.Estado == 2 && x.SubEstado == 15).Count();
            result.NroRecepcionObservada = obj.Where(x => x.TipoProyecto == 2 && x.Estado == 2 && x.SubEstado == 14).Count();

            result.NroOtaEjecucion = obj.Where(x => x.TipoProyecto == 2 && x.Estado == 5 && x.SubEstado == 7).Count();
            result.NroOtaConcluida = obj.Where(x => x.TipoProyecto == 2 && x.Estado == 5 && x.SubEstado == 5).Count();

            result.NroOtaLiquidada = obj.Where(x => x.TipoProyecto == 2 && x.Estado == 5 && x.SubEstado == 17).Count();
            result.NroEnLiquidacion = obj.Where(x => x.TipoProyecto == 2 && (x.Estado == 5 || x.Estado == 2) && x.SubEstado == 6).Count();
            result.NroOtaPorIniciar = obj.Where(x => x.TipoProyecto == 2 && x.Estado == 5 && x.SubEstado == 11).Count();


            //Proyecto Reemplazo
            result.NroEnProcesoReemplazo = obj.Where(x => x.TipoProyecto == 3 && x.Estado == 4 && x.SubEstado == 7).Count();
            result.nroContrataEnProcesoReemplazo = obj.Where(x => x.TipoProyecto == 3 && x.Estado == 4 && x.SubEstado == 7 && x.Modalidad == 190).Count();
            result.nroNucleoEnProcesoReemplazo = obj.Where(x => x.TipoProyecto == 3 && x.Estado == 4 && x.SubEstado == 7 && x.Modalidad == 22).Count();

            result.NroConcluidoReemplazo = obj.Where(x => x.TipoProyecto == 3 && x.Estado == 2).Count();
            result.nroContrataConcluidoReemplazo = obj.Where(x => x.TipoProyecto == 3 && x.Estado == 2 && x.Modalidad == 190).Count();
            result.nroNucleoConcluidoReemplazo = obj.Where(x => x.TipoProyecto == 3 && x.Estado == 2 && x.Modalidad == 22).Count();

            //Expediente Técnico
            //result.NroActosPreviosET = obj.Where(x => x.Estado == 1 && x.TipoProyecto == 1).Count();
            //result.nroContrataActosPreviosET = obj.Where(x => x.Estado == 1 && x.TipoProyecto == 1 && x.Modalidad == 190).Count();
            //result.nroNucleoActosPreviosET = obj.Where(x => x.Estado == 1 && x.TipoProyecto == 1 && x.Modalidad == 22).Count();

            result.NroElaboracionET = obj.Where(x => x.Estado == 4 && x.TipoProyecto == 1).Count();
            result.nroContrataElaboracionET = obj.Where(x => x.Estado == 4 && x.TipoProyecto == 1 && x.Modalidad == 190).Count();
            result.nroNucleoElaboracionET = obj.Where(x => x.Estado == 4 && x.TipoProyecto == 1 && x.Modalidad == 22).Count();

            result.NroConcluidoET = obj.Where(x => x.Estado == 2 && x.TipoProyecto == 1).Count();
            result.nroContrataConcluidoET = obj.Where(x => x.Estado == 2 && x.TipoProyecto == 1 && x.Modalidad == 190).Count();
            result.nroNucleoConcluidoET = obj.Where(x => x.Estado == 2 && x.TipoProyecto == 1 && x.Modalidad == 22).Count();

            //Obra
            result.NroActosPrevios = obj.Where(x => x.Estado == 1 && x.TipoProyecto == 2).Count();
            result.nroContrataIniciarO = obj.Where(x => x.Estado == 1 && x.TipoProyecto == 2 && x.Modalidad == 190).Count();
            result.nroNucleoIniciarO = obj.Where(x => x.Estado == 1 && x.TipoProyecto == 2 && x.Modalidad == 22).Count();

            result.NroPorConvocarO = obj.Where(x => x.Estado == 7 && x.TipoProyecto == 2).Count();
            result.nroContrataPorConvocarO = obj.Where(x => x.Estado == 7 && x.TipoProyecto == 2 && x.Modalidad == 190).Count();
            result.nroNucleoPorConvocarO = obj.Where(x => x.Estado == 7 && x.TipoProyecto == 2 && x.Modalidad == 22).Count();

            result.NroEjecucion = obj.Where(x => x.Estado == 3 && x.TipoProyecto == 2).Count();
            result.nroContrataEjecucionO = obj.Where(x => x.Estado == 3 && x.TipoProyecto == 2 && x.Modalidad == 190).Count();
            result.nroNucleoEjecucionO = obj.Where(x => x.Estado == 3 && x.TipoProyecto == 2 && x.Modalidad == 22).Count();

            result.NroConcluido = obj.Where(x => x.Estado == 2 && x.TipoProyecto == 2).Count() + obj.Where(x => x.Estado == 5 && x.TipoProyecto == 2).Count();
            result.nroContrataConcluidoO = obj.Where(x => x.Estado == 2 && x.TipoProyecto == 2 && x.Modalidad == 190).Count() + obj.Where(x => x.Estado == 5 && x.TipoProyecto == 2 && x.Modalidad == 190).Count();
            result.nroNucleoConcluidoO = obj.Where(x => x.Estado == 2 && x.TipoProyecto == 2 && x.Modalidad == 22).Count() + obj.Where(x => x.Estado == 5 && x.TipoProyecto == 2 && x.Modalidad == 22).Count();

            result.nroEnProcesoLiquidacionConvenio = obj.Count();
            result.nroConvenioLiquidado = 0;


            return result;
        }

        public List<EnProyecto> ListProyectos()
        {
            List<EnProyecto> result = new List<EnProyecto>();

            var obj = context.Proyecto.Where(x => x.Cod_subprograma == 133 && x.Estado == 1).ToList();
            if (obj != null && obj.Count() > 0)
            {
                foreach (var data in obj)
                {
                    var departamento = context.Departamento.FirstOrDefault(x => x.cod_depa == data.IdUbigeo.Substring(0, 2)).nom_depa;
                    var Provincia = context.Provincia.FirstOrDefault(x => x.cod_depa == data.IdUbigeo.Substring(0, 2) && x.cod_prov == data.IdUbigeo.Substring(2, 2)).nom_prov;
                    var Distrito = context.Distrito.FirstOrDefault(x => x.cod_depa == data.IdUbigeo.Substring(0, 2) && x.cod_prov == data.IdUbigeo.Substring(2, 2) && x.cod_dist == data.IdUbigeo.Substring(4, 2)).nom_dist;

                    var objMonitoreo = context.MonitoreoObras.Where(x => x.IdProyecto == data.IdProyecto && x.Activo == true).OrderByDescending(x => x.Fecha_add).FirstOrDefault();

                    EnProyecto model = new EnProyecto();
                    model.IdProyecto = data.IdProyecto;
                    model.Snip = data.Snip;
                    model.CUI = data.CUI;
                    model.Cod_modalidad = data.Cod_modalidad;
                    model.Modalidad = data.Cod_modalidad == 22 ? "NÚCLEO EJECUTOR" : "CONTRATA";
                    model.IdUbigeo = data.IdUbigeo;
                    model.Departamento = departamento;
                    model.Provincia = Provincia;
                    model.Distrito = Distrito;
                    model.Nom_proyecto = data.Nom_proyecto;
                    model.Localidad = data.Localidad;
                    model.PorcentajeAvanceFisico = objMonitoreo == null ? "0.00 %" : objMonitoreo.PorcentajeAvanceObra.ToString() + " %";
                    model.Estados = objMonitoreo == null ? "" : GetEstado(Convert.ToInt32(objMonitoreo.Estado)).ValorDevolucion;
                    model.SubEstado = objMonitoreo == null ? "" : GetSubEstado(Convert.ToInt32(objMonitoreo.SubEstado)).ValorDevolucion;
                    model.Subestado2 = objMonitoreo == null ? "" : GetSubEstado2(Convert.ToInt32(objMonitoreo.SubEstado2)).ValorDevolucion;
                    model.IdEstado = objMonitoreo == null ? 0 : Convert.ToInt32(objMonitoreo.Estado);
                    model.IdSubEstado = objMonitoreo == null ? 0 : Convert.ToInt32(objMonitoreo.SubEstado);
                    model.IdSubestado2 = objMonitoreo == null ? 0 : Convert.ToInt32(objMonitoreo.SubEstado2);
                    model.DevengadoAcumulado = objMonitoreo.DevengadoAcumulado;
                    model.Comentarios = objMonitoreo.DetalleSituacional;
                    model.TipoProyecto = objMonitoreo == null ? "" : Convert.ToInt32(objMonitoreo.TipoProyecto) == 1 ? "Expediente Técnico" : "Obra";
                    model.IdTipoProyecto = objMonitoreo == null ? 0 : Convert.ToInt32(objMonitoreo.TipoProyecto);
                    model.PorcentajeAvanceObraProgramado = objMonitoreo.PorcentajeAvanceObraProgramado;
                    model.EstrategiaAccion = objMonitoreo.EstrategiaAccion;
                    result.Add(model);
                }
            }
            return result.ToList();
        }

        public List<EnReporteEstados> ListCuadroResumenPorRegion(int modalidad)
        {
            List<EnReporteEstados> result = new List<EnReporteEstados>();

            string[] CodDep = { "01", "05", "06", "12", "16", "20", "21", "22", "25"};
            var objDep = context.Departamento.Where(x => CodDep.Contains(x.cod_depa)).ToList();

            foreach (var item in objDep)
            {

                List<int> ListProyectos = context.Proyecto.Where(x => x.Cod_subprograma == 133 && x.IdUbigeo.Substring(0, 2) == item.cod_depa && x.Cod_modalidad == modalidad).Select(x => x.IdProyecto).ToList();
                var obj = context.MonitoreoObras.Where(x => x.Activo == true && ListProyectos.Contains(x.IdProyecto)).ToList();

                EnReporteEstados reporte = new EnReporteEstados();
                reporte.Departamento = item.nom_depa;
                reporte.Concluidos = obj.Where(x => x.Estado == 2).Count() + obj.Where(x => x.Estado == 5).Count();
                reporte.EnEjecucion = obj.Where(x => x.Estado == 3).Count();
                reporte.EnSuspensionPlazos = obj.Where(x => x.Estado == 3 && x.SubEstado==16).Count();
                reporte.PorIniciar = obj.Where(x => x.Estado == 2).Count() + obj.Where(x => x.Estado == 5).Count();
                reporte.SuscripcionContrato = obj.Where(x => x.Estado == 2).Count() + obj.Where(x => x.Estado == 5).Count();
                reporte.PorConvocar = obj.Where(x => x.Estado == 2).Count() + obj.Where(x => x.Estado == 5).Count();
                reporte.ActualizacionPresupuesto = obj.Where(x => x.Estado == 2).Count() + obj.Where(x => x.Estado == 5).Count();
                reporte.Reemplazo = obj.Where(x => x.Estado == 2).Count() + obj.Where(x => x.Estado == 5).Count();
                reporte.EnTramiteFirmaConvenio = obj.Where(x => x.Estado == 2).Count() + obj.Where(x => x.Estado == 5).Count();
                reporte.Total = obj.Where(x => x.Estado == 2).Count() + obj.Where(x => x.Estado == 5).Count();
            }

            return result.ToList();
        }


        public EnRespuesta GetEstado(int id)
        {
            EnRespuesta result = new EnRespuesta();

            if (id == 1)
            {
                result.ValorDevolucion = "Actos Previos";
            }
            else if (id == 2)
            {
                result.ValorDevolucion = "Concluido";
            }
            else if (id == 3)
            {
                result.ValorDevolucion = "En Ejecución";
            }
            else if (id == 4)
            {
                result.ValorDevolucion = "En Elaboración";
            }
            else if (id == 5)
            {
                result.ValorDevolucion = "Post Ejecución";
            }
            else if (id == 6)
            {
                result.ValorDevolucion = "En Proceso de Suscripción de Contrato";
            }
            else if (id == 7)
            {
                result.ValorDevolucion = "Por Convocar";
            }
            else if (id == 8)
            {
                result.ValorDevolucion = "Actualización de Presupuestos";
            }
            else if (id == 9)
            {
                result.ValorDevolucion = "Por Reemplazar";
            }
            else if (id == 10)
            {
                result.ValorDevolucion = "En Tramite de Firma de Convenio";
            }
            else if (id == 11)
            {
                result.ValorDevolucion = "Paralizada";
            }

            return result;
        }
        public EnRespuesta GetSubEstado(int id)
        {
            EnRespuesta result = new EnRespuesta();

            if (id == 1)
            {
                result.ValorDevolucion = "Adelantada";
            }
            else if (id == 2)
            {
                result.ValorDevolucion = "Aprobada con RD";
            }
            else if (id == 3)
            {
                result.ValorDevolucion = "Atrasada";
            }
            else if (id == 4)
            {
                result.ValorDevolucion = "Con Aprobación Técnica";
            }
            else if (id == 5)
            {
                result.ValorDevolucion = "Concluida";
            }
            else if (id == 6)
            {
                result.ValorDevolucion = "En Liquidación";
            }
            else if (id == 7)
            {
                result.ValorDevolucion = "En Proceso";
            }
            else if (id == 8)
            {
                result.ValorDevolucion = "Normal";
            }
            else if (id == 9)
            {
                result.ValorDevolucion = "Obra Reiniciada";
            }
            else if (id == 10)
            {
                result.ValorDevolucion = "Paralizado";
            }
            else if (id == 11)
            {
                result.ValorDevolucion = "Por Iniciar";
            }
            else if (id == 12)
            {
                result.ValorDevolucion = "Por recepcionar";
            }
            else if (id == 13)
            {
                result.ValorDevolucion = "Proceso de Selección";
            }
            else if (id == 14)
            {
                result.ValorDevolucion = "Recepción Observada";
            }
            else if (id == 15)
            {
                result.ValorDevolucion = "Recepcionada";
            }
            else if (id == 16)
            {
                result.ValorDevolucion = "Suspensión del plazo de ejecución";
            }
            else if (id == 17)
            {
                result.ValorDevolucion = "Liquidada";
            }
            else if (id == 18)
            {
                result.ValorDevolucion = "En Ejecución";
            }
            else if (id == 19)
            {
                result.ValorDevolucion = "Permanente";
            }
            else if (id == 20)
            {
                result.ValorDevolucion = "Por Convocar";
            }
            else if (id == 21)
            {
                result.ValorDevolucion = "En Transferencia";
            }
            else if (id == 22)
            {
                result.ValorDevolucion = "Transferido";
            }
            //else if (id == 20)
            //{
            //    result.ValorDevolucion = "En Proceso de Liquidación de Convenio";
            //}
            //else if (id == 21)
            //{
            //    result.ValorDevolucion = "Convenio Liquidado";
            //}

            return result;
        }
        public EnRespuesta GetSubEstado2(int id)
        {
            EnRespuesta result = new EnRespuesta();

            if (id == 0)
            {
                result.ValorDevolucion = "";
            }
            else if (id == 1)
            {
                result.ValorDevolucion = "Ejecución de Proyecto Complementario";
            }
            else if (id == 2)
            {
                result.ValorDevolucion = "Falta de Recursos";
            }
            else if (id == 3)
            {
                result.ValorDevolucion = "Incremento de Actividades y Plazos al Cronograma";
            }
            else if (id == 4)
            {
                result.ValorDevolucion = "Por eventos no atribuibles a las partes";
            }
            else if (id == 5)
            {
                result.ValorDevolucion = "Problemas Climatológicos";
            }
            else if (id == 6)
            {
                result.ValorDevolucion = "Problemas con Autorizaciones y Permisos";
            }
            return result;
        }
    }
}
