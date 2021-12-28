using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using _02_Entidades;
using _04_Servicios;
using _05_Utilidades;
using _03_Data;

namespace _01_Aplicacion.Controllers
{
    public class ManifiestoGastoController : Controller
    {
        BD_NucleosEjecutoresEntities context = new BD_NucleosEjecutoresEntities();
        SrvTabla objTabla = new SrvTabla();
        SrvManifiestoGasto objManifiesto = new SrvManifiestoGasto();
        // GET: ManifiestoGasto
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Agregar()
        {
            string Snip = Request.QueryString["Snip"];

            if (Snip != null)
            {
                ViewBag.NombreObra = context.Proyecto.SingleOrDefault(x => x.Snip == Snip && x.Estado == 1).Nom_proyecto;
            }
            else
            {
                ViewBag.NombreObra = "";
            }
            ViewBag.ddlClase = objTabla.ddlTablaDetalle("11");
            ViewBag.ddlRubro = objTabla.ddlTablaDetalle("10");

            return View();
        }
        [HttpGet]
        public JsonResult ddlAutorizacionesGasto(string snip)
        {
            List<EnDropDownList> result = new List<EnDropDownList>();
            result = objManifiesto.ddlAutorizacionesGasto(snip);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListAutorizacionGasto(string ids, int Tipo, string IdsComprobante)
        {
            List<EnComprobanteDetalle> result = new List<EnComprobanteDetalle>();
            result = objManifiesto.ListAutorizacionDetalle(ids, Tipo, IdsComprobante);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult AgregarComprobante(EnComprobante comprobante)
        {
            EnRespuesta msj = objManifiesto.AgregarComprobante(comprobante);
            return Json(msj, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult GuardarManifiesto(EnMANIFIESTO_GASTO manifiesto)
        {
            EnRespuesta msj = objManifiesto.GuardarManifiesto(manifiesto);
            return Json(msj, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult TotalAutorizacion(string ids)
        {
            EnRespuesta msj = objManifiesto.TotalAutorizacion(ids);
            return Json(msj, JsonRequestBehavior.AllowGet);
        }
    }
}