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
    public class MonitoreoObrasController : Controller
    {
        SrvMonitoreoObras objMonitoreo = new SrvMonitoreoObras();
        // GET: MonitoreoObras
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult ListProyectos()
        {
            List<EnProyecto> result = new List<EnProyecto>();
            result = objMonitoreo.ListProyectos();

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }
        [HttpGet]
        public JsonResult ListMonitoreoId(int Id)
        {
            EnMonitoreoObras result = new EnMonitoreoObras();
            result = objMonitoreo.ListMonitoreoId(Id);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult GuardarMonitoreo(EnMonitoreoObras monitoreo)
        {
            EnRespuesta msj = objMonitoreo.GuardarMonitoreo(monitoreo);
            return Json(msj, JsonRequestBehavior.AllowGet);
        }
    }
}