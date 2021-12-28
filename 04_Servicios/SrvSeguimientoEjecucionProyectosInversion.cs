using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using _02_Entidades;
using _03_Data;

namespace _04_Servicios
{
    public class SrvSeguimientoEjecucionProyectosInversion
    {
        BD_NucleosEjecutoresEntities context = new BD_NucleosEjecutoresEntities();

        public List<EnListSeguimientoProgramadoEjecutadoMensual> ListSeguimiento(int Anio, int Mes, string fecha)
        {
            List<EnListSeguimientoProgramadoEjecutadoMensual> result = new List<EnListSeguimientoProgramadoEjecutadoMensual>();

            var obj = context.ProyectosSeguimiento.Where(x => x.Activo == true).ToList();
            if (obj != null && obj.Count() > 0)
            {
                foreach (var data in obj)
                {
                    EnListSeguimientoProgramadoEjecutadoMensual list = new EnListSeguimientoProgramadoEjecutadoMensual();
                    list.IdProyectosSeguimiento = data.IdProyectosSeguimiento;
                    list.CodGrupo = data.CodGrupo;
                    list.dgpp = data.dgpp;
                    list.ProyectoInversion = data.ProyectoInversion;

                    DateTime? Fecha = fecha == "" ? (DateTime?)null : Convert.ToDateTime(fecha);

                    var Seguimiento = context.SeguimientoEjecucionProyectosInversion.Where(x => x.IdProyectosSeguimiento == data.IdProyectosSeguimiento && (Anio==0 || x.AnioEjecucion == Anio) && (Mes==0 || x.Mes == Mes) && (Fecha == null || x.Fecha == Fecha) && x.Activo == true).OrderByDescending(x => x.Fecha).ThenByDescending(m => m.Fecha_add).FirstOrDefault();
                    if (Seguimiento != null)
                    {
                        list.IdSeguimientoEjecucionProyectosInversion = Seguimiento.IdSeguimientoEjecucionProyectosInversion;
                        list.AnioEjecucion = Seguimiento.AnioEjecucion;
                        list.PIM = Seguimiento.PIM;
                        list.Mes = Seguimiento.Mes;
                        list.FechaString = Seguimiento.Fecha == null ? "" : Convert.ToDateTime(Seguimiento.Fecha).ToString("dd/MM/yyyy");

                        var programado = context.ProgramadoEjecutadoMensual.Where(x=>x.IdSeguimientoEjecucionProyectosInversion == Seguimiento.IdSeguimientoEjecucionProyectosInversion && x.Activo == true).OrderByDescending(x => x.Fecha_add).FirstOrDefault();

                        if(programado != null)
                        {
                            list.IdProgramadoEjecutadoMensual = programado.IdProgramadoEjecutadoMensual;
                            
                            list.ProgramadoMes = programado.ProgramadoMes;
                            list.ProgramadoSemanaUno = programado.ProgramadoSemanaUno;
                            list.EjecutadoSemanaUno = programado.EjecutadoSemanaUno;
                            list.ProgramadoSemanaDos = programado.ProgramadoSemanaDos;
                            list.EjecutadoSemanaDos = programado.EjecutadoSemanaDos;
                            list.ProgramadoSemanaTres = programado.ProgramadoSemanaTres;
                            list.EjecutadoSemanaTres = programado.EjecutadoSemanaTres;
                            list.ProgramadoSemanaCuatro = programado.ProgramadoSemanaCuatro;
                            list.EjecutadoSemanaCuatro = programado.EjecutadoSemanaCuatro;
                            list.ProgramadoSemanaCinco = programado.ProgramadoSemanaCinco;
                            list.EjecutadoSemanaCinco = programado.EjecutadoSemanaCinco;
                            list.TotalProgramado = programado.TotalProgramado;
                        }
                        else
                        {
                            list.IdProgramadoEjecutadoMensual = 0;
                            list.Mes = 0;
                            list.ProgramadoMes = 0;
                            list.ProgramadoSemanaUno = 0;
                            list.EjecutadoSemanaUno = 0;
                            list.ProgramadoSemanaDos = 0;
                            list.EjecutadoSemanaDos = 0;
                            list.ProgramadoSemanaTres = 0;
                            list.EjecutadoSemanaTres = 0;
                            list.ProgramadoSemanaCuatro = 0;
                            list.EjecutadoSemanaCuatro = 0;
                            list.ProgramadoSemanaCinco = 0;
                            list.EjecutadoSemanaCinco = 0;
                            list.TotalProgramado = 0;
                        }

                        var devengado = context.DevengadoMensual.Where(x => x.IdSeguimientoEjecucionProyectosInversion == Seguimiento.IdSeguimientoEjecucionProyectosInversion && x.Activo == true).OrderByDescending(x => x.Fecha_add).FirstOrDefault();

                        if (devengado != null)
                        {
                            list.IdDevengadoMensual = devengado.IdDevengadoMensual;
                            list.DevengadoAcumulado = devengado.DevengadoAcumulado;
                            list.DiferenciaGasto = devengado.DiferenciaGasto;
                            list.PorcentajeAvanceGasto = devengado.PorcentajeAvanceGasto;
                            list.DetalleGastoMensual = devengado.DetalleGastoMensual == null ? "" : devengado.DetalleGastoMensual;
                        }
                        else
                        {
                            list.IdDevengadoMensual = 0;
                            list.DevengadoAcumulado = 0;
                            list.DiferenciaGasto = 0;
                            list.PorcentajeAvanceGasto = 0;
                            list.DetalleGastoMensual = "";
                        }
                    }
                    else
                    {
                        list.IdSeguimientoEjecucionProyectosInversion = 0;
                        list.AnioEjecucion = 0;
                        list.PIM = 0;
                        list.Mes = 0;
                        list.FechaString = "";
                        list.IdProgramadoEjecutadoMensual = 0;
                        list.Mes = 0;
                        list.ProgramadoMes = 0;
                        list.ProgramadoSemanaUno = 0;
                        list.EjecutadoSemanaUno = 0;
                        list.ProgramadoSemanaDos = 0;
                        list.EjecutadoSemanaDos = 0;
                        list.ProgramadoSemanaTres = 0;
                        list.EjecutadoSemanaTres = 0;
                        list.ProgramadoSemanaCuatro = 0;
                        list.EjecutadoSemanaCuatro = 0;
                        list.ProgramadoSemanaCinco = 0;
                        list.EjecutadoSemanaCinco = 0;
                        list.TotalProgramado = 0;
                        list.IdDevengadoMensual = 0;
                        list.DevengadoAcumulado = 0;
                        list.DiferenciaGasto = 0;
                        list.PorcentajeAvanceGasto = 0;
                        list.DetalleGastoMensual = "";
                    }

                    result.Add(list);
                }
            }
            return result;
        }

        public EnRespuesta GuardarSeguimiento(List<EnListSeguimientoProgramadoEjecutadoMensual> seguimiento)
        {
            EnRespuesta respuesta = new EnRespuesta();
            using (var dbtran = context.Database.BeginTransaction())
            {
                try
                {
                    foreach (var item in seguimiento)
                    {
                        SeguimientoEjecucionProyectosInversion s = new SeguimientoEjecucionProyectosInversion();
                        s.IdProyectosSeguimiento = item.IdProyectosSeguimiento;
                        s.AnioEjecucion = item.AnioEjecucion;
                        s.PIM = item.PIM;
                        s.Mes = item.Mes;
                        s.Fecha = item.Fecha;
                        s.Activo = true;
                        s.IdUsuario_add = item.IdUsuario;
                        s.Fecha_add = DateTime.Now;
                        s.IdUsuario_upd = item.IdUsuario;
                        s.Fecha_upd = DateTime.Now;

                        context.SeguimientoEjecucionProyectosInversion.Add(s);
                        context.SaveChanges();

                        ProgramadoEjecutadoMensual p = new ProgramadoEjecutadoMensual();
                        p.IdSeguimientoEjecucionProyectosInversion = s.IdSeguimientoEjecucionProyectosInversion;
                        p.ProgramadoMes = item.ProgramadoMes;
                        p.ProgramadoSemanaUno = item.ProgramadoSemanaUno;
                        p.EjecutadoSemanaUno = item.EjecutadoSemanaUno;
                        p.ProgramadoSemanaDos = item.ProgramadoSemanaDos;
                        p.EjecutadoSemanaDos = item.EjecutadoSemanaDos;
                        p.ProgramadoSemanaTres = item.ProgramadoSemanaTres;
                        p.EjecutadoSemanaTres = item.EjecutadoSemanaTres;
                        p.ProgramadoSemanaCuatro = item.ProgramadoSemanaCuatro;
                        p.EjecutadoSemanaCuatro = item.EjecutadoSemanaCuatro;
                        p.ProgramadoSemanaCinco = item.ProgramadoSemanaCinco;
                        p.EjecutadoSemanaCinco = item.EjecutadoSemanaCinco;
                        p.TotalProgramado = item.TotalProgramado;
                        p.Activo = true;
                        p.IdUsuario_add = item.IdUsuario;
                        p.Fecha_add = DateTime.Now;
                        p.IdUsuario_upd = item.IdUsuario;
                        p.Fecha_upd = DateTime.Now;

                        context.ProgramadoEjecutadoMensual.Add(p);
                        context.SaveChanges();

                        DevengadoMensual d = new DevengadoMensual();
                        d.IdSeguimientoEjecucionProyectosInversion = s.IdSeguimientoEjecucionProyectosInversion;
                        d.DevengadoAcumulado = item.DevengadoAcumulado;
                        d.DiferenciaGasto = item.DiferenciaGasto;
                        d.PorcentajeAvanceGasto = item.PorcentajeAvanceGasto;
                        d.DetalleGastoMensual = item.DetalleGastoMensual;
                        d.Activo = true;
                        d.IdUsuario_add = item.IdUsuario;
                        d.Fecha_add = DateTime.Now;
                        d.IdUsuario_upd = item.IdUsuario;
                        d.Fecha_upd = DateTime.Now;

                        context.DevengadoMensual.Add(d);
                        context.SaveChanges();
                    }
                    dbtran.Commit();
                    //dbtran.Rollback();
                    respuesta.TipoRespuesta = 1;
                    respuesta.Mensaje = "Ficha Actualizada Satisfactoriamente";
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
    }
}
