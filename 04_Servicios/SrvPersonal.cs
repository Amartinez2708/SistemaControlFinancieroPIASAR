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
                    model.NivelProfesional = data.IdNivelProfesional == null ? "" : data.NivelProfesional.NivelProfesional1;
                    model.IdProfesion = data.IdProfesion;
                    model.Profesion = data.IdProfesion == null ? "" : data.Profesion.Profesion1;
                    model.Email1 = data.Email1;
                    model.Email2 = data.Email2;
                    model.Celular1 = data.Celular1;
                    model.Celular2 = data.Celular2;

                    model.FechaNacimientoString = data.FechaNacimiento == null ? "" : Convert.ToDateTime(data.FechaNacimiento).ToString("dd/MM/yyyy");

                    var objContrato = context.Contrato.Where(x => x.IdPersona == model.IdPersona && x.Activo == true).OrderByDescending(a => a.Fecha_add).FirstOrDefault();

                    if (objContrato != null)
                    {
                        model.EstadoConsultoria = objContrato.Estado;
                        model.FechaFinConsultoria = Convert.ToDateTime(objContrato.FechaFin).ToString("dd/MM/yyyy");
                    }
                    else
                    {
                        model.EstadoConsultoria = "Sin Contrato";
                        model.FechaFinConsultoria = "";
                    }

                    

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
                        #region Agregar

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
                        n.IdNivelProfesional = detalle.IdNivelProfesional == 0 ? null: detalle.IdNivelProfesional;
                        n.IdProfesion = detalle.IdProfesion == 0 ? null : detalle.IdProfesion;
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
                            objDetalle.IdNivelProfesional = detalle.IdNivelProfesional == 0 ? null : detalle.IdNivelProfesional;
                            objDetalle.IdProfesion = detalle.IdProfesion == 0 ? null : detalle.IdProfesion;
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
        public EnPersona ListPersonalId(int Id)
        {
            EnPersona result = new EnPersona();

            var objDetalle = context.Persona.Where(x => x.IdPersona == Id && x.Activo == true).SingleOrDefault();

            var departamento = "";
            var Provincia = "";
            var Distrito = "";

            if (objDetalle.UbigeoDireccion!= "00")
            {
                departamento = context.Departamento.FirstOrDefault(x => x.cod_depa == objDetalle.UbigeoDireccion.Substring(0, 2)).nom_depa;
                Provincia = context.Provincia.FirstOrDefault(x => x.cod_depa == objDetalle.UbigeoDireccion.Substring(0, 2) && x.cod_prov == objDetalle.UbigeoDireccion.Substring(2, 2)).nom_prov;
                Distrito = context.Distrito.FirstOrDefault(x => x.cod_depa == objDetalle.UbigeoDireccion.Substring(0, 2) && x.cod_prov == objDetalle.UbigeoDireccion.Substring(2, 2) && x.cod_dist == objDetalle.UbigeoDireccion.Substring(4, 2)).nom_dist;
            }

            result.IdPersona = objDetalle.IdPersona;
            result.TipoDocumento = objDetalle.TipoDocumento;
            result.NroDocumento = objDetalle.NroDocumento;
            result.TipoNroDcto = "DNI - " + objDetalle.NroDocumento;
            result.ApePaterno = objDetalle.ApePaterno;
            result.ApeMaterno = objDetalle.ApeMaterno;
            result.Nombres = objDetalle.Nombres;
            result.Personal = objDetalle.ApePaterno + " " + objDetalle.ApeMaterno + ", " + objDetalle.Nombres;
            result.Sexo = objDetalle.Sexo;
            result.TipoSangre = objDetalle.TipoSangre;
            result.FechaNacimiento = objDetalle.FechaNacimiento;
            result.EstadoCivil = objDetalle.EstadoCivil;
            result.UbigeoDireccion = objDetalle.UbigeoDireccion;
            result.Direccion = objDetalle.Direccion;
            result.Referencia = objDetalle.Referencia;
            result.IdCargo = objDetalle.IdCargo == null ? 0 : objDetalle.IdCargo; 
            result.Cargo = objDetalle.Cargo.Cargo1 == null ? "" : objDetalle.Cargo.Cargo1;
            result.IdNivelProfesional = objDetalle.IdNivelProfesional == null ? 0 : objDetalle.IdNivelProfesional;
            result.NivelProfesional = objDetalle.IdNivelProfesional == null ? "" : objDetalle.NivelProfesional.NivelProfesional1;
            result.IdProfesion = objDetalle.IdProfesion == null ? 0 : objDetalle.IdProfesion;
            result.Profesion = objDetalle.IdProfesion == null ? "" : objDetalle.Profesion.Profesion1;
            result.Email1 = objDetalle.Email1;
            result.Email2 = objDetalle.Email2;
            result.Celular1 = objDetalle.Celular1;
            result.Celular2 = objDetalle.Celular2;
            result.DireccionContrato = objDetalle.Direccion + ", distrito de " + Distrito + ", provincia de " + Provincia + ", departamento de " + departamento;

            result.FechaNacimientoString = objDetalle.FechaNacimiento == null ? "" : Convert.ToDateTime(objDetalle.FechaNacimiento).ToString("dd/MM/yyyy");
            result.EstadoConsultoria = "";

            return result;
        }
        public EnRespuesta EliminarPersonal(int Id)
        {
            EnRespuesta respuesta = new EnRespuesta();
            using (var dbtran = context.Database.BeginTransaction())
            {
                try
                {
                    var objDetalle = context.Persona.Where(x => x.IdPersona == Id && x.Activo == true).SingleOrDefault();
                    if (objDetalle != null)
                    {
                        objDetalle.Activo = false;
                        objDetalle.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                        objDetalle.Fecha_upd = DateTime.Now;

                        context.SaveChanges();

                        dbtran.Commit();
                        //dbtran.Rollback();
                        respuesta.TipoRespuesta = 1;
                        respuesta.Mensaje = "Personal Eliminado Satisfactoriamente";
                        respuesta.ValorDevolucion = objDetalle.IdPersona.ToString();
                    }
                    else
                    {
                        respuesta.TipoRespuesta = 2;
                        respuesta.Mensaje = "No se pudo eliminar, actualice la pagina o verifique que el registro existe";
                        respuesta.ValorDevolucion = "";
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
        public List<EnContrato> ListPersonalContrato(int IdPersona)
        {
            List<EnContrato> result = new List<EnContrato>();

            var obj = context.Contrato.Where(x => x.IdPersona == IdPersona && x.Activo == true).ToList();
            if (obj != null && obj.Count() > 0)
            {
                foreach (var data in obj)
                {

                    EnContrato model = new EnContrato();
                    model.IdContrato = data.IdContrato;
                    model.IdPersona = data.IdPersona;
                    model.AnioContrato = data.AnioContrato;
                    model.NroContrato = data.NroContrato;
                    model.IdTipoContrato = data.IdTipoContrato;
                    model.IdCargo = data.IdCargo;
                    model.IdOficinaDependencia = data.IdOficinaDependencia;
                    model.EjecucionTrabajoSupervision = data.EjecucionTrabajoSupervision;
                    model.FechaInicio = data.FechaInicio;
                    model.FechaFin = data.FechaFin;
                    model.IdLugarPrestacionServicios = data.IdLugarPrestacionServicios;
                    model.MontoContrato = data.MontoContrato;
                    model.MontoMensual = data.MontoMensual;
                    model.FormaPago = data.FormaPago;
                    model.IdRepresentanteLegal = data.IdRepresentanteLegal;
                    model.Estado = data.Estado;

                    model.TipoContrato = data.IdTipoContrato == null ? "" : data.IdTipoContrato == 1 ? "Consultoria Individual" : "Selección Directa";
                    model.Cargo = data.Cargo.Cargo1;
                    model.OficinaDependencia = data.OficinaDependencia.OficinaDependencia1;
                    model.LugarPrestacionServicios = data.LugarPrestacionServicios.LugarPrestacionServicios1;
                    model.RepresentanteLegal = data.RepresentanteLegal.AbreviaturaProfesional + " " + data.RepresentanteLegal.Persona.Nombres + " " + data.RepresentanteLegal.Persona.ApePaterno +" "+ data.RepresentanteLegal.Persona.ApeMaterno;
                    model.FechaInicioString = data.FechaInicio == null ? "" : Convert.ToDateTime(data.FechaInicio).ToString("dd/MM/yyyy");
                    model.FechaFinString = data.FechaFin == null ? "" : Convert.ToDateTime(data.FechaFin).ToString("dd/MM/yyyy");

                    result.Add(model);
                }
            }
            return result.ToList();
        }
        public List<EnDropDownList> ddlOficinaDependencia()
        {
            List<EnDropDownList> result = new List<EnDropDownList>();

            var obj = context.OficinaDependencia.OrderBy(x => x.OficinaDependencia1);
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
                    values.id = data.IdOficinaDependencia;
                    values.text = data.OficinaDependencia1;
                    result.Add(values);
                }
            }
            return result;
        }
        public List<EnDropDownList> ddlLugarPrestacionServicios()
        {
            List<EnDropDownList> result = new List<EnDropDownList>();

            var obj = context.LugarPrestacionServicios.OrderBy(x => x.LugarPrestacionServicios1);
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
                    values.id = data.IdLugarPrestacionServicios;
                    values.text = data.LugarPrestacionServicios1;
                    result.Add(values);
                }
            }
            return result;
        }
        public List<EnDropDownList> ddlRepresentanteLegal()
        {
            List<EnDropDownList> result = new List<EnDropDownList>();

            var obj = context.RepresentanteLegal.ToList();
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
                    values.id = data.IdRepresentanteLegal;
                    values.text = data.AbreviaturaProfesional + " " + data.Persona.Nombres + " " + data.Persona.ApePaterno + " " + data.Persona.ApeMaterno;
                    result.Add(values);
                }
            }
            return result;
        }
        public EnRespuesta NroCorrelativo(string Tipo, string SubTipo)
        {
            EnRespuesta respuesta = new EnRespuesta();
            int Anio = DateTime.Now.Year;

            if (Tipo == "Contrato")
            {
                if(SubTipo == "Consultoria Individual")
                {
                    var obj = context.Contrato.Where(x => x.AnioContrato == Anio && x.IdTipoContrato == 1 && x.Activo == true).ToList();

                    if (obj != null)
                    {
                        respuesta.ValorDevolucion = (obj.Count() + 1).ToString("D3") + "-" + Anio.ToString();
                    }
                    else
                    {
                        respuesta.ValorDevolucion = "001-" + Anio.ToString();
                    }
                    
                }
                else
                {
                    var obj = context.Contrato.Where(x => x.AnioContrato == Anio && x.IdTipoContrato == 2 && x.Activo == true).ToList();

                    if (obj != null)
                    {
                        respuesta.ValorDevolucion = (obj.Count() + 1).ToString("D3") + "-" + Anio.ToString();
                    }
                    else
                    {
                        respuesta.ValorDevolucion = "001-" + Anio.ToString();
                    }
                }
            }
            else
            {
                //var obj = context.Contrato.Where(x => x.AnioContrato == Anio && x.IdTipoContrato == 2 && x.Activo == true).ToList();

                //if (obj != null)
                //{
                //    respuesta.ValorDevolucion = (obj.Count() + 1).ToString("D3") + "-" + Anio.ToString();
                //}
                //else
                //{
                //    respuesta.ValorDevolucion = "001-" + Anio.ToString();
                //}
            }
            
            return respuesta;
        }
        public EnRespuesta GuardarContrato(EnContrato detalle)
        {
            EnRespuesta respuesta = new EnRespuesta();
            int Anio = DateTime.Now.Year;
            DateTime FechaActual = DateTime.Now;
            using (var dbtran = context.Database.BeginTransaction())
            {
                try
                {
                    if (detalle.IdContrato == 0)
                    {
                        #region Agregar

                        var NroContrato = "";

                        var obj = context.Contrato.Where(x => x.AnioContrato == Anio && x.IdTipoContrato == detalle.IdTipoContrato && x.Activo == true).ToList();

                        if (obj != null)
                        {
                            NroContrato = (obj.Count() + 1).ToString("D3") + "-" + Anio.ToString();
                        }
                        else
                        {
                            NroContrato = "001-" + Anio.ToString();
                        }

                        Contrato n = new Contrato();
                        n.IdPersona = detalle.IdPersona;
                        n.AnioContrato = Anio;
                        n.NroContrato = detalle.NroContrato;
                        n.IdTipoContrato = detalle.IdTipoContrato;
                        n.IdCargo = detalle.IdCargo;
                        n.IdOficinaDependencia = detalle.IdOficinaDependencia;
                        n.EjecucionTrabajoSupervision = detalle.EjecucionTrabajoSupervision;
                        n.FechaInicio = detalle.FechaInicio;
                        n.FechaFin = detalle.FechaFin;
                        n.IdLugarPrestacionServicios = detalle.IdLugarPrestacionServicios;
                        n.MontoContrato = detalle.MontoContrato;
                        n.MontoMensual = 0;
                        n.FormaPago = detalle.FormaPago;
                        n.DireccionContrato = detalle.DireccionContrato;
                        n.IdRepresentanteLegal = detalle.IdRepresentanteLegal;

                        int result = DateTime.Compare(FechaActual, Convert.ToDateTime(n.FechaFin));

                        if (result < 0)
                            n.Estado = "Vigente";
                        else if (result == 0)
                            n.Estado = "Vigente";
                        else
                            n.Estado = "Concluido";

                        n.Activo = true;
                        n.IdUsuario_add = SecurityManager<EnUsuario>.User.IdUsuario;
                        n.Fecha_add = DateTime.Now;
                        n.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                        n.Fecha_upd = DateTime.Now;

                        context.Contrato.Add(n);
                        context.SaveChanges();

                        dbtran.Commit();
                        //dbtran.Rollback();
                        respuesta.TipoRespuesta = 1;
                        respuesta.Mensaje = "Contrato Agregado Satisfactoriamente con el N°"+ n.NroContrato;
                        respuesta.ValorDevolucion = n.NroContrato;
                        #endregion
                    }
                    else
                    {
                        #region Actualizar

                        var objDetalle = context.Contrato.Where(x => x.IdPersona == detalle.IdPersona && x.Activo == true).SingleOrDefault();

                        if (objDetalle != null)
                        {
                            objDetalle.IdPersona = detalle.IdPersona;
                            //objDetalle.AnioContrato = Anio;
                            objDetalle.NroContrato = detalle.NroContrato;
                            objDetalle.IdTipoContrato = detalle.IdTipoContrato;
                            objDetalle.IdCargo = detalle.IdCargo;
                            objDetalle.IdOficinaDependencia = detalle.IdOficinaDependencia;
                            objDetalle.EjecucionTrabajoSupervision = detalle.EjecucionTrabajoSupervision;
                            objDetalle.FechaInicio = detalle.FechaInicio;
                            objDetalle.FechaFin = detalle.FechaFin;
                            objDetalle.IdLugarPrestacionServicios = detalle.IdLugarPrestacionServicios;
                            objDetalle.MontoContrato = detalle.MontoContrato;
                            objDetalle.MontoMensual = 0;
                            objDetalle.IdRepresentanteLegal = detalle.IdRepresentanteLegal;

                            int result = DateTime.Compare(FechaActual, Convert.ToDateTime(objDetalle.FechaFin));

                            if (result < 0)
                                objDetalle.Estado = "Vigente";
                            else if (result == 0)
                                objDetalle.Estado = "Vigente";
                            else
                                objDetalle.Estado = "Concluido";

                            objDetalle.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                            objDetalle.Fecha_upd = DateTime.Now;

                            context.SaveChanges();

                            dbtran.Commit();
                            //dbtran.Rollback();
                            respuesta.TipoRespuesta = 1;
                            respuesta.Mensaje = "Contrato Actualizado Satisfactoriamente";
                            respuesta.ValorDevolucion = objDetalle.NroContrato;
                        }
                        else
                        {
                            respuesta.TipoRespuesta = 2;
                            respuesta.Mensaje = "No se pudo actualizar, actualice la pagina o verifique que el registro existe";
                            respuesta.ValorDevolucion = "";
                        }
                        #endregion
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
        public EnContrato ListContratoId(int IdContrato)
        {
            EnContrato result = new EnContrato();

            var obj = context.Contrato.Where(x => x.IdContrato == IdContrato && x.Activo == true).SingleOrDefault();
            if (obj != null)
            {
                result.IdContrato = obj.IdContrato;
                result.IdPersona = obj.IdPersona;
                result.DireccionContrato = obj.DireccionContrato;
                result.AnioContrato = obj.AnioContrato;
                result.NroContrato = obj.NroContrato;
                result.IdTipoContrato = obj.IdTipoContrato;
                result.IdCargo = obj.IdCargo;
                result.IdOficinaDependencia = obj.IdOficinaDependencia;
                result.EjecucionTrabajoSupervision = obj.EjecucionTrabajoSupervision;
                result.FechaInicio = obj.FechaInicio;
                result.FechaFin = obj.FechaFin;
                result.IdLugarPrestacionServicios = obj.IdLugarPrestacionServicios;
                result.MontoContrato = obj.MontoContrato;
                result.MontoMensual = obj.MontoMensual;
                result.FormaPago = obj.FormaPago;
                result.IdRepresentanteLegal = obj.IdRepresentanteLegal;
                result.Estado = obj.Estado;

                result.TipoContrato = obj.IdTipoContrato == null ? "" : obj.IdTipoContrato == 1 ? "Consultoria Individual" : "Selección Directa";
                result.Cargo = obj.Cargo.Cargo1;
                result.OficinaDependencia = obj.OficinaDependencia.OficinaDependencia1;
                result.LugarPrestacionServicios = obj.LugarPrestacionServicios.LugarPrestacionServicios1;
                result.RepresentanteLegal = obj.RepresentanteLegal.AbreviaturaProfesional + " " + obj.RepresentanteLegal.Persona.Nombres + " " + obj.RepresentanteLegal.Persona.ApePaterno + " " + obj.RepresentanteLegal.Persona.ApeMaterno;
                result.FechaInicioString = obj.FechaInicio == null ? "" : Convert.ToDateTime(obj.FechaInicio).ToString("dd/MM/yyyy");
                result.FechaFinString = obj.FechaFin == null ? "" : Convert.ToDateTime(obj.FechaFin).ToString("dd/MM/yyyy");
                result.Persona = obj.Persona.Nombres +" "+ obj.Persona.ApePaterno + " " + obj.Persona.ApeMaterno;
                result.PersonaDNI = obj.Persona.NroDocumento;

            }
            return result;
        }
        public EnRespuesta EliminarContrato(int Id)
        {
            EnRespuesta respuesta = new EnRespuesta();
            using (var dbtran = context.Database.BeginTransaction())
            {
                try
                {
                    var objDetalle = context.Contrato.Where(x => x.IdContrato == Id && x.Activo == true).SingleOrDefault();
                    if (objDetalle != null)
                    {
                        objDetalle.Activo = false;
                        objDetalle.IdUsuario_upd = SecurityManager<EnUsuario>.User.IdUsuario;
                        objDetalle.Fecha_upd = DateTime.Now;

                        context.SaveChanges();

                        dbtran.Commit();
                        //dbtran.Rollback();
                        respuesta.TipoRespuesta = 1;
                        respuesta.Mensaje = "Contrato " + objDetalle.NroContrato + " Eliminado Satisfactoriamente";
                        respuesta.ValorDevolucion = objDetalle.IdContrato.ToString();
                    }
                    else
                    {
                        respuesta.TipoRespuesta = 2;
                        respuesta.Mensaje = "No se pudo eliminar, actualice la pagina o verifique que el registro existe";
                        respuesta.ValorDevolucion = "";
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
        public List<EnPersonaFamilia> ListPersonalFamilia(int Id)
        {
            List<EnPersonaFamilia> result = new List<EnPersonaFamilia>();

            var obj = context.PersonaFamilia.Where(x => x.IdPersona == Id && x.Activo == true).ToList();
            if (obj != null && obj.Count() > 0)
            {
                foreach (var data in obj)
                {

                    EnPersonaFamilia model = new EnPersonaFamilia();
                    model.IdPersonaFamilia = data.IdPersonaFamilia;
                    model.IdPersona = data.IdPersona;
                    model.TipoFamiliar = data.TipoFamiliar;
                    model.TipoDocumento = data.TipoDocumento;
                    model.NroDocumento = data.NroDocumento;
                    model.TipoNroDcto = "DNI - " + data.NroDocumento;
                    model.ApePaterno = data.ApePaterno;
                    model.ApeMaterno = data.ApeMaterno;
                    model.Nombres = data.Nombres;
                    model.Personal = data.ApePaterno + " " + data.ApeMaterno + ", " + data.Nombres;
                    model.Sexo = data.Sexo;
                    model.TipoSangre = data.TipoSangre;
                    model.FechaNacimiento = data.FechaNacimiento;
                    model.UbigeoDireccion = data.UbigeoDireccion;
                    model.Direccion = data.Direccion;
                    model.Referencia = data.Referencia;
                    model.Celular1 = data.Celular1;
                    model.Celular2 = data.Celular2;
                    model.Emergencia = data.Emergencia;

                    model.FechaNacimientoString = data.FechaNacimiento == null ? "" : Convert.ToDateTime(data.FechaNacimiento).ToString("dd/MM/yyyy");


                    result.Add(model);
                }
            }
            return result.ToList();
        }
    }
}
