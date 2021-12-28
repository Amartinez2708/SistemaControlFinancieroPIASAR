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
    public class ProyectosGeoreferenciadosPIASARController : Controller
    {
        // GET: ProyectosGeoreferenciadosPIASAR
        SrvGeoreferenciado objGeo = new SrvGeoreferenciado();
        public ActionResult Index()
        {
            ViewBag.ddlDepartamento = objGeo.ddlDepartamento();
            return View();
        }
        [HttpGet]
        public JsonResult ListDepartamento(int mod)
        {
            List<EnListDepa> result = new List<EnListDepa>();
            result = objGeo.ListDepartamento(mod);

            var jsonData = Json(result.ToList(), JsonRequestBehavior.AllowGet);
            return jsonData;
        }
        [HttpGet]
        public JsonResult ListProv(string dep, int mod)
        {
            List<EnListProv> result = new List<EnListProv>();
            result = objGeo.ListProv(dep, mod);

            var jsonData = Json(result.ToList(), JsonRequestBehavior.AllowGet);
            return jsonData;
        }
        [HttpGet]
        public JsonResult ListDist(string dep, string prov, int mod)
        {
            List<EnListDist> result = new List<EnListDist>();
            result = objGeo.ListDist(dep, prov, mod);

            var jsonData = Json(result.ToList(), JsonRequestBehavior.AllowGet);
            return jsonData;
        }
        [HttpGet]
        public JsonResult ListDistritoUnico(string dep, string prov, string dist, int mod)
        {
            List<EnProyecto> result = new List<EnProyecto>();
            result = objGeo.ListDistritoUnico(dep, prov, dist, mod);

            var jsonData = Json(result, JsonRequestBehavior.AllowGet);
            return jsonData;
        }
        [HttpGet]
        public JsonResult ListReporteObra(string dep, string prov, string dist, int mod)
        {
            ReporteObras result = new ReporteObras();
            result = objGeo.ListReporteObra(dep, prov, dist, mod);

            var jsonData = Json(result, JsonRequestBehavior.AllowGet);
            return jsonData;
        }
        [HttpGet]
        public JsonResult ListProyectosBusqueda(string search)
        {
            List<EnProyecto> result = new List<EnProyecto>();
            result = objGeo.ListProyectosBusqueda(search);

            var jsonData = Json(result.ToList(), JsonRequestBehavior.AllowGet);
            return jsonData;
        }
        [HttpGet]
        public JsonResult ListObraId(int Id)
        {
            EnProyecto msj = objGeo.ListObraId(Id);
            return Json(msj, JsonRequestBehavior.AllowGet);
        }
    }
}