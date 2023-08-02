using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using _02_Entidades;
using _04_Servicios;
using _05_Utilidades;
using _03_Data;
using System.Collections;
using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;
using System.IO;

namespace _01_Aplicacion.Controllers
{
    public class ReporteMensualProgresoController : Controller
    {
        SrvReporteMensualProgreso objReporteMensualProgreso = new SrvReporteMensualProgreso();
        BD_NucleosEjecutoresEntities context = new BD_NucleosEjecutoresEntities();
        // GET: ReporteMensualProgreso
        public ActionResult Index()
        {
            int IdUsuario = int.Parse(Request.QueryString["Id"]);
            ViewBag.IdUsuario = IdUsuario;
            return View();
        }

        [HttpGet]
        public JsonResult ListComponente(int Id, int anio)
        {
            List<EnProgresoSubComponente> result = new List<EnProgresoSubComponente>();
            result = objReporteMensualProgreso.ListComponente(Id, anio);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult GuardarProgreso(List<EnProgresoSubComponente> progreso)
        {
            EnRespuesta msj = objReporteMensualProgreso.GuardarProgreso(progreso);
            return Json(msj, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult FechaActualizacionComponente(int Id)
        {
            EnRespuesta msj = objReporteMensualProgreso.FechaActualizacionComponente(Id);
            return Json(msj, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ReporteBid(int Id)
        {
            List<EnReporteBID> result = new List<EnReporteBID>();
            result = objReporteMensualProgreso.ReporteBID(Id);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult rptMensualPDF(int IdUsuario)
        {
            List<EnComponenteRPT> Componente1 = new List<EnComponenteRPT>();
            List<EnComponenteRPT> Componente2 = new List<EnComponenteRPT>();

            List<EnPersonal> persona = new List<EnPersonal>();

            var usu = context.USUARIO_SISTEMA.SingleOrDefault(x => x.IDUSUARIO == IdUsuario);
            var per = context.Personal.SingleOrDefault(x => x.IdPersonal == usu.IDUSUARIO);
            var cargo = context.TABLA_DETALLE.SingleOrDefault(x => x.IDDETALLE == per.cod_cargo);

            

            EnPersonal personal = new EnPersonal();
            personal.NombreCompleto = per.Nombres + " " + per.ape_paterno + " " + per.ape_materno;
            personal.Cargo = cargo.SDETALLE;
            persona.Add(personal);

            var c1 = objReporteMensualProgreso.ListComponente(1, 0);
            foreach (var item in c1)
            {
                EnComponenteRPT c = new EnComponenteRPT();
                c.NroComponente = item.NroComponente;
                c.Componente = item.NombreComponente;
                c.NroSubComponente = item.NroSubComponente;
                c.SubComponente = item.NombreSubComponente;
                c.Indicador = item.Indicador;
                c.P = item.P == null ? 0 : Convert.ToDecimal(item.P);
                c.PA = item.PA == null ? 0 : Convert.ToDecimal(item.PA);
                c.A = item.A == null ? 0 : Convert.ToDecimal(item.A);
                c.Progreso = item.Progreso;
                c.PorcentajeProgreso = item.PorcentajeProgreso == null ? 0 : Convert.ToDecimal(item.PorcentajeProgreso);
                Componente1.Add(c);
            }

            var c2 = objReporteMensualProgreso.ListComponente(2, 0);
            foreach (var item in c2)
            {
                EnComponenteRPT c = new EnComponenteRPT();
                c.NroComponente = item.NroComponente;
                c.Componente = item.NombreComponente;
                c.NroSubComponente = item.NroSubComponente;
                c.SubComponente = item.NombreSubComponente;
                c.Indicador = item.Indicador;
                c.P = item.P == null ? 0 : Convert.ToDecimal(item.P);
                c.PA = item.PA == null ? 0 : Convert.ToDecimal(item.PA);
                c.A = item.A == null ? 0 : Convert.ToDecimal(item.A);
                c.Progreso = item.Progreso;
                c.PorcentajeProgreso = item.PorcentajeProgreso == null ? 0 : Convert.ToDecimal(item.PorcentajeProgreso);
                Componente2.Add(c);
            }
            TableLogOnInfo li = new TableLogOnInfo();
            li.ConnectionInfo.IntegratedSecurity = false;

            ReportDocument rd = new ReportDocument();
            rd.Load(Path.Combine(Server.MapPath("~/Content/Reportes"), "rptReporteMensual.rpt"));

            rd.Database.Tables[0].SetDataSource(persona.ToList());
            rd.Subreports[0].Database.Tables[0].SetDataSource(Componente1.ToList());
            rd.Subreports[1].Database.Tables[0].SetDataSource(Componente2.ToList());

            //rd.SetDataSource(Componente1);
            //rd.SetDataSource(Componente2);

            Response.Buffer = false;
            Response.ClearContent();
            Response.ClearHeaders();
            try
            {
                Stream stream = rd.ExportToStream(ExportFormatType.PortableDocFormat);
                stream.Seek(0, SeekOrigin.Begin);
                return File(stream, "application/pdf", "rptReporteMensual.pdf");

                //rd.ExportToHttpResponse(ExportOptions.CreatePdfFormatOptions., Response, true, "rptReporteMensual.pdf");
                //return Response.End();
            }
            catch (Exception ex)
            {
                ex.ToString();
                throw;
            }
        }

        public ActionResult MonitoresInstitucionales()
        {
            ViewBag.ReporteMI = objReporteMensualProgreso.RegistrosRealizadosPorActividad();
            return View();
        }

    }
}