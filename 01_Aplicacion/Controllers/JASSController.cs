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
    public class JASSController : Controller
    {
        // GET: JASS
        public ActionResult Index()
        {
            var usuario = SecurityManager<EnUsuario>.User;
            if (usuario == null)
            {
                return RedirectToAction("Index", "Login");
            }
            return View();
        }
    }
}