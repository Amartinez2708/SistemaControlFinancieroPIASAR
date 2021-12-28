using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using _02_Entidades;
using _03_Data;

namespace _04_Servicios
{
    public class SrvGestionAutorizacionRendicion
    {
        BD_NucleosEjecutoresEntities context = new BD_NucleosEjecutoresEntities();

        public List<EnDropDownList> ListProyectos(int id)
        {
            List<EnDropDownList> result = new List<EnDropDownList>();

            EnDropDownList unidad = new EnDropDownList();
            unidad.id = 0;
            unidad.text = "[--Seleccione Proyecto--]";
            result.Add(unidad);

            if (id == 1)
            {
                var Proyectos = context.Proyecto.Where(x => x.Estado == 1 && x.Cod_modalidad==22).ToList();

                foreach (var obj in Proyectos)
                {
                    EnDropDownList model = new EnDropDownList();
                    model.id = obj.IdProyecto;
                    if (obj.CUI != null)
                    {
                        model.text = "[" + obj.Snip.Trim() + "][" + obj.CUI.Trim() + "] " + obj.Localidad.Trim();
                    }
                    else
                    {
                        model.text = "[" + obj.Snip.Trim() + "] " + obj.Localidad.Trim();
                    }
                    result.Add(model);
                }
            }
            else
            {
                var IdPersonal = context.USUARIO_SISTEMA.SingleOrDefault(x => x.IDUSUARIO == id).IDPERSONAL;
                var Proyectos = context.Personal.SingleOrDefault(x => x.IdPersonal == IdPersonal).Snip;

                char[] spearator = { ',' };

                String[] Snips = Proyectos.Split(spearator);

                foreach (String Snip in Snips)
                {
                    var obj = context.Proyecto.SingleOrDefault(x => x.Snip == Snip && x.Estado == 1);
                    if (obj != null)
                    {
                        EnDropDownList model = new EnDropDownList();
                        model.id = obj.IdProyecto;
                        model.text = "[" + obj.Snip.Trim() + "][" + obj.CUI.Trim() + "] " + obj.Localidad.Trim();
                        result.Add(model);
                    }
                }
            }

            
  
            return result.ToList();
        }

        public EnProyecto ListProyectoId(int Id)
        {
            EnProyecto result = new EnProyecto();

            var obj = context.Proyecto.SingleOrDefault(x => x.IdProyecto == Id && x.Estado == 1);

            if (obj != null)
            {
                result.Nom_proyecto = obj.Nom_proyecto;
                result.Mto_proyecto = obj.Mto_proyecto;
                result.TotalAutorizadoAprobado = obj.Autorizacion_Gasto.Where(x=>x.Estado_documento==23 && x.Estado==1).Sum(x=>x.Monto_autorizacion);
                result.TotalAutorizadoGestionado = obj.Autorizacion_Gasto.Where(x => (x.Estado_documento == 0 || x.Estado_documento == 1) && x.Estado == 1).Sum(x => x.Monto_autorizacion);

                result.TotalRendicionAprobado = obj.MANIFIESTO_GASTO.Where(x => x.ESTADO_DOCUMENTO == 23 && x.ESTADO == 1).Sum(x => x.MONTO_MANIFIESTO);
                result.TotalRendicionGestionado = obj.MANIFIESTO_GASTO.Where(x => (x.ESTADO_DOCUMENTO == 0 || x.ESTADO_DOCUMENTO == 1) && x.ESTADO == 1).Sum(x => x.MONTO_MANIFIESTO);

            }

            return result;
        }

        public List<EnAutorizacion_Gasto> ListAutorizacion(int IdProyecto)
        {
            List<Autorizacion_Gasto> obj = new List<Autorizacion_Gasto>();
            List<EnAutorizacion_Gasto> result = new List<EnAutorizacion_Gasto>();

            obj = context.Autorizacion_Gasto.Where(x => x.IdProyecto==IdProyecto && x.Estado==1).OrderByDescending(x => x.Nro_autorizacion).ToList();
            if (obj != null && obj.Count() > 0)
            {
                foreach (var data in obj)
                {
                    List<int> ListMovimiento = context.Movimiento_Documento.Where(x =>x.IdProyecto==IdProyecto && x.Tipo_documento == "AG" && x.IdDocumento == data.IdAutorizacion &&  x.Estado == 1).Select(x => x.IdMovimiento).ToList();
                    var TotalDocumentos = context.Movimiento_Documento_Detalle.Where(x => ListMovimiento.Contains(x.IdMovimiento) && x.Estado == true).Count();


                    EnAutorizacion_Gasto model = new EnAutorizacion_Gasto();
                    model.IdAutorizacion = data.IdAutorizacion;
                    model.Nro_autorizacion = data.Nro_autorizacion;
                    model.Concepto = data.Concepto;
                    model.StringFecha_autorizacion = data.Fecha_autorizacion == null ? "" : Convert.ToDateTime(data.Fecha_autorizacion).ToString("dd/MM/yyyy");
                    model.Monto_autorizacion = data.Monto_autorizacion;

                    if (data.Estado_documento == 0)
                    {
                        model.StringEstado_documento = "Pendiente";
                    }
                    else if(data.Estado_documento == 1)
                    {
                        model.StringEstado_documento = "En Evaluación";
                    }
                    else if (data.Estado_documento == 23)
                    {
                        model.StringEstado_documento = "Aprobado";
                    }

                    model.Documento = TotalDocumentos == 0 ? "NO" : "SI";
                    result.Add(model);
                } 
            }
            return result;
        }

        public List<EnMANIFIESTO_GASTO> ListRendicion(int IdProyecto)
        {
            List<MANIFIESTO_GASTO> obj = new List<MANIFIESTO_GASTO>();
            List<EnMANIFIESTO_GASTO> result = new List<EnMANIFIESTO_GASTO>();

            obj = context.MANIFIESTO_GASTO.Where(x => x.IDPROYECTO == IdProyecto && x.ESTADO == 1).OrderByDescending(x => x.NRO_MANIFIESTO).ToList();
            if (obj != null && obj.Count() > 0)
            {
                foreach (var data in obj)
                {
                    List<int> ListMovimiento = context.Movimiento_Documento.Where(x => x.IdProyecto == IdProyecto && x.Tipo_documento == "MG" && x.IdDocumento == data.IDMANIFIESTO && x.Estado == 1).Select(x => x.IdMovimiento).ToList();
                    var TotalDocumentos = context.Movimiento_Documento_Detalle.Where(x => ListMovimiento.Contains(x.IdMovimiento) && x.Estado == true).Count();


                    EnMANIFIESTO_GASTO model = new EnMANIFIESTO_GASTO();
                    model.IDMANIFIESTO = data.IDMANIFIESTO;
                    model.NRO_MANIFIESTO = data.NRO_MANIFIESTO;
                    model.RUBRO = data.RUBRO;
                    model.PerteneceAl = data.CORRESPONDE_AL_MES +" - "+ data.CORRESPONDE_AL_ANIO;
                    model.String_Fecha_Manifiesto = data.FECHA_MANIFIESTO == null ? "" : Convert.ToDateTime(data.FECHA_MANIFIESTO).ToString("dd/MM/yyyy"); ;
                    model.MONTO_MANIFIESTO = data.MONTO_MANIFIESTO;
                    model.OBSERVACION = data.OBSERVACION;
                    if (data.ESTADO_DOCUMENTO == 0)
                    {
                        model.StringEstado_documento = "Pendiente";
                    }
                    else if (data.ESTADO_DOCUMENTO == 1)
                    {
                        model.StringEstado_documento = "En Evaluación";
                    }
                    else if (data.ESTADO_DOCUMENTO == 23)
                    {
                        model.StringEstado_documento = "Aprobado";
                    }
                    model.Documento = TotalDocumentos == 0 ? "NO" : "SI";
                    result.Add(model);
                }
            }
            return result;
        }

        public EnAutorizacion_Gasto ListAutorizacionId(int Id)
        {
            EnAutorizacion_Gasto result = new EnAutorizacion_Gasto();

            var obj = context.Autorizacion_Gasto.SingleOrDefault(x => x.IdAutorizacion == Id);

            if (obj != null)
            {
                result.IdAutorizacion = obj.IdAutorizacion;
                result.Nro_autorizacion = obj.Nro_autorizacion;
                result.StringFecha_autorizacion = obj.Fecha_autorizacion == null ? "" : Convert.ToDateTime(obj.Fecha_autorizacion).ToString("dd/MM/yyyy");
                result.Concepto = obj.Concepto;
                result.Monto_autorizacion = obj.Monto_autorizacion;
                result.Estado_documento = obj.Estado_documento;
                result.Observacion = obj.Observacion;
            }

            return result;
        }
        public EnMANIFIESTO_GASTO ListManifiestoId(int Id)
        {
            EnMANIFIESTO_GASTO result = new EnMANIFIESTO_GASTO();

            var obj = context.MANIFIESTO_GASTO.SingleOrDefault(x => x.IDMANIFIESTO == Id);

            if (obj != null)
            {
                result.IDMANIFIESTO = obj.IDMANIFIESTO;
                result.NRO_MANIFIESTO = obj.NRO_MANIFIESTO;
                result.RUBRO = obj.RUBRO;
                result.CORRESPONDE_AL_MES = obj.CORRESPONDE_AL_MES;
                result.CORRESPONDE_AL_ANIO = obj.CORRESPONDE_AL_ANIO;
                result.String_Fecha_Manifiesto = obj.FECHA_MANIFIESTO == null ? "" : Convert.ToDateTime(obj.FECHA_MANIFIESTO).ToString("dd/MM/yyyy");
                result.MONTO_MANIFIESTO = obj.MONTO_MANIFIESTO;
                result.ESTADO_DOCUMENTO = obj.ESTADO_DOCUMENTO;
                result.OBSERVACION = obj.OBSERVACION;
            }

            return result;
        }

        public EnRespuesta GuardarManifiesto(EnMANIFIESTO_GASTO manifiesto)
        {
            EnRespuesta respuesta = new EnRespuesta();
            using (var dbtran = context.Database.BeginTransaction())
            {
                try
                {
                    if(manifiesto.IDMANIFIESTO == 0)
                    {
                        #region Agregar
                        var proyecto = context.Proyecto.FirstOrDefault(x => x.IdProyecto == manifiesto.IDPROYECTO && x.Estado == 1);
                        var IdManifiesto = context.MANIFIESTO_GASTO.Max(x => x.IDMANIFIESTO) + 1;
                        var UltimoNroManifiesto = context.MANIFIESTO_GASTO.Where(x => x.IDPROYECTO == proyecto.IdProyecto && x.ESTADO == 1).Count();
                        var NroManifiesto = string.Format("{0:000}", UltimoNroManifiesto + 1);

                        MANIFIESTO_GASTO Nuevo = new MANIFIESTO_GASTO();
                        Nuevo.IDMANIFIESTO = IdManifiesto;
                        Nuevo.NRO_MANIFIESTO = manifiesto.NRO_MANIFIESTO;
                        Nuevo.IDPROYECTO = Convert.ToInt32(manifiesto.IDPROYECTO);
                        Nuevo.FECHA_MANIFIESTO = manifiesto.FECHA_MANIFIESTO;
                        Nuevo.RUBRO = manifiesto.RUBRO;
                        Nuevo.CORRESPONDE_AL_MES = manifiesto.CORRESPONDE_AL_MES;
                        Nuevo.CORRESPONDE_AL_ANIO = manifiesto.CORRESPONDE_AL_ANIO;
                        Nuevo.MONTO_MANIFIESTO = manifiesto.MONTO_MANIFIESTO;
                        Nuevo.MONTO_DESPUES_MANIFIESTO = proyecto.Monto_acumulado_manifiesto_gasto + manifiesto.MONTO_MANIFIESTO;
                        Nuevo.OBSERVACION = manifiesto.OBSERVACION;
                        Nuevo.ESTADO_DOCUMENTO = manifiesto.ESTADO_DOCUMENTO;
                        Nuevo.ESTADO = 1;
                        Nuevo.IDUSUARIO_ADD = manifiesto.IdUsuario; //SecurityManager<EnUsuario>.User.IdUsuario;
                        Nuevo.FECHA_ADD = DateTime.Now;
                        Nuevo.IDUSUARIO_UPD = manifiesto.IdUsuario;//SecurityManager<EnUsuario>.User.IdUsuario;
                        Nuevo.FECHA_UPD = DateTime.Now;
                        Nuevo.TIPO_MANIFIESTO = 1;

                        context.MANIFIESTO_GASTO.Add(Nuevo);
                        context.SaveChanges();

                        /*Actualiza Proyecto*/
                        proyecto.Monto_acumulado_manifiesto_gasto = proyecto.Monto_acumulado_manifiesto_gasto + manifiesto.MONTO_MANIFIESTO;
                        context.SaveChanges();

                        /*Genera Movimiento de Documento*/
                        #region Genera Movimiento
                        //int IdMovimiento = context.Movimiento_Documento.Max(x => x.IdMovimiento) + 1;

                        //Movimiento_Documento movimiento = new Movimiento_Documento();
                        //movimiento.IdMovimiento = IdMovimiento;
                        //movimiento.IdProyecto = manifiesto.IDPROYECTO;
                        //movimiento.Tipo_documento = "MG";
                        //movimiento.IdDocumento = IdManifiesto;
                        //movimiento.IdMovimiento_anterior = IdMovimiento;
                        //movimiento.Tipo_envia_documento = 0;
                        //movimiento.IdUsuario_envia_documento = 0;
                        //movimiento.Fecha_envia_documento = '';
                        //movimiento.Tipo_recibe_documento = 0;
                        //movimiento.IdUsuario_recibe_documento = 0;
                        //movimiento.Fecha_recibe_documento = "";
                        //movimiento.Fecha_atiende_documento = "";
                        //movimiento.Observacion_documento = "";
                        //movimiento.Nombre_documento_aprobacion = "";
                        //movimiento.Adjunto_observacion = "";
                        //movimiento.Estado_documento = 0;
                        //movimiento.Estado = 1;
                        //movimiento.Orden_envia = 1;
                        //movimiento.IdUsuario_add = manifiesto.IdUsuario;
                        //movimiento.Fecha_add = DateTime.Now;
                        //movimiento.IdUsuario_upd = manifiesto.IdUsuario;
                        //movimiento.Fecha_upd = DateTime.Now;
                        //context.Movimiento_Documento.Add(movimiento);
                        //context.SaveChanges();

                        //int IdMovimientoDetalle = context.Movimiento_Documento_Detalle.Max(x => x.IdDocumento_detalle) + 1;

                        //Movimiento_Documento_Detalle documentodetalle = new Movimiento_Documento_Detalle();
                        //documentodetalle.IdDocumento_detalle = IdMovimientoDetalle;
                        //documentodetalle.IdMovimiento = IdMovimiento;
                        //documentodetalle.Nombre_documento = manifiesto.NombreReal;
                        //documentodetalle.Nombre_real_documento = manifiesto.NombreInforme;
                        //documentodetalle.Ruta_documento = manifiesto.RutaDocumento;
                        //documentodetalle.Cod_pagina = "ok";
                        //documentodetalle.IdUsuario_add = manifiesto.IdUsuario;
                        //documentodetalle.Fecha_add = DateTime.Now;
                        //documentodetalle.IdUsuario_upd = manifiesto.IdUsuario;
                        //documentodetalle.Fecha_upd = DateTime.Now;
                        //context.Movimiento_Documento_Detalle.Add(documentodetalle);
                        //context.SaveChanges();
                        #endregion

                        dbtran.Commit();

                        ActualizarFechaActualización(Convert.ToInt32(manifiesto.IdUsuario));
                        //dbtran.Rollback();
                        respuesta.TipoRespuesta = 1;
                        respuesta.Mensaje = "Rendición de Gasto Agregada Satisfactoriamente";
                        respuesta.ValorDevolucion = Nuevo.IDMANIFIESTO.ToString();
                        #endregion
                    }
                    else
                    {
                        #region Editar
                        var proyecto = context.Proyecto.FirstOrDefault(x => x.IdProyecto == manifiesto.IDPROYECTO && x.Estado == 1);
                        var obj = context.MANIFIESTO_GASTO.SingleOrDefault(x => x.IDPROYECTO == manifiesto.IDPROYECTO && x.IDMANIFIESTO == manifiesto.IDMANIFIESTO);

                        obj.NRO_MANIFIESTO = manifiesto.NRO_MANIFIESTO;
                        obj.FECHA_MANIFIESTO = manifiesto.FECHA_MANIFIESTO;
                        obj.RUBRO = manifiesto.RUBRO;
                        obj.CORRESPONDE_AL_MES = manifiesto.CORRESPONDE_AL_MES;
                        obj.CORRESPONDE_AL_ANIO = manifiesto.CORRESPONDE_AL_ANIO;

                        /*Actualiza Proyecto*/
                        proyecto.Monto_acumulado_manifiesto_gasto = (proyecto.Monto_acumulado_manifiesto_gasto - obj.MONTO_MANIFIESTO) + manifiesto.MONTO_MANIFIESTO;

                        obj.MONTO_MANIFIESTO = manifiesto.MONTO_MANIFIESTO;
                        obj.MONTO_DESPUES_MANIFIESTO = (proyecto.Monto_acumulado_manifiesto_gasto - obj.MONTO_MANIFIESTO)+ manifiesto.MONTO_MANIFIESTO;
                        obj.OBSERVACION = manifiesto.OBSERVACION;
                        obj.ESTADO_DOCUMENTO = manifiesto.ESTADO_DOCUMENTO;
                        obj.IDUSUARIO_UPD = manifiesto.IdUsuario;//SecurityManager<EnUsuario>.User.IdUsuario;
                        obj.FECHA_UPD = DateTime.Now;

                        context.SaveChanges();

                        dbtran.Commit();

                        ActualizarFechaActualización(Convert.ToInt32(manifiesto.IdUsuario));

                        //dbtran.Rollback();
                        respuesta.TipoRespuesta = 1;
                        respuesta.Mensaje = "Rendición de Gasto Actualizada Satisfactoriamente";
                        respuesta.ValorDevolucion = manifiesto.IDMANIFIESTO.ToString();
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

        public EnRespuesta EliminarManifiesto(int Id, int IdUsuario)
        {
            EnRespuesta respuesta = new EnRespuesta();
            using (var dbtran = context.Database.BeginTransaction())
            {
                try
                {
                    var obj = context.MANIFIESTO_GASTO.SingleOrDefault(x => x.IDMANIFIESTO == Id && x.ESTADO == 1);
                    if (obj != null)
                    {
                        obj.ESTADO = 0;
                        obj.IDUSUARIO_UPD = IdUsuario;
                        obj.FECHA_UPD = DateTime.Now;

                        /*Actualiza Proyecto*/
                        obj.Proyecto.Monto_acumulado_manifiesto_gasto = (obj.Proyecto.Monto_acumulado_manifiesto_gasto - obj.MONTO_MANIFIESTO);

                        context.SaveChanges();

                        dbtran.Commit();
                        respuesta.TipoRespuesta = 1;
                        respuesta.Mensaje = "Rendición Eliminado Satisfactoriamente";
                        respuesta.ValorDevolucion = "";
                        ActualizarFechaActualización(Convert.ToInt32(IdUsuario));
                    }
                    else
                    {
                        dbtran.Rollback();
                        respuesta.TipoRespuesta = 3;
                        respuesta.Mensaje = "No se puede eliminar la Rendición, refresque la pagina";
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

        public EnRespuesta GuardarAutorizacion(EnAutorizacion_Gasto autorizacion)
        {
            EnRespuesta respuesta = new EnRespuesta();
            using (var dbtran = context.Database.BeginTransaction())
            {
                try
                {
                    if (autorizacion.IdAutorizacion == 0)
                    {
                        #region Agregar
                        var proyecto = context.Proyecto.FirstOrDefault(x => x.IdProyecto == autorizacion.IdProyecto && x.Estado == 1);
                        var IdAutorizacion = context.Autorizacion_Gasto.Max(x => x.IdAutorizacion) + 1;
                        var UltimoNroAutorizacion = context.Autorizacion_Gasto.Where(x => x.IdProyecto == autorizacion.IdProyecto && x.Estado == 1).Count();
                        var NroAutorizacion = string.Format("{0:000}", UltimoNroAutorizacion + 1);

                        Autorizacion_Gasto Nuevo = new Autorizacion_Gasto();
                        Nuevo.IdAutorizacion = IdAutorizacion;
                        Nuevo.Nro_autorizacion = autorizacion.Nro_autorizacion;
                        Nuevo.IdProyecto = Convert.ToInt32(autorizacion.IdProyecto);
                        Nuevo.Fecha_autorizacion = autorizacion.Fecha_autorizacion;
                        Nuevo.Concepto = autorizacion.Concepto;
                        Nuevo.Monto_autorizacion = autorizacion.Monto_autorizacion;
                        Nuevo.Saldo_despues_autorizacion = proyecto.Saldo_disponible - autorizacion.Monto_autorizacion;
                        Nuevo.Saldo_disponible_proyecto = proyecto.Saldo_disponible;
                        Nuevo.Monto_acumulado_autorizaciones_anteriores = proyecto.Monto_acumulado_autorizacion;
                        Nuevo.Observacion = autorizacion.Observacion;
                        Nuevo.Estado_documento = autorizacion.Estado_documento;
                        Nuevo.Estado = 1;
                        Nuevo.IdUsuario_add = autorizacion.IdUsuario; //SecurityManager<EnUsuario>.User.IdUsuario;
                        Nuevo.Fecha_add = DateTime.Now;
                        Nuevo.IdUsuario_upd = autorizacion.IdUsuario;//SecurityManager<EnUsuario>.User.IdUsuario;
                        Nuevo.Fecha_upd = DateTime.Now;
                        Nuevo.Tipo_autorizacion = 1;

                        context.Autorizacion_Gasto.Add(Nuevo);
                        context.SaveChanges();

                        /*Actualiza Proyecto*/
                        proyecto.Monto_acumulado_autorizacion = proyecto.Monto_acumulado_autorizacion + autorizacion.Monto_autorizacion;
                        context.SaveChanges();

                        /*Genera Movimiento de Documento*/
                        #region Genera Movimiento
                        //int IdMovimiento = context.Movimiento_Documento.Max(x => x.IdMovimiento) + 1;

                        //Movimiento_Documento movimiento = new Movimiento_Documento();
                        //movimiento.IdMovimiento = IdMovimiento;
                        //movimiento.IdProyecto = autorizacion.IdProyecto;
                        //movimiento.Tipo_documento = "AG";
                        //movimiento.IdDocumento = IdAutorizacion;
                        //movimiento.IdMovimiento_anterior = IdMovimiento;
                        ////movimiento.Tipo_envia_documento = 0;
                        ////movimiento.IdUsuario_envia_documento = 0;
                        ////movimiento.Fecha_envia_documento = "";
                        ////movimiento.Tipo_recibe_documento = 0;
                        ////movimiento.IdUsuario_recibe_documento = 0;
                        ////movimiento.Fecha_recibe_documento = "";
                        ////movimiento.Fecha_atiende_documento = "";
                        //movimiento.Observacion_documento = "";
                        //movimiento.Nombre_documento_aprobacion = "";
                        //movimiento.Adjunto_observacion = "";
                        //movimiento.Estado_documento = 0;
                        //movimiento.Estado = 1;
                        //movimiento.Orden_envia = 1;
                        //movimiento.IdUsuario_add = autorizacion.IdUsuario;
                        //movimiento.Fecha_add = DateTime.Now;
                        //movimiento.IdUsuario_upd = autorizacion.IdUsuario;
                        //movimiento.Fecha_upd = DateTime.Now;
                        //context.Movimiento_Documento.Add(movimiento);
                        //context.SaveChanges();

                        //int IdMovimientoDetalle = context.Movimiento_Documento_Detalle.Max(x => x.IdDocumento_detalle) + 1;

                        //Movimiento_Documento_Detalle documentodetalle = new Movimiento_Documento_Detalle();
                        //documentodetalle.IdDocumento_detalle = IdMovimientoDetalle;
                        //documentodetalle.IdMovimiento = IdMovimiento;
                        //documentodetalle.Nombre_documento = manifiesto.NombreReal;
                        //documentodetalle.Nombre_real_documento = manifiesto.NombreInforme;
                        //documentodetalle.Ruta_documento = manifiesto.RutaDocumento;
                        //documentodetalle.Cod_pagina = "ok";
                        //documentodetalle.IdUsuario_add = manifiesto.IdUsuario;
                        //documentodetalle.Fecha_add = DateTime.Now;
                        //documentodetalle.IdUsuario_upd = manifiesto.IdUsuario;
                        //documentodetalle.Fecha_upd = DateTime.Now;
                        //context.Movimiento_Documento_Detalle.Add(documentodetalle);
                        //context.SaveChanges();
                        #endregion

                        dbtran.Commit();

                        ActualizarFechaActualización(Convert.ToInt32(autorizacion.IdUsuario));
                        //dbtran.Rollback();
                        respuesta.TipoRespuesta = 1;
                        respuesta.Mensaje = "Autorización de Gasto Agregada Satisfactoriamente";
                        respuesta.ValorDevolucion = Nuevo.IdAutorizacion.ToString();
                        #endregion
                    }
                    else
                    {
                        #region Editar
                        var proyecto = context.Proyecto.FirstOrDefault(x => x.IdProyecto == autorizacion.IdProyecto && x.Estado == 1);
                        var obj = context.Autorizacion_Gasto.SingleOrDefault(x => x.IdProyecto == autorizacion.IdProyecto && x.IdAutorizacion == autorizacion.IdAutorizacion);

                        obj.Nro_autorizacion = autorizacion.Nro_autorizacion;
                        obj.Fecha_autorizacion = autorizacion.Fecha_autorizacion;
                        obj.Concepto = autorizacion.Concepto;
                        /*Actualiza Proyecto*/
                        proyecto.Monto_acumulado_autorizacion = (proyecto.Monto_acumulado_autorizacion - obj.Monto_autorizacion) + autorizacion.Monto_autorizacion;

                        obj.Monto_autorizacion = autorizacion.Monto_autorizacion;
                        obj.Saldo_despues_autorizacion = (proyecto.Saldo_disponible + obj.Monto_autorizacion) - autorizacion.Monto_autorizacion;
                        obj.Saldo_disponible_proyecto = proyecto.Saldo_disponible;
                        obj.Observacion = autorizacion.Observacion;
                        obj.Estado_documento = autorizacion.Estado_documento;
                        obj.IdUsuario_upd = autorizacion.IdUsuario;
                        obj.Fecha_upd = DateTime.Now;

                        context.SaveChanges();

                        dbtran.Commit();

                        ActualizarFechaActualización(Convert.ToInt32(autorizacion.IdUsuario));

                        //dbtran.Rollback();
                        respuesta.TipoRespuesta = 1;
                        respuesta.Mensaje = "Autorización de Gasto Actualizada Satisfactoriamente";
                        respuesta.ValorDevolucion = autorizacion.IdAutorizacion.ToString();
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

        public EnRespuesta EliminarAutorizacion(int Id, int IdUsuario)
        {
            EnRespuesta respuesta = new EnRespuesta();
            using (var dbtran = context.Database.BeginTransaction())
            {
                try
                {
                    var obj = context.Autorizacion_Gasto.SingleOrDefault(x => x.IdAutorizacion == Id && x.Estado == 1);
                    if (obj != null)
                    {
                        obj.Estado = 0;
                        obj.IdUsuario_upd = IdUsuario;
                        obj.Fecha_upd = DateTime.Now;

                        /*Actualiza Proyecto*/
                        obj.Proyecto.Monto_acumulado_autorizacion = (obj.Proyecto.Monto_acumulado_autorizacion - obj.Monto_autorizacion);

                        context.SaveChanges();

                        dbtran.Commit();
                        respuesta.TipoRespuesta = 1;
                        respuesta.Mensaje = "Autorización Eliminada Satisfactoriamente";
                        respuesta.ValorDevolucion = "";

                        ActualizarFechaActualización(Convert.ToInt32(IdUsuario));
                    }
                    else
                    {
                        dbtran.Rollback();
                        respuesta.TipoRespuesta = 3;
                        respuesta.Mensaje = "No se puede eliminar la Autorización, refresque la pagina";
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

        public EnRespuesta ActualizarFechaActualización(int IdUsuario)
        {
            EnRespuesta respuesta = new EnRespuesta();


            using (var dbtran = context.Database.BeginTransaction())
            {
                try
                {
                    var Proyectos = context.Proyecto.Where(x => x.Cod_subprograma == 133 && x.Cod_modalidad == 22).ToList();
                    List<int> ListProyectos = context.Proyecto.Where(x => x.Cod_subprograma == 133 && x.Cod_modalidad == 22).Select(x => x.IdProyecto).ToList();
                    var Autorizacion = context.Autorizacion_Gasto.Where(x => ListProyectos.Contains(x.IdProyecto) && x.Estado_documento == 23 && x.Estado == 1).ToList();
                    var Manifiesto = context.MANIFIESTO_GASTO.Where(x => ListProyectos.Contains(x.IDPROYECTO) && x.ESTADO_DOCUMENTO == 23 && x.ESTADO == 1).ToList();

                    HistoricoMonitoreo h = new HistoricoMonitoreo();
                    h.MontoTotalTransferido = Proyectos.Sum(x => x.MontoDesembolso);
                    h.MontoTotalAutorizaciones = Autorizacion.Sum(x => x.Monto_autorizacion);
                    h.MontoTotalRendiciones = Manifiesto.Sum(x => x.MONTO_MANIFIESTO);
                    h.FechaActualizacion = DateTime.Now;
                    h.Activo = true;
                    h.IdUsuario_add = IdUsuario;
                    h.Fecha_add = DateTime.Now;
                    h.IdUsuario_upd = IdUsuario;
                    h.Fecha_upd = DateTime.Now;

                    context.HistoricoMonitoreo.Add(h);
                    context.SaveChanges();
                    dbtran.Commit();

                }
                catch ( Exception ex)
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
