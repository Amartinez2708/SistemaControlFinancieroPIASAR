using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using _02_Entidades;
using _03_Data;
using _05_Utilidades;

namespace _04_Servicios
{
    public class SrvMonitoreoObras
    {
        BD_NucleosEjecutoresEntities context = new BD_NucleosEjecutoresEntities();

        public List<EnProyecto> ListProyectos()
        {
            List<EnProyecto> result = new List<EnProyecto>();

            var obj = context.Proyecto.Where(x => x.Cod_subprograma==133 && x.Estado==1).ToList();
            if (obj != null && obj.Count() > 0)
            {
                foreach (var data in obj)
                {
                    var departamento = context.Departamento.FirstOrDefault(x => x.cod_depa == data.IdUbigeo.Substring(0, 2)).nom_depa;
                    var Provincia = context.Provincia.FirstOrDefault(x => x.cod_depa == data.IdUbigeo.Substring(0, 2) && x.cod_prov == data.IdUbigeo.Substring(2, 2)).nom_prov;
                    var Distrito = context.Distrito.FirstOrDefault(x => x.cod_depa == data.IdUbigeo.Substring(0, 2) && x.cod_prov == data.IdUbigeo.Substring(2, 2) && x.cod_dist == data.IdUbigeo.Substring(4, 2)).nom_dist;

                    var objMonitoreo = context.MonitoreoObras.Where(x=>x.IdProyecto==data.IdProyecto && x.Activo==true).OrderByDescending(x => x.Fecha_add).FirstOrDefault();

                    EnProyecto model = new EnProyecto();
                    model.IdProyecto = data.IdProyecto;
                    model.Snip = data.Snip;
                    model.CUI = data.CUI;
                    model.Modalidad = data.Cod_modalidad == 22 ? "NÚCLEO EJECUTOR" :"CONTRATA";
                    model.TipoProyecto = objMonitoreo == null ? "" : objMonitoreo.TipoProyecto == 1 ? "ET" : objMonitoreo.TipoProyecto == 2 ? "OBRA" : "REEMPLAZO";
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
                    

                    result.Add(model);
                }
            }
            return result.ToList();
        }
        public EnMonitoreoObras ListMonitoreoId(int Id)
        {
            EnMonitoreoObras result = new EnMonitoreoObras();

            var obj = context.MonitoreoObras.Where(x => x.IdProyecto == Id && x.Activo == true).OrderByDescending(x => x.Fecha_add).FirstOrDefault();
            if (obj != null)
            {
                var usuario = context.USUARIO_SISTEMA.SingleOrDefault(x => x.IDUSUARIO == obj.IdUsuario_add);
                result.NombreObra = obj.Proyecto.Localidad;
                result.IdMonitoreoObras = obj.IdMonitoreoObras;
                result.IdProyecto = obj.IdProyecto;
                result.PoblacionSNIP = obj.PoblacionSNIP;
                result.Modalidad = obj.Modalidad;
                result.TipoProyecto = obj.TipoProyecto;
                result.TipoEmpresa = obj.TipoEmpresa;
                result.ConsorcioContratista = obj.ConsorcioContratista;
                result.MontoContratado = obj. MontoContratado;
                result.FechaInicioObra = obj.FechaInicioObra;
                result.FechaInicioObraString = obj.FechaInicioObra == null ? "": Convert.ToDateTime(obj.FechaInicioObra).ToString("dd/MM/yyyy");
                result.PlazoContractual = obj.PlazoContractual;
                result.PorcentajeAvanceObra = obj.PorcentajeAvanceObra;
                result.PorcentajeAvanceFinancieroReal = obj.PorcentajeAvanceFinancieroReal;
                result.Estado = obj.Estado;
                result.SubEstado = obj.SubEstado;
                result.SubEstado2 = obj.SubEstado2;
                result.DetalleSituacional = obj.DetalleSituacional;
                result.ConexionesNuevasAgua = obj.ConexionesNuevasAgua;
                result.ConexionesRehabilitadasAgua = obj.ConexionesRehabilitadasAgua;
                result.ConexionesNuevasAlcantarillado = obj.ConexionesNuevasAlcantarillado;
                result.ConexionesRehabilitadasAlcantarillado = obj.ConexionesRehabilitadasAlcantarillado;
                result.FechaActualizacion = obj.Fecha_add == null ? "" : Convert.ToDateTime(obj.Fecha_add).ToString("dd/MM/yyyy hh:mm:ss");
                result.Usuario = usuario == null ? "" : usuario.PERSONAL;
                result.DevengadoAcumulado = obj.DevengadoAcumulado;
            }
            return result;
        }

        public EnRespuesta GuardarMonitoreo(EnMonitoreoObras monitoreo)
        {
            EnRespuesta respuesta = new EnRespuesta();
            using (var dbtran = context.Database.BeginTransaction())
            {
                try
                {
                    var objM = context.MonitoreoObras.Where(x => x.IdProyecto == monitoreo.IdProyecto && x.Activo == true).ToList();
                    objM.ForEach(a => a.Activo = false);
                    context.SaveChanges();

                    MonitoreoObras Nuevo = new MonitoreoObras();
                    Nuevo.IdProyecto = monitoreo.IdProyecto;
                    Nuevo.PoblacionSNIP = monitoreo.PoblacionSNIP;
                    Nuevo.Modalidad = monitoreo.Modalidad;
                    Nuevo.TipoProyecto = monitoreo.TipoProyecto;
                    Nuevo.TipoEmpresa = monitoreo.TipoEmpresa;
                    Nuevo.ConsorcioContratista = monitoreo.ConsorcioContratista;
                    Nuevo.MontoContratado = monitoreo.MontoContratado;
                    Nuevo.FechaInicioObra = monitoreo.FechaInicioObra;
                    Nuevo.PlazoContractual = monitoreo.PlazoContractual;
                    Nuevo.PorcentajeAvanceObra = monitoreo.PorcentajeAvanceObra;
                    Nuevo.PorcentajeAvanceFinancieroReal = monitoreo.PorcentajeAvanceFinancieroReal;
                    Nuevo.DevengadoAcumulado = monitoreo.DevengadoAcumulado;
                    Nuevo.Estado = monitoreo.Estado;
                    Nuevo.SubEstado = monitoreo.SubEstado;
                    Nuevo.SubEstado2 = monitoreo.SubEstado2;
                    Nuevo.DetalleSituacional = monitoreo.DetalleSituacional;
                    Nuevo.ConexionesNuevasAgua = monitoreo.ConexionesNuevasAgua;
                    Nuevo.ConexionesRehabilitadasAgua = monitoreo.ConexionesRehabilitadasAgua;
                    Nuevo.ConexionesNuevasAlcantarillado = monitoreo.ConexionesNuevasAlcantarillado;
                    Nuevo.ConexionesRehabilitadasAlcantarillado = monitoreo.ConexionesRehabilitadasAlcantarillado;
                    Nuevo.Activo = true;
                    Nuevo.IdUsuario_add = monitoreo.IdUsuario;
                    Nuevo.Fecha_add = DateTime.Now;
                    Nuevo.IdUsuario_upd = monitoreo.IdUsuario;
                    Nuevo.Fecha_upd = DateTime.Now;

                    context.MonitoreoObras.Add(Nuevo);
                    context.SaveChanges();

                    dbtran.Commit();
                    //dbtran.Rollback();
                    respuesta.TipoRespuesta = 1;
                    respuesta.Mensaje = "Monitoreo Actualizado Satisfactoriamente";
                    respuesta.ValorDevolucion = "";
                }
                catch (Exception ex)
                {
                    dbtran.Rollback();
                    respuesta.TipoRespuesta = 2;
                    respuesta.Mensaje = ex.ToString();
                    respuesta.ValorDevolucion = "";
                }
            }
            return respuesta;
        }

        public EnRespuesta GetEstado(int id)
        {
            EnRespuesta result = new EnRespuesta();

            if (id == 1)
            {
                result.ValorDevolucion = "Actos Previos";
            }
            else if(id==2)
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
            else if (id == 7)
            {
                result.ValorDevolucion = "Por conflictos sociales";
            }
            return result;
        }
    }
}
