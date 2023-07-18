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
    public class SrvFamilias
    {
        BD_NucleosEjecutoresEntities context = new BD_NucleosEjecutoresEntities();

        public List<EnProyecto> ListProyectosFamilias()
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
                    var o = context.SeguimientoActividadesFamilias.FirstOrDefault(x => x.CUI == data.CUI && x.Activo == true);

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

            var obj = context.CronogramaActividades.Where(x => x.Tipo == "Familias" && x.Etapa == Etapa).Select(x => x.NroMes).Distinct();
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

            var obj = context.CronogramaActividades.Where(x => x.Tipo == "Familias" && x.Etapa == Etapa && x.NroMes== NroMes);
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
        public EnSeguimientoActividadesFamilias ListSeguimiento(string cui)
        {
            EnSeguimientoActividadesFamilias result = new EnSeguimientoActividadesFamilias();

            var objSeguimiento  = context.SeguimientoActividadesFamilias.Where(x => x.CUI == cui && x.Activo == true).SingleOrDefault();
            if(objSeguimiento != null)
            {
                result.IdSeguimientoActividades = objSeguimiento.IdSeguimientoActividades;
                result.CUI = objSeguimiento.CUI;
                result.Paquete = objSeguimiento.Paquete;
                result.NroPoblacionMujeres = objSeguimiento.NroPoblacionMujeres;
                result.NroPoblaciónHombres = objSeguimiento.NroPoblaciónHombres;
                result.TotalPoblacion = result.NroPoblacionMujeres + result.NroPoblaciónHombres;
                result.NroUsuariosHombres = objSeguimiento.NroUsuariosHombres;
                result.NroUsuariosMujeres = objSeguimiento.NroUsuariosMujeres;
                result.TotalUsuarios = result.NroUsuariosHombres + result.NroUsuariosMujeres;
                result.NroPoblacionFlotante = objSeguimiento.NroPoblacionFlotante;
                result.NroTotalViviendasValidadas = objSeguimiento.NroTotalViviendasValidadas;
                result.NroTotalInstitucionesValidadas = objSeguimiento.NroTotalInstitucionesValidadas;
                result.TotalInstitucionesViviendasValidadas = result.NroTotalViviendasValidadas + result.NroTotalInstitucionesValidadas;
                result.NroCentrosEducativos = objSeguimiento.NroCentrosEducativos;
                result.NivelCentrosEducativos = objSeguimiento.NivelCentrosEducativos;
                result.CentroSalud = objSeguimiento.CentroSalud;
            }

            return result;
        }
        public List<EnDetalleSeguimientoActividadesFamilias> ListDetalleSeguimiento(int IdSeguimientoActividades, int IdCronogramaActividades)
        {
            List<EnDetalleSeguimientoActividadesFamilias> result = new List<EnDetalleSeguimientoActividadesFamilias>();

            if (IdCronogramaActividades != 0)
            {
                var obj = context.SeguimientoActividadesFamilias.Where(x => x.IdSeguimientoActividades == IdSeguimientoActividades && x.Activo == true).SingleOrDefault();
                if (obj != null)
                {
                    var objDetalle = context.DetalleSeguimientoActividadesFamilias.Where(x => x.IdSeguimientoActividades == obj.IdSeguimientoActividades && x.IdCronogramaActividades == IdCronogramaActividades && x.Activo == true).ToList();

                    foreach (var data in objDetalle)
                    {
                        EnDetalleSeguimientoActividadesFamilias model = new EnDetalleSeguimientoActividadesFamilias();
                        model.IdSeguimientoActividades = data.IdSeguimientoActividades;
                        model.IdDetalleSeguimientoActividadesFamilias = data.IdDetalleSeguimientoActividadesFamilias;
                        model.Actividades = data.CronogramaActividades.Actividad;
                        model.FechaString = Convert.ToDateTime(data.Fecha).ToString("dd/MM/yyyy");
                        model.NroHombres = data.NroHombres;
                        model.NroMujeres = data.NroMujeres;
                        model.Total = data.Total;
                        model.PorcentageAsistencia = data.PorcentageAsistencia;

                        result.Add(model);
                    }
                }
            }

            
            return result.ToList();
        }
        public EnRespuesta GuardarSeguimiento(EnDetalleSeguimientoActividadesFamilias detalle)
        {
            EnRespuesta respuesta = new EnRespuesta();
            using (var dbtran = context.Database.BeginTransaction())
            {
                try
                {
                    if (detalle.IdSeguimientoActividades == 0)
                    {
                        #region Agregar Seguimiento

                        SeguimientoActividadesFamilias n = new SeguimientoActividadesFamilias();
                        n.CUI = detalle.CUI;
                        n.Paquete = "";
                        n.NroPoblacionMujeres = 0;
                        n.NroPoblaciónHombres = 0;
                        n.NroUsuariosMujeres = 0;
                        n.NroUsuariosHombres = 0;
                        n.NroPoblacionFlotante = 0;
                        n.NroTotalViviendasValidadas = 0;
                        n.NroTotalInstitucionesValidadas = 0;
                        n.NroCentrosEducativos = 0;
                        n.NivelCentrosEducativos = "";
                        n.CentroSalud = "";
                        n.Activo = true;
                        n.IdUsuario_add = SecurityManager<EnUsuario>.User.IdUsuario;
                        n.Fecha_add = DateTime.Now;
                        n.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                        n.Fecha_upd = DateTime.Now;

                        context.SeguimientoActividadesFamilias.Add(n);
                        context.SaveChanges();

                        var id = n.IdSeguimientoActividades;

                        /*Agrega Detalle*/
                        DetalleSeguimientoActividadesFamilias d = new DetalleSeguimientoActividadesFamilias();
                        d.IdSeguimientoActividades = detalle.IdSeguimientoActividades;
                        d.IdCronogramaActividades = detalle.IdCronogramaActividades;
                        d.Fecha = detalle.Fecha;
                        d.NroHombres = detalle.NroHombres;
                        d.NroMujeres = detalle.NroMujeres;
                        d.Total = detalle.Total;
                        d.PorcentageAsistencia = detalle.PorcentageAsistencia;
                        d.Activo = true;
                        d.IdUsuario_add = SecurityManager<EnUsuario>.User.IdUsuario;
                        d.Fecha_add = DateTime.Now;
                        d.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                        d.Fecha_upd = DateTime.Now;

                        context.DetalleSeguimientoActividadesFamilias.Add(d);
                        context.SaveChanges();

                        if (detalle.Archivos != "")
                        {
                            string[] Archivos = detalle.Archivos.Split('|');

                            foreach (string Archivo in Archivos)
                            {
                                var objArchivo = context.SeguimientoDetalleArchivo.SingleOrDefault(x => x.IdSeguimientoDetalleArchivo == Convert.ToInt32(Archivo));
                                if (objArchivo != null)
                                {
                                    objArchivo.IdSeguimiento = n.IdSeguimientoActividades;
                                    objArchivo.IdDetalleSeguimiento = d.IdDetalleSeguimientoActividadesFamilias;
                                    objArchivo.Activo = true;

                                    context.SaveChanges();
                                }
                            }
                        }

                        dbtran.Commit();
                        //dbtran.Rollback();
                        respuesta.TipoRespuesta = 1;
                        respuesta.Mensaje = "Seguimiento de Actividad Agregado Satisfactoriamente";
                        respuesta.ValorDevolucion = d.IdDetalleSeguimientoActividadesFamilias.ToString();
                        #endregion
                    }
                    else
                    {
                        #region Agregar Detalle

                        if (detalle.IdDetalleSeguimientoActividadesFamilias == 0)
                        {
                            #region Nuevo Seguimiento

                            DetalleSeguimientoActividadesFamilias d = new DetalleSeguimientoActividadesFamilias();
                            d.IdSeguimientoActividades = detalle.IdSeguimientoActividades;
                            d.IdCronogramaActividades = detalle.IdCronogramaActividades;
                            d.Fecha = detalle.Fecha;
                            d.NroHombres = detalle.NroHombres;
                            d.NroMujeres = detalle.NroMujeres;
                            d.Total = detalle.Total;
                            d.PorcentageAsistencia = detalle.PorcentageAsistencia;
                            d.Activo = true;
                            d.IdUsuario_add = SecurityManager<EnUsuario>.User.IdUsuario;
                            d.Fecha_add = DateTime.Now;
                            d.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                            d.Fecha_upd = DateTime.Now;

                            context.DetalleSeguimientoActividadesFamilias.Add(d);
                            context.SaveChanges();

                            if (detalle.Archivos != "")
                            {
                                string[] Archivos = detalle.Archivos.Split('|');

                                foreach (string Archivo in Archivos)
                                {
                                    var objArchivo = context.SeguimientoDetalleArchivo.SingleOrDefault(x => x.IdSeguimientoDetalleArchivo == Convert.ToInt32(Archivo));
                                    if (objArchivo != null)
                                    {
                                        objArchivo.IdSeguimiento = d.IdSeguimientoActividades;
                                        objArchivo.IdDetalleSeguimiento = d.IdDetalleSeguimientoActividadesFamilias;
                                        objArchivo.Activo = true;

                                        context.SaveChanges();
                                    }
                                }
                            }

                            dbtran.Commit();
                            //dbtran.Rollback();
                            respuesta.TipoRespuesta = 1;
                            respuesta.Mensaje = "Seguimiento de Actividad Agregado Satisfactoriamente";
                            respuesta.ValorDevolucion = d.IdDetalleSeguimientoActividadesFamilias.ToString();

                            #endregion
                        }
                        else
                        {
                            #region Actualizar Seguimiento

                            var objDetalle = context.DetalleSeguimientoActividadesFamilias.Where(x => x.IdDetalleSeguimientoActividadesFamilias == detalle.IdDetalleSeguimientoActividadesFamilias && x.Activo == true).SingleOrDefault();

                            if (objDetalle != null)
                            {
                                objDetalle.IdSeguimientoActividades = detalle.IdSeguimientoActividades;
                                objDetalle.IdCronogramaActividades = detalle.IdCronogramaActividades;
                                objDetalle.Fecha = detalle.Fecha;
                                objDetalle.NroHombres = detalle.NroHombres;
                                objDetalle.NroMujeres = detalle.NroMujeres;
                                objDetalle.Total = detalle.Total;
                                objDetalle.PorcentageAsistencia = detalle.PorcentageAsistencia;
                                objDetalle.Activo = true;
                                objDetalle.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                                objDetalle.Fecha_upd = DateTime.Now;

                                //if (detalle.Archivos != "")  convierto todo a falso y luego habilito los que si estan 
                                //{
                                //    string[] Archivos = detalle.Archivos.Split('*');

                                //    foreach (string Archivo in Archivos)
                                //    {
                                //        SeguimientoDetalleArchivo a = new SeguimientoDetalleArchivo();
                                //        a.TipoSeguimiento = "Familias";
                                //        a.IdSeguimiento = objDetalle.IdSeguimientoActividades;
                                //        a.IdDetalleSeguimiento = objDetalle.IdDetalleSeguimientoActividadesFamilias;
                                //        a.NombreArchivo = detalle.Archivos.Split('|')[1];
                                //        a.NombreRealArchivo = detalle.Archivos.Split('|')[0];
                                //        a.FolderPath = detalle.Archivos.Split('|')[2];
                                //        a.Activo = true;
                                //        a.IdUsuario_add = SecurityManager<EnUsuario>.User.IdUsuario;
                                //        a.Fecha_add = DateTime.Now;
                                //        a.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                                //        a.Fecha_upd = DateTime.Now;

                                //        context.SeguimientoDetalleArchivo.Add(a);
                                //        context.SaveChanges();
                                //    }
                                //}

                                context.SaveChanges();

                                dbtran.Commit();
                                //dbtran.Rollback();
                                respuesta.TipoRespuesta = 1;
                                respuesta.Mensaje = "Seguimiento de Actividad Actualizado Satisfactoriamente";
                                respuesta.ValorDevolucion = objDetalle.IdDetalleSeguimientoActividadesFamilias.ToString();
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
        public EnDetalleSeguimientoActividadesFamilias ListDetalleSeguimientoId(int Id)
        {
            EnDetalleSeguimientoActividadesFamilias result = new EnDetalleSeguimientoActividadesFamilias();

            var objDetalle = context.DetalleSeguimientoActividadesFamilias.Where(x => x.IdDetalleSeguimientoActividadesFamilias == Id && x.Activo == true).SingleOrDefault();

            result.IdSeguimientoActividades = objDetalle.IdSeguimientoActividades;
            result.IdDetalleSeguimientoActividadesFamilias = objDetalle.IdDetalleSeguimientoActividadesFamilias;
            result.Actividades = objDetalle.CronogramaActividades.Actividad;
            result.FechaString = Convert.ToDateTime(objDetalle.Fecha).ToString("dd/MM/yyyy");
            result.NroHombres = objDetalle.NroHombres;
            result.NroMujeres = objDetalle.NroMujeres;
            result.Total = objDetalle.Total;
            result.PorcentageAsistencia = objDetalle.PorcentageAsistencia;
            
            return result;
        }
        public EnRespuesta EliminarSeguimiento(int Id)
        {
            EnRespuesta respuesta = new EnRespuesta();
            using (var dbtran = context.Database.BeginTransaction())
            {
                try
                {
                    var objDetalle = context.DetalleSeguimientoActividadesFamilias.Where(x => x.IdDetalleSeguimientoActividadesFamilias == Id && x.Activo == true).SingleOrDefault();
                    if (objDetalle!=null)
                    {
                        objDetalle.Activo = false;
                        objDetalle.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                        objDetalle.Fecha_upd = DateTime.Now;

                        context.SaveChanges();

                        dbtran.Commit();
                        //dbtran.Rollback();
                        respuesta.TipoRespuesta = 1;
                        respuesta.Mensaje = "Seguimiento de Actividad Eliminado Satisfactoriamente";
                        respuesta.ValorDevolucion = objDetalle.IdDetalleSeguimientoActividadesFamilias.ToString();
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
