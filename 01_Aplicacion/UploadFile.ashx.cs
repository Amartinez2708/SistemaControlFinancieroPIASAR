using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Configuration;

namespace _01_Aplicacion
{
    /// <summary>
    /// Descripción breve de UploadFile
    /// </summary>
    public class UploadFile : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string carpeta = "";

            string cur = context.Request.QueryString["cur"];

            carpeta = cur;
            string sRuta = ConfigurationManager.AppSettings["RutaDocumentos"].ToString() + "/" + carpeta;
            //sRuta = HttpContext.Current.Server.MapPath(sRuta);
            string sRutaImage = "../" + ConfigurationManager.AppSettings["RutaDocumentos"].ToString() + "/" + carpeta;
            try
            {
                context.Response.ContentType = "text/plain";
                string setfilename = "";

                foreach (string s in context.Request.Files)
                {

                    HttpPostedFile file = context.Request.Files[s];
                    DateTime fecha = DateTime.Now;
                    string filename = file.FileName;
                    string fileExtension = file.ContentType;

                    if (!string.IsNullOrEmpty(filename))
                    {
                        fileExtension = Path.GetExtension(filename);
                        string ts = "";
                        DateTime Now = DateTime.Now;
                        ts = Now.Year.ToString() + Now.Month.ToString() + Now.Day.ToString() + Now.Hour.ToString() + Now.Minute.ToString() + Now.Second.ToString() + Now.Millisecond.ToString();
                        setfilename = Guid.NewGuid().ToString("N").Substring(4) + "_" + ts + fileExtension;

                        if (!System.IO.Directory.Exists(sRuta))
                        {
                            System.IO.Directory.CreateDirectory(sRuta);
                            file.SaveAs(sRuta + "/" + setfilename);
                        }
                        else
                        {
                            file.SaveAs(sRuta + "/" + setfilename);
                        }
                        context.Response.Write(setfilename + "|" + filename + "|" + sRuta);

                    }
                }
            }
            catch (Exception ex)
            {
                context.Response.Write("ERROR: " + ex.Message);
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}