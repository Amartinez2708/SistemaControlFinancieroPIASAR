using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using _02_Entidades;
using _03_Data;

namespace _04_Servicios
{
    public class SrvReporteMensualProgreso
    {
        BD_NucleosEjecutoresEntities context = new BD_NucleosEjecutoresEntities();

        public List<EnProgresoSubComponente> ListComponente(int Id, int anio)
        {
            List<EnProgresoSubComponente> result = new List<EnProgresoSubComponente>();

            var objComponente = context.Componente.SingleOrDefault(x => x.IdComponente == Id && x.Activo == true);

            if (objComponente != null)
            {
                var objTitulo = context.TituloSubComponente.Where(x => x.IdComponente == objComponente.IdComponente && x.Activo == true).ToList();
                if (objTitulo.Count > 0)
                {
                    foreach (var titulo in objTitulo)
                    {
                        var objSubComponente = context.SubComponente.Where(x => x.IdTituloSubComponente == titulo.IdTituloSubComponente && x.Activo == true).ToList();
                        if (objSubComponente.Count() > 0)
                        {
                            foreach (var Sub in objSubComponente)
                            {
                                var objProgreso = context.ProgresoSubComponente.Where(x => x.IdSubComponente == Sub.IdSubComponente && (anio == 0 || x.Anio== anio) && x.Activo == true).OrderByDescending(x => x.Fecha_add).FirstOrDefault();
                                if (objProgreso != null)
                                {
                                    EnProgresoSubComponente progreso = new EnProgresoSubComponente();
                                    progreso.IdProgresoSubComponente = objProgreso.IdProgresoSubComponente;
                                    progreso.IdComponente = objComponente.IdComponente;
                                    progreso.NroComponente = objComponente.NroComponente;
                                    progreso.NombreComponente = objComponente.NombreComponente;
                                    progreso.IdTituloSubComponente = titulo.IdTituloSubComponente;
                                    progreso.NroTituloSubComponente = titulo.NroTituloSubComponente;
                                    progreso.NombreTituloSubComponente = titulo.NombreTituloSubComponente;
                                    progreso.IdSubComponente = Sub.IdSubComponente;
                                    progreso.NroSubComponente = Sub.NroSubComponente;
                                    progreso.NombreSubComponente = Sub.NombreSubComponente;
                                    progreso.Indicador = Sub.Indicador;
                                    progreso.Progreso = Sub.Progreso;
                                    progreso.Unidad = Sub.Unidad;
                                    progreso.P = objProgreso.P;
                                    progreso.PA = objProgreso.PA;
                                    progreso.A = objProgreso.A;
                                    progreso.Anio = objProgreso.Anio;
                                    progreso.PorcentajeProgreso = objProgreso.PorcentajeProgreso;
                                    result.Add(progreso);
                                }
                                else
                                {
                                    EnProgresoSubComponente progreso = new EnProgresoSubComponente();
                                    progreso.IdProgresoSubComponente = 0;
                                    progreso.IdComponente = objComponente.IdComponente;
                                    progreso.NroComponente = objComponente.NroComponente;
                                    progreso.NombreComponente = objComponente.NombreComponente;
                                    progreso.IdTituloSubComponente = titulo.IdTituloSubComponente;
                                    progreso.NroTituloSubComponente = titulo.NroTituloSubComponente;
                                    progreso.NombreTituloSubComponente = titulo.NombreTituloSubComponente;
                                    progreso.IdSubComponente = Sub.IdSubComponente;
                                    progreso.NroSubComponente = Sub.NroSubComponente;
                                    progreso.NombreSubComponente = Sub.NombreSubComponente;
                                    progreso.Indicador = Sub.Indicador;
                                    progreso.Progreso = Sub.Progreso;
                                    progreso.Unidad = Sub.Unidad;
                                    progreso.P = 0;
                                    progreso.PA = 0;
                                    progreso.A = 0;
                                    progreso.Anio = 0;
                                    progreso.PorcentajeProgreso = 0;
                                    result.Add(progreso);
                                }
                            }
                        }
                    }
                }
            }

            return result;
        }

        public EnRespuesta GuardarProgreso(List<EnProgresoSubComponente> progreso)
        {
            EnRespuesta respuesta = new EnRespuesta();
            using (var dbtran = context.Database.BeginTransaction())
            {
                try
                {
                    foreach (var item in progreso)
                    {

                        ProgresoSubComponente Nuevo = new ProgresoSubComponente();
                        Nuevo.IdSubComponente = item.IdSubComponente;
                        Nuevo.P = item.P;
                        Nuevo.PA = item.PA;
                        Nuevo.A = item.A;
                        Nuevo.PorcentajeProgreso = item.PorcentajeProgreso;
                        Nuevo.Anio = item.Anio;
                        Nuevo.Activo = true;
                        Nuevo.IdUsuario_add = item.IdUsuario;
                        Nuevo.Fecha_add = DateTime.Now;
                        Nuevo.IdUsuario_upd = item.IdUsuario;
                        Nuevo.Fecha_upd = DateTime.Now;

                        context.ProgresoSubComponente.Add(Nuevo);
                        context.SaveChanges();
                    }


                    dbtran.Commit();
                    //dbtran.Rollback();
                    respuesta.TipoRespuesta = 1;
                    respuesta.Mensaje = "Componente Actualizado Satisfactoriamente";
                    respuesta.ValorDevolucion ="";
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

        public EnRespuesta FechaActualizacionComponente(int IdComponente)
        {
            EnRespuesta respuesta = new EnRespuesta();

            var objProgreso = context.ProgresoSubComponente.Where(x => x.SubComponente.TituloSubComponente.IdComponente == IdComponente && x.Activo == true).OrderByDescending(x => x.Fecha_add).FirstOrDefault();
            if (objProgreso!=null)
            {
                respuesta.ValorDevolucion = Convert.ToDateTime(objProgreso.Fecha_add).ToString("dd/MM/yyyy hh:mm tt");
            }
            else
            {
                respuesta.ValorDevolucion = "-";
            }
            return respuesta;
        }

        public List<EnReporteBID> ReporteBID(int Id)
        {
            List<EnReporteBID> result = new List<EnReporteBID>();

            var objComponente = context.Componente.SingleOrDefault(x => x.IdComponente == Id && x.Activo == true);

            if (objComponente != null)
            {
                var objTitulo = context.TituloSubComponente.Where(x => x.IdComponente == objComponente.IdComponente && x.Activo == true).ToList();
                if (objTitulo.Count > 0)
                {
                    foreach (var titulo in objTitulo)
                    {
                        var objSubComponente = context.SubComponente.Where(x => x.IdTituloSubComponente == titulo.IdTituloSubComponente && x.Activo == true).ToList();
                        if (objSubComponente.Count() > 0)
                        {
                            foreach (var Sub in objSubComponente)
                            {
                                var objP2018 = context.ProgresoSubComponente.Where(x => x.IdSubComponente == Sub.IdSubComponente && x.Anio == 2018 && x.Activo == true).OrderByDescending(x => x.Fecha_add).FirstOrDefault();
                                var objP2019 = context.ProgresoSubComponente.Where(x => x.IdSubComponente == Sub.IdSubComponente && x.Anio == 2019 && x.Activo == true).OrderByDescending(x => x.Fecha_add).FirstOrDefault();
                                var objP2020 = context.ProgresoSubComponente.Where(x => x.IdSubComponente == Sub.IdSubComponente && x.Anio == 2020 && x.Activo == true).OrderByDescending(x => x.Fecha_add).FirstOrDefault();
                                var objP2021 = context.ProgresoSubComponente.Where(x => x.IdSubComponente == Sub.IdSubComponente && x.Anio == 2021 && x.Activo == true).OrderByDescending(x => x.Fecha_add).FirstOrDefault();
                                var objP2022 = context.ProgresoSubComponente.Where(x => x.IdSubComponente == Sub.IdSubComponente && x.Anio == 2022 && x.Activo == true).OrderByDescending(x => x.Fecha_add).FirstOrDefault();

                                EnReporteBID progresoP = new EnReporteBID();
                                progresoP.NroSubComponente = Sub.NroSubComponente;
                                progresoP.SubComponente = Sub.NombreSubComponente;
                                progresoP.Progreso = Sub.Progreso;
                                progresoP.Unidad = Sub.Unidad;
                                progresoP.Progreso = "P";
                                progresoP.p2018 = objP2018 == null ? 0 : objP2018.P;
                                progresoP.p2019 = objP2019 == null ? 0 : objP2019.P;
                                progresoP.p2020 = objP2020 == null ? 0 : objP2020.P;
                                progresoP.p2021 = objP2021 == null ? 0 : objP2021.P;
                                progresoP.p2022 = objP2022 == null ? 0 : objP2022.P;
                                progresoP.total = progresoP.p2018 + progresoP.p2019 + progresoP.p2020 + progresoP.p2021 + progresoP.p2022;
                                result.Add(progresoP);

                                EnReporteBID progresoPA = new EnReporteBID();
                                progresoPA.NroSubComponente = Sub.NroSubComponente;
                                progresoPA.SubComponente = Sub.NombreSubComponente;
                                progresoPA.Progreso = Sub.Progreso;
                                progresoPA.Unidad = Sub.Unidad;
                                progresoPA.Progreso = "P(A)";
                                progresoPA.p2018 = objP2018 == null ? 0 : objP2018.PA;
                                progresoPA.p2019 = objP2019 == null ? 0 : objP2019.PA;
                                progresoPA.p2020 = objP2020 == null ? 0 : objP2020.PA;
                                progresoPA.p2021 = objP2021 == null ? 0 : objP2021.PA;
                                progresoPA.p2022 = objP2022 == null ? 0 : objP2022.PA;
                                progresoPA.total = progresoPA.p2018 + progresoPA.p2019 + progresoPA.p2020 + progresoPA.p2021 + progresoPA.p2022;
                                result.Add(progresoPA);

                                EnReporteBID progresoA = new EnReporteBID();
                                progresoA.NroSubComponente = Sub.NroSubComponente;
                                progresoA.SubComponente = Sub.NombreSubComponente;
                                progresoA.Progreso = Sub.Progreso;
                                progresoA.Unidad = Sub.Unidad;
                                progresoA.Progreso = "A";
                                progresoA.p2018 = objP2018 == null ? 0 : objP2018.A;
                                progresoA.p2019 = objP2019 == null ? 0 : objP2019.A;
                                progresoA.p2020 = objP2020 == null ? 0 : objP2020.A;
                                progresoA.p2021 = objP2021 == null ? 0 : objP2021.A;
                                progresoA.p2022 = objP2022 == null ? 0 : objP2022.A;
                                progresoA.total = progresoA.p2018 + progresoA.p2019 + progresoA.p2020 + progresoA.p2021 + progresoA.p2022;
                                result.Add(progresoA);

                            }
                        }
                    }
                }
            }

            return result;
        }
    }
}
