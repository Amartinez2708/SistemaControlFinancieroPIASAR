using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using _02_Entidades;
using _04_Servicios;
using _05_Utilidades;
using System.IO;
using System.Configuration;
using System.Runtime.Remoting.Contexts;

namespace _01_Aplicacion.Controllers
{
    public class FamiliasController : Controller
    {
        SrvFamilias objFamilias = new SrvFamilias();
        // GET: Familias
        public ActionResult Index()
        {
            var usuario = SecurityManager<EnUsuario>.User;
            if (usuario == null)
            {
                return RedirectToAction("Index", "Login");
            }
            return View();
        }
        [HttpGet]
        public JsonResult ListProyectosFamilias()
        {
            List<EnProyecto> result = new List<EnProyecto>();
            result = objFamilias.ListProyectosFamilias();

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }
        [HttpGet]
        public JsonResult ddlMeses(string Etapa)
        {
            List<EnDropDownList> result = new List<EnDropDownList>();
            result = objFamilias.ddlMeses(Etapa);
            return Json(new SelectList(result, "id", "text"), JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ddlActividad(string Etapa, int NroMes)
        {
            List<EnDropDownList> result = new List<EnDropDownList>();
            result = objFamilias.ddlActividad(Etapa, NroMes);
            return Json(new SelectList(result, "id", "text"), JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListDetalleSeguimiento(int Id, int IdCronogramaActividades)
        {
            List<EnDetalleSeguimientoActividadesFamilias> result = new List<EnDetalleSeguimientoActividadesFamilias>();
            result = objFamilias.ListDetalleSeguimiento(Id, IdCronogramaActividades);

            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;

            object json = new { data = result.ToList() };
            var jsonData = Json(json, JsonRequestBehavior.AllowGet);
            jsonData.MaxJsonLength = 500000000;
            return jsonData;
        }
        [HttpGet]
        public JsonResult ListSeguimiento(string cui)
        {
            EnSeguimientoActividadesFamilias result = new EnSeguimientoActividadesFamilias();
            result = objFamilias.ListSeguimiento(cui);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult GuardarSeguimiento(EnDetalleSeguimientoActividadesFamilias detalle)
        {
            EnRespuesta msj = objFamilias.GuardarSeguimiento(detalle);
            return Json(msj, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ListDetalleSeguimientoId(int Id)
        {
            EnDetalleSeguimientoActividadesFamilias result = new EnDetalleSeguimientoActividadesFamilias();
            result = objFamilias.ListDetalleSeguimientoId(Id);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult EliminarSeguimiento(int Id)
        {
            EnRespuesta msj = objFamilias.EliminarSeguimiento(Id);
            return Json(msj, JsonRequestBehavior.AllowGet);
        }
        //[HttpPost]
        //public JsonResult UploadAction(HttpPostedFileBase file)
        //{
        //var cui = Request.QueryString["cui"].Trim();
        //var result = FileUploadUtility.UploadAction(file);
        //return Json(new { success = true, message = result });
        //if (result != "")
        //{
        //    // Procesamiento adicional o redireccionamiento exitoso

        //}
        //else
        //{
        //    // Manejo de error o redireccionamiento en caso de falla
        //    return Json(result, JsonRequestBehavior.AllowGet);
        //}
        //if (file != null && file.ContentLength > 0)
        //{
        //    try
        //    {
        //        var sRuta = ConfigurationManager.AppSettings["RutaDocumentosSeguimientoActividades"].ToString() + "/" + cui;
        //        var Now = DateTime.Now;
        //        var FechaStringName = Now.Year.ToString() + Now.Month.ToString() + Now.Day.ToString() + Now.Hour.ToString() + Now.Minute.ToString() + Now.Second.ToString() + Now.Millisecond.ToString();
        //        var FileNombreReal = file.FileName;
        //        var FileExtension = Path.GetExtension(FileNombreReal);
        //        var FileNombre = FechaStringName + FileExtension;

        //        if (Directory.Exists(sRuta) == true)
        //        {
        //            file.SaveAs(sRuta + "/"+ FileNombre);
        //        }
        //        else
        //        {
        //            Directory.CreateDirectory(sRuta);
        //            file.SaveAs(sRuta + "/" + FileNombre);
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        // Manejar cualquier excepción que ocurra durante el procesamiento del archivo
        //        return RedirectToAction("Error"); // Redirigir a una página de error o realizar acciones adicionales
        //    }
        //}

        //return RedirectToAction("Index"); // Redirigir a la página principal o a otra página deseada
        //}
        [HttpPost]
        public ActionResult UploadAction(string chunkName, int chunkIndex, int totalChunks, string fileName)
        {
            try
            {
                // Ruta de la carpeta temporal donde se guardarán los fragmentos
                string tempFolderPath = ConfigurationManager.AppSettings["RutaTemp"].ToString();

                // Ruta y nombre del fragmento actual
                string tempFilePath = Path.Combine(tempFolderPath, chunkName);

                // Guardar el fragmento en la ubicación temporal
                Request.Files[0].SaveAs(tempFilePath);

                // Verificar si es el último fragmento
                bool isLastChunk = (chunkIndex == totalChunks - 1);

                if (isLastChunk)
                {
                    var sRuta = ConfigurationManager.AppSettings["RutaDocumentosSeguimientoActividades"].ToString();
                    var Now = DateTime.Now;
                    var FechaStringName = Now.Year.ToString() + "_" + Now.Month.ToString() + "_" + Now.Day.ToString() + "_" + Now.Hour.ToString() + Now.Minute.ToString() + Now.Second.ToString() + "_" + Now.Millisecond.ToString() + "_" + Guid.NewGuid().ToString();
                    //var FileNombreReal = file.FileName;
                    //var FileExtension = Path.GetExtension(FileNombreReal);
                    //var FileNombre = FechaStringName + FileExtension;

                    // Ruta y nombre del archivo final
                    string targetFolderPath = ConfigurationManager.AppSettings["RutaDocumentosSeguimientoActividades"].ToString();
                    string targetFilePath = ConfigurationManager.AppSettings["RutaDocumentosSeguimientoActividades"].ToString() + "/" + FechaStringName;

                    // Unir los fragmentos en un solo archivo
                    using (FileStream fs = new FileStream(targetFilePath, FileMode.Create))
                    {
                        for (int i = 0; i < totalChunks; i++)
                        {
                            // Ruta y nombre del fragmento
                            string chunkFileName = Path.Combine(tempFolderPath, $"{chunkName}-{i}");

                            // Leer el contenido del fragmento y escribirlo en el archivo final
                            using (FileStream chunkStream = new FileStream(chunkFileName, FileMode.Open))
                            {
                                chunkStream.CopyTo(fs);
                            }

                            // Eliminar el fragmento
                            System.IO.File.Delete(chunkFileName);
                        }
                    }

                    return Json(new { success = true, message = "Archivo subido con éxito." });
                }
                else
                {
                    return Json(new { success = true, message = "Fragmento subido con éxito." });
                }
            }
            catch (Exception ex)
            {
                // Manejar cualquier excepción que ocurra durante la carga o el procesamiento del fragmento
                return Json(new { success = false, message = "Error al subir el fragmento: " + ex.Message });
            }
        }

        //[HttpPost]
        //    public JsonResult JoinFile(string chunkName, string filename, string cui)
        //    {
        //        //var cui = Request.QueryString["cui"].Trim();
        //        var result = FileUploadUtility.JoinFile(chunkName, filename, cui);
        //        return Json(new { success = true, message = result });
        //    }
        //}
    }
}