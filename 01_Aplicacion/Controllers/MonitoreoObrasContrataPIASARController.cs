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
    public class MonitoreoObrasContrataPIASARController : Controller
    {
        // GET: MonitoreoObrasContrataPIASAR
        SrvMonitoreoObrasContrataPIASAR objMonitoreo = new SrvMonitoreoObrasContrataPIASAR();
        SrvSeguimientoEjecucionProyectosInversion objSeguimiento = new SrvSeguimientoEjecucionProyectosInversion();
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult ListMonitoreoGeneralPorEquipos(int anio)
        {
            List<EnMonitoreoGeneral> result = new List<EnMonitoreoGeneral>();
            result = objMonitoreo.ListMonitoreoGeneralPorEquipos(anio);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListSeguimiento(int Anio, int Mes, string fecha)
        {
            List<EnListSeguimientoProgramadoEjecutadoMensual> result = new List<EnListSeguimientoProgramadoEjecutadoMensual>();
            result = objSeguimiento.ListSeguimiento(Anio, Mes, fecha);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}