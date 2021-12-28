using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using _02_Entidades;
using _03_Data;
using _04_Servicios;

namespace _01_Aplicacion.Controllers
{
    public class AlertaRegistroController : Controller
    {
        BD_NucleosEjecutoresEntities context = new BD_NucleosEjecutoresEntities();

        SrvAlertaRegistro objAlerta = new SrvAlertaRegistro();
        // GET: AlertaRegistro
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult ListProyectosAg30()
        {
            List<EnAlertaRegistro> result = new List<EnAlertaRegistro>();
            result = objAlerta.ListProyectosAg30();

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }

        [HttpGet]
        public JsonResult ListProyectosMg30()
        {
            List<EnAlertaRegistro> result = new List<EnAlertaRegistro>();
            result = objAlerta.ListProyectosMg30();

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }
        [HttpGet]
        public JsonResult ListProyectosAg3090()
        {
            List<EnAlertaRegistro> result = new List<EnAlertaRegistro>();
            result = objAlerta.ListProyectosAg3090();

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }

        [HttpGet]
        public JsonResult ListProyectosMg3090()
        {
            List<EnAlertaRegistro> result = new List<EnAlertaRegistro>();
            result = objAlerta.ListProyectosMg3090();

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }
        [HttpGet]
        public JsonResult ListProyectosAg90()
        {
            List<EnAlertaRegistro> result = new List<EnAlertaRegistro>();
            result = objAlerta.ListProyectosAg90();

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }

        [HttpGet]
        public JsonResult ListProyectosMg90()
        {
            List<EnAlertaRegistro> result = new List<EnAlertaRegistro>();
            result = objAlerta.ListProyectosMg90();

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }
        [HttpGet]
        public JsonResult ListLiquidadores(string FechaIni, string FechaFin)
        {
            List<EnAlertaRegistro> result = new List<EnAlertaRegistro>();
            result = objAlerta.ListLiquidadores(FechaIni, FechaFin);

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }
    }
}