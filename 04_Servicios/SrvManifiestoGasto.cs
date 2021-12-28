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
    public class SrvManifiestoGasto
    {
        BD_NucleosEjecutoresEntities context = new BD_NucleosEjecutoresEntities();
        public List<EnDropDownList> ddlAutorizacionesGasto(string snip)
        {
            List<EnDropDownList> result = new List<EnDropDownList>();

            var obj = context.Autorizacion_Gasto.Where(x =>x.Proyecto.Snip==snip && x.Estado == 1);
            if (obj != null && obj.Count() > 0)
            {
                EnDropDownList values;
                foreach (var data in obj)
                {
                    values = new EnDropDownList();
                    values.id = data.IdAutorizacion;
                    values.text = "[" + data.Nro_autorizacion + "] - " + data.Concepto;
                    result.Add(values);
                }
            }
            return result;
        }

        public List<EnComprobanteDetalle> ListAutorizacionDetalle(string ids, int Tipo, string IdsComprobante)
        {
            List<AUTORIZACION_GASTO_DETALLE> obj = new List<AUTORIZACION_GASTO_DETALLE>();
            List<EnComprobanteDetalle> result = new List<EnComprobanteDetalle>();

            List<ComprobanteDetalle> objComprobantesusados = new List<ComprobanteDetalle>();
            List<EnComprobanteDetalle> comprobantesusados = new List<EnComprobanteDetalle>();

            char[] spearator = { ',' };

            String[] IdsComprobantes = IdsComprobante.Split(spearator);

            if (IdsComprobantes[0] !="")
            {
                foreach (String IdComprobantes in IdsComprobantes)
                {
                    Int32 Id = Convert.ToInt32(IdComprobantes);
                    objComprobantesusados = context.ComprobanteDetalle.Where(x => x.IdComprobante == Id).ToList();
                    if (objComprobantesusados != null && objComprobantesusados.Count() > 0)
                    {
                        foreach (var data in objComprobantesusados)
                        {
                            EnComprobanteDetalle model = new EnComprobanteDetalle();
                            model.IdAutorizacion = data.IdAutorizacion;
                            model.IdRubro = data.IdRubro;
                            model.IdItem = data.IdItem;
                            model.Item_Insumo_Servicio = data.Item_Insumo_Servicio;
                            model.Descripcion_Insumo_Servicio = data.Descripcion_Insumo_Servicio;
                            model.Unidad = data.Unidad;
                            model.Cantidad = data.Cantidad;
                            model.PreciUnitario = data.PreciUnitario;
                            model.Importe = data.Importe;
                            model.Estado = 1;
                            model.SaldoImporte = data.SaldoImporte;
                            comprobantesusados.Add(model);
                        }
                    }
                }
            }

                String[] Ids = ids.Split(spearator);

                foreach (String IdAutorizacion in Ids)
                {
                    Int32 Id = Convert.ToInt32(IdAutorizacion);
                    obj = context.AUTORIZACION_GASTO_DETALLE.Where(x => x.IDAUTORIZACION == Id && x.IDRUBRO==Tipo && x.ESTADO==1).ToList();

                    if (obj != null && obj.Count() > 0)
                    {
                        foreach (var data in obj)
                        {
                        decimal Importe = 0;
                        decimal cantidad = 0;
                        if (comprobantesusados.Count() > 0)
                            {
                                for (int i=0; comprobantesusados.Count() > i; i++)
                                {
                                    if(comprobantesusados[i].IdAutorizacion==data.IDAUTORIZACION && comprobantesusados[i].IdItem == data.IDAUTORIZACION_DETALLE)
                                    {
                                        Importe = Importe + Convert.ToDecimal(comprobantesusados[i].Importe);
                                        cantidad = cantidad + Convert.ToDecimal(comprobantesusados[i].Cantidad);
                                }
                                }
                            
                            } 
                            EnComprobanteDetalle model = new EnComprobanteDetalle();
                            model.IdAutorizacion = data.IDAUTORIZACION;
                            model.IdRubro = data.IDRUBRO;
                            model.IdItem = data.IDAUTORIZACION_DETALLE;
                            model.Item_Insumo_Servicio = data.ITEM_INSUMO_SERVICIO;
                            model.Descripcion_Insumo_Servicio = data.DESCRIPCION_INSUMO_SERVICIO;
                            model.Unidad = data.UNIDAD;
                            model.Cantidad = data.CANTIDAD - cantidad;
                            model.PreciUnitario = data.PRECIO_UNITARIO;
                            model.Importe = data.SaldoImporte - Importe;
                            model.Estado = 1;
                            model.Rubro = data.IDRUBRO == 0 ? "" : data.IDRUBRO == null ? "" : context.TABLA_DETALLE.FirstOrDefault(x => x.IDDETALLE == data.IDRUBRO).SDETALLE;
                            model.CodRubro = data.IDRUBRO == 0 ? "" : data.IDRUBRO == null ? "" : context.TABLA_DETALLE.FirstOrDefault(x => x.IDDETALLE == data.IDRUBRO).FILLER1;
                            model.SaldoImporte = data.SaldoImporte - Importe;
                            if (model.Importe > 0)
                            {
                                result.Add(model);
                            }
                            
                        }
                    }
                }
            //}
            //else
            //{
            //    var ListaRubros = context.sp_ListAutorizacionRubro(ids);
            //    var Listado = ListaRubros.ToList();
            //    if(Listado != null && Listado.Count() > 0)
            //    {
            //        foreach(var data in Listado.ToList())
            //        {
            //            EnComprobanteDetalle model = new EnComprobanteDetalle();
            //            model.IdRubro = data.IdRubro;
            //            model.CodRubro = data.CodRubro;
            //            model.Rubro = data.Rubro;
            //            model.Importe = data.Importe;
            //            model.Estado = 1;
            //            result.Add(model);
            //        }
            //    }
            //}     
            return result.ToList();
        }

        public EnRespuesta TotalAutorizacion(string ids)
        {
            EnRespuesta respuesta = new EnRespuesta();

            decimal? Importe = 0;

            char[] spearator = { ',' };
            String[] Ids = ids.Split(spearator);

            foreach (String IdAutorizacion in Ids)
            {
                Int32 Id = Convert.ToInt32(IdAutorizacion);
                var obj = context.AUTORIZACION_GASTO_DETALLE.Where(x => x.IDAUTORIZACION == Id && x.ESTADO==1);

                if (obj != null)
                {
                    Importe = Importe + obj.Sum(x=>x.SaldoImporte);
                }
            }
            respuesta.TipoRespuesta = 1;
            respuesta.Mensaje = "";
            respuesta.ValorDevolucion = Importe.ToString();

            return respuesta;
        }

        public EnRespuesta AgregarComprobante(EnComprobante comprobante)
        {
            EnRespuesta respuesta = new EnRespuesta();
            using (var dbtran = context.Database.BeginTransaction())
            {
                try
                {
                    #region Agregar
                    Comprobante Nuevo = new Comprobante();
                    Nuevo.IdClase = comprobante.IdClase;
                    Nuevo.NroComrpobante = comprobante.NroComrpobante;
                    Nuevo.RazonSocial = comprobante.RazonSocial;
                    Nuevo.Fecha = comprobante.Fecha;
                    Nuevo.Observacion = comprobante.Observacion;
                    //Nuevo.IdsAutorizacion = comprobante.IdsAutorizacion;
                    Nuevo.Tipo = comprobante.Tipo;
                    Nuevo.Estado = 1;
                    Nuevo.Activo = true;
                    Nuevo.IdUsuario_add = 1; //SecurityManager<EnUsuario>.User.IdUsuario;
                    Nuevo.Fecha_add = DateTime.Now;
                    Nuevo.IdUsuario_upd = 1;//SecurityManager<EnUsuario>.User.IdUsuario;
                    Nuevo.Fecha_upd = DateTime.Now;
                    context.Comprobante.Add(Nuevo);
                    context.SaveChanges();

                    foreach(EnComprobanteDetalle detalle in comprobante.ComprobanteDetalle)
                    {
                        ComprobanteDetalle NuevoDetalle = new ComprobanteDetalle();
                        NuevoDetalle.IdComprobante = Nuevo.IdComprobante;
                        NuevoDetalle.IdAutorizacion = detalle.IdAutorizacion;
                        NuevoDetalle.IdRubro = detalle.IdRubro;
                        NuevoDetalle.IdItem = detalle.IdItem;
                        NuevoDetalle.Item_Insumo_Servicio = detalle.Item_Insumo_Servicio;
                        NuevoDetalle.Descripcion_Insumo_Servicio = detalle.Descripcion_Insumo_Servicio;
                        NuevoDetalle.Unidad = detalle.Unidad;
                        NuevoDetalle.Cantidad = detalle.Cantidad;
                        NuevoDetalle.PreciUnitario = detalle.PreciUnitario;
                        NuevoDetalle.Importe = detalle.Importe;
                        NuevoDetalle.SaldoImporte = detalle.SaldoImporte;
                        NuevoDetalle.Estado = 1;
                        NuevoDetalle.Activo = true;
                        NuevoDetalle.IdUsuario_add = 1; //SecurityManager<EnUsuario>.User.IdUsuario;
                        NuevoDetalle.Fecha_add = DateTime.Now;
                        NuevoDetalle.IdUsuario_upd = 1;//SecurityManager<EnUsuario>.User.IdUsuario;
                        NuevoDetalle.Fecha_upd = DateTime.Now;
                        context.ComprobanteDetalle.Add(NuevoDetalle);
                        context.SaveChanges();
                    }

                    dbtran.Commit();
                    //dbtran.Rollback();
                    respuesta.TipoRespuesta = 1;
                    respuesta.Mensaje = "Medio de Pago Agregado Satisfactoriamente";
                    respuesta.ValorDevolucion = Nuevo.IdComprobante.ToString();
                    #endregion
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

        public EnRespuesta GuardarManifiesto(EnMANIFIESTO_GASTO manifiesto)
        {
            EnRespuesta respuesta = new EnRespuesta();
            using (var dbtran = context.Database.BeginTransaction())
            {
                try
                {
                    #region Agregar
                    var proyecto = context.Proyecto.FirstOrDefault(x => x.Snip == manifiesto.Snip && x.Estado == 1);
                    var IdManifiesto = context.MANIFIESTO_GASTO.Max(x=>x.IDMANIFIESTO) + 1;
                    var UltimoNroManifiesto = context.MANIFIESTO_GASTO.Where(x => x.IDPROYECTO == proyecto.IdProyecto && x.ESTADO == 1).Count();
                    var NroManifiesto = string.Format("{0:0000}", UltimoNroManifiesto + 1);

                    MANIFIESTO_GASTO Nuevo = new MANIFIESTO_GASTO();
                    Nuevo.IDMANIFIESTO = IdManifiesto;
                    Nuevo.NRO_MANIFIESTO = NroManifiesto;
                    Nuevo.IDPROYECTO = proyecto.IdProyecto;
                    Nuevo.FECHA_MANIFIESTO = manifiesto.FECHA_MANIFIESTO;
                    Nuevo.RUBRO = manifiesto.RUBRO;
                    Nuevo.CORRESPONDE_AL_MES = manifiesto.CORRESPONDE_AL_MES;
                    Nuevo.CORRESPONDE_AL_ANIO = manifiesto.CORRESPONDE_AL_ANIO;
                    Nuevo.OBSERVACION = manifiesto.OBSERVACION;
                    Nuevo.MONTO_ACUMULADO_MANIFIESTOS_ANTERIORES = proyecto.Monto_acumulado_manifiesto_gasto;
                    //Nuevo.MONTO_MANIFIESTO = true;
                    //Nuevo.MONTO_DESPUES_MANIFIESTO = true;
                    Nuevo.ESTADO_DOCUMENTO = 0;
                    Nuevo.ESTADO = 1;
                    Nuevo.IDUSUARIO_ADD = manifiesto.IdUsuario; //SecurityManager<EnUsuario>.User.IdUsuario;
                    Nuevo.FECHA_ADD = DateTime.Now;
                    Nuevo.IDUSUARIO_UPD = manifiesto.IdUsuario;//SecurityManager<EnUsuario>.User.IdUsuario;
                    Nuevo.FECHA_UPD = DateTime.Now;
                    Nuevo.TIPO_MANIFIESTO = 1;
                    context.MANIFIESTO_GASTO.Add(Nuevo);
                    context.SaveChanges();

                    int Orden = 0;
                    decimal? Importe = 0;
                    char[] spearator = { ',' };
                    String[] Ids = manifiesto.IdsComprobante.Split(spearator);

                    int IdManifiestoGastoDetalle = context.MANIFIESTO_GASTO_DETALLE.Max(x => x.IDMANIFIESTO_DETALLE) + 1;

                    foreach (String IdComprobante in Ids)
                    {
                        Int32 Id = Convert.ToInt32(IdComprobante);
                        var objComprobante = context.Comprobante.FirstOrDefault(x => x.IdComprobante == Id);
                        if (objComprobante != null)
                        {
                            var ObjComprobanteDetalle = context.ComprobanteDetalle.Where(x => x.IdComprobante == objComprobante.IdComprobante).ToList();
                            if (ObjComprobanteDetalle != null)
                            {
                                #region Detalle

                                foreach (ComprobanteDetalle detalle in ObjComprobanteDetalle)
                                {
                                    MANIFIESTO_GASTO_DETALLE manifiestodetalle = new MANIFIESTO_GASTO_DETALLE();
                                    manifiestodetalle.IDMANIFIESTO_DETALLE = IdManifiestoGastoDetalle + 1;
                                    manifiestodetalle.IDMANIFIESTO = IdManifiesto;
                                    manifiestodetalle.ITEM = detalle.IdRubro == 0 ? "" : detalle.IdRubro == null ? "" : context.TABLA_DETALLE.FirstOrDefault(x => x.IDDETALLE == detalle.IdRubro).FILLER1;
                                    manifiestodetalle.IDRUBRO = detalle.IdRubro == 0 ? 0 : detalle.IdRubro == null ? 0 : context.TABLA_DETALLE.FirstOrDefault(x => x.IDDETALLE == detalle.IdRubro).IDPADRE;
                                    manifiestodetalle.IDSUBRUBRO = detalle.IdRubro;
                                    manifiestodetalle.ORDEN_CRONOLOGICO = Orden + 1;
                                    manifiestodetalle.FECHA = objComprobante.Fecha;
                                    manifiestodetalle.IDCLASE = objComprobante.IdClase;
                                    manifiestodetalle.ID_ITEM = detalle.IdItem;
                                    manifiestodetalle.ITEM_INSUMO_SERVICIO = detalle.Item_Insumo_Servicio;
                                    manifiestodetalle.NRO_ITEM = objComprobante.NroComrpobante;
                                    manifiestodetalle.RAZON_SOCIAL_NOMBRE = objComprobante.RazonSocial;
                                    manifiestodetalle.CONCEPTO = detalle.Descripcion_Insumo_Servicio;
                                    manifiestodetalle.UNIDAD = detalle.Unidad;
                                    manifiestodetalle.CANTIDAD = detalle.Cantidad;
                                    manifiestodetalle.PRECIO_UNITARIO = detalle.PreciUnitario;
                                    manifiestodetalle.IMPORTE = detalle.Importe;
                                    manifiestodetalle.SALDO_IMPORTE_INSUMO = detalle.SaldoImporte;
                                    manifiestodetalle.OBSERVACION = objComprobante.Observacion;
                                    manifiestodetalle.TIPO_FLAG = 0;
                                    manifiestodetalle.ESTADO = 1;
                                    manifiestodetalle.IDUSUARIO_ADD = manifiesto.IdUsuario; ; //SecurityManager<EnUsuario>.User.IdUsuario;
                                    manifiestodetalle.FECHA_ADD = DateTime.Now;
                                    manifiestodetalle.IDUSUARIO_UPD = manifiesto.IdUsuario; ;//SecurityManager<EnUsuario>.User.IdUsuario;
                                    manifiestodetalle.FECHA_UPD = DateTime.Now;
                                    manifiestodetalle.Clase = objComprobante.IdClase == 0 ? "" : context.TABLA_DETALLE.FirstOrDefault(x => x.IDDETALLE == objComprobante.IdClase).SDETALLE;
                                    context.MANIFIESTO_GASTO_DETALLE.Add(manifiestodetalle);
                                    context.SaveChanges();

                                    /*Actualiza Autorizacion de Gasto*/
                                    var objAutorizacion = context.AUTORIZACION_GASTO_DETALLE.SingleOrDefault(x => x.IDAUTORIZACION == detalle.IdAutorizacion && x.ID_ITEM == detalle.IdItem);
                                    if (objAutorizacion != null)
                                    {
                                        objAutorizacion.SaldoImporte = objAutorizacion.SaldoImporte - detalle.Importe;
                                        context.SaveChanges();
                                    }

                                    IdManifiestoGastoDetalle = IdManifiestoGastoDetalle + 1;
                                    Importe = Importe + detalle.Importe;
                                    #endregion
                                }
                            }
                        }
                    }

                    Nuevo.MONTO_MANIFIESTO = Importe;
                    Nuevo.MONTO_DESPUES_MANIFIESTO = proyecto.Monto_acumulado_manifiesto_gasto + Importe;
                    context.SaveChanges();

                    /*Actualiza Proyecto*/
                    proyecto.Monto_acumulado_manifiesto_gasto = proyecto.Monto_acumulado_manifiesto_gasto + Importe;
                    context.SaveChanges();

                    /*Genera Movimiento de Documento*/
                    #region Genera Movimiento
                    //int IdMovimiento = context.Movimiento_Documento.Max(x => x.IdMovimiento) + 1;

                    //Movimiento_Documento movimiento = new Movimiento_Documento();
                    //movimiento.IdMovimiento = IdMovimiento;
                    //movimiento.IdProyecto = proyecto.IdProyecto;
                    //movimiento.Tipo_documento = "MG";
                    //movimiento.IdDocumento = IdManifiesto;
                    //movimiento.IdMovimiento_anterior = IdMovimiento;
                    ////movimiento.Tipo_envia_documento = 0;
                    ////movimiento.IdUsuario_envia_documento = 0;
                    ////movimiento.Fecha_envia_documento = '';
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
                    //documentodetalle.Estado = true;
                    //documentodetalle.IdUsuario_add = manifiesto.IdUsuario;
                    //documentodetalle.Fecha_add = DateTime.Now;
                    //documentodetalle.IdUsuario_upd = manifiesto.IdUsuario;
                    //documentodetalle.Fecha_upd = DateTime.Now;
                    //context.Movimiento_Documento_Detalle.Add(documentodetalle);
                    //context.SaveChanges();
                    #endregion

                    dbtran.Commit();
                    //dbtran.Rollback();
                    respuesta.TipoRespuesta = 1;
                    respuesta.Mensaje = "Manifiesto de Gasto Agregado Satisfactoriamente";
                    respuesta.ValorDevolucion = Nuevo.IDMANIFIESTO.ToString();
                    #endregion
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
