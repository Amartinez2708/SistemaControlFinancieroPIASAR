using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace _05_Utilidades
{
    public static class FileUploadUtility
    {
        public static string UploadFileInChunks(HttpPostedFileBase file, string cui)
        {
            if (file == null || file.ContentLength == 0)
                return "";

            try
            {

                var sRuta = ConfigurationManager.AppSettings["RutaDocumentosSeguimientoActividades"].ToString() + "/" + cui;
                var Now = DateTime.Now;
                var FechaStringName = Now.Year.ToString() + "_" +Now.Month.ToString()+"_" + Now.Day.ToString() +"_"+ Now.Hour.ToString() + Now.Minute.ToString() + Now.Second.ToString() +"_"+ Now.Millisecond.ToString()+"_"+ Guid.NewGuid().ToString();
                var FileNombreReal = file.FileName;
                var FileExtension = Path.GetExtension(FileNombreReal);
                var FileNombre = FechaStringName + FileExtension;

                string targetFilePath = ConfigurationManager.AppSettings["RutaDocumentosSeguimientoActividades"].ToString() + "/" + cui+"/"+ FileNombre;


                int chunkSize = 1024 * 1024; // Tamaño del fragmento (por ejemplo, 1 MB)

                int fileSize = file.ContentLength;
                int totalChunks = (int)Math.Ceiling((double)fileSize / chunkSize);
                int currentChunk = 0;
                byte[] buffer = new byte[chunkSize];

                // Crea una carpeta temporal para guardar los fragmentos (por ejemplo, en el directorio "App_Data")
                string tempFolderPath = ConfigurationManager.AppSettings["RutaTemp"].ToString();

                if (!Directory.Exists(tempFolderPath))
                    Directory.CreateDirectory(tempFolderPath);

                // Nombre de archivo temporal basado en un identificador único (puedes usar otra lógica para generar nombres únicos)
                string tempFileName = Guid.NewGuid().ToString();

                // Ruta completa del archivo temporal
                string tempFilePath = Path.Combine(tempFolderPath, tempFileName);

                using (FileStream fs = new FileStream(tempFilePath, FileMode.Append))
                {
                    while ((currentChunk = file.InputStream.Read(buffer, 0, buffer.Length)) > 0)
                    {
                        fs.Write(buffer, 0, currentChunk);
                    }
                }

                if (IsAllChunksUploaded(totalChunks, tempFolderPath, tempFileName))
                {
                    // Mueve o copia el archivo temporal a su ubicación final (por ejemplo, en el directorio "Uploads")
                    if (Directory.Exists(sRuta) == true)
                    {
                        //file.SaveAs(sRuta + "/" + FileNombre);
                        File.Move(tempFilePath, targetFilePath);
                    }
                    else
                    {
                        Directory.CreateDirectory(sRuta);
                        //file.SaveAs(sRuta + "/" + FileNombre);
                        File.Move(tempFilePath, targetFilePath);
                    }


                    

                    // Elimina la carpeta temporal y los fragmentos
                    DeleteTempUploads(tempFolderPath, tempFileName);

                    return FileNombre + "|" + FileNombreReal;
                }
            }
            catch (Exception ex)
            {
                // Manejar cualquier excepción que ocurra durante la carga o el procesamiento del archivo
                return "";
            }

            return "";
        }

        private static bool IsAllChunksUploaded(int totalChunks, string tempFolderPath, string tempFileName)
        {
            for (int i = 0; i < totalChunks; i++)
            {
                string chunkFilePath = Path.Combine(tempFolderPath, tempFileName + "_" + i);
                if (File.Exists(chunkFilePath))
                    return false;
            }

            return true;
        }

        private static void DeleteTempUploads(string tempFolderPath, string tempFileName)
        {
            DirectoryInfo directoryInfo = new DirectoryInfo(tempFolderPath);
            FileInfo[] files = directoryInfo.GetFiles(tempFileName + "_*");
            foreach (FileInfo file in files)
            {
                file.Delete();
            }
        }

        //public static string UploadAction(HttpPostedFileBase file)
        //{
            
        //}

        public static string JoinFile(string chunkName, string filename, string cui)
        {
            try
            {
                var sRuta = ConfigurationManager.AppSettings["RutaDocumentosSeguimientoActividades"].ToString() + "/" + cui;
                var Now = DateTime.Now;
                var FechaStringName = Now.Year.ToString() + "_" + Now.Month.ToString() + "_" + Now.Day.ToString() + "_" + Now.Hour.ToString() + Now.Minute.ToString() + Now.Second.ToString() + "_" + Now.Millisecond.ToString() + "_" + Guid.NewGuid().ToString();
                var FileNombreReal = filename;
                var FileExtension = Path.GetExtension(FileNombreReal);
                var FileNombre = FechaStringName;
                // Ruta y nombre del archivo final
                string finalFilePath = sRuta+"/" +FileNombre;

                // Ruta de la carpeta temporal donde se guardaron los fragmentos
                string tempFolderPath = ConfigurationManager.AppSettings["RutaTemp"].ToString();

                // Obtén los nombres de los fragmentos que coinciden con el nombre único
                string[] chunkFileNames = Directory.GetFiles(tempFolderPath, chunkName + "-*");

                // Ordena los fragmentos por número
                Array.Sort(chunkFileNames);

                // Une los fragmentos en un solo archivo
                using (FileStream fs = new FileStream(finalFilePath, FileMode.Create))
                {
                    foreach (string chunkFileName in chunkFileNames)
                    {
                        using (FileStream chunkStream = new FileStream(chunkFileName, FileMode.Open))
                        {
                            chunkStream.CopyTo(fs);
                        }
                    }
                }

                // Elimina los fragmentos
                foreach (string chunkFileName in chunkFileNames)
                {
                    System.IO.File.Delete(chunkFileName);
                }

                return "ok";
            }
            catch (Exception ex)
            {
                // Manejar cualquier excepción que ocurra durante la unión del archivo
                return "Error al unir el archivo: " + ex.Message;
            }
        }
    }
}
