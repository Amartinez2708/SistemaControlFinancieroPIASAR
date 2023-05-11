using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace _01_Aplicacion.Controllers
{
    public class InicioController : Controller
    {
        // GET: Inicio
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult UserInfo()
        {
            return PartialView("UserInfo");
        }
        public ActionResult SideMenu()
        {
            return PartialView("SideMenu");
        }
    }
}