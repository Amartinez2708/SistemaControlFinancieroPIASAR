using _02_Entidades;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace _05_Utilidades
{
    public static class FileUploadUtility
    {
        public static EnRespuesta UploadFile(HttpPostedFileBase file, string chunkName, int chunkIndex, int totalChunks, string fileName, string extension, string cui)
        {
            EnRespuesta result = new EnRespuesta();
            try
            {
                // Crea una carpeta temporal para guardar los fragmentos (por ejemplo, en el directorio "App_Data")
                string tempFolderPath = ConfigurationManager.AppSettings["RutaTemp"].ToString();
                if (!Directory.Exists(tempFolderPath))
                    Directory.CreateDirectory(tempFolderPath);

                // Ruta y nombre del fragmento actual
                string tempFilePath = Path.Combine(tempFolderPath, chunkName + "-" + chunkIndex);

                // Guardar el fragmento en la ubicación temporal
                file.SaveAs(tempFilePath);

                // Verificar si es el último fragmento
                bool isLastChunk = (chunkIndex == totalChunks);

                if (isLastChunk)
                {
                    var Now = DateTime.Now;
                    var FechaStringName = Now.Year.ToString() + "_" + Now.Month.ToString() + "_" + Now.Day.ToString() + "_" + Now.Hour.ToString() + "_" + Now.Minute.ToString() + "_" + Now.Second.ToString() + "_" + Now.Millisecond.ToString() + "_" + Guid.NewGuid().ToString();

                    // Ruta y nombre del archivo final
                    string targetFolderPath = ConfigurationManager.AppSettings["RutaDocumentosSeguimientoActividades"].ToString();
                    string targetFilePath = targetFolderPath + "/" + cui + "/" + FechaStringName + "." + extension;

                    if (!Directory.Exists(targetFolderPath + "/" + cui))
                        Directory.CreateDirectory(targetFolderPath + "/" + cui);

                    // Unir los fragmentos en un solo archivo
                    using (FileStream fs = new FileStream(targetFilePath, FileMode.Create))
                    {
                        for (int i = 1; i <= totalChunks; i++)
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

                    result.Success = true;
                    result.Mensaje = fileName + "|" + FechaStringName + "." + extension + "|" + targetFilePath;

                    return result;
                }
                else
                {

                    result.Success = true;
                    result.Mensaje = "Fragmento subido con éxito.";

                    return result;
                }
            }
            catch (Exception ex)
            {
                // Manejar cualquier excepción que ocurra durante la carga o el procesamiento del fragmento

                result.Success = false;
                result.Mensaje = "Error al subir el fragmento: " + ex.Message;

                return result;
            }
        }
        public static EnRespuesta DownloadAction(string filePath, string nombre)
        {
            EnRespuesta result = new EnRespuesta();
            try
            {
                // Verificar que el archivo exista
                if (!File.Exists(filePath))
                {
                    result.Success = false;
                    result.Mensaje = "El archivo no existe.";

                    return result;
                }

                // Configurar la respuesta HTTP
                HttpResponse response = HttpContext.Current.Response;
                response.Clear();
                response.ClearHeaders();
                response.ClearContent();
                response.ContentType = "application/octet-stream";
                response.AddHeader("Content-Disposition", $"attachment; filename={nombre}");
                response.AddHeader("Content-Length", new FileInfo(filePath).Length.ToString());

                // Leer el archivo y enviarlo al cliente
                response.BinaryWrite(File.ReadAllBytes(filePath));
                response.Flush();
                response.End();

                result.Success = true;
                result.Mensaje = "Archivo descargado con exito";

                return result;
            }
            catch (Exception ex)
            {

                result.Success = false;
                result.Mensaje = "Error al descargar: " + ex.Message;

                return result;
            }
            
        }
    }
}
