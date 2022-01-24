using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using _02_Entidades;
using _03_Data;
using _04_Servicios;
using _05_Utilidades;


namespace _01_Aplicacion.Controllers
{
    public class MonitoreoPIASARController : Controller
    {
        SrvMonitoreoPIASAR objMonitoreoPIASAR = new SrvMonitoreoPIASAR();
        BD_NucleosEjecutoresEntities context = new BD_NucleosEjecutoresEntities();
        // GET: MonitoreoPIASAR
        public ActionResult Index()
        {
            ViewBag.NroObras = context.Proyecto.Where(x => x.Cod_subprograma == 133).Count();
            ViewBag.MontoObras = String.Format("{0:n}", context.Proyecto.Where(x => x.Cod_subprograma == 133).Sum(x => x.Mto_proyecto)); 
            ViewBag.Autorizacion = String.Format("{0:n}", context.Autorizacion_Gasto.Where(x => x.Proyecto.Cod_subprograma == 133).Sum(x => x.Monto_autorizacion));
            ViewBag.Manifiesto = String.Format("{0:n}", context.MANIFIESTO_GASTO.Where(x => x.Proyecto.Cod_subprograma == 133).Sum(x => x.MONTO_MANIFIESTO));
            ViewBag.ddlDepartamento = objMonitoreoPIASAR.ddlDepartamento();
            return View();
        }
        [HttpGet]
        public JsonResult ddlProvincia(string Id)
        {
            List<EnDropDownList> result = new List<EnDropDownList>();
            result = objMonitoreoPIASAR.ddlProvincia(Id);
            return Json(new SelectList(result, "IdText", "Text"), JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ddlDistrito(string Id)
        {
            List<EnDropDownList> result = new List<EnDropDownList>();
            result = objMonitoreoPIASAR.ddlDistrito(Id);
            return Json(new SelectList(result, "IdText", "Text"), JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListEstadoInformacion(string cod_dep, string cod_prov, string cod_dist, string snip, string cui)
        {
            List<EnListEstadoProyecto> result = new List<EnListEstadoProyecto>();
            result = objMonitoreoPIASAR.ListEstadoInformacion(cod_dep, cod_prov, cod_dist, snip, cui);

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }
        [HttpGet]
        public JsonResult ListEstadoPresupuesto(string cod_dep, string cod_prov, string cod_dist, string snip, string cui)
        {
            List<EnListEstadoPresupuesto> result = new List<EnListEstadoPresupuesto>();
            result = objMonitoreoPIASAR.ListEstadoPresupuesto(cod_dep, cod_prov, cod_dist, snip, cui);

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }        
        [HttpGet]
        public JsonResult ListResumenEstadoPresupuesto(string cod_dep, string cod_prov, string cod_dist, string snip, string cui)
        {
            List<EnListEstadoPresupuesto> result = new List<EnListEstadoPresupuesto>();
            result = objMonitoreoPIASAR.ListResumenEstadoPresupuesto(cod_dep, cod_prov, cod_dist, snip, cui);

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }
        [HttpGet]
        public JsonResult ListAutorizacionVSManifiesto(string cod_dep, string cod_prov, string cod_dist, string snip, string cui, int anio)
        {
            EnAutorizacionVSManifiesto result = new EnAutorizacionVSManifiesto();
            result = objMonitoreoPIASAR.ListAutorizacionVSManifiesto(cod_dep, cod_prov, cod_dist, snip, cui, anio);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GrfMontoProyectoVSPresupuesto(string cod_dep, string cod_prov, string cod_dist, string snip, string cui)
        {
            EnListMontoProyectoVSPresupuesto result = new EnListMontoProyectoVSPresupuesto();
            result = objMonitoreoPIASAR.GrfMontoProyectoVSPresupuesto(cod_dep, cod_prov, cod_dist, snip, cui);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListMontoProyectoVSPresupuesto(string cod_dep, string cod_prov, string cod_dist, string snip, string cui)
        {
            List<EnListMontoProyectoVSPresupuesto> result = new List<EnListMontoProyectoVSPresupuesto>();
            result = objMonitoreoPIASAR.ListMontoProyectoVSPresupuesto(cod_dep, cod_prov, cod_dist, snip, cui);

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }
        [HttpGet]
        public JsonResult Indicadores()
        {
            EnIndicadores result = new EnIndicadores();
            result = objMonitoreoPIASAR.Indicadores();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult IndicadoresFiltro(string cod_dep, string cod_prov, string cod_dist, string snip, string cui, int anio)
        {
            EnIndicadores result = new EnIndicadores();
            result = objMonitoreoPIASAR.IndicadoresFiltro(cod_dep, cod_prov, cod_dist, snip, cui, anio);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListEstadoActividad(string cod_dep, string cod_prov, string cod_dist, string snip, string cui)
        {
            List<EnListEstadoActividad> result = new List<EnListEstadoActividad>();
            result = objMonitoreoPIASAR.ListEstadoActividad(cod_dep, cod_prov, cod_dist, snip, cui);

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }
        [HttpGet]
        public JsonResult GrfDesenbolsoVSJustificacion(string cod_dep, string cod_prov, string cod_dist, string snip, string cui)
        {
            EnDesembolsoVSJustificado result = new EnDesembolsoVSJustificado();
            result = objMonitoreoPIASAR.GrfDesenbolsoVSJustificacion(cod_dep, cod_prov, cod_dist, snip, cui);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListDesenbolsoVSJustificacion(int Anio)
        {
            List<EnDesembolsoVSJustificado> result = new List<EnDesembolsoVSJustificado>();
            result = objMonitoreoPIASAR.ListDesenbolsoVSJustificacion(Anio);

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }
        [HttpGet]
        public JsonResult ListDetalleAutorizacionVSManifiesto(string cod_dep, string cod_prov, string cod_dist, string snip, string cui, int anio, string mes, string tipo)
        {
            List<EnAutorizacionVSManifiesto> result = new List<EnAutorizacionVSManifiesto>();
            result = objMonitoreoPIASAR.ListDetalleAutorizacionVSManifiesto(cod_dep, cod_prov, cod_dist, snip, cui, anio, mes, tipo);

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }
        [HttpGet]
        public JsonResult GraficoHistorial()
        {
            List <EnHistoricoMonitoreo> result = new List<EnHistoricoMonitoreo>();
            result = objMonitoreoPIASAR.GraficoHistorial();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListResumenEstadoFinanciero()
        {
            List<EnEstadoFinanciero> result = new List<EnEstadoFinanciero>();
            result = objMonitoreoPIASAR.ListResumenEstadoFinanciero();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListResumenEstadoFinancieroCuadro()
        {
            List<EnEstadoFinanciero> result = new List<EnEstadoFinanciero>();
            result = objMonitoreoPIASAR.ListResumenEstadoFinancieroCuadro();

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }
        [HttpGet]
        public JsonResult ListProyectosEstadoFinanciero(string dep)
        {
            List<EnDesembolsoVSJustificado> result = new List<EnDesembolsoVSJustificado>();
            result = objMonitoreoPIASAR.ListProyectosEstadoFinanciero(dep);

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }
        [HttpGet]
        public JsonResult ListResumenEstadoFinancieroGrafico()
        {
            List<EnEstadoFinanciero> result = new List<EnEstadoFinanciero>();
            result = objMonitoreoPIASAR.ListResumenEstadoFinancieroCuadro().Where(x=>x.Departamento!="TOTAL").ToList();

            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GraficoDesembolsoProgramado(int anio)
        {
            List<EnDesembolsoProgramadoMensual> result = new List<EnDesembolsoProgramadoMensual>();
            result = objMonitoreoPIASAR.GraficoDesembolsoProgramado(anio);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListDesembolsoProgramado(int anio, int mes)
        {
            List<EnDesembolsoProgramadoMensual> result = new List<EnDesembolsoProgramadoMensual>();
            result = objMonitoreoPIASAR.ListDesembolsoProgramado(anio, mes);

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }
        [HttpGet]
        public JsonResult ListMontoGiradoPendiente()
        {
            List<EnDesembolsoVSJustificado> result = new List<EnDesembolsoVSJustificado>();
            result = objMonitoreoPIASAR.ListMontoGiradoPendiente();

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }
    }
}