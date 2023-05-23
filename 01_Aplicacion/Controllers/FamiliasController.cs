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
    }
}