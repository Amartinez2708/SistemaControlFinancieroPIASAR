using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using _03_Data;
using _05_Utilidades;
using _02_Entidades;

namespace _01_Aplicacion.Controllers
{
    public class LoginController : Controller
    {
        BD_NucleosEjecutoresEntities context = new BD_NucleosEjecutoresEntities();
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Login(string Usuario, string Contrasena)
        {
            SessionManager.RemoveAll();
            EnRespuesta respuesta = new EnRespuesta();
            var jsonData = Json("", JsonRequestBehavior.AllowGet);
            try
            {
                //var objUsuario = context.USUARIO_SISTEMA.Select(x => x).Where(x => x.USUARIO.Equals(Usuario) && x.ESTADO == 1).ToList();
                //if (objUsuario != null)
                //{
                //    var objContrasena = objUsuario.Select(x => x).Where(x => x.CONTRASENA.ToLower().Equals(Contrasena.ToLower())).FirstOrDefault();
                //    if (objContrasena != null)
                //    {
                //        EnUsuario usuario = new EnUsuario();
                //        usuario.IdUsuario = objContrasena.IdUsuario;
                //        usuario.Nombre = objContrasena.Nombre;
                //        usuario.Login = objContrasena.Login;
                //        usuario.Password = objContrasena.Password;
                //        usuario.EMail = objContrasena.EMail;
                //        usuario.IdPersonal = objContrasena.IdPersonal;
                //        usuario.Sexo = objContrasena.Sexo;
                //        usuario.Periodo = DateTime.Now.Year.ToString();



                //        var objUsuarioPerfil = context.UsuarioPerfil.Where(x => x.IdUsuario == objContrasena.IdUsuario).ToList();

                //        if (objUsuarioPerfil != null)
                //        {
                //            if (objUsuarioPerfil.Count() > 1)
                //            {
                //                SecurityManager<string>.UserName = usuario.Nombre;
                //                SecurityManager<EnUsuario>.User = usuario;

                //                respuesta.TipoRespuesta = 1;
                //                respuesta.Mensaje = objContrasena.Sexo;
                //                respuesta.ValorDevolucion = "";

                //                jsonData = Json(respuesta, JsonRequestBehavior.AllowGet);
                //            }
                //            else
                //            {
                //                int IdPerfil = objUsuarioPerfil.FirstOrDefault().IdPerfil;

                //                if (IdPerfil == 0) //Ninguno En el sistema 
                //                {
                //                    jsonData = Json("0", JsonRequestBehavior.AllowGet);
                //                }
                //                else if (IdPerfil == 1)//Administrador
                //                {
                //                    SecurityManager<string>.UserName = usuario.Nombre;
                //                    SecurityManager<EnUsuario>.User = usuario;
                //                    respuesta.TipoRespuesta = 1;
                //                    respuesta.Mensaje = objContrasena.Sexo;
                //                    respuesta.ValorDevolucion = "";

                //                    jsonData = Json(respuesta, JsonRequestBehavior.AllowGet);
                //                }
                //                else if (IdPerfil == 2)//Docente
                //                {
                //                    SecurityManager<string>.UserName = usuario.Nombre;
                //                    SecurityManager<EnUsuario>.User = usuario;
                //                    respuesta.TipoRespuesta = 2;
                //                    respuesta.Mensaje = objContrasena.Sexo;
                //                    respuesta.ValorDevolucion = "";

                //                    jsonData = Json(respuesta, JsonRequestBehavior.AllowGet);
                //                }
                //                else if (IdPerfil == 3)//Estudiante
                //                {
                //                    SecurityManager<string>.UserName = usuario.Nombre;
                //                    SecurityManager<EnUsuario>.User = usuario;
                //                    respuesta.TipoRespuesta = 3;
                //                    respuesta.Mensaje = objContrasena.Sexo;
                //                    respuesta.ValorDevolucion = "";

                //                    jsonData = Json(respuesta, JsonRequestBehavior.AllowGet);
                //                }

                //            }
                //        }
                //    }
                //    else
                //    {
                //        jsonData = Json("Contraseña incorrecta", JsonRequestBehavior.AllowGet);
                //    }
                //}
                //else
                //{
                //    jsonData = Json("Usuario incorrecto o no existe", JsonRequestBehavior.AllowGet);
                //}
            }
            catch (Exception ex)
            {
                jsonData = Json(ex.ToString(), JsonRequestBehavior.AllowGet);
            }
            return jsonData;
        }
    }
}