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
    public class MatrizResultadosController : Controller
    {
        SrvMatrizResultados objMR = new SrvMatrizResultados();
        // GET: MatrizResultados
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult ListSeguimientoJASS()
        {
            List<EnListSeguimiento> result = new List<EnListSeguimiento>();
            result = objMR.ListSeguimientoJASS();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListSeguimientoJASSDetalle()
        {
            List<EnListSeguimientoDetalle> result = new List<EnListSeguimientoDetalle>();
            result = objMR.ListSeguimientoJASSDetalle();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult ListResultadoEsperadoAnio()
        {
            List<EnListResultadoEsperadoAnio> result = new List<EnListResultadoEsperadoAnio>();
            result = objMR.ListResultadoEsperadoAnio();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListResultadoEsperadoAnioDetalle(int anio)
        {
            List<EnProyecto> result = new List<EnProyecto>();
            result = objMR.ListResultadoEsperadoAnioDetalle(anio);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult ListSeguimientoATMDetalle()
        {
            List<EnListSeguimientoDetalle> result = new List<EnListSeguimientoDetalle>();
            result = objMR.ListSeguimientoATMDetalle();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListResultadoEsperadoAnioHogaresUBS()
        {       
            List<EnListResultadoEsperadoAnio> result = new List<EnListResultadoEsperadoAnio>();
            result = objMR.ListResultadoEsperadoAnioHogaresUBS();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListResultadoEsperadoAnioDetalleHogaresUBS(int anio)
        {
            List<EnProyecto> result = new List<EnProyecto>();
            result = objMR.ListResultadoEsperadoAnioDetalleHogaresUBS(anio);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListResultadoEsperadoAnioMujeresJASS()
        {
            List<EnListResultadoEsperadoAnio> result = new List<EnListResultadoEsperadoAnio>();
            result = objMR.ListResultadoEsperadoAnioMujeresJASS();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListResultadoEsperadoAnioDetalleMujeresJASS(int anio)
        {
            List<EnProyecto> result = new List<EnProyecto>();
            result = objMR.ListResultadoEsperadoAnioDetalleMujeresJASS(anio);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListResultadoEsperadoAnioMujeresNE()
        {
            List<EnListResultadoEsperadoAnio> result = new List<EnListResultadoEsperadoAnio>();
            result = objMR.ListResultadoEsperadoAnioMujeresNE();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListResultadoEsperadoAnioDetalleMujeresNE(int anio)
        {
            List<EnProyecto> result = new List<EnProyecto>();
            result = objMR.ListResultadoEsperadoAnioDetalleMujeresNE(anio);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListProductoSeguimientoJASScapacitadas()
        {
            List<EnListSeguimientoDetalleActividades> result = new List<EnListSeguimientoDetalleActividades>();
            result = objMR.ListProductoSeguimientoJASScapacitadas();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListProductoSeguimientoTalleresDirigidoMujeres()
        {
            List<EnListSeguimientoDetalleActividades> result = new List<EnListSeguimientoDetalleActividades>();
            result = objMR.ListProductoSeguimientoTalleresDirigidoMujeres();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListProductoSeguimientoATM()
        {
            List<EnListSeguimientoDetalleActividades> result = new List<EnListSeguimientoDetalleActividades>();
            result = objMR.ListProductoSeguimientoATM();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListProductoSeguimientoNE()
        {
            List<EnListSeguimientoDetalleActividades> result = new List<EnListSeguimientoDetalleActividades>();
            result = objMR.ListProductoSeguimientoNE();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListResultadoEsperadoAnioCuotaFamiliar()
        {
            List<EnListResultadoEsperadoAnio> result = new List<EnListResultadoEsperadoAnio>();
            result = objMR.ListResultadoEsperadoAnioCuotaFamiliar();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListResultadoEsperadoAnioDetalleCuotaFamiliar(int anio)
        {
            List<EnListSeguimientoDetalleActividades> result = new List<EnListSeguimientoDetalleActividades>();
            result = objMR.ListResultadoEsperadoAnioDetalleCuotaFamiliar(anio);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListResultadoDetalleJASSCuota()
        {
            List<EnListSeguimientoDetalleActividades> result = new List<EnListSeguimientoDetalleActividades>();
            result = objMR.ListResultadoDetalleJASSCuota();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListProductosSistemasOTAConcluidas()
        {
            List<EnListSeguimientoDetalleActividades> result = new List<EnListSeguimientoDetalleActividades>();
            result = objMR.ListProductosSistemasOTAConcluidas();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListProductoSeguimientoATMDetalles(string Etapa)
        {
            EnTablaDinamica result = new EnTablaDinamica();
            result = objMR.ListProductoSeguimientoATMDetalles(Etapa);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListProductoSeguimientoNEDetalles(string Etapa)
        {
            EnTablaDinamica result = new EnTablaDinamica();
            result = objMR.ListProductoSeguimientoNEDetalles(Etapa);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}