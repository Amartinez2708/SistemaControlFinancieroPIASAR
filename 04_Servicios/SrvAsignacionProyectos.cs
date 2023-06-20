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
    public class SrvAsignacionProyectos
    {
        BD_NucleosEjecutoresEntities context = new BD_NucleosEjecutoresEntities();
        public List<EnDropDownList> ddlPersonal()
        {
            List<EnDropDownList> result = new List<EnDropDownList>();

            var obj = context.Persona.Where(x => x.IdPersona != 1 && x.IdCargo != 1 && x.Activo == true).ToList();
            if (obj != null && obj.Count() > 0)
            {
                EnDropDownList unidad = new EnDropDownList();
                unidad.id = 0;
                unidad.text = "[--Seleccione Personal--]";
                result.Add(unidad);

                EnDropDownList values;
                foreach (var data in obj)
                {
                    values = new EnDropDownList();
                    values.id = data.IdPersona;
                    values.text = data.ApePaterno + " " + data.ApeMaterno + ", " + data.Nombres + " - [" + data.Cargo.Cargo1 + "]";
                    result.Add(values);
                }
            }
            return result;
        }
        public List<EnDropDownList> chkProyectos()
        {
            List<EnDropDownList> result = new List<EnDropDownList>();

            var obj = context.Proyecto.Where(x => x.Cod_subprograma == 133 && x.Estado == 1).ToList();
            if (obj != null && obj.Count() > 0)
            {
                EnDropDownList values;
                foreach (var data in obj)
                {
                    values = new EnDropDownList();
                    values.id = data.IdProyecto;
                    values.text = "[" + data.CUI + "]-" + data.Localidad;
                    result.Add(values);
                }
            }
            return result;
        }
        public EnRespuesta GuardarAsignacion(int IdPersona, int IdProyecto, int Check)
        {
            EnRespuesta respuesta = new EnRespuesta();
            using (var dbtran = context.Database.BeginTransaction())
            {
                try
                {
                    var obj = context.PersonaProyecto.Where(x => x.IdPersona == IdPersona && x.IdProyecto == IdProyecto).SingleOrDefault();
                    if (obj != null)
                    {
                        #region Actualizar

                        if (Check == 0)
                        {
                            obj.Activo = false;
                            obj.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                            obj.Fecha_upd = DateTime.Now;
                            context.SaveChanges();

                            dbtran.Commit();
                            respuesta.TipoRespuesta = 2;
                            respuesta.Mensaje = "Proyecto desasignado Satisfactoriamente";
                            respuesta.ValorDevolucion = obj.IdPersona.ToString();
                        }
                        else
                        {
                            obj.Activo = true;
                            obj.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                            obj.Fecha_upd = DateTime.Now;
                            context.SaveChanges();

                            dbtran.Commit();
                            respuesta.TipoRespuesta = 1;
                            respuesta.Mensaje = "Proyecto asignado Satisfactoriamente";
                            respuesta.ValorDevolucion = obj.IdPersona.ToString();
                        }

                        #endregion
                        
                    }
                    else
                    {
                        #region Agregar

                        PersonaProyecto n = new PersonaProyecto();
                        n.IdPersona = IdPersona;
                        n.IdProyecto = IdProyecto;
                        n.Activo = true;
                        n.IdUsuario_add = SecurityManager<EnUsuario>.User.IdUsuario;
                        n.Fecha_add = DateTime.Now;
                        n.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                        n.Fecha_upd = DateTime.Now;
                        context.PersonaProyecto.Add(n);
                        context.SaveChanges();

                        dbtran.Commit();
                        respuesta.TipoRespuesta = 1;
                        respuesta.Mensaje = "Proyecto asignado Satisfactoriamente";
                        respuesta.ValorDevolucion = n.IdPersona.ToString();

                        #endregion
                    }

                }
                catch (Exception ex)
                {
                    dbtran.Rollback();
                    respuesta.TipoRespuesta = 3;
                    respuesta.Mensaje = ex.ToString();
                    respuesta.ValorDevolucion = "";
                }
            }
            return respuesta;
        }
        public List<EnPersonaProyecto> ListarProyectosAsignados(int IdPersona)
        {
            List<EnPersonaProyecto> result = new List<EnPersonaProyecto>();

            var obj = context.PersonaProyecto.Where(x => x.IdPersona == IdPersona && x.Activo == true).ToList();

            if (obj != null && obj.Count() > 0)
            {
                foreach (var item in obj)
                {
                    EnPersonaProyecto n = new EnPersonaProyecto();
                    n.IdPersonaProyecto = item.IdPersonaProyecto;
                    n.IdPersona = item.IdPersona;
                    n.IdProyecto = item.IdProyecto;
                    n.Check = item.Activo;

                    result.Add(n);
                }
            }

            return result.ToList();
        }
        public EnRespuesta GuardarAsignacion2(List<EnPersonaProyecto> proyectos)
        {
            EnRespuesta respuesta = new EnRespuesta();
            using (var dbtran = context.Database.BeginTransaction())
            {
                try
                {
                    //var obj = context.PersonaProyecto.Where(x => x.IdPersona == IdPersona && x.IdProyecto == IdProyecto).SingleOrDefault();
                    //if (obj != null)
                    //{
                    //    #region Actualizar

                    //    if (Check == 0)
                    //    {
                    //        obj.Activo = false;
                    //        obj.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                    //        obj.Fecha_upd = DateTime.Now;
                    //        context.SaveChanges();

                    //        dbtran.Commit();
                    //        respuesta.TipoRespuesta = 2;
                    //        respuesta.Mensaje = "Proyecto desasignado Satisfactoriamente";
                    //        respuesta.ValorDevolucion = obj.IdPersona.ToString();
                    //    }
                    //    else
                    //    {
                    //        obj.Activo = true;
                    //        obj.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                    //        obj.Fecha_upd = DateTime.Now;
                    //        context.SaveChanges();

                    //        dbtran.Commit();
                    //        respuesta.TipoRespuesta = 1;
                    //        respuesta.Mensaje = "Proyecto asignado Satisfactoriamente";
                    //        respuesta.ValorDevolucion = obj.IdPersona.ToString();
                    //    }

                    //    #endregion

                    //}
                    //else
                    //{
                    //    #region Agregar

                    //    PersonaProyecto n = new PersonaProyecto();
                    //    n.IdPersona = IdPersona;
                    //    n.IdProyecto = IdProyecto;
                    //    n.Activo = true;
                    //    n.IdUsuario_add = SecurityManager<EnUsuario>.User.IdUsuario;
                    //    n.Fecha_add = DateTime.Now;
                    //    n.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                    //    n.Fecha_upd = DateTime.Now;
                    //    context.PersonaProyecto.Add(n);
                    //    context.SaveChanges();

                    //    dbtran.Commit();
                    //    respuesta.TipoRespuesta = 1;
                    //    respuesta.Mensaje = "Proyecto asignado Satisfactoriamente";
                    //    respuesta.ValorDevolucion = n.IdPersona.ToString();

                    //    #endregion
                    //}

                }
                catch (Exception ex)
                {
                    dbtran.Rollback();
                    respuesta.TipoRespuesta = 3;
                    respuesta.Mensaje = ex.ToString();
                    respuesta.ValorDevolucion = "";
                }
            }
            return respuesta;
        }
    }
}
