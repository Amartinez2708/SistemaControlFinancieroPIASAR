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
            var usuario = SecurityManager<EnUsuario>.User;
            if (usuario == null)
            {
                return RedirectToAction("Index", "Login");
            }

            ViewBag.UsuarioNombre = SecurityManager<EnUsuario>.User.NombreCompleto;
            ViewBag.PerfilUsuario = SecurityManager<EnUsuario>.User.Perfil.ToString();
            ViewBag.IdPerfil = SecurityManager<EnUsuario>.User.IdPerfil;

            if (SecurityManager<EnUsuario>.User.IdPerfil == 2)
            {
                ViewBag.IndicadoresInicio = objInicio.Indicadores(SecurityManager<EnUsuario>.User.IdPerfil);
                ViewBag.ActividadReciente = objInicio.ActividadReciente().Take(8).ToList();
            }

            if (SecurityManager<EnUsuario>.User.Sexo.ToString() == "M")
            {
                ViewBag.ImgenUsuario = "/Content/Images/m.png";
            }
            else
            {
                ViewBag.ImgenUsuario = "/Content/Images/f.png";
            }
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
        [HttpGet]
        public JsonResult GraficoAreaIntervencion()
        {
            List<EnIndicadoresInicio> result = new List<EnIndicadoresInicio>();
            result = objInicio.AreaIntervencion(SecurityManager<EnUsuario>.User.IdPerfil, SecurityManager<EnUsuario>.User.IdPersonal);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}