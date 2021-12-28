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
    public class SrvAlertaRegistro
    {
        BD_NucleosEjecutoresEntities context = new BD_NucleosEjecutoresEntities();

        public List<EnAlertaRegistro> ListProyectosAg30()
        {
            List<EnAlertaRegistro> result = new List<EnAlertaRegistro>();

            int[] ListCargo = { 8, 14 };
            List<int> ListIdPersonal = context.Personal.Where(x => ListCargo.Contains(x.cod_cargo)).Select(x => x.IdPersonal).ToList();
            List<int> ListIdUsuarios = context.USUARIO_SISTEMA.Where(x => ListIdPersonal.Contains(x.IDPERSONAL)).Select(x => x.IDUSUARIO).ToList();

            var objAg = context.Autorizacion_Gasto.Where(x => x.Proyecto.Cod_subprograma == 133 && x.Estado == 1 && x.Estado_documento == 1 && ListIdUsuarios.Contains(x.IdUsuario_add)).ToList();

            if (objAg != null)
            {
                DateTime f30 = DateTime.Now.AddDays(-30);
                var S30 = objAg.Where(x => x.Fecha_add > f30).ToList();

                if (S30 != null)
                {
                    foreach (var i in S30)
                    {
                        var departamento = context.Departamento.FirstOrDefault(x => x.cod_depa == i.Proyecto.IdUbigeo.Substring(0, 2)).nom_depa;
                        var Provincia = context.Provincia.FirstOrDefault(x => x.cod_depa == i.Proyecto.IdUbigeo.Substring(0, 2) && x.cod_prov == i.Proyecto.IdUbigeo.Substring(2, 2)).nom_prov;
                        var Distrito = context.Distrito.FirstOrDefault(x => x.cod_depa == i.Proyecto.IdUbigeo.Substring(0, 2) && x.cod_prov == i.Proyecto.IdUbigeo.Substring(2, 2) && x.cod_dist == i.Proyecto.IdUbigeo.Substring(4, 2)).nom_dist;

                        EnAlertaRegistro a = new EnAlertaRegistro();
                        a.CUI = i.Proyecto.CUI;
                        a.Departamento = departamento;
                        a.Provincia = Provincia;
                        a.Distrito = Distrito;
                        a.Localidad = i.Proyecto.Localidad;
                        a.Nro = i.Nro_autorizacion;
                        a.Fecha = Convert.ToDateTime(i.Fecha_add).ToString("dd/MM/yyyy hh:mm tt");
                        a.Monto = Convert.ToDecimal(i.Monto_autorizacion);
                        a.Liquidador = i.Proyecto.Liquidador;

                        result.Add(a);
                    }
                }
            }
            return result.ToList();
        }

        public List<EnAlertaRegistro> ListProyectosMg30()
        {
            List<EnAlertaRegistro> result = new List<EnAlertaRegistro>();

            int[] ListCargo = { 8, 14 };
            List<int> ListIdPersonal = context.Personal.Where(x => ListCargo.Contains(x.cod_cargo)).Select(x => x.IdPersonal).ToList();
            List<int> ListIdUsuarios = context.USUARIO_SISTEMA.Where(x => ListIdPersonal.Contains(x.IDPERSONAL)).Select(x => x.IDUSUARIO).ToList();

            var objMg = context.MANIFIESTO_GASTO.Where(x => x.Proyecto.Cod_subprograma == 133 && x.ESTADO == 1 && x.ESTADO_DOCUMENTO == 1 && ListIdUsuarios.Contains(x.IDUSUARIO_ADD)).ToList();

            if (objMg != null)
            {
                DateTime f30 = DateTime.Now.AddDays(-30);
                var S30 = objMg.Where(x => x.FECHA_ADD >= f30).ToList();

                if (S30 != null)
                {
                    foreach (var i in S30)
                    {
                        var departamento = context.Departamento.FirstOrDefault(x => x.cod_depa == i.Proyecto.IdUbigeo.Substring(0, 2)).nom_depa;
                        var Provincia = context.Provincia.FirstOrDefault(x => x.cod_depa == i.Proyecto.IdUbigeo.Substring(0, 2) && x.cod_prov == i.Proyecto.IdUbigeo.Substring(2, 2)).nom_prov;
                        var Distrito = context.Distrito.FirstOrDefault(x => x.cod_depa == i.Proyecto.IdUbigeo.Substring(0, 2) && x.cod_prov == i.Proyecto.IdUbigeo.Substring(2, 2) && x.cod_dist == i.Proyecto.IdUbigeo.Substring(4, 2)).nom_dist;

                        EnAlertaRegistro a = new EnAlertaRegistro();
                        a.CUI = i.Proyecto.CUI;
                        a.Departamento = departamento;
                        a.Provincia = Provincia;
                        a.Distrito = Distrito;
                        a.Localidad = i.Proyecto.Localidad;
                        a.Nro = i.NRO_MANIFIESTO;
                        a.Fecha = Convert.ToDateTime(i.FECHA_ADD).ToString("dd/MM/yyyy hh:mm tt");
                        a.Monto = Convert.ToDecimal(i.MONTO_MANIFIESTO);
                        a.Liquidador = i.Proyecto.Liquidador;

                        result.Add(a);
                    }
                }
            }
            return result.ToList();
        }

        public List<EnAlertaRegistro> ListProyectosAg3090()
        {
            List<EnAlertaRegistro> result = new List<EnAlertaRegistro>();

            int[] ListCargo = { 8, 14 };
            List<int> ListIdPersonal = context.Personal.Where(x => ListCargo.Contains(x.cod_cargo)).Select(x => x.IdPersonal).ToList();
            List<int> ListIdUsuarios = context.USUARIO_SISTEMA.Where(x => ListIdPersonal.Contains(x.IDPERSONAL)).Select(x => x.IDUSUARIO).ToList();

            var objAg = context.Autorizacion_Gasto.Where(x => x.Proyecto.Cod_subprograma == 133 && x.Estado == 1 && x.Estado_documento == 1 && ListIdUsuarios.Contains(x.IdUsuario_add)).ToList();

            if (objAg != null)
            {
                DateTime f30 = DateTime.Now.AddDays(-30);
                DateTime f90 = DateTime.Now.AddDays(-90);
                var S30 = objAg.Where(x => x.Fecha_add > f90 && x.Fecha_add < f30).ToList();

                if (S30 != null)
                {
                    foreach (var i in S30)
                    {
                        var departamento = context.Departamento.FirstOrDefault(x => x.cod_depa == i.Proyecto.IdUbigeo.Substring(0, 2)).nom_depa;
                        var Provincia = context.Provincia.FirstOrDefault(x => x.cod_depa == i.Proyecto.IdUbigeo.Substring(0, 2) && x.cod_prov == i.Proyecto.IdUbigeo.Substring(2, 2)).nom_prov;
                        var Distrito = context.Distrito.FirstOrDefault(x => x.cod_depa == i.Proyecto.IdUbigeo.Substring(0, 2) && x.cod_prov == i.Proyecto.IdUbigeo.Substring(2, 2) && x.cod_dist == i.Proyecto.IdUbigeo.Substring(4, 2)).nom_dist;

                        EnAlertaRegistro a = new EnAlertaRegistro();
                        a.CUI = i.Proyecto.CUI;
                        a.Departamento = departamento;
                        a.Provincia = Provincia;
                        a.Distrito = Distrito;
                        a.Localidad = i.Proyecto.Localidad;
                        a.Nro = i.Nro_autorizacion;
                        a.Fecha = Convert.ToDateTime(i.Fecha_add).ToString("dd/MM/yyyy hh:mm tt");
                        a.Monto = Convert.ToDecimal(i.Monto_autorizacion);
                        a.Liquidador = i.Proyecto.Liquidador;

                        result.Add(a);
                    }
                }
            }
            return result.ToList();
        }

        public List<EnAlertaRegistro> ListProyectosMg3090()
        {
            List<EnAlertaRegistro> result = new List<EnAlertaRegistro>();

            int[] ListCargo = { 8, 14 };
            List<int> ListIdPersonal = context.Personal.Where(x => ListCargo.Contains(x.cod_cargo)).Select(x => x.IdPersonal).ToList();
            List<int> ListIdUsuarios = context.USUARIO_SISTEMA.Where(x => ListIdPersonal.Contains(x.IDPERSONAL)).Select(x => x.IDUSUARIO).ToList();

            var objMg = context.MANIFIESTO_GASTO.Where(x => x.Proyecto.Cod_subprograma == 133 && x.ESTADO == 1 && x.ESTADO_DOCUMENTO == 1 && ListIdUsuarios.Contains(x.IDUSUARIO_ADD)).ToList();

            if (objMg != null)
            {
                DateTime f30 = DateTime.Now.AddDays(-30);
                DateTime f90 = DateTime.Now.AddDays(-90);
                var S30 = objMg.Where(x => x.FECHA_ADD > f90 && x.FECHA_ADD < f30).ToList();

                if (S30 != null)
                {
                    foreach (var i in S30)
                    {
                        var departamento = context.Departamento.FirstOrDefault(x => x.cod_depa == i.Proyecto.IdUbigeo.Substring(0, 2)).nom_depa;
                        var Provincia = context.Provincia.FirstOrDefault(x => x.cod_depa == i.Proyecto.IdUbigeo.Substring(0, 2) && x.cod_prov == i.Proyecto.IdUbigeo.Substring(2, 2)).nom_prov;
                        var Distrito = context.Distrito.FirstOrDefault(x => x.cod_depa == i.Proyecto.IdUbigeo.Substring(0, 2) && x.cod_prov == i.Proyecto.IdUbigeo.Substring(2, 2) && x.cod_dist == i.Proyecto.IdUbigeo.Substring(4, 2)).nom_dist;

                        EnAlertaRegistro a = new EnAlertaRegistro();
                        a.CUI = i.Proyecto.CUI;
                        a.Departamento = departamento;
                        a.Provincia = Provincia;
                        a.Distrito = Distrito;
                        a.Localidad = i.Proyecto.Localidad;
                        a.Nro = i.NRO_MANIFIESTO;
                        a.Fecha = Convert.ToDateTime(i.FECHA_ADD).ToString("dd/MM/yyyy hh:mm tt");
                        a.Monto = Convert.ToDecimal(i.MONTO_MANIFIESTO);
                        a.Liquidador = i.Proyecto.Liquidador;

                        result.Add(a);
                    }
                }
            }
            return result.ToList();
        }

        public List<EnAlertaRegistro> ListProyectosAg90()
        {
            List<EnAlertaRegistro> result = new List<EnAlertaRegistro>();

            int[] ListCargo = { 8, 14 };
            List<int> ListIdPersonal = context.Personal.Where(x => ListCargo.Contains(x.cod_cargo)).Select(x => x.IdPersonal).ToList();
            List<int> ListIdUsuarios = context.USUARIO_SISTEMA.Where(x => ListIdPersonal.Contains(x.IDPERSONAL)).Select(x => x.IDUSUARIO).ToList();

            var objAg = context.Autorizacion_Gasto.Where(x => x.Proyecto.Cod_subprograma == 133 && x.Estado == 1 && x.Estado_documento == 1 && ListIdUsuarios.Contains(x.IdUsuario_add)).ToList();

            if (objAg != null)
            {
                DateTime f90 = DateTime.Now.AddDays(-90);
                var S30 = objAg.Where(x => x.Fecha_add < f90).ToList();

                if (S30 != null)
                {
                    foreach (var i in S30)
                    {
                        var departamento = context.Departamento.FirstOrDefault(x => x.cod_depa == i.Proyecto.IdUbigeo.Substring(0, 2)).nom_depa;
                        var Provincia = context.Provincia.FirstOrDefault(x => x.cod_depa == i.Proyecto.IdUbigeo.Substring(0, 2) && x.cod_prov == i.Proyecto.IdUbigeo.Substring(2, 2)).nom_prov;
                        var Distrito = context.Distrito.FirstOrDefault(x => x.cod_depa == i.Proyecto.IdUbigeo.Substring(0, 2) && x.cod_prov == i.Proyecto.IdUbigeo.Substring(2, 2) && x.cod_dist == i.Proyecto.IdUbigeo.Substring(4, 2)).nom_dist;

                        EnAlertaRegistro a = new EnAlertaRegistro();
                        a.CUI = i.Proyecto.CUI;
                        a.Departamento = departamento;
                        a.Provincia = Provincia;
                        a.Distrito = Distrito;
                        a.Localidad = i.Proyecto.Localidad;
                        a.Nro = i.Nro_autorizacion;
                        a.Fecha = Convert.ToDateTime(i.Fecha_add).ToString("dd/MM/yyyy hh:mm tt");
                        a.Monto = Convert.ToDecimal(i.Monto_autorizacion);
                        a.Liquidador = i.Proyecto.Liquidador;

                        result.Add(a);
                    }
                }
            }
            return result.ToList();
        }

        public List<EnAlertaRegistro> ListProyectosMg90()
        {
            List<EnAlertaRegistro> result = new List<EnAlertaRegistro>();

            int[] ListCargo = { 8, 14 };
            List<int> ListIdPersonal = context.Personal.Where(x => ListCargo.Contains(x.cod_cargo)).Select(x => x.IdPersonal).ToList();
            List<int> ListIdUsuarios = context.USUARIO_SISTEMA.Where(x => ListIdPersonal.Contains(x.IDPERSONAL)).Select(x => x.IDUSUARIO).ToList();

            var objMg = context.MANIFIESTO_GASTO.Where(x => x.Proyecto.Cod_subprograma == 133 && x.ESTADO == 1 && x.ESTADO_DOCUMENTO == 1 && ListIdUsuarios.Contains(x.IDUSUARIO_ADD)).ToList();

            if (objMg != null)
            {
                DateTime f90 = DateTime.Now.AddDays(-90);
                var S30 = objMg.Where(x => x.FECHA_ADD < f90).ToList();

                if (S30 != null)
                {
                    foreach (var i in S30)
                    {
                        var departamento = context.Departamento.FirstOrDefault(x => x.cod_depa == i.Proyecto.IdUbigeo.Substring(0, 2)).nom_depa;
                        var Provincia = context.Provincia.FirstOrDefault(x => x.cod_depa == i.Proyecto.IdUbigeo.Substring(0, 2) && x.cod_prov == i.Proyecto.IdUbigeo.Substring(2, 2)).nom_prov;
                        var Distrito = context.Distrito.FirstOrDefault(x => x.cod_depa == i.Proyecto.IdUbigeo.Substring(0, 2) && x.cod_prov == i.Proyecto.IdUbigeo.Substring(2, 2) && x.cod_dist == i.Proyecto.IdUbigeo.Substring(4, 2)).nom_dist;

                        EnAlertaRegistro a = new EnAlertaRegistro();
                        a.CUI = i.Proyecto.CUI;
                        a.Departamento = departamento;
                        a.Provincia = Provincia;
                        a.Distrito = Distrito;
                        a.Localidad = i.Proyecto.Localidad;
                        a.Nro = i.NRO_MANIFIESTO;
                        a.Fecha = Convert.ToDateTime(i.FECHA_ADD).ToString("dd/MM/yyyy hh:mm tt");
                        a.Monto = Convert.ToDecimal(i.MONTO_MANIFIESTO);
                        a.Liquidador = i.Proyecto.Liquidador;

                        result.Add(a);
                    }
                }
            }
            return result.ToList();
        }

        public List<EnAlertaRegistro> ListLiquidadores(string FechaIni, string FechaFin)
        {
            List<EnAlertaRegistro> result = new List<EnAlertaRegistro>();
            //20211119
            var dia = FechaIni.Substring(6, 2);
            var mes = FechaIni.Substring(4, 2);
            var anio = FechaIni.Substring(0, 4);

            DateTime FechaInicial = Convert.ToDateTime(dia + "/" + mes + "/" + anio +" 00:00:00");

            var dia2 = FechaFin.Substring(6, 2);
            var mes2 = FechaFin.Substring(4, 2);
            var anio2 = FechaFin.Substring(0, 4);

            DateTime FechaFinal = Convert.ToDateTime(dia2 + "/" + mes2 + "/" + anio2 + " 23:59:59");

            int[] ListCargo = { 147 };
            List<int> ListIdPersonal = context.Personal.Where(x => ListCargo.Contains(x.cod_cargo)).Select(x => x.IdPersonal).ToList();
            List<int> ListIdUsuarios = context.USUARIO_SISTEMA.Where(x => ListIdPersonal.Contains(x.IDPERSONAL)).Select(x => x.IDUSUARIO).ToList();

            var objAg = context.Autorizacion_Gasto.Where(x => x.Proyecto.Cod_subprograma == 133 && x.Estado == 1 && ListIdUsuarios.Contains(x.IdUsuario_upd) && (x.Fecha_upd >= FechaInicial && x.Fecha_upd<= FechaFinal)).ToList();

            if (objAg != null)
            {
                foreach (var i in objAg)
                {
                    var departamento = context.Departamento.FirstOrDefault(x => x.cod_depa == i.Proyecto.IdUbigeo.Substring(0, 2)).nom_depa;
                    var Provincia = context.Provincia.FirstOrDefault(x => x.cod_depa == i.Proyecto.IdUbigeo.Substring(0, 2) && x.cod_prov == i.Proyecto.IdUbigeo.Substring(2, 2)).nom_prov;
                    var Distrito = context.Distrito.FirstOrDefault(x => x.cod_depa == i.Proyecto.IdUbigeo.Substring(0, 2) && x.cod_prov == i.Proyecto.IdUbigeo.Substring(2, 2) && x.cod_dist == i.Proyecto.IdUbigeo.Substring(4, 2)).nom_dist;

                    EnAlertaRegistro a = new EnAlertaRegistro();
                    a.CUI = i.Proyecto.CUI;
                    a.Departamento = departamento;
                    a.Provincia = Provincia;
                    a.Distrito = Distrito;
                    a.Localidad = i.Proyecto.Localidad;
                    a.Nro = i.Nro_autorizacion;
                    a.Fecha = Convert.ToDateTime(i.Fecha_upd).ToString("dd/MM/yyyy hh:mm tt");
                    a.Monto = Convert.ToDecimal(i.Monto_autorizacion);
                    a.Liquidador = i.Proyecto.Liquidador;
                    a.TipoSolicitud = "Autorización";

                    result.Add(a);
                }
            }

            var objMg = context.MANIFIESTO_GASTO.Where(x => x.Proyecto.Cod_subprograma == 133 && x.ESTADO == 1 && ListIdUsuarios.Contains(x.IDUSUARIO_UPD) && (x.FECHA_UPD >= FechaInicial && x.FECHA_UPD <= FechaFinal)).ToList();

            if (objMg != null)
            {
                foreach (var i in objMg)
                {
                    var departamento = context.Departamento.FirstOrDefault(x => x.cod_depa == i.Proyecto.IdUbigeo.Substring(0, 2)).nom_depa;
                    var Provincia = context.Provincia.FirstOrDefault(x => x.cod_depa == i.Proyecto.IdUbigeo.Substring(0, 2) && x.cod_prov == i.Proyecto.IdUbigeo.Substring(2, 2)).nom_prov;
                    var Distrito = context.Distrito.FirstOrDefault(x => x.cod_depa == i.Proyecto.IdUbigeo.Substring(0, 2) && x.cod_prov == i.Proyecto.IdUbigeo.Substring(2, 2) && x.cod_dist == i.Proyecto.IdUbigeo.Substring(4, 2)).nom_dist;

                    EnAlertaRegistro a = new EnAlertaRegistro();
                    a.CUI = i.Proyecto.CUI;
                    a.Departamento = departamento;
                    a.Provincia = Provincia;
                    a.Distrito = Distrito;
                    a.Localidad = i.Proyecto.Localidad;
                    a.Nro = i.NRO_MANIFIESTO;
                    a.Fecha = Convert.ToDateTime(i.FECHA_UPD).ToString("dd/MM/yyyy hh:mm tt");
                    a.Monto = Convert.ToDecimal(i.MONTO_MANIFIESTO);
                    a.Liquidador = i.Proyecto.Liquidador;
                    a.TipoSolicitud = "Rendición";

                    result.Add(a);
                }
            }


            return result.ToList();
        }
    }
}
