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
                    if(r.isLastChunk)
                    {
                        if (r.Success)
                        {
                            SeguimientoDetalleArchivo a = new SeguimientoDetalleArchivo();
                            a.TipoSeguimiento = tiposeguimiento;
                            a.NombreArchivo = r.Mensaje.Split('|')[1];
                            a.NombreRealArchivo = r.Mensaje.Split('|')[0];
                            a.FolderPath = r.Mensaje.Split('|')[2];
                            a.TamanioArchivo = r.Mensaje.Split('|')[3];
                            a.Activo = false;
                            a.IdUsuario_add = SecurityManager<EnUsuario>.User.IdUsuario;
                            a.Fecha_add = DateTime.Now;
                            a.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                            a.Fecha_upd = DateTime.Now;

                            context.SeguimientoDetalleArchivo.Add(a);
                            context.SaveChanges();

                            dbtran.Commit();
                            result.Success = true;
                            result.Mensaje = a.IdSeguimientoDetalleArchivo.ToString() + "|" + a.NombreRealArchivo + "|" + a.NombreArchivo + "|" + a.FolderPath + "|" + a.TamanioArchivo;
                        }
                        else
                        {
                            result.Mensaje = r.Mensaje;
                        }
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
                    result.Mensaje = "Error al subir el archivo: " + ex.Message;
                }
            }
            return result;
        }

        public List<EnSeguimientoDetalleArchivo> ListSeguimientoDetalleArchivoId(string TipoSeguimiento, int IdSeguimiento, int IdDetalleSeguimiento)
        {
            List<EnSeguimientoDetalleArchivo> result = new List<EnSeguimientoDetalleArchivo>();

            var obj = context.SeguimientoDetalleArchivo.Where(x =>x.TipoSeguimiento == TipoSeguimiento &&  x.IdSeguimiento == IdSeguimiento && x.IdDetalleSeguimiento == IdDetalleSeguimiento && x.Activo == true).ToList();
            if(obj!= null) {
                foreach (var item in obj)
                {
                    EnSeguimientoDetalleArchivo e = new EnSeguimientoDetalleArchivo();
                    e.IdSeguimientoDetalleArchivo = item.IdSeguimientoDetalleArchivo;
                    e.TipoSeguimiento = item.TipoSeguimiento;
                    e.IdSeguimiento = item.IdSeguimiento;
                    e.IdDetalleSeguimiento = item.IdDetalleSeguimiento;
                    e.NombreArchivo = item.NombreArchivo;
                    e.NombreRealArchivo = item.NombreRealArchivo;
                    e.FolderPath = item.FolderPath;
                    e.TamanioArchivo = item.TamanioArchivo;

                    result.Add(e);
                }
            }

            return result;
        }
    }
}
