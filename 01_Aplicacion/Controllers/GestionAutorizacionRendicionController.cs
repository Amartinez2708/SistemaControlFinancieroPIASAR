using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using _02_Entidades;
using _04_Servicios;
using _05_Utilidades;
using _03_Data;

namespace _01_Aplicacion.Controllers
{
    public class GestionAutorizacionRendicionController : Controller
    {
        // GET: GestionAutorizacionRendicion
        SrvGestionAutorizacionRendicion objGestionAutorizacionRendicion = new SrvGestionAutorizacionRendicion();

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult ListProyectos(int Id)
        {
            List<EnDropDownList> result = new List<EnDropDownList>();
            result = objGestionAutorizacionRendicion.ListProyectos(Id);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListProyectoId(int Id)
        {
            EnProyecto result = new EnProyecto();
            result = objGestionAutorizacionRendicion.ListProyectoId(Id);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult ListAutorizacion(int Id)
        {
            List<EnAutorizacion_Gasto> result = new List<EnAutorizacion_Gasto>();
            result = objGestionAutorizacionRendicion.ListAutorizacion(Id);

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }
        [HttpGet]
        public JsonResult ListRendicion(int Id)
        {
            List<EnMANIFIESTO_GASTO> result = new List<EnMANIFIESTO_GASTO>();
            result = objGestionAutorizacionRendicion.ListRendicion(Id);

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }
        [HttpGet]
        public JsonResult ListAutorizacionId(int Id)
        {
            EnAutorizacion_Gasto msj = objGestionAutorizacionRendicion.ListAutorizacionId(Id);
            return Json(msj, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListManifiestoId(int Id)
        {
            EnMANIFIESTO_GASTO msj = objGestionAutorizacionRendicion.ListManifiestoId(Id);
            return Json(msj, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult GuardarAutorizacion(EnAutorizacion_Gasto autorizacion)
        {
            EnRespuesta msj = objGestionAutorizacionRendicion.GuardarAutorizacion(autorizacion);
            return Json(msj, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult EliminarAutorizacion(int Id, int IdUsuario)
        {
            EnRespuesta msj = objGestionAutorizacionRendicion.EliminarAutorizacion(Id,IdUsuario);
            return Json(msj, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult GuardarManifiesto(EnMANIFIESTO_GASTO manifiesto)
        {
            EnRespuesta msj = objGestionAutorizacionRendicion.GuardarManifiesto(manifiesto);
            return Json(msj, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult EliminarManifiesto(int Id, int IdUsuario)
        {
            EnRespuesta msj = objGestionAutorizacionRendicion.EliminarManifiesto(Id, IdUsuario);
            return Json(msj, JsonRequestBehavior.AllowGet);
        }
    }
}