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
    public class SeguimientoEjecucionProyectosInversionController : Controller
    {
        SrvSeguimientoEjecucionProyectosInversion objSeguimiento = new SrvSeguimientoEjecucionProyectosInversion();
        // GET: SeguimientoEjecucionProyectosInversion
        public ActionResult Index()
        {

            return View();
        }

        [HttpGet]
        public JsonResult ListSeguimiento(int Anio, int Mes, string fecha)
        {
            List<EnListSeguimientoProgramadoEjecutadoMensual> result = new List<EnListSeguimientoProgramadoEjecutadoMensual>();
            result = objSeguimiento.ListSeguimiento(Anio, Mes, fecha);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult GuardarSeguimiento(List<EnListSeguimientoProgramadoEjecutadoMensual> seguimiento)
        {
            EnRespuesta msj = objSeguimiento.GuardarSeguimiento(seguimiento);
            return Json(msj, JsonRequestBehavior.AllowGet);
        }
    }
}