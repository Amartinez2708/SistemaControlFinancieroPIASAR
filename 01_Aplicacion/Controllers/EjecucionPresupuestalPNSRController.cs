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
    public class EjecucionPresupuestalPNSRController : Controller
    {
        SrvEjecucionPresupuestalPNSR objEjecucion = new SrvEjecucionPresupuestalPNSR();
        // GET: EjecucionPresupuestalPNSR
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult Indicadores(int anio)
        {
            EnIndicadores result = new EnIndicadores();
            result = objEjecucion.Indicadores(anio);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult ListEjecucionMes(int anio)
        {
            List<EnEjecucionInversionMes> result = new List<EnEjecucionInversionMes>();
            result = objEjecucion.ListEjecucionMes(anio);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}