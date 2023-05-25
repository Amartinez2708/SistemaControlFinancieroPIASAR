using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using _02_Entidades;
using _04_Servicios;
using _05_Utilidades;

namespace _01_Aplicacion.Controllers
{
    public class FamiliasController : Controller
    {
        SrvFamilias objFamilias = new SrvFamilias();
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
        public JsonResult ListDetalleSeguimiento(string cui, int IdCronogramaActividades)
        {
            List<EnDetalleSeguimientoActividadesFamilias> result = new List<EnDetalleSeguimientoActividadesFamilias>();
            result = objFamilias.ListDetalleSeguimiento(cui, IdCronogramaActividades);

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }
    }
}