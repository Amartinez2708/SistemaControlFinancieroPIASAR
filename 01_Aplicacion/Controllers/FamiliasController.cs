using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using _02_Entidades;
using _04_Servicios;
using _05_Utilidades;
using System.IO;
using System.Configuration;
using System.Runtime.Remoting.Contexts;
using Newtonsoft.Json;

namespace _01_Aplicacion.Controllers
{
    public class FamiliasController : Controller
    {
        SrvFamilias objFamilias = new SrvFamilias();
        SrvSeguimientoDetalleArchivo objFile = new SrvSeguimientoDetalleArchivo();
        // GET: Familias
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
        public JsonResult ListProyectosFamilias()
        {
            List<EnProyecto> result = new List<EnProyecto>();
            result = objFamilias.ListProyectosFamilias();

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
            result = objFamilias.ddlMeses(Etapa);
            return Json(new SelectList(result, "id", "text"), JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ddlActividad(string Etapa, int NroMes)
        {
            List<EnDropDownList> result = new List<EnDropDownList>();
            result = objFamilias.ddlActividad(Etapa, NroMes);
            return Json(new SelectList(result, "id", "text"), JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListDetalleSeguimiento(int Id, int IdCronogramaActividades)
        {
            List<EnDetalleSeguimientoActividadesFamilias> result = new List<EnDetalleSeguimientoActividadesFamilias>();
            result = objFamilias.ListDetalleSeguimiento(Id, IdCronogramaActividades);

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }
        [HttpGet]
        public JsonResult ListSeguimiento(string cui)
        {
            EnSeguimientoActividadesFamilias result = new EnSeguimientoActividadesFamilias();
            result = objFamilias.ListSeguimiento(cui);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult GuardarSeguimiento(EnDetalleSeguimientoActividadesFamilias detalle)
        {
            EnRespuesta msj = objFamilias.GuardarSeguimiento(detalle);
            return Json(msj, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListDetalleSeguimientoId(int Id)
        {
            EnDetalleSeguimientoActividadesFamilias result = new EnDetalleSeguimientoActividadesFamilias();
            result = objFamilias.ListDetalleSeguimientoId(Id);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult EliminarSeguimiento(int Id)
        {
            EnRespuesta msj = objFamilias.EliminarSeguimiento(Id);
            return Json(msj, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult UploadAction(string chunkName, int chunkIndex, int totalChunks, string fileName, string extension, string cui)
        {
            EnRespuesta result = objFile.UploadSeguimiento(Request.Files[0], chunkName, chunkIndex, totalChunks, fileName, extension, cui, "Familias");

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
            string TipoSeguimiento = "Familias";
            result = objFile.ListSeguimientoDetalleArchivoId(TipoSeguimiento, IdSeguimiento, IdDetalleSeguimiento);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}