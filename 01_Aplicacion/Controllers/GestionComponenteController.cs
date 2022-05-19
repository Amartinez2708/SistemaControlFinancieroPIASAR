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
    public class GestionComponenteController : Controller
    {
        // GET: GestionComponente
        SrvGestionComponente objGestionComponente = new SrvGestionComponente();
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult Indicadores()
        {
            EnIndicadores result = new EnIndicadores();
            result = objGestionComponente.Indicadores();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult grfMontoTotalPorIndicadores()
        {
            List<EnIndicador> result = new List<EnIndicador>();
            result = objGestionComponente.grfMontoTotalPorIndicadores();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult grfEjecucionMensual()
        {
            List<EnProcesoDetalle> result = new List<EnProcesoDetalle>();
            result = objGestionComponente.grfEjecucionMensual();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult grfNroProcesoEstado()
        {
            List<EnProceso> result = new List<EnProceso>();
            result = objGestionComponente.grfNroProcesoEstado();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult ListMontoPorIndicadores()
        {
            List<EnIndicador> result = new List<EnIndicador>();
            result = objGestionComponente.grfMontoTotalPorIndicadores();

            EnIndicador total = new EnIndicador();
            total.NroIndicadorText = "TOTAL";
            total.Cantidad = result.Sum(x=>x.Cantidad);
            total.Monto = result.Sum(x => x.Monto);

            result.Add(total);


            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }

        [HttpGet]
        public JsonResult ListProceso(string Tipo, string value)
        {
            List<EnProceso> result = new List<EnProceso>();
            result = objGestionComponente.ListProceso(Tipo,value);

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }
    }
}