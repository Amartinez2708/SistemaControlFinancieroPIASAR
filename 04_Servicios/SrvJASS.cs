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
    public class SrvJASS
    {
        BD_NucleosEjecutoresEntities context = new BD_NucleosEjecutoresEntities();

        public List<EnProyecto> ListProyectos()
        {
            List<EnProyecto> result = new List<EnProyecto>();

            List<int> objProyectoAsignados = context.PersonaProyecto.Where(x => x.IdPersona == SecurityManager<EnUsuario>.User.IdPersonal && x.Activo == true).Select(x => x.IdProyecto).ToList();

            var obj = context.Proyecto.Where(x => x.Cod_subprograma == 133 && (objProyectoAsignados.Count() == 0 || objProyectoAsignados.Contains(x.IdProyecto)) && x.Estado == 1).ToList();
            if (obj != null && obj.Count() > 0)
            {
                foreach (var data in obj)
                {
                    var departamento = context.Departamento.FirstOrDefault(x => x.cod_depa == data.IdUbigeo.Substring(0, 2)).nom_depa;
                    var Provincia = context.Provincia.FirstOrDefault(x => x.cod_depa == data.IdUbigeo.Substring(0, 2) && x.cod_prov == data.IdUbigeo.Substring(2, 2)).nom_prov;
                    var Distrito = context.Distrito.FirstOrDefault(x => x.cod_depa == data.IdUbigeo.Substring(0, 2) && x.cod_prov == data.IdUbigeo.Substring(2, 2) && x.cod_dist == data.IdUbigeo.Substring(4, 2)).nom_dist;
                    var o = context.SeguimientoActividadesJASS.FirstOrDefault(x => x.CUI == data.CUI && x.Activo == true);

                    EnProyecto model = new EnProyecto();
                    model.IdProyecto = data.IdProyecto;
                    model.Snip = data.Snip;
                    model.CUI = data.CUI;
                    model.Modalidad = data.Cod_modalidad == 22 ? "Núcleo Ejecutor" : "Contrata";
                    model.IdUbigeo = data.IdUbigeo;
                    model.Departamento = departamento;
                    model.Provincia = Provincia;
                    model.Distrito = Distrito;
                    model.Nom_proyecto = data.Nom_proyecto;
                    model.Localidad = data.Localidad.Trim();
                    model.FechaActualizacion = o == null ? "Sin Seguimiento" : Convert.ToDateTime(o.Fecha_upd).ToString("dd/MM/yyyy hh:mm:ss");

                    result.Add(model);
                }
            }
            return result.ToList();
        }
        public List<EnDropDownList> ddlMeses(string Etapa)
        {
            List<EnDropDownList> result = new List<EnDropDownList>();

            var obj = context.CronogramaActividades.Where(x => x.Tipo == "JASS" && x.Etapa == Etapa).Select(x => x.NroMes).Distinct();
            if (obj != null && obj.Count() > 0)
            {
                EnDropDownList ddl = new EnDropDownList();
                ddl.id = 0;
                ddl.text = "[--Seleccione--]";
                result.Add(ddl);

                EnDropDownList values;
                foreach (var data in obj)
                {
                    values = new EnDropDownList();
                    values.id = Convert.ToInt32(data);
                    values.text = data.ToString();
                    result.Add(values);
                }
            }
            return result;
        }
        public List<EnDropDownList> ddlActividad(string Etapa, int NroMes)
        {
            List<EnDropDownList> result = new List<EnDropDownList>();

            var obj = context.CronogramaActividades.Where(x => x.Tipo == "JASS" && x.Etapa == Etapa && x.NroMes == NroMes);
            if (obj != null && obj.Count() > 0)
            {
                EnDropDownList ddl = new EnDropDownList();
                ddl.id = 0;
                ddl.text = "[--Seleccione--]";
                result.Add(ddl);

                EnDropDownList values;
                foreach (var data in obj)
                {
                    values = new EnDropDownList();
                    values.id = data.IdCronogramaActividades;
                    values.text = data.Actividad;
                    result.Add(values);
                }
            }
            return result;
        }
        public EnSeguimientoActividadesJASS ListSeguimiento(string cui)
        {
            EnSeguimientoActividadesJASS result = new EnSeguimientoActividadesJASS();

            var objSeguimiento = context.SeguimientoActividadesJASS.Where(x => x.CUI == cui && x.Activo == true).SingleOrDefault();
            if (objSeguimiento != null)
            {
                result.IdSeguimientoActividadesJASS = objSeguimiento.IdSeguimientoActividadesJASS;
                result.CUI = objSeguimiento.CUI;
                result.NroAsociadosMujeres = objSeguimiento.NroAsociadosMujeres;
                result.NroAsociadosHombres = objSeguimiento.NroAsociadosHombres;
                result.TotalAsociados = result.NroAsociadosMujeres + result.NroAsociadosHombres;
                result.TotalViviendasValidadas = objSeguimiento.TotalViviendasValidadas;
                result.TotalInstitucionesValidadas = objSeguimiento.TotalInstitucionesValidadas;
                result.TotalInstitucionesViviendasValidadas = result.TotalViviendasValidadas + result.TotalInstitucionesValidadas;
                result.NroOperadoresSAPMujeres = objSeguimiento.NroOperadoresSAPMujeres;
                result.NroOperadoresSAPHombres = objSeguimiento.NroOperadoresSAPHombres;
                result.TotalOperadores = result.NroOperadoresSAPMujeres + result.NroOperadoresSAPHombres;
                result.TotalAutoridadesLideres = objSeguimiento.TotalAutoridadesLideres;
                result.NroIdentificacionLideres = objSeguimiento.NroIdentificacionLideres;
            }

            return result;
        }
        public List<EnDetalleSeguimientoActividadesJASS> ListDetalleSeguimiento(int IdSeguimientoActividades, int IdCronogramaActividades)
        {
            List<EnDetalleSeguimientoActividadesJASS> result = new List<EnDetalleSeguimientoActividadesJASS>();

            if (IdCronogramaActividades != 0)
            {
                var obj = context.SeguimientoActividadesJASS.Where(x => x.IdSeguimientoActividadesJASS == IdSeguimientoActividades && x.Activo == true).SingleOrDefault();
                if (obj != null)
                {
                    var objDetalle = context.DetalleSeguimientoActividadesJASS.Where(x => x.IdSeguimientoActividadesJASS == obj.IdSeguimientoActividadesJASS && x.IdCronogramaActividades == IdCronogramaActividades && x.Activo == true).ToList();

                    foreach (var data in objDetalle)
                    {
                        EnDetalleSeguimientoActividadesJASS model = new EnDetalleSeguimientoActividadesJASS();
                        model.IdDetalleSeguimientoActividadesJASS = data.IdDetalleSeguimientoActividadesJASS;
                        model.IdSeguimientoActividadesJASS = data.IdSeguimientoActividadesJASS;
                        model.IdCronogramaActividades = data.IdCronogramaActividades;
                        model.Actividades = data.CronogramaActividades.Actividad;
                        model.FechaString = Convert.ToDateTime(data.Fecha).ToString("dd/MM/yyyy");
                        model.NroHombres = data.NroHombres;
                        model.NroMujeres = data.NroMujeres;
                        model.Total = data.Total;
                        model.PorcentageTotal = data.PorcentageTotal;
                        model.TotalSAP = data.TotalSAP;
                        model.PorcentageSAP = data.PorcentageSAP;
                        model.Comentarios = data.Comentarios;

                        result.Add(model);
                    }
                }
            }


            return result.ToList();
        }
        public EnRespuesta GuardarSeguimiento(EnDetalleSeguimientoActividadesJASS detalle)
        {
            EnRespuesta respuesta = new EnRespuesta();
            using (var dbtran = context.Database.BeginTransaction())
            {
                try
                {
                    if (detalle.IdSeguimientoActividadesJASS == 0)
                    {
                        #region Agregar Seguimiento

                        SeguimientoActividadesJASS n = new SeguimientoActividadesJASS();
                        n.CUI = detalle.CUI;
                        n.NroAsociadosMujeres = 0;
                        n.NroAsociadosHombres = 0;
                        n.TotalViviendasValidadas = 0;
                        n.TotalInstitucionesValidadas = 0;
                        n.NroOperadoresSAPMujeres = 0;
                        n.NroOperadoresSAPHombres = 0;
                        n.TotalAutoridadesLideres = 0;
                        n.NroIdentificacionLideres = 0;
                        n.Activo = true;
                        n.IdUsuario_add = SecurityManager<EnUsuario>.User.IdUsuario;
                        n.Fecha_add = DateTime.Now;
                        n.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                        n.Fecha_upd = DateTime.Now;

                        context.SeguimientoActividadesJASS.Add(n);
                        context.SaveChanges();

                        var id = n.IdSeguimientoActividadesJASS;

                        /*Agrega Detalle*/
                        DetalleSeguimientoActividadesJASS d = new DetalleSeguimientoActividadesJASS();
                        d.IdSeguimientoActividadesJASS = detalle.IdSeguimientoActividadesJASS;
                        d.IdCronogramaActividades = detalle.IdCronogramaActividades;
                        d.Fecha = detalle.Fecha;
                        d.NroHombres = detalle.NroHombres;
                        d.NroMujeres = detalle.NroMujeres;
                        d.Total = detalle.Total;
                        d.PorcentageTotal = detalle.PorcentageTotal;
                        d.TotalSAP = detalle.TotalSAP;
                        d.PorcentageSAP = detalle.PorcentageSAP;
                        d.Comentarios = detalle.Comentarios;
                        d.Activo = true;
                        d.IdUsuario_add = SecurityManager<EnUsuario>.User.IdUsuario;
                        d.Fecha_add = DateTime.Now;
                        d.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                        d.Fecha_upd = DateTime.Now;

                        context.DetalleSeguimientoActividadesJASS.Add(d);
                        context.SaveChanges();

                        dbtran.Commit();
                        //dbtran.Rollback();
                        respuesta.TipoRespuesta = 1;
                        respuesta.Mensaje = "Seguimiento de Actividad Agregado Satisfactoriamente";
                        respuesta.ValorDevolucion = d.IdDetalleSeguimientoActividadesJASS.ToString();
                        #endregion
                    }
                    else
                    {
                        #region Agregar Detalle

                        if (detalle.IdDetalleSeguimientoActividadesJASS == 0)
                        {
                            #region Nuevo Seguimiento

                            DetalleSeguimientoActividadesJASS d = new DetalleSeguimientoActividadesJASS();
                            d.IdSeguimientoActividadesJASS = detalle.IdSeguimientoActividadesJASS;
                            d.IdCronogramaActividades = detalle.IdCronogramaActividades;
                            d.Fecha = detalle.Fecha;
                            d.NroHombres = detalle.NroHombres;
                            d.NroMujeres = detalle.NroMujeres;
                            d.Total = detalle.Total;
                            d.PorcentageTotal = detalle.PorcentageTotal;
                            d.TotalSAP = detalle.TotalSAP;
                            d.PorcentageSAP = detalle.PorcentageSAP;
                            d.Comentarios = detalle.Comentarios;
                            d.Activo = true;
                            d.IdUsuario_add = SecurityManager<EnUsuario>.User.IdUsuario;
                            d.Fecha_add = DateTime.Now;
                            d.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                            d.Fecha_upd = DateTime.Now;

                            context.DetalleSeguimientoActividadesJASS.Add(d);
                            context.SaveChanges();

                            dbtran.Commit();
                            //dbtran.Rollback();
                            respuesta.TipoRespuesta = 1;
                            respuesta.Mensaje = "Seguimiento de Actividad Agregado Satisfactoriamente";
                            respuesta.ValorDevolucion = d.IdDetalleSeguimientoActividadesJASS.ToString();

                            #endregion
                        }
                        else
                        {
                            #region Actualizar Seguimiento

                            var objDetalle = context.DetalleSeguimientoActividadesJASS.Where(x => x.IdDetalleSeguimientoActividadesJASS == detalle.IdDetalleSeguimientoActividadesJASS && x.Activo == true).SingleOrDefault();

                            if (objDetalle != null)
                            {
                                objDetalle.IdSeguimientoActividadesJASS = detalle.IdSeguimientoActividadesJASS;
                                objDetalle.IdCronogramaActividades = detalle.IdCronogramaActividades;
                                objDetalle.Fecha = detalle.Fecha;
                                objDetalle.NroHombres = detalle.NroHombres;
                                objDetalle.NroMujeres = detalle.NroMujeres;
                                objDetalle.Total = detalle.Total;
                                objDetalle.PorcentageTotal = detalle.PorcentageTotal;
                                objDetalle.TotalSAP = detalle.TotalSAP;
                                objDetalle.PorcentageSAP = detalle.PorcentageSAP;
                                objDetalle.Comentarios = detalle.Comentarios;
                                objDetalle.Activo = true;
                                objDetalle.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                                objDetalle.Fecha_upd = DateTime.Now;

                                context.SaveChanges();

                                dbtran.Commit();
                                //dbtran.Rollback();
                                respuesta.TipoRespuesta = 1;
                                respuesta.Mensaje = "Seguimiento de Actividad Actualizado Satisfactoriamente";
                                respuesta.ValorDevolucion = objDetalle.IdDetalleSeguimientoActividadesJASS.ToString();
                            }
                            else
                            {
                                respuesta.TipoRespuesta = 2;
                                respuesta.Mensaje = "No se pudo actualizar, actualice la pagina o verifique que el registro existe";
                                respuesta.ValorDevolucion = "";
                            }

                            #endregion
                        }

                        #endregion
                    }

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
        public EnDetalleSeguimientoActividadesJASS ListDetalleSeguimientoId(int Id)
        {
            EnDetalleSeguimientoActividadesJASS result = new EnDetalleSeguimientoActividadesJASS();

            var objDetalle = context.DetalleSeguimientoActividadesJASS.Where(x => x.IdDetalleSeguimientoActividadesJASS == Id && x.Activo == true).SingleOrDefault();

            result.IdSeguimientoActividadesJASS = objDetalle.IdSeguimientoActividadesJASS;
            result.IdDetalleSeguimientoActividadesJASS = objDetalle.IdDetalleSeguimientoActividadesJASS;
            result.Actividades = objDetalle.CronogramaActividades.Actividad;
            result.FechaString = Convert.ToDateTime(objDetalle.Fecha).ToString("dd/MM/yyyy");
            result.NroHombres = objDetalle.NroHombres;
            result.NroMujeres = objDetalle.NroMujeres;
            result.Total = objDetalle.Total;
            result.PorcentageTotal = objDetalle.PorcentageTotal;
            result.TotalSAP = objDetalle.TotalSAP;
            result.PorcentageSAP = objDetalle.PorcentageSAP;
            result.Comentarios = objDetalle.Comentarios;

            return result;
        }
        public EnRespuesta EliminarSeguimiento(int Id)
        {
            EnRespuesta respuesta = new EnRespuesta();
            using (var dbtran = context.Database.BeginTransaction())
            {
                try
                {
                    var objDetalle = context.DetalleSeguimientoActividadesJASS.Where(x => x.IdDetalleSeguimientoActividadesJASS == Id && x.Activo == true).SingleOrDefault();
                    if (objDetalle != null)
                    {
                        objDetalle.Activo = false;
                        objDetalle.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                        objDetalle.Fecha_upd = DateTime.Now;

                        context.SaveChanges();

                        dbtran.Commit();
                        //dbtran.Rollback();
                        respuesta.TipoRespuesta = 1;
                        respuesta.Mensaje = "Seguimiento de Actividad Eliminado Satisfactoriamente";
                        respuesta.ValorDevolucion = objDetalle.IdDetalleSeguimientoActividadesJASS.ToString();
                    }
                    else
                    {
                        respuesta.TipoRespuesta = 2;
                        respuesta.Mensaje = "No se pudo eliminar, actualice la pagina o verifique que el registro existe";
                        respuesta.ValorDevolucion = "";
                    }

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
    }
}
