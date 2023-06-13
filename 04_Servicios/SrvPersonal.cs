using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using _02_Entidades;
using _03_Data;
using _05_Utilidades;

namespace _04_Servicios
{
    public class SrvPersonal
    {
        BD_NucleosEjecutoresEntities context = new BD_NucleosEjecutoresEntities();
        public List<EnPersona> ListPersonal()
        {
            List<EnPersona> result = new List<EnPersona>();

            var obj = context.Persona.Where(x => x.IdPersona != 1 && x.Activo == true).ToList();
            if (obj != null && obj.Count() > 0)
            {
                foreach (var data in obj)
                {
                    //var departamento = context.Departamento.FirstOrDefault(x => x.cod_depa == data.UbigeoDireccion.Substring(0, 2)).nom_depa;
                    //var Provincia = context.Provincia.FirstOrDefault(x => x.cod_depa == data.UbigeoDireccion.Substring(0, 2) && x.cod_prov == data.UbigeoDireccion.Substring(2, 2)).nom_prov;
                    //var Distrito = context.Distrito.FirstOrDefault(x => x.cod_depa == data.UbigeoDireccion.Substring(0, 2) && x.cod_prov == data.UbigeoDireccion.Substring(2, 2) && x.cod_dist == data.UbigeoDireccion.Substring(4, 2)).nom_dist;

                    EnPersona model = new EnPersona();
                    model.IdPersona = data.IdPersona;
                    model.TipoDocumento = data.TipoDocumento;                  
                    model.NroDocumento = data.NroDocumento;
                    model.TipoNroDcto = "DNI - " + data.NroDocumento;
                    model.ApePaterno = data.ApePaterno;
                    model.ApeMaterno = data.ApeMaterno;
                    model.Nombres = data.Nombres;
                    model.Personal = data.ApePaterno + " "+ data.ApeMaterno+ ", "+ data.Nombres;
                    model.Sexo = data.Sexo;
                    model.TipoSangre = data.TipoSangre;
                    model.FechaNacimiento = data.FechaNacimiento;
                    model.EstadoCivil = data.EstadoCivil;
                    model.UbigeoDireccion = data.UbigeoDireccion;
                    model.Direccion = data.Direccion;
                    model.Referencia = data.Referencia;
                    model.IdCargo = data.IdCargo;
                    model.Cargo = data.Cargo.Cargo1;
                    model.IdNivelProfesional = data.IdNivelProfesional;
                    model.NivelProfesional = data.NivelProfesional.NivelProfesional1;
                    model.IdProfesion = data.IdProfesion;
                    model.Profesion = data.Profesion.Profesion1;
                    model.Email1 = data.Email1;
                    model.Email2 = data.Email2;
                    model.Celular1 = data.Celular1;
                    model.Celular2 = data.Celular2;

                    model.FechaNacimientoString = data.FechaNacimiento == null ? "" : Convert.ToDateTime(data.FechaNacimiento).ToString("dd/MM/yyyy hh:mm:ss");


                    result.Add(model);
                }
            }
            return result.ToList();
        }
        public List<EnDropDownList> ddlDepartamento()
        {
            List<EnDropDownList> result = new List<EnDropDownList>();

            var obj = context.Departamento.OrderBy(x => x.nom_depa);
            if (obj != null && obj.Count() > 0)
            {
                EnDropDownList unidad = new EnDropDownList();
                unidad.IdText = "00";
                unidad.text = "[--Seleccione--]";
                result.Add(unidad);

                EnDropDownList values;
                foreach (var data in obj)
                {
                    values = new EnDropDownList();
                    values.IdText = data.cod_depa;
                    values.text = data.nom_depa;
                    result.Add(values);
                }
            }
            return result;
        }
        public List<EnDropDownList> ddlProvincia(string IdDepartamento)
        {
            List<EnDropDownList> result = new List<EnDropDownList>();

            var obj = context.Provincia.Where(x => x.cod_depa == IdDepartamento).OrderBy(x => x.nom_prov);
            if (obj != null && obj.Count() > 0)
            {
                EnDropDownList unidad = new EnDropDownList();
                unidad.IdText = "00";
                unidad.text = "[--Seleccione--]";
                result.Add(unidad);

                EnDropDownList values;
                foreach (var data in obj)
                {
                    values = new EnDropDownList();
                    values.IdText = data.cod_prov;
                    values.text = data.nom_prov;
                    result.Add(values);
                }
            }
            return result;
        }
        public List<EnDropDownList> ddlDistrito(string DepartamentoProvincia)
        {
            var Departamento = DepartamentoProvincia.Substring(0, 2);
            var Provincia = DepartamentoProvincia.Substring(2, 2);

            List<EnDropDownList> result = new List<EnDropDownList>();

            var obj = context.Distrito.Where(x => x.cod_depa == Departamento && x.cod_prov == Provincia).OrderBy(x => x.nom_dist);
            if (obj != null && obj.Count() > 0)
            {
                EnDropDownList unidad = new EnDropDownList();
                unidad.IdText = "00";
                unidad.text = "[--Seleccione--]";
                result.Add(unidad);

                EnDropDownList values;
                foreach (var data in obj)
                {
                    values = new EnDropDownList();
                    values.IdText = data.cod_dist;
                    values.text = data.nom_dist;
                    result.Add(values);
                }
            }
            return result;
        }
        public List<EnDropDownList> ddlCargo()
        {
            List<EnDropDownList> result = new List<EnDropDownList>();

            var obj = context.Cargo.OrderBy(x => x.Cargo1);
            if (obj != null && obj.Count() > 0)
            {
                EnDropDownList unidad = new EnDropDownList();
                unidad.id = 0;
                unidad.text = "[--Seleccione--]";
                result.Add(unidad);

                EnDropDownList values;
                foreach (var data in obj)
                {
                    values = new EnDropDownList();
                    values.id = data.IdCargo;
                    values.text = data.Cargo1;
                    result.Add(values);
                }
            }
            return result;
        }
        public List<EnDropDownList> ddlNivelProfesional()
        {
            List<EnDropDownList> result = new List<EnDropDownList>();

            var obj = context.NivelProfesional.OrderBy(x => x.NivelProfesional1);
            if (obj != null && obj.Count() > 0)
            {
                EnDropDownList unidad = new EnDropDownList();
                unidad.id = 0;
                unidad.text = "[--Seleccione--]";
                result.Add(unidad);

                EnDropDownList values;
                foreach (var data in obj)
                {
                    values = new EnDropDownList();
                    values.id = data.IdNivelProfesional;
                    values.text = data.NivelProfesional1;
                    result.Add(values);
                }
            }
            return result;
        }
        public List<EnDropDownList> ddlProfesion()
        {
            List<EnDropDownList> result = new List<EnDropDownList>();

            var obj = context.Profesion.OrderBy(x => x.Profesion1);
            if (obj != null && obj.Count() > 0)
            {
                EnDropDownList unidad = new EnDropDownList();
                unidad.id = 0;
                unidad.text = "[--Seleccione--]";
                result.Add(unidad);

                EnDropDownList values;
                foreach (var data in obj)
                {
                    values = new EnDropDownList();
                    values.id = data.IdProfesion;
                    values.text = data.Profesion1;
                    result.Add(values);
                }
            }
            return result;
        }
        public EnRespuesta GuardarPersonal(EnPersona detalle)
        {
            EnRespuesta respuesta = new EnRespuesta();
            using (var dbtran = context.Database.BeginTransaction())
            {
                try
                {
                    if (detalle.IdPersona == 0)
                    {
                        #region Agregar Seguimiento

                        Persona n = new Persona();
                        n.TipoDocumento = detalle.TipoDocumento;
                        n.NroDocumento = detalle.NroDocumento;
                        n.ApePaterno = detalle.ApePaterno;
                        n.ApeMaterno = detalle.ApeMaterno;
                        n.Nombres = detalle.Nombres;
                        n.Sexo = detalle.Sexo;
                        n.TipoSangre = detalle.TipoSangre;
                        n.FechaNacimiento = detalle.FechaNacimiento;
                        n.EstadoCivil = detalle.EstadoCivil;
                        n.UbigeoDireccion = detalle.UbigeoDireccion;
                        n.Direccion = detalle.Direccion;
                        n.Referencia = detalle.Referencia;
                        n.IdCargo = detalle.IdCargo;
                        n.IdNivelProfesional = detalle.IdNivelProfesional;
                        n.IdProfesion = detalle.IdProfesion;
                        n.Email1 = detalle.Email1;
                        n.Email2 = detalle.Email2;
                        n.Celular1 = detalle.Celular1;
                        n.Celular2 = detalle.Celular2;
                        n.Activo = true;
                        n.IdUsuario_add = SecurityManager<EnUsuario>.User.IdUsuario;
                        n.Fecha_add = DateTime.Now;
                        n.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                        n.Fecha_upd = DateTime.Now;

                        context.Persona.Add(n);
                        context.SaveChanges();

                        dbtran.Commit();
                        //dbtran.Rollback();
                        respuesta.TipoRespuesta = 1;
                        respuesta.Mensaje = "Personal Agregado Satisfactoriamente";
                        respuesta.ValorDevolucion = n.IdPersona.ToString();
                        #endregion
                    }
                    else
                    {
                        #region Actualizar

                        var objDetalle = context.Persona.Where(x => x.IdPersona == detalle.IdPersona && x.Activo == true).SingleOrDefault();

                        if (objDetalle != null)
                        {
                            objDetalle.TipoDocumento = detalle.TipoDocumento;
                            objDetalle.NroDocumento = detalle.NroDocumento;
                            objDetalle.ApePaterno = detalle.ApePaterno;
                            objDetalle.ApeMaterno = detalle.ApeMaterno;
                            objDetalle.Nombres = detalle.Nombres;
                            objDetalle.Sexo = detalle.Sexo;
                            objDetalle.TipoSangre = detalle.TipoSangre;
                            objDetalle.FechaNacimiento = detalle.FechaNacimiento;
                            objDetalle.EstadoCivil = detalle.EstadoCivil;
                            objDetalle.UbigeoDireccion = detalle.UbigeoDireccion;
                            objDetalle.Direccion = detalle.Direccion;
                            objDetalle.Referencia = detalle.Referencia;
                            objDetalle.IdCargo = detalle.IdCargo;
                            objDetalle.IdNivelProfesional = detalle.IdNivelProfesional;
                            objDetalle.IdProfesion = detalle.IdProfesion;
                            objDetalle.Email1 = detalle.Email1;
                            objDetalle.Email2 = detalle.Email2;
                            objDetalle.Celular1 = detalle.Celular1;
                            objDetalle.Celular2 = detalle.Celular2;
                            objDetalle.Activo = true;
                            objDetalle.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                            objDetalle.Fecha_upd = DateTime.Now;

                            context.SaveChanges();

                            dbtran.Commit();
                            //dbtran.Rollback();
                            respuesta.TipoRespuesta = 1;
                            respuesta.Mensaje = "Personal Actualizado Satisfactoriamente";
                            respuesta.ValorDevolucion = objDetalle.IdPersona.ToString();

                        #endregion
                        }
                        else
                        {
                            respuesta.TipoRespuesta = 2;
                            respuesta.Mensaje = "No se pudo actualizar, actualice la pagina o verifique que el registro existe";
                            respuesta.ValorDevolucion = "";
                        }

                    }

                }
                catch (Exception ex)
                {
                    dbtran.Rollback();
                    respuesta.TipoRespuesta = 2;
                    respuesta.Mensaje = ex.ToString();
                    respuesta.ValorDevolucion = "";
                }
            }
            return respuesta;
        }
    }
}
