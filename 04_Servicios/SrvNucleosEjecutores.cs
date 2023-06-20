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
    public class SrvNucleosEjecutores
    {
        BD_NucleosEjecutoresEntities context = new BD_NucleosEjecutoresEntities();

        public List<EnProyecto> ListProyectos()
        {
            List<EnProyecto> result = new List<EnProyecto>();

            List<int> objProyectoAsignados = context.PersonaProyecto.Where(x => x.IdPersona == SecurityManager<EnUsuario>.User.IdPersonal && x.Activo == true).Select(x => x.IdProyecto).ToList();

            var obj = context.Proyecto.Where(x => x.Cod_subprograma == 133 && (objProyectoAsignados.Count() == 0 || objProyectoAsignados.Contains(x.IdProyecto)) && x.Cod_modalidad == 22 && x.Estado == 1).ToList();
            if (obj != null && obj.Count() > 0)
            {
                foreach (var data in obj)
                {
                    var departamento = context.Departamento.FirstOrDefault(x => x.cod_depa == data.IdUbigeo.Substring(0, 2)).nom_depa;
                    var Provincia = context.Provincia.FirstOrDefault(x => x.cod_depa == data.IdUbigeo.Substring(0, 2) && x.cod_prov == data.IdUbigeo.Substring(2, 2)).nom_prov;
                    var Distrito = context.Distrito.FirstOrDefault(x => x.cod_depa == data.IdUbigeo.Substring(0, 2) && x.cod_prov == data.IdUbigeo.Substring(2, 2) && x.cod_dist == data.IdUbigeo.Substring(4, 2)).nom_dist;
                    var o = context.SeguimientoActividadesNE.FirstOrDefault(x => x.CUI == data.CUI && x.Activo == true);

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

            var obj = context.CronogramaActividades.Where(x => x.Tipo == "Nucleo Ejecutor" && x.Etapa == Etapa).Select(x => x.NroMes).Distinct();
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

            var obj = context.CronogramaActividades.Where(x => x.Tipo == "Nucleo Ejecutor" && x.Etapa == Etapa && x.NroMes == NroMes);
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
        public EnSeguimientoActividadesNE ListSeguimiento(string cui)
        {
            EnSeguimientoActividadesNE result = new EnSeguimientoActividadesNE();

            var objSeguimiento = context.SeguimientoActividadesNE.Where(x => x.CUI == cui && x.Activo == true).SingleOrDefault();
            if (objSeguimiento != null)
            {
                result.IdSeguimientoActividadesNE = objSeguimiento.IdSeguimientoActividadesNE;
                result.CUI = objSeguimiento.CUI;
                result.NroMienbrosMujeres = objSeguimiento.NroMienbrosMujeres;
                result.NroMienbrosHombres = objSeguimiento.NroMienbrosHombres;
                result.TotalMienbros = result.NroMienbrosMujeres + result.NroMienbrosHombres;
            }

            return result;
        }
        public List<EnDetalleSeguimientoActividadesNE> ListDetalleSeguimiento(int IdSeguimientoActividades, int IdCronogramaActividades)
        {
            List<EnDetalleSeguimientoActividadesNE> result = new List<EnDetalleSeguimientoActividadesNE>();

            if (IdCronogramaActividades != 0)
            {
                var obj = context.SeguimientoActividadesNE.Where(x => x.IdSeguimientoActividadesNE == IdSeguimientoActividades && x.Activo == true).SingleOrDefault();
                if (obj != null)
                {
                    var objDetalle = context.DetalleSeguimientoActividadesNE.Where(x => x.IdSeguimientoActividadesNE == obj.IdSeguimientoActividadesNE && x.IdCronogramaActividades == IdCronogramaActividades && x.Activo == true).ToList();

                    foreach (var data in objDetalle)
                    {
                        EnDetalleSeguimientoActividadesNE model = new EnDetalleSeguimientoActividadesNE();
                        model.IdDetalleSeguimientoActividadesNE = data.IdDetalleSeguimientoActividadesNE;
                        model.IdSeguimientoActividadesNE = data.IdSeguimientoActividadesNE;
                        model.IdCronogramaActividades = data.IdCronogramaActividades;
                        model.Actividades = data.CronogramaActividades.Actividad;
                        model.FechaString = Convert.ToDateTime(data.Fecha).ToString("dd/MM/yyyy");
                        model.NroHombres = data.NroHombres;
                        model.NroMujeres = data.NroMujeres;
                        model.Total = data.Total;

                        result.Add(model);
                    }
                }
            }


            return result.ToList();
        }
        public EnRespuesta GuardarSeguimiento(EnDetalleSeguimientoActividadesNE detalle)
        {
            EnRespuesta respuesta = new EnRespuesta();
            using (var dbtran = context.Database.BeginTransaction())
            {
                try
                {
                    if (detalle.IdSeguimientoActividadesNE == 0)
                    {
                        #region Agregar Seguimiento

                        SeguimientoActividadesNE n = new SeguimientoActividadesNE();
                        n.CUI = detalle.CUI;
                        n.NroMienbrosMujeres = 0;
                        n.NroMienbrosHombres = 0;
                        n.Activo = true;
                        n.IdUsuario_add = SecurityManager<EnUsuario>.User.IdUsuario;
                        n.Fecha_add = DateTime.Now;
                        n.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                        n.Fecha_upd = DateTime.Now;

                        context.SeguimientoActividadesNE.Add(n);
                        context.SaveChanges();

                        var id = n.IdSeguimientoActividadesNE;

                        /*Agrega Detalle*/
                        DetalleSeguimientoActividadesNE d = new DetalleSeguimientoActividadesNE();
                        d.IdSeguimientoActividadesNE = detalle.IdSeguimientoActividadesNE;
                        d.IdCronogramaActividades = detalle.IdCronogramaActividades;
                        d.Fecha = detalle.Fecha;
                        d.NroHombres = detalle.NroHombres;
                        d.NroMujeres = detalle.NroMujeres;
                        d.Total = detalle.Total;
                        d.Activo = true;
                        d.IdUsuario_add = SecurityManager<EnUsuario>.User.IdUsuario;
                        d.Fecha_add = DateTime.Now;
                        d.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                        d.Fecha_upd = DateTime.Now;

                        context.DetalleSeguimientoActividadesNE.Add(d);
                        context.SaveChanges();

                        dbtran.Commit();
                        //dbtran.Rollback();
                        respuesta.TipoRespuesta = 1;
                        respuesta.Mensaje = "Seguimiento de Actividad Agregado Satisfactoriamente";
                        respuesta.ValorDevolucion = d.IdDetalleSeguimientoActividadesNE.ToString();
                        #endregion
                    }
                    else
                    {
                        #region Agregar Detalle

                        if (detalle.IdDetalleSeguimientoActividadesNE == 0)
                        {
                            #region Nuevo Seguimiento

                            DetalleSeguimientoActividadesNE d = new DetalleSeguimientoActividadesNE();
                            d.IdSeguimientoActividadesNE = detalle.IdSeguimientoActividadesNE;
                            d.IdCronogramaActividades = detalle.IdCronogramaActividades;
                            d.Fecha = detalle.Fecha;
                            d.NroHombres = detalle.NroHombres;
                            d.NroMujeres = detalle.NroMujeres;
                            d.Total = detalle.Total;
                            d.Activo = true;
                            d.IdUsuario_add = SecurityManager<EnUsuario>.User.IdUsuario;
                            d.Fecha_add = DateTime.Now;
                            d.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                            d.Fecha_upd = DateTime.Now;

                            context.DetalleSeguimientoActividadesNE.Add(d);
                            context.SaveChanges();

                            dbtran.Commit();
                            //dbtran.Rollback();
                            respuesta.TipoRespuesta = 1;
                            respuesta.Mensaje = "Seguimiento de Actividad Agregado Satisfactoriamente";
                            respuesta.ValorDevolucion = d.IdDetalleSeguimientoActividadesNE.ToString();

                            #endregion
                        }
                        else
                        {
                            #region Actualizar Seguimiento

                            var objDetalle = context.DetalleSeguimientoActividadesNE.Where(x => x.IdDetalleSeguimientoActividadesNE == detalle.IdDetalleSeguimientoActividadesNE && x.Activo == true).SingleOrDefault();

                            if (objDetalle != null)
                            {
                                objDetalle.IdSeguimientoActividadesNE = detalle.IdSeguimientoActividadesNE;
                                objDetalle.IdCronogramaActividades = detalle.IdCronogramaActividades;
                                objDetalle.Fecha = detalle.Fecha;
                                objDetalle.NroHombres = detalle.NroHombres;
                                objDetalle.NroMujeres = detalle.NroMujeres;
                                objDetalle.Total = detalle.Total;
                                objDetalle.Activo = true;
                                objDetalle.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                                objDetalle.Fecha_upd = DateTime.Now;

                                context.SaveChanges();

                                dbtran.Commit();
                                //dbtran.Rollback();
                                respuesta.TipoRespuesta = 1;
                                respuesta.Mensaje = "Seguimiento de Actividad Actualizado Satisfactoriamente";
                                respuesta.ValorDevolucion = objDetalle.IdDetalleSeguimientoActividadesNE.ToString();
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
        public EnDetalleSeguimientoActividadesNE ListDetalleSeguimientoId(int Id)
        {
            EnDetalleSeguimientoActividadesNE result = new EnDetalleSeguimientoActividadesNE();

            var objDetalle = context.DetalleSeguimientoActividadesNE.Where(x => x.IdDetalleSeguimientoActividadesNE == Id && x.Activo == true).SingleOrDefault();

            result.IdSeguimientoActividadesNE = objDetalle.IdSeguimientoActividadesNE;
            result.IdDetalleSeguimientoActividadesNE = objDetalle.IdDetalleSeguimientoActividadesNE;
            result.Actividades = objDetalle.CronogramaActividades.Actividad;
            result.FechaString = Convert.ToDateTime(objDetalle.Fecha).ToString("dd/MM/yyyy");
            result.NroHombres = objDetalle.NroHombres;
            result.NroMujeres = objDetalle.NroMujeres;
            result.Total = objDetalle.Total;

            return result;
        }
        public EnRespuesta EliminarSeguimiento(int Id)
        {
            EnRespuesta respuesta = new EnRespuesta();
            using (var dbtran = context.Database.BeginTransaction())
            {
                try
                {
                    var objDetalle = context.DetalleSeguimientoActividadesNE.Where(x => x.IdDetalleSeguimientoActividadesNE == Id && x.Activo == true).SingleOrDefault();
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
                        respuesta.ValorDevolucion = objDetalle.IdDetalleSeguimientoActividadesNE.ToString();
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
