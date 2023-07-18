using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using _02_Entidades;
using _03_Data;
using _05_Utilidades;
using System.Web;
using System.Configuration;
using System.IO;

namespace _04_Servicios
{
    public class SrvSeguimientoDetalleArchivo
    {
        BD_NucleosEjecutoresEntities context = new BD_NucleosEjecutoresEntities();

        public EnRespuesta UploadSeguimiento(HttpPostedFileBase file, string chunkName, int chunkIndex, int totalChunks, string fileName, string extension, string cui, string tiposeguimiento)
        {
            EnRespuesta result = new EnRespuesta();

            using (var dbtran = context.Database.BeginTransaction())
            {
                try
                {
                    EnRespuesta r = FileUploadUtility.UploadFile(file, chunkName, chunkIndex, totalChunks, fileName, extension, cui);
                    if (r.Success)
                    {
                        SeguimientoDetalleArchivo a = new SeguimientoDetalleArchivo();
                        a.TipoSeguimiento = tiposeguimiento;
                        a.NombreArchivo = result.Mensaje.Split('|')[1];
                        a.NombreRealArchivo = result.Mensaje.Split('|')[0];
                        a.FolderPath = result.Mensaje.Split('|')[2];
                        a.Activo = false;
                        a.IdUsuario_add = SecurityManager<EnUsuario>.User.IdUsuario;
                        a.Fecha_add = DateTime.Now;
                        a.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                        a.Fecha_upd = DateTime.Now;

                        context.SeguimientoDetalleArchivo.Add(a);
                        context.SaveChanges();

                        dbtran.Commit();
                        result.Success = true;
                        result.Mensaje = a.IdSeguimientoDetalleArchivo.ToString() +"|" + a.NombreRealArchivo + "|" + a.NombreArchivo + "|" + a.FolderPath;
                    }
                    else
                    {
                        result.Mensaje = r.Mensaje;
                    }
                }
                catch (Exception ex)
                {
                    // Manejar cualquier excepción que ocurra durante la carga o el procesamiento del fragmento
                    result.Success = false;
                    result.Mensaje = "Error al subir el fragmento: " + ex.Message;
                }
            }
            return result;
        }

    }
}
