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
    public class PersonalController : Controller
    {
        SrvPersonal obj = new SrvPersonal();
        // GET: Personal
        public ActionResult Index()
        {
            var usuario = SecurityManager<EnUsuario>.User;
            if (usuario == null)
            {
                return RedirectToAction("Index", "Login");
            }
            ViewBag.ddlCargo = obj.ddlCargo();
            ViewBag.ddlNivelProfesional = obj.ddlNivelProfesional();
            ViewBag.ddlProfesion = obj.ddlProfesion();
            ViewBag.ddlDepartamento = obj.ddlDepartamento();
            return View();
        }
        [HttpGet]
        public JsonResult ListPersonal()
        {
            List<EnPersona> result = new List<EnPersona>();
            result = obj.ListPersonal();

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }
        [HttpGet]
        public JsonResult ddlProvincia(string Id)
        {
            List<EnDropDownList> result = new List<EnDropDownList>();
            result = obj.ddlProvincia(Id);
            return Json(new SelectList(result, "IdText", "Text"), JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ddlDistrito(string Id)
        {
            List<EnDropDownList> result = new List<EnDropDownList>();
            result = obj.ddlDistrito(Id);
            return Json(new SelectList(result, "IdText", "Text"), JsonRequestBehavior.AllowGet);
        }
    }
}