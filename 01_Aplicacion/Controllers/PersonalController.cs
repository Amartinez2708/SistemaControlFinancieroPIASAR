using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using _02_Entidades;
using _04_Servicios;
using _05_Utilidades;
using iTextSharp.text;
using iTextSharp.text.pdf;
using iTextSharp.tool.xml;
using System.IO;
using System.Web.UI;

namespace _01_Aplicacion.Controllers
{
    public class PersonalController : Controller
    {
        SrvPersonal obj = new SrvPersonal();
        // GET: Personal
        public ActionResult Index()
        {
            var usuario = SecurityManager<EnUsuario>.User;
            if (usuario == null)
            {
                return RedirectToAction("Index", "Login");
            }
            ViewBag.ddlCargo = obj.ddlCargo();
            ViewBag.ddlNivelProfesional = obj.ddlNivelProfesional();
            ViewBag.ddlProfesion = obj.ddlProfesion();
            ViewBag.ddlDepartamento = obj.ddlDepartamento();
            ViewBag.ddlCargoContrato = obj.ddlCargo();
            ViewBag.ddlOficinaDependencia = obj.ddlOficinaDependencia();
            ViewBag.ddlLugarPrestacionServicios = obj.ddlLugarPrestacionServicios();
            ViewBag.ddlRepresentanteLegal = obj.ddlRepresentanteLegal();

            return View();
        }
        [HttpGet]
        public JsonResult ListPersonal()
        {
            List<EnPersona> result = new List<EnPersona>();
            result = obj.ListPersonal();

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }
        [HttpGet]
        public JsonResult ddlProvincia(string Id)
        {
            List<EnDropDownList> result = new List<EnDropDownList>();
            result = obj.ddlProvincia(Id);
            return Json(new SelectList(result, "IdText", "Text"), JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ddlDistrito(string Id)
        {
            List<EnDropDownList> result = new List<EnDropDownList>();
            result = obj.ddlDistrito(Id);
            return Json(new SelectList(result, "IdText", "Text"), JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult GuardarPersonal(EnPersona detalle)
        {
            EnRespuesta msj = obj.GuardarPersonal(detalle);
            return Json(msj, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListPersonalId(int Id)
        {
            EnPersona result = new EnPersona();
            result = obj.ListPersonalId(Id);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult EliminarPersonal(int Id)
        {
            EnRespuesta msj = obj.EliminarPersonal(Id);
            return Json(msj, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListPersonalContrato(int Id)
        {
            List<EnContrato> result = new List<EnContrato>();
            result = obj.ListPersonalContrato(Id);

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }
        [HttpGet]
        public JsonResult ListCorrelativo(string Tipo, string SubTipo)
        {
            EnRespuesta msj = obj.NroCorrelativo(Tipo, SubTipo);
            return Json(msj, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult GuardarContrato(EnContrato detalle)
        {
            EnRespuesta msj = obj.GuardarContrato(detalle);
            return Json(msj, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListContratoId(int Id)
        {
            EnContrato result = new EnContrato();
            result = obj.ListContratoId(Id);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult EliminarContrato(int Id)
        {
            EnRespuesta msj = obj.EliminarContrato(Id);
            return Json(msj, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GenerarImprimirContrato(int Id)
        {
            // Obtener datos para el reporte
            var data = obj.ListContratoId(Id);

            // Renderizar vista Razor como cadena de texto
            var viewRenderer = new ViewToStringRenderer(ControllerContext);
            var html = viewRenderer.RenderViewToString("~/Views/Personal/_ImprimirContrato.cshtml", data);

            // Convertir HTML a PDF
            var document = new Document(PageSize.A4, 50, 50, 30, 30);
            var memoryStream = new MemoryStream();
            var writer = PdfWriter.GetInstance(document, memoryStream);

            document.Open();

            // Agrega la imagen como cabecera
            var headerImage = iTextSharp.text.Image.GetInstance(Server.MapPath("~/Content/Images/pnsr_logo.png"));
            headerImage.Alignment = iTextSharp.text.Image.ALIGN_CENTER;
            headerImage.ScaleToFit(300f, 80f);

            document.Add(headerImage);

            var xmlWorker = XMLWorkerHelper.GetInstance();
            xmlWorker.ParseXHtml(writer, document, new StringReader(html));

            document.Close();

            // Devolver archivo PDF como respuesta
            return File(memoryStream.ToArray(), "application/pdf", "CONTRATO " + data.NroContrato + ".pdf");
        }
        [HttpGet]
        public JsonResult ListPersonalFamilia(int Id)
        {
            List<EnPersonaFamilia> result = new List<EnPersonaFamilia>();
            result = obj.ListPersonalFamilia(Id);

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }
    }
}