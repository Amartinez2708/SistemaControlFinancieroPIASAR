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
                var objUsuario = context.Usuario.Select(x => x).Where(x => x.Usuario1.Equals(Usuario) && x.Activo == true).ToList();
                if (objUsuario != null)
                {
                    var objContrasena = objUsuario.Select(x => x).Where(x => x.Password.ToLower().Equals(Contrasena.ToLower())).FirstOrDefault();
                    if (objContrasena != null)
                    {
                        EnUsuario usuario = new EnUsuario();
                        usuario.IdUsuario = objContrasena.IdUsuario;
                        usuario.IdPersonal = objContrasena.IdPersona;
                        usuario.Dni = objContrasena.Persona.NroDocumento;
                        usuario.ApePaterno = objContrasena.Persona.ApePaterno;
                        usuario.ApeMaterno = objContrasena.Persona.ApeMaterno;
                        usuario.Nombres = objContrasena.Persona.Nombres;
                        usuario.Sexo = objContrasena.Persona.Sexo;
                        usuario.IdCargo = Convert.ToInt32(objContrasena.Persona.IdCargo);
                        usuario.Email1 = objContrasena.Persona.Email1;
                        usuario.Email2 = objContrasena.Persona.Email2;
                        usuario.Celular1 = objContrasena.Persona.Celular1;
                        usuario.Celular2 = objContrasena.Persona.Celular2;

                        usuario.Usuario1 = objContrasena.Usuario1;
                        usuario.Password = objContrasena.Password;
                        usuario.NombreCompleto = usuario.ApePaterno + " " + usuario.ApeMaterno + ", " + usuario.Nombres;


                        respuesta.TipoRespuesta = 1;
                        respuesta.Mensaje = objContrasena.Persona.Sexo;
                        respuesta.ValorDevolucion = "";

                        jsonData = Json(respuesta, JsonRequestBehavior.AllowGet);


                        var objUsuarioPerfil = context.UsuarioPerfil.Where(x => x.IdUsuario == objContrasena.IdUsuario).ToList();

                        if (objUsuarioPerfil != null)
                        {
                            if (objUsuarioPerfil.Count() > 1)
                            {
                                SecurityManager<string>.UserName = usuario.NombreCompleto;
                                SecurityManager<EnUsuario>.User = usuario;

                                respuesta.TipoRespuesta = 1;
                                respuesta.Mensaje = usuario.Sexo;
                                respuesta.ValorDevolucion = "";

                                jsonData = Json(respuesta, JsonRequestBehavior.AllowGet);
                            }
                            else
                            {
                                int? IdPerfil = objUsuarioPerfil.FirstOrDefault().IdPerfil;

                                if (IdPerfil == 0) //Ninguno En el sistema 
                                {
                                    jsonData = Json("0", JsonRequestBehavior.AllowGet);
                                }
                                else
                                {
                                    SecurityManager<string>.UserName = usuario.NombreCompleto;
                                    SecurityManager<EnUsuario>.User = usuario;
                                    SecurityManager<EnUsuario>.User.Perfil = objUsuarioPerfil.FirstOrDefault().Perfil.Descripcion;
                                    SecurityManager<EnUsuario>.User.IdPerfil = Convert.ToInt32(IdPerfil);
                                    respuesta.TipoRespuesta = 1;
                                    respuesta.Mensaje = usuario.Sexo;
                                    respuesta.ValorDevolucion = "";

                                    jsonData = Json(respuesta, JsonRequestBehavior.AllowGet);
                                }
                            }
                        }
                    }
                    else
                    {
                        jsonData = Json("Contraseña incorrecta", JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    jsonData = Json("Usuario incorrecto o no existe", JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                jsonData = Json(ex.ToString(), JsonRequestBehavior.AllowGet);
            }
            return jsonData;
        }
    }
}