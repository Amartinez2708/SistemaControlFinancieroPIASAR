using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using _02_Entidades;
using _04_Servicios;
using _05_Utilidades;

namespace _01_Aplicacion.Controllers
{
    public class NucleosEjecutoresController : Controller
    {
        SrvNucleosEjecutores obj = new SrvNucleosEjecutores();
        SrvSeguimientoDetalleArchivo objFile = new SrvSeguimientoDetalleArchivo();
        // GET: NucleosEjecutores
        public ActionResult Index()
        {
            var usuario = SecurityManager<EnUsuario>.User;
            if (usuario == null)
            {
                return RedirectToAction("Index", "Login");
            }
            return View();
        }
        [HttpGet]
        public JsonResult ListProyectos()
        {
            List<EnProyecto> result = new List<EnProyecto>();
            result = obj.ListProyectos();

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }
        [HttpGet]
        public JsonResult ddlMeses(string Etapa)
        {
            List<EnDropDownList> result = new List<EnDropDownList>();
            result = obj.ddlMeses(Etapa);
            return Json(new SelectList(result, "id", "text"), JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ddlActividad(string Etapa, int NroMes)
        {
            List<EnDropDownList> result = new List<EnDropDownList>();
            result = obj.ddlActividad(Etapa, NroMes);
            return Json(new SelectList(result, "id", "text"), JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListSeguimiento(string cui)
        {
            EnSeguimientoActividadesNE result = new EnSeguimientoActividadesNE();
            result = obj.ListSeguimiento(cui);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListDetalleSeguimiento(int Id, int IdCronogramaActividades)
        {
            List<EnDetalleSeguimientoActividadesNE> result = new List<EnDetalleSeguimientoActividadesNE>();
            result = obj.ListDetalleSeguimiento(Id, IdCronogramaActividades);

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }
        [HttpPost]
        public JsonResult GuardarSeguimiento(EnDetalleSeguimientoActividadesNE detalle)
        {
            EnRespuesta msj = obj.GuardarSeguimiento(detalle);
            return Json(msj, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListDetalleSeguimientoId(int Id)
        {
            EnDetalleSeguimientoActividadesNE result = new EnDetalleSeguimientoActividadesNE();
            result = obj.ListDetalleSeguimientoId(Id);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult EliminarSeguimiento(int Id)
        {
            EnRespuesta msj = obj.EliminarSeguimiento(Id);
            return Json(msj, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult UploadAction(string chunkName, int chunkIndex, int totalChunks, string fileName, string extension, string cui)
        {
            EnRespuesta result = objFile.UploadSeguimiento(Request.Files[0], chunkName, chunkIndex, totalChunks, fileName, extension, cui, "Nucleo Ejecutor");

            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult DownloadAction(string filePath, string nombre)
        {
            return File(filePath, "application/octet-stream", nombre);
        }
        [HttpGet]
        public JsonResult ListSeguimientoDetalleArchivoId(int IdSeguimiento, int IdDetalleSeguimiento)
        {
            List<EnSeguimientoDetalleArchivo> result = new List<EnSeguimientoDetalleArchivo>();
            string TipoSeguimiento = "Nucleo Ejecutor";
            result = objFile.ListSeguimientoDetalleArchivoId(TipoSeguimiento, IdSeguimiento, IdDetalleSeguimiento);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}