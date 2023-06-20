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
    public class AsignacionProyectosController : Controller
    {
        SrvAsignacionProyectos obj = new SrvAsignacionProyectos();
        // GET: AsignacionProyectos
        public ActionResult Index()
        {
            var usuario = SecurityManager<EnUsuario>.User;
            if (usuario == null)
            {
                return RedirectToAction("Index", "Login");
            }
            ViewBag.ddlPersonal = obj.ddlPersonal(); 
            return View();
        }
        [HttpGet]
        public JsonResult chkProyectos()
        {
            List<EnDropDownList> result = new List<EnDropDownList>();
            result = obj.chkProyectos();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult GuardarAsignacion(int IdPersona, int IdProyecto, int Check)
        {
            EnRespuesta msj = obj.GuardarAsignacion(IdPersona, IdProyecto, Check);
            return Json(msj, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListarProyectosAsignados(int Id)
        {
            List<EnPersonaProyecto> result = new List<EnPersonaProyecto>();
            result = obj.ListarProyectosAsignados(Id);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}