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
    public class InicioController : Controller
    {
        SrvInicio objInicio = new SrvInicio();
        // GET: Inicio
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult UserInfo()
        {
            var usuario = SecurityManager<EnUsuario>.User;
            if (usuario == null)
            {
                return RedirectToAction("Index", "Login");
            }
            ViewBag.UsuarioNombre = SecurityManager<EnUsuario>.User.NombreCompleto;
            ViewBag.PerfilUsuario = SecurityManager<EnUsuario>.User.Perfil.ToString();

            if (SecurityManager<EnUsuario>.User.Sexo.ToString() == "M")
            {
                ViewBag.ImgenUsuario = "/Content/Images/m.png";
            }
            else
            {
                ViewBag.ImgenUsuario = "/Content/Images/f.png";
            }
            return PartialView("UserInfo");
        }
        public ActionResult SideMenu()
        {
            var usuario = SecurityManager<EnUsuario>.User;
            if (usuario == null)
            {
                return RedirectToAction("Index", "Login");
            }
            int IdPerfilUser = Convert.ToInt32(SecurityManager<EnUsuario>.User.IdPerfil);
            List<EnMenuSistema> objEnMenuSistema = objInicio.ListMenu(IdPerfilUser);
            ViewBag.MenuSistema = objEnMenuSistema;

            return PartialView("SideMenu");
        }
    }
}