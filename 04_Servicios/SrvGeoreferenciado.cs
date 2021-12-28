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
    public class SrvGeoreferenciado
    {
        BD_NucleosEjecutoresEntities context = new BD_NucleosEjecutoresEntities();
        public List<EnDropDowList> ddlDepartamento()
        {
            List<EnDropDowList> result = new List<EnDropDowList>();

            var obj = context.Departamento.OrderBy(x => x.nom_depa);
            if (obj != null && obj.Count() > 0)
            {
                EnDropDowList unidad = new EnDropDowList();
                unidad.IdText = "00";
                unidad.Text = "[--Todos--]";
                result.Add(unidad);

                EnDropDowList values;
                foreach (var data in obj)
                {
                    values = new EnDropDowList();
                    values.IdText = data.cod_depa;
                    values.Text = data.nom_depa;
                    result.Add(values);
                }
            }
            return result;
        }
        public List<EnDropDowList> ddlProvincia(string IdDepartamento)
        {
            List<EnDropDowList> result = new List<EnDropDowList>();

            var obj = context.Provincia.Where(x => x.cod_depa == IdDepartamento).OrderBy(x => x.nom_prov);
            if (obj != null && obj.Count() > 0)
            {
                EnDropDowList unidad = new EnDropDowList();
                unidad.IdText = "00";
                unidad.Text = "[--Todos--]";
                result.Add(unidad);

                EnDropDowList values;
                foreach (var data in obj)
                {
                    values = new EnDropDowList();
                    values.IdText = data.cod_prov;
                    values.Text = data.nom_prov;
                    result.Add(values);
                }
            }
            return result;
        }
        public List<EnDropDowList> ddlDistrito(string DepartamentoProvincia)
        {
            var Departamento = DepartamentoProvincia.Substring(0, 2);
            var Provincia = DepartamentoProvincia.Substring(2, 2);

            List<EnDropDowList> result = new List<EnDropDowList>();

            var obj = context.Distrito.Where(x => x.cod_depa == Departamento && x.cod_prov == Provincia).OrderBy(x => x.nom_dist);
            if (obj != null && obj.Count() > 0)
            {
                EnDropDowList unidad = new EnDropDowList();
                unidad.IdText = "00";
                unidad.Text = "[--Todos--]";
                result.Add(unidad);

                EnDropDowList values;
                foreach (var data in obj)
                {
                    values = new EnDropDowList();
                    values.IdText = data.cod_dist;
                    values.Text = data.nom_dist;
                    result.Add(values);
                }
            }
            return result;
        }
        public List<EnDropDowList> ddlCentroPoblado(string DepartamentoProvinciaDistrito)
        {
            var Departamento = DepartamentoProvinciaDistrito.Substring(0, 2);
            var Provincia = DepartamentoProvinciaDistrito.Substring(2, 2);
            var Distrito = DepartamentoProvinciaDistrito.Substring(4, 2);

            List<EnDropDowList> result = new List<EnDropDowList>();

            var obj = context.CentroPoblado.Where(x => x.cod_dist == DepartamentoProvinciaDistrito).OrderBy(x => x.nom_ccpp);
            if (obj != null && obj.Count() > 0)
            {
                EnDropDowList unidad = new EnDropDowList();
                unidad.IdText = "0000";
                unidad.Text = "[--Todos--]";
                result.Add(unidad);

                EnDropDowList values;
                foreach (var data in obj)
                {
                    values = new EnDropDowList();
                    values.IdText = data.cod_ccpp;
                    values.Text = data.nom_ccpp;
                    result.Add(values);
                }
            }
            return result;
        }
        public List<EnListDepa> ListDepartamento(int mod)
        {
            List<EnListDepa> result = new List<EnListDepa>();

            var obj = context.Proyecto.Where(x => (mod == 0 || x.Cod_modalidad == mod) && x.Cod_subprograma==133 && x.Estado==1).ToList();
            if (obj != null)
            {
                
                var objDep = context.Departamento.ToList();
                
                foreach(var dep in objDep)
                {
                    EnListDepa objeto = new EnListDepa();
                    objeto.cod_depa = dep.cod_depa;
                    objeto.Region = dep.nom_depa;
                    objeto.NroProyectos = obj.Where(x=> x.IdUbigeo.Substring(0, 2)==dep.cod_depa).Count();
                    objeto.CostoInversion = Convert.ToDecimal(obj.Where(x => x.IdUbigeo.Substring(0, 2) == dep.cod_depa).Sum(x => x.Mto_proyecto));
                    objeto.TotalAutorizacion = Convert.ToDecimal(obj.Where(x => x.IdUbigeo.Substring(0, 2) == dep.cod_depa).Sum(x => x.Monto_acumulado_autorizacion));
                    objeto.TotalManifiesto = Convert.ToDecimal(obj.Where(x => x.IdUbigeo.Substring(0, 2) == dep.cod_depa).Sum(x => x.Monto_acumulado_manifiesto_gasto));
                    result.Add(objeto);
                }
            }

            return result;
        }
        public List<EnListProv> ListProv(string dep, int mod)
        {
            List<EnListProv> result = new List<EnListProv>();

            var obj = context.Proyecto.Where(x => x.IdUbigeo.Substring(0, 2) == dep && (mod == 0 || x.Cod_modalidad == mod) && x.Cod_subprograma == 133 && x.Estado == 1).ToList();

            if (obj != null)
            {
                var objProv = context.Provincia.Where(x => x.cod_depa == dep).ToList();
                foreach (var prov in objProv)
                {
                    EnListProv objeto = new EnListProv();
                    objeto.cod_depa = prov.cod_depa;
                    objeto.cod_prov = prov.cod_prov;
                    objeto.Provincia = prov.nom_prov;
                    objeto.NroProyectos = obj.Where(x => x.IdUbigeo.Substring(2, 2) == prov.cod_prov).Count();
                    objeto.CostoInversion = Convert.ToDecimal(obj.Where(x => x.IdUbigeo.Substring(2, 2) == prov.cod_prov).Sum(x => x.Mto_proyecto));
                    objeto.TotalAutorizacion = Convert.ToDecimal(obj.Where(x => x.IdUbigeo.Substring(2, 2) == prov.cod_prov).Sum(x => x.Monto_acumulado_autorizacion));
                    objeto.TotalManifiesto = Convert.ToDecimal(obj.Where(x => x.IdUbigeo.Substring(2, 2) == prov.cod_prov).Sum(x => x.Monto_acumulado_manifiesto_gasto));
                    result.Add(objeto);
                }
            }

            return result;
        }
        public List<EnListDist> ListDist(string dep, string prov, int mod)
        {
            List<EnListDist> result = new List<EnListDist>();

            var obj = context.Proyecto.Where(x => x.IdUbigeo.Substring(0, 2) == dep && x.IdUbigeo.Substring(2, 2) == prov && (mod == 0 || x.Cod_modalidad == mod) && x.Cod_subprograma == 133 && x.Estado == 1).ToList();

            if (obj != null)
            {
                var objDist = context.Distrito.Where(x => x.cod_depa == dep && x.cod_prov == prov).ToList();
                foreach (var dist in objDist)
                {
                    EnListDist objeto = new EnListDist();
                    objeto.cod_depa = dist.cod_depa;
                    objeto.cod_prov = dist.cod_prov;
                    objeto.cod_dist = dist.cod_dist;
                    objeto.Distrito = dist.nom_dist;
                    objeto.NroProyectos = obj.Where(x => x.IdUbigeo.Substring(4, 2) == dist.cod_dist).Count();
                    objeto.CostoInversion = Convert.ToDecimal(obj.Where(x => x.IdUbigeo.Substring(4, 2) == dist.cod_dist).Sum(x => x.Mto_proyecto));
                    objeto.TotalAutorizacion = Convert.ToDecimal(obj.Where(x => x.IdUbigeo.Substring(4, 2) == dist.cod_dist).Sum(x => x.Monto_acumulado_autorizacion));
                    objeto.TotalManifiesto = Convert.ToDecimal(obj.Where(x => x.IdUbigeo.Substring(4, 2) == dist.cod_dist).Sum(x => x.Monto_acumulado_manifiesto_gasto));
                    result.Add(objeto);
                }
            }

            return result;
        }
        public List<EnProyecto> ListDistritoUnico(string dep, string prov, string dist, int mod)
        {
            List<EnProyecto> result = new List<EnProyecto>();

            var obj = context.Proyecto.Where(x => x.IdUbigeo.Substring(0, 2) == dep && x.IdUbigeo.Substring(2, 2) == prov && (dist == "00" || x.IdUbigeo.Substring(4, 2) == dist) && (mod == 0 || x.Cod_modalidad == mod)  && x.Cod_subprograma == 133 && x.Estado == 1).ToList();

            //var obj = context.ListDist.FirstOrDefault(x => x.cod_depa == dep && x.cod_prov == prov && x.cod_dist == dist);
            if (obj != null)
            {
                foreach (var proyecto in obj)
                {
                    var departamento = context.Departamento.FirstOrDefault(x => x.cod_depa == proyecto.IdUbigeo.Substring(0, 2)).nom_depa;
                    var Provincia = context.Provincia.FirstOrDefault(x => x.cod_depa == proyecto.IdUbigeo.Substring(0, 2) && x.cod_prov == proyecto.IdUbigeo.Substring(2, 2)).nom_prov;
                    var Distrito = context.Distrito.FirstOrDefault(x => x.cod_depa == proyecto.IdUbigeo.Substring(0, 2) && x.cod_prov == proyecto.IdUbigeo.Substring(2, 2) && x.cod_dist == proyecto.IdUbigeo.Substring(4, 2)).nom_dist;

                    EnProyecto proy = new EnProyecto();
                    proy.IdProyecto = proyecto.IdProyecto;
                    proy.Snip = proyecto.Snip;
                    proy.CUI = proyecto.CUI;
                    proy.Cod_modalidad = proyecto.Cod_modalidad;
                    proy.IdUbigeo = proyecto.IdUbigeo;
                    proy.Departamento = departamento;
                    proy.Provincia = Provincia;
                    proy.Distrito = Distrito;
                    proy.Nom_proyecto = proyecto.Nom_proyecto;
                    proy.Localidad = proyecto.Localidad;
                    proy.Mto_proyecto = proyecto.Mto_proyecto;
                    proy.Nro_beneficiarios_et = proyecto.Nro_beneficiarios_et;
                    proy.Fecha_inicio_programado_string = proyecto.Fecha_inicio_programado == null ? "" : Convert.ToDateTime(proyecto.Fecha_inicio_programado).ToString("dd/MM/yyyy HH:mm");
                    proy.Fecha_inicio_real_string = proyecto.Fecha_inicio_real == null ? "" : Convert.ToDateTime(proyecto.Fecha_inicio_real).ToString("dd/MM/yyyy HH:mm");
                    proy.Fecha_fin_programado_string = proyecto.Fecha_fin_programado == null ? "" : Convert.ToDateTime(proyecto.Fecha_fin_programado).ToString("dd/MM/yyyy HH:mm");
                    proy.Fecha_fin_real_string = proyecto.Fecha_fin_real == null ? "" : Convert.ToDateTime(proyecto.Fecha_fin_real).ToString("dd/MM/yyyy HH:mm");
                    proy.Nro_conexiones_agua_et = proyecto.Nro_conexiones_agua_et;
                    proy.Nro_conexiones_saneamiento_et = proyecto.Nro_conexiones_saneamiento_et;
                    proy.Monto_acumulado_autorizacion = proyecto.Monto_acumulado_autorizacion;
                    proy.Monto_acumulado_manifiesto_gasto = proyecto.Monto_acumulado_manifiesto_gasto;
                    proy.SNIPNombreProyecto = proyecto.CUI + " " + proyecto.Snip + " " + proyecto.Nom_proyecto;
                    proy.MontoDesembolso = proyecto.MontoDesembolso;
                    proy.Latitud = proyecto.Latitud;
                    proy.Longitud = proyecto.Longitud;
                    result.Add(proy);
                }
                //var objDist = context.Distrito.FirstOrDefault(x => x.cod_depa == dep && x.cod_prov == prov && x.cod_dist== dist);

                //result.cod_depa = objDist.cod_depa;
                //result.cod_prov = objDist.cod_prov;
                //result.cod_dist = objDist.cod_dist;
                //result.Distrito = objDist.nom_dist;
                //result.NroProyectos = obj.Count();
                //result.CostoInversion = Convert.ToDecimal(obj.Sum(x => x.Mto_proyecto));
                //result.TotalAutorizacion = Convert.ToDecimal(obj.Sum(x => x.Monto_acumulado_autorizacion));
                //result.TotalManifiesto = Convert.ToDecimal(obj.Sum(x => x.Monto_acumulado_manifiesto_gasto));
            }

            return result;
        }
        public ReporteObras ListReporteObra(string cod_dep, string cod_prov, string cod_dist, int mod)
        {
            ReporteObras result = new ReporteObras();
            var obj = context.Proyecto.Where(x => x.Cod_subprograma == 133 && (cod_dep == "00" || x.IdUbigeo.Substring(0, 2) == cod_dep) && (cod_prov == "00" || x.IdUbigeo.Substring(2, 2) == cod_prov) && (cod_dist == "00" || x.IdUbigeo.Substring(4, 2) == cod_dist) && (mod == 0 || x.Cod_modalidad == mod)).ToList();
            if (obj != null && obj.Count() > 0)
            {
                List<int> ListProyectos = context.Proyecto.Where(x => x.Cod_subprograma == 133 && (cod_dep == "00" || x.IdUbigeo.Substring(0, 2) == cod_dep) && (cod_prov == "00" || x.IdUbigeo.Substring(2, 2) == cod_prov) && (cod_dist == "00" || x.IdUbigeo.Substring(4, 2) == cod_dist) && (mod == 0 || x.Cod_modalidad == mod)).Select(x => x.IdProyecto).ToList();
                var departamento = cod_dep == "00" ? "PERÚ" : context.Departamento.FirstOrDefault(x => x.cod_depa == cod_dep).nom_depa;
                var Provincia = cod_prov == "00" ? "" : "<br/>>" + context.Provincia.FirstOrDefault(x => x.cod_depa == cod_dep && x.cod_prov == cod_prov).nom_prov;
                var Distrito = cod_dist == "00" ? "" : "<br/>>" + context.Distrito.FirstOrDefault(x => x.cod_depa == cod_dep && x.cod_prov == cod_prov && x.cod_dist == cod_dist).nom_dist;
     

                result.UbicacionGeografica = departamento + Provincia + Distrito;
                result.NroTotalObras = obj.Count();
                result.CostoTotalObras = Convert.ToDecimal(context.Proyecto.Where(x => ListProyectos.Contains(x.IdProyecto)).Sum(x => x.Mto_proyecto));
                result.NroTotalBeneficiarios = obj.Sum(x => x.Nro_beneficiarios_et);
                result.NroTotalConexionesAguas = obj.Sum(x => x.Nro_conexiones_agua_et);
                result.NroTotalConexionesSaneamiento = obj.Sum(x => x.Nro_conexiones_saneamiento_et);
                result.MontoTotalAutorizaciones = Convert.ToDecimal(context.Autorizacion_Gasto.Where(x => ListProyectos.Contains(x.IdProyecto) && x.Estado_documento == 23 && x.Estado == 1).Sum(x => x.Monto_autorizacion));
                result.MontoTotalManifiestos = Convert.ToDecimal(context.MANIFIESTO_GASTO.Where(x =>ListProyectos.Contains(x.IDPROYECTO) && x.ESTADO_DOCUMENTO == 23 && x.ESTADO == 1).Sum(x => x.MONTO_MANIFIESTO));
                result.MontoDesembolsado = Convert.ToDecimal(context.Proyecto.Where(x => ListProyectos.Contains(x.IdProyecto)).Sum(x => x.MontoDesembolso));
                if (result.MontoDesembolsado == 0) { result.PorcentajeJustificado = 0; } else
                {
                    result.PorcentajeJustificado = (result.MontoTotalManifiestos / result.MontoDesembolsado) * 100;
                }
                
            }
            return result;
        }
        public List<EnProyecto> ListProyectosBusqueda(string search)
        {
            List<EnProyecto> result = new List<EnProyecto>();

            var obj = context.Proyecto.Where(x => x.Cod_subprograma==133 && x.Estado==1).ToList();
            if (obj != null && obj.Count() > 0)
            {
                EnProyecto values;
                foreach (Proyecto data in obj)
                {
                    var departamento = context.Departamento.FirstOrDefault(x => x.cod_depa == data.IdUbigeo.Substring(0, 2)).nom_depa;
                    var Provincia = context.Provincia.FirstOrDefault(x => x.cod_depa == data.IdUbigeo.Substring(0, 2) && x.cod_prov == data.IdUbigeo.Substring(2, 2)).nom_prov;
                    var Distrito = context.Distrito.FirstOrDefault(x => x.cod_depa == data.IdUbigeo.Substring(0, 2) && x.cod_prov == data.IdUbigeo.Substring(2, 2) && x.cod_dist == data.IdUbigeo.Substring(4, 2)).nom_dist;

                    values = new EnProyecto();
                    values.IdProyecto = data.IdProyecto;
                    values.Snip = data.Snip;
                    values.CUI = data.CUI;
                    values.Cod_modalidad = data.Cod_modalidad;
                    values.IdUbigeo = data.IdUbigeo;
                    values.Departamento = departamento;
                    values.Provincia = Provincia;
                    values.Distrito = Distrito;
                    values.Nom_proyecto = data.Nom_proyecto;
                    values.Localidad = data.Localidad;
                    values.Mto_proyecto = data.Mto_proyecto;
                    values.Nro_beneficiarios_et = data.Nro_beneficiarios_et;
                    values.Fecha_inicio_programado_string = data.Fecha_inicio_programado == null ? "" : Convert.ToDateTime(data.Fecha_inicio_programado).ToString("dd/MM/yyyy HH:mm");
                    values.Fecha_inicio_real_string = data.Fecha_inicio_real == null ? "" : Convert.ToDateTime(data.Fecha_inicio_real).ToString("dd/MM/yyyy HH:mm");
                    values.Fecha_fin_programado_string = data.Fecha_fin_programado == null ? "" : Convert.ToDateTime(data.Fecha_fin_programado).ToString("dd/MM/yyyy HH:mm");
                    values.Fecha_fin_real_string = data.Fecha_fin_real == null ? "" : Convert.ToDateTime(data.Fecha_fin_real).ToString("dd/MM/yyyy HH:mm");
                    values.Nro_conexiones_agua_et = data.Nro_conexiones_agua_et;
                    values.Nro_conexiones_saneamiento_et = data.Nro_conexiones_saneamiento_et;
                    values.Monto_acumulado_autorizacion = data.Monto_acumulado_autorizacion;
                    values.Monto_acumulado_manifiesto_gasto = data.Monto_acumulado_manifiesto_gasto;
                    values.SNIPNombreProyecto = data.CUI + " " + data.Snip + " " + data.Nom_proyecto;
                    values.MontoDesembolso = data.MontoDesembolso;
                    result.Add(values);
                }
                result = result.Where(x => x.SNIPNombreProyecto.ToUpper().Contains(search.ToUpper())).OrderBy(x => x.Nom_proyecto).Take(20).ToList();

            }
            return result;
        }
        public EnProyecto ListObraId(int IdObra)
        {
            EnProyecto result = new EnProyecto();

            var obj = context.Proyecto.SingleOrDefault(x => x.IdProyecto == IdObra);
            if (obj != null)
            {
                var departamento = context.Departamento.FirstOrDefault(x => x.cod_depa == obj.IdUbigeo.Substring(0, 2)).nom_depa;
                var Provincia = context.Provincia.FirstOrDefault(x => x.cod_depa == obj.IdUbigeo.Substring(0, 2) && x.cod_prov == obj.IdUbigeo.Substring(2, 2)).nom_prov;
                var Distrito = context.Distrito.FirstOrDefault(x => x.cod_depa == obj.IdUbigeo.Substring(0, 2) && x.cod_prov == obj.IdUbigeo.Substring(2, 2) && x.cod_dist == obj.IdUbigeo.Substring(4, 2)).nom_dist;

                result = new EnProyecto();
                result.IdProyecto = obj.IdProyecto;
                result.Snip = obj.Snip;
                result.CUI = obj.CUI;
                result.Cod_modalidad = obj.Cod_modalidad;
                result.IdUbigeo = obj.IdUbigeo;
                result.Departamento = departamento;
                result.Provincia = Provincia;
                result.Distrito = Distrito;
                result.Nom_proyecto = obj.Nom_proyecto;
                result.Localidad = obj.Localidad;
                result.Mto_proyecto = obj.Mto_proyecto;
                result.Nro_beneficiarios_et = obj.Nro_beneficiarios_et;
                result.Fecha_inicio_programado_string = obj.Fecha_inicio_programado == null ? "" : Convert.ToDateTime(obj.Fecha_inicio_programado).ToString("dd/MM/yyyy HH:mm");
                result.Fecha_inicio_real_string = obj.Fecha_inicio_real == null ? "" : Convert.ToDateTime(obj.Fecha_inicio_real).ToString("dd/MM/yyyy HH:mm");
                result.Fecha_fin_programado_string = obj.Fecha_fin_programado == null ? "" : Convert.ToDateTime(obj.Fecha_fin_programado).ToString("dd/MM/yyyy HH:mm");
                result.Fecha_fin_real_string = obj.Fecha_fin_real == null ? "" : Convert.ToDateTime(obj.Fecha_fin_real).ToString("dd/MM/yyyy HH:mm");
                result.Nro_conexiones_agua_et = obj.Nro_conexiones_agua_et;
                result.Nro_conexiones_saneamiento_et = obj.Nro_conexiones_saneamiento_et;
                result.Monto_acumulado_autorizacion = obj.Monto_acumulado_autorizacion;
                result.Monto_acumulado_manifiesto_gasto = obj.Monto_acumulado_manifiesto_gasto;
                result.SNIPNombreProyecto = obj.CUI + " " + obj.Snip + " " + obj.Nom_proyecto;
                result.MontoDesembolso = obj.MontoDesembolso;
                result.Latitud = obj.Latitud;
                result.Longitud = obj.Longitud;
            }


            return result;
        }
    }
}
