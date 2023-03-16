using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using _02_Entidades;
using _03_Data;
using _04_Servicios;

namespace _01_Aplicacion.Controllers
{
    public class EstadoSituacionalController : Controller
    {
        // GET: EstadoSituacional

        SrvEstadoSituacional objEstadoSituacional = new SrvEstadoSituacional();
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult ListProyectosNucleo()
        {
            List<EnProyecto> result = new List<EnProyecto>();
            result = objEstadoSituacional.ListProyectos().Where(x => x.Cod_modalidad == 22).ToList();

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }
        [HttpGet]
        public JsonResult ListProyectosContrata()
        {
            List<EnProyecto> result = new List<EnProyecto>();
            result = objEstadoSituacional.ListProyectos().Where(x => x.Cod_modalidad == 190).ToList();

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
            result = objEstadoSituacional.Indicadores();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListProyectos(int Tipo, int Estado)
        {
            List<EnProyecto> result = new List<EnProyecto>();

            if (Tipo==2 && Estado == 2)
            {
                int[] ListEstados = { 2, 5 };
                result = objEstadoSituacional.ListProyectos().Where(x => x.IdTipoProyecto == Tipo && ListEstados.Contains(x.IdEstado)).ToList();
            }
            else if (Tipo == 1)
            {
                result = objEstadoSituacional.ListProyectos().Where(x => x.IdTipoProyecto == Tipo).ToList();
            }
            else
            {
                result = objEstadoSituacional.ListProyectos().Where(x => x.IdTipoProyecto == Tipo && x.IdEstado == Estado).ToList();
            }

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }
        [HttpGet]
        public JsonResult ListProyectosConcluidos(int Tipo, int Estado, int SubEstado)
        {
            List<EnProyecto> result = new List<EnProyecto>();

            if (Tipo == 2 && SubEstado == 6)
            {
                int[] ListEstados = { 2, 5 };
                result = objEstadoSituacional.ListProyectos().Where(x => x.IdTipoProyecto == Tipo && ListEstados.Contains(x.IdEstado) && x.IdSubEstado == SubEstado).ToList();
            }
            else
            {
                result = objEstadoSituacional.ListProyectos().Where(x => x.IdTipoProyecto == Tipo && x.IdEstado == Estado && x.IdSubEstado == SubEstado).ToList();
            }

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }
    }
}