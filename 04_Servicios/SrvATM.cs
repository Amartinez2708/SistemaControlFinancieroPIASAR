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
    public class SrvATM
    {
        BD_NucleosEjecutoresEntities context = new BD_NucleosEjecutoresEntities();

        public List<EnProyecto> ListProyectos()
        {
            List<EnProyecto> result = new List<EnProyecto>();

            List<int> objProyectoAsignados = context.PersonaProyecto.Where(x=> x.IdPersona == SecurityManager<EnUsuario>.User.IdPersonal && x.Activo == true).Select(x => x.IdProyecto).ToList();

            var obj = context.Proyecto.Where(x => x.Cod_subprograma == 133 && (objProyectoAsignados.Count() == 0 || objProyectoAsignados.Contains(x.IdProyecto)) && x.Estado == 1).ToList();
            if (obj != null && obj.Count() > 0)
            {
                foreach (var data in obj)
                {
                    var departamento = context.Departamento.FirstOrDefault(x => x.cod_depa == data.IdUbigeo.Substring(0, 2)).nom_depa;
                    var Provincia = context.Provincia.FirstOrDefault(x => x.cod_depa == data.IdUbigeo.Substring(0, 2) && x.cod_prov == data.IdUbigeo.Substring(2, 2)).nom_prov;
                    var Distrito = context.Distrito.FirstOrDefault(x => x.cod_depa == data.IdUbigeo.Substring(0, 2) && x.cod_prov == data.IdUbigeo.Substring(2, 2) && x.cod_dist == data.IdUbigeo.Substring(4, 2)).nom_dist;
                    var o = context.SeguimientoActividadesATM.FirstOrDefault(x => x.CUI == data.CUI && x.Activo == true);

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

            var obj = context.CronogramaActividades.Where(x => x.Tipo == "ATM" && x.Etapa == Etapa).Select(x => x.NroMes).Distinct();
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

            var obj = context.CronogramaActividades.Where(x => x.Tipo == "ATM" && x.Etapa == Etapa && x.NroMes == NroMes);
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
        public EnSeguimientoActividadesATM ListSeguimiento(string cui)
        {
            EnSeguimientoActividadesATM result = new EnSeguimientoActividadesATM();

            var objSeguimiento = context.SeguimientoActividadesATM.Where(x => x.CUI == cui && x.Activo == true).SingleOrDefault();
            if (objSeguimiento != null)
            {
                result.IdSeguimientoActividadesATM = objSeguimiento.IdSeguimientoActividadesATM;
                result.CUI = objSeguimiento.CUI;
                result.NroMienbrosMujeres = objSeguimiento.NroMienbrosMujeres;
                result.NroMienbrosHombres = objSeguimiento.NroMienbrosHombres;
                result.TotalMienbros = objSeguimiento.NroMienbrosMujeres + objSeguimiento.NroMienbrosHombres;
                result.SaludEducacionOtros = objSeguimiento.SaludEducacionOtros;
            }

            return result;
        }
        public List<EnDetalleSeguimientoActividadesATM> ListDetalleSeguimiento(int IdSeguimientoActividades, int IdCronogramaActividades)
        {
            List<EnDetalleSeguimientoActividadesATM> result = new List<EnDetalleSeguimientoActividadesATM>();

            if (IdCronogramaActividades != 0)
            {
                var obj = context.SeguimientoActividadesATM.Where(x => x.IdSeguimientoActividadesATM == IdSeguimientoActividades && x.Activo == true).SingleOrDefault();
                if (obj != null)
                {
                    var objDetalle = context.DetalleSeguimientoActividadesATM.Where(x => x.IdSeguimientoActividadesATM == obj.IdSeguimientoActividadesATM && x.IdCronogramaActividades == IdCronogramaActividades && x.Activo == true).ToList();

                    foreach (var data in objDetalle)
                    {
                        EnDetalleSeguimientoActividadesATM model = new EnDetalleSeguimientoActividadesATM();
                        model.IdDetalleSeguimientoActividadesATM = data.IdDetalleSeguimientoActividadesATM;
                        model.IdSeguimientoActividadesATM = data.IdSeguimientoActividadesATM;
                        model.IdCronogramaActividades = data.IdCronogramaActividades;
                        model.Actividades = data.CronogramaActividades.Actividad;
                        model.FechaString = Convert.ToDateTime(data.Fecha).ToString("dd/MM/yyyy");
                        model.NroHombres = data.NroHombres;
                        model.NroMujeres = data.NroMujeres;
                        model.Total = data.NroHombres + data.NroMujeres;
                        model.Comentarios = data.Comentarios;

                        result.Add(model);
                    }
                }
            }


            return result.ToList();
        }
        public EnRespuesta GuardarSeguimiento(EnDetalleSeguimientoActividadesATM detalle)
        {
            EnRespuesta respuesta = new EnRespuesta();
            using (var dbtran = context.Database.BeginTransaction())
            {
                try
                {
                    if (detalle.IdSeguimientoActividadesATM == 0)
                    {
                        #region Agregar Seguimiento

                        SeguimientoActividadesATM n = new SeguimientoActividadesATM();
                        n.CUI = detalle.CUI;
                        n.NroMienbrosMujeres = 0;
                        n.NroMienbrosHombres = 0;
                        n.SaludEducacionOtros = 0;
                        n.Activo = true;
                        n.IdUsuario_add = SecurityManager<EnUsuario>.User.IdUsuario;
                        n.Fecha_add = DateTime.Now;
                        n.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                        n.Fecha_upd = DateTime.Now;

                        context.SeguimientoActividadesATM.Add(n);
                        context.SaveChanges();

                        var id = n.IdSeguimientoActividadesATM;

                        /*Agrega Detalle*/
                        DetalleSeguimientoActividadesATM d = new DetalleSeguimientoActividadesATM();
                        d.IdSeguimientoActividadesATM = detalle.IdSeguimientoActividadesATM;
                        d.IdCronogramaActividades = detalle.IdCronogramaActividades;
                        d.Fecha = detalle.Fecha;
                        d.NroHombres = detalle.NroHombres;
                        d.NroMujeres = detalle.NroMujeres;
                        d.Total = detalle.NroHombres + detalle.NroMujeres;
                        d.Comentarios = detalle.Comentarios;
                        d.Activo = true;
                        d.IdUsuario_add = SecurityManager<EnUsuario>.User.IdUsuario;
                        d.Fecha_add = DateTime.Now;
                        d.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                        d.Fecha_upd = DateTime.Now;

                        context.DetalleSeguimientoActividadesATM.Add(d);
                        context.SaveChanges();

                        if (String.IsNullOrEmpty(detalle.Archivos) == false)
                        {
                            int[] Archivos = Array.ConvertAll(detalle.Archivos.Split(','), s => int.Parse(s));

                            foreach (int Archivo in Archivos)
                            {
                                var objArchivo = context.SeguimientoDetalleArchivo.SingleOrDefault(x => x.IdSeguimientoDetalleArchivo == Archivo);
                                if (objArchivo != null)
                                {
                                    objArchivo.IdSeguimiento = n.IdSeguimientoActividadesATM;
                                    objArchivo.IdDetalleSeguimiento = d.IdDetalleSeguimientoActividadesATM;
                                    objArchivo.Activo = true;

                                    context.SaveChanges();
                                }
                            }
                        }

                        dbtran.Commit();
                        //dbtran.Rollback();
                        respuesta.TipoRespuesta = 1;
                        respuesta.Mensaje = "Seguimiento de Actividad Agregado Satisfactoriamente";
                        respuesta.ValorDevolucion = d.IdDetalleSeguimientoActividadesATM.ToString();
                        #endregion
                    }
                    else
                    {
                        #region Agregar Detalle

                        if (detalle.IdDetalleSeguimientoActividadesATM == 0)
                        {
                            #region Nuevo Seguimiento

                            DetalleSeguimientoActividadesATM d = new DetalleSeguimientoActividadesATM();
                            d.IdSeguimientoActividadesATM = detalle.IdSeguimientoActividadesATM;
                            d.IdCronogramaActividades = detalle.IdCronogramaActividades;
                            d.Fecha = detalle.Fecha;
                            d.NroHombres = detalle.NroHombres;
                            d.NroMujeres = detalle.NroMujeres;
                            d.Total = detalle.NroHombres + detalle.NroMujeres;
                            d.Comentarios = detalle.Comentarios;
                            d.Activo = true;
                            d.IdUsuario_add = SecurityManager<EnUsuario>.User.IdUsuario;
                            d.Fecha_add = DateTime.Now;
                            d.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                            d.Fecha_upd = DateTime.Now;

                            context.DetalleSeguimientoActividadesATM.Add(d);
                            context.SaveChanges();

                            if (String.IsNullOrEmpty(detalle.Archivos) == false)
                            {
                                int[] Archivos = Array.ConvertAll(detalle.Archivos.Split(','), s => int.Parse(s));

                                foreach (int Archivo in Archivos)
                                {
                                    var objArchivo = context.SeguimientoDetalleArchivo.SingleOrDefault(x => x.IdSeguimientoDetalleArchivo == Archivo);
                                    if (objArchivo != null)
                                    {
                                        objArchivo.IdSeguimiento = d.IdSeguimientoActividadesATM;
                                        objArchivo.IdDetalleSeguimiento = d.IdDetalleSeguimientoActividadesATM;
                                        objArchivo.Activo = true;

                                        context.SaveChanges();
                                    }
                                }
                            }

                            var objSeg = context.SeguimientoActividadesATM.SingleOrDefault(x => x.IdSeguimientoActividadesATM == detalle.IdSeguimientoActividadesATM);
                            if (objSeg != null)
                            {
                                objSeg.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                                objSeg.Fecha_upd = DateTime.Now;

                                context.SaveChanges();
                            }

                            dbtran.Commit();
                            //dbtran.Rollback();
                            respuesta.TipoRespuesta = 1;
                            respuesta.Mensaje = "Seguimiento de Actividad Agregado Satisfactoriamente";
                            respuesta.ValorDevolucion = d.IdDetalleSeguimientoActividadesATM.ToString();

                            #endregion
                        }
                        else
                        {
                            #region Actualizar Seguimiento

                            var objDetalle = context.DetalleSeguimientoActividadesATM.Where(x => x.IdDetalleSeguimientoActividadesATM == detalle.IdDetalleSeguimientoActividadesATM && x.Activo == true).SingleOrDefault();

                            if (objDetalle != null)
                            {
                                objDetalle.IdSeguimientoActividadesATM = detalle.IdSeguimientoActividadesATM;
                                objDetalle.IdCronogramaActividades = detalle.IdCronogramaActividades;
                                objDetalle.Fecha = detalle.Fecha;
                                objDetalle.NroHombres = detalle.NroHombres;
                                objDetalle.NroMujeres = detalle.NroMujeres;
                                objDetalle.Total = detalle.Total;
                                objDetalle.Comentarios = detalle.Comentarios;
                                objDetalle.Activo = true;
                                objDetalle.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                                objDetalle.Fecha_upd = DateTime.Now;

                                context.SaveChanges();

                                //buscar todos los archivos asignados al seguimiento
                                var objArchivo = context.SeguimientoDetalleArchivo.Where(x => x.IdSeguimiento == objDetalle.IdSeguimientoActividadesATM && x.IdDetalleSeguimiento == objDetalle.IdDetalleSeguimientoActividadesATM).ToList();
                                if (objArchivo.Count() > 0)
                                {
                                    objArchivo.ForEach(a => a.Activo = false);//poner todos los archivos en false
                                    context.SaveChanges();
                                }

                                if (String.IsNullOrEmpty(detalle.Archivos) == false)
                                {
                                    int[] Archivos = Array.ConvertAll(detalle.Archivos.Split(','), s => int.Parse(s));

                                    foreach (int Archivo in Archivos)
                                    {
                                        var file = context.SeguimientoDetalleArchivo.SingleOrDefault(x => x.IdSeguimientoDetalleArchivo == Archivo);
                                        if (file != null)
                                        {
                                            file.IdSeguimiento = objDetalle.IdSeguimientoActividadesATM;
                                            file.IdDetalleSeguimiento = objDetalle.IdDetalleSeguimientoActividadesATM;
                                            file.Activo = true;

                                            context.SaveChanges();
                                        }
                                    }
                                }

                                var objSeg = context.SeguimientoActividadesATM.SingleOrDefault(x => x.IdSeguimientoActividadesATM == detalle.IdSeguimientoActividadesATM);
                                if (objSeg != null)
                                {
                                    objSeg.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                                    objSeg.Fecha_upd = DateTime.Now;

                                    context.SaveChanges();
                                }

                                dbtran.Commit();
                                //dbtran.Rollback();
                                respuesta.TipoRespuesta = 1;
                                respuesta.Mensaje = "Seguimiento de Actividad Actualizado Satisfactoriamente";
                                respuesta.ValorDevolucion = objDetalle.IdDetalleSeguimientoActividadesATM.ToString();
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
        public EnDetalleSeguimientoActividadesATM ListDetalleSeguimientoId(int Id)
        {
            EnDetalleSeguimientoActividadesATM result = new EnDetalleSeguimientoActividadesATM();

            var objDetalle = context.DetalleSeguimientoActividadesATM.Where(x => x.IdDetalleSeguimientoActividadesATM == Id && x.Activo == true).SingleOrDefault();

            result.IdSeguimientoActividadesATM = objDetalle.IdSeguimientoActividadesATM;
            result.IdDetalleSeguimientoActividadesATM = objDetalle.IdDetalleSeguimientoActividadesATM;
            result.Actividades = objDetalle.CronogramaActividades.Actividad;
            result.FechaString = Convert.ToDateTime(objDetalle.Fecha).ToString("dd/MM/yyyy");
            result.NroHombres = objDetalle.NroHombres;
            result.NroMujeres = objDetalle.NroMujeres;
            result.Total = objDetalle.Total;
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
                    var objDetalle = context.DetalleSeguimientoActividadesATM.Where(x => x.IdDetalleSeguimientoActividadesATM == Id && x.Activo == true).SingleOrDefault();
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
                        respuesta.ValorDevolucion = objDetalle.IdDetalleSeguimientoActividadesATM.ToString();
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
