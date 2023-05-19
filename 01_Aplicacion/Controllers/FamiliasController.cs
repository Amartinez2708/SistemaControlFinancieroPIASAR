using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace _01_Aplicacion.Controllers
{
    public class FamiliasController : Controller
    {
        // GET: Familias
        public ActionResult Index()
        {
            return View();
        }
    }
}