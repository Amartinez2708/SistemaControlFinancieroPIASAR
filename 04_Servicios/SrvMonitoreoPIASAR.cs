using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using _02_Entidades;
using _03_Data;
using _05_Utilidades;
using Newtonsoft.Json;

namespace _04_Servicios
{
    public class SrvMonitoreoPIASAR
    {
        BD_NucleosEjecutoresEntities context = new BD_NucleosEjecutoresEntities();
        public List<EnDropDownList> ddlDepartamento()
        {
            List<EnDropDownList> result = new List<EnDropDownList>();

            var obj = context.Departamento.OrderBy(x => x.nom_depa);
            if (obj != null && obj.Count() > 0)
            {
                EnDropDownList unidad = new EnDropDownList();
                unidad.IdText = "00";
                unidad.text = "Departamento - Todos";
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
                unidad.text = "Provincia - Todos";
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
                unidad.text = "Distrito - Todos";
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
        public List<EnDropDownList> ddlCentroPoblado(string DepartamentoProvinciaDistrito)
        {
            var Departamento = DepartamentoProvinciaDistrito.Substring(0, 2);
            var Provincia = DepartamentoProvinciaDistrito.Substring(2, 2);
            var Distrito = DepartamentoProvinciaDistrito.Substring(4, 2);

            List<EnDropDownList> result = new List<EnDropDownList>();

            var obj = context.CentroPoblado.Where(x => x.cod_dist == DepartamentoProvinciaDistrito).OrderBy(x => x.nom_ccpp);
            if (obj != null && obj.Count() > 0)
            {
                EnDropDownList unidad = new EnDropDownList();
                unidad.IdText = "0000";
                unidad.text = "[--Seleccione--]";
                result.Add(unidad);

                EnDropDownList values;
                foreach (var data in obj)
                {
                    values = new EnDropDownList();
                    values.IdText = data.cod_ccpp;
                    values.text = data.nom_ccpp;
                    result.Add(values);
                }
            }
            return result;
        }
        public List<EnListEstadoProyecto> ListEstadoInformacion(string cod_dep, string cod_prov, string cod_dist, string snip, string cui)
        {
            List<ListEstadoProyecto> obj = new List<ListEstadoProyecto>();
            List<EnListEstadoProyecto> result = new List<EnListEstadoProyecto>();

            if (cod_dep == null|| cod_dep == "") { cod_dep = "00"; }
            if (cod_dist == null || cod_dist == "") { cod_dist = "00"; }
            if(cod_prov == null || cod_prov == "") { cod_prov = "00"; }
            if (snip == null) { snip = ""; }
            if (cui == null) { cui = ""; }

            //if(cod_dep=="00" && cod_dist=="00" && cod_prov=="00" && )
            obj = context.ListEstadoProyecto.Where(x=> (cod_dep == "00" || x.cod_dep == cod_dep) && (cod_prov == "00" || x.cod_prov == cod_prov) && (cod_dist == "00" || x.cod_dist == cod_dist) && (snip=="" || x.SNIP==snip) && (cui == "" || x.CUI == cui)).OrderByDescending(x => x.SNIP).ToList();
            if (obj != null && obj.Count() > 0)
            {
                foreach (var data in obj)
                {
                    decimal avance = 0;
                    decimal total = 8;
                    EnListEstadoProyecto model = new EnListEstadoProyecto();
                    model.IdProyecto = data.IdProyecto;
                    model.Programa = data.Programa;
                    model.Departamento = data.Departamento;
                    model.Provincia = data.Provincia;
                    model.Distrito = data.Distrito;
                    model.SNIP = data.SNIP;
                    model.CUI = data.CUI;
                    model.Proyecto = data.Proyecto;
                    model.Localidad = data.Localidad;
                    model.Fecha_de_Aprobación_Estudio_Pre_Inversión = data.Fecha_de_Aprobación_Estudio_Pre_Inversión;
                    model.Fecha_de_Verificación_Estudio_Pre_Inversión = data.Fecha_de_Verificación_Estudio_Pre_Inversión;
                    model.Fecha_de_Aprobación_Expediente_Técnico = data.Fecha_de_Aprobación_Expediente_Técnico;
                    model.Fecha_de_Suscripción_del_Convenio = data.Fecha_de_Suscripción_del_Convenio;
                    model.Fecha_de_Inicio_Programado = data.Fecha_de_Inicio_Programado;
                    model.Fecha_de_Inicio_Real = data.Fecha_de_Inicio_Real;
                    model.Fecha_de_Fin_Programado = data.Fecha_de_Fin_Programado;
                    model.Fecha_de_Fin_Real = data.Fecha_de_Fin_Real;
                    model.Fecha_de_Ultima_Actualización = data.Fecha_de_Ultima_Actualización;

                    if (data.Fecha_de_Aprobación_Estudio_Pre_Inversión != "01/01/1900") { avance = avance + 1; }
                    if (data.Fecha_de_Verificación_Estudio_Pre_Inversión != "01/01/1900") { avance = avance + 1; }
                    if (data.Fecha_de_Aprobación_Expediente_Técnico != "01/01/1900") { avance = avance + 1; }
                    if (data.Fecha_de_Suscripción_del_Convenio != "01/01/1900") { avance = avance + 1; }
                    if (data.Fecha_de_Inicio_Programado != "01/01/1900") { avance = avance + 1; }
                    if (data.Fecha_de_Inicio_Real != "01/01/1900") { avance = avance + 1; }
                    if (data.Fecha_de_Fin_Programado != "01/01/1900") { avance = avance + 1; }
                    if (data.Fecha_de_Fin_Real != "01/01/1900") { avance = avance + 1; }

                    model.PorcentajeAvance = ((avance/total)*100);

                    result.Add(model);
                }
            }
            return result.ToList();
        }
        public List<EnListEstadoPresupuesto> ListEstadoPresupuesto(string cod_dep, string cod_prov, string cod_dist, string snip, string cui)
        {
            List<ListEstadoPresupuesto> obj = new List<ListEstadoPresupuesto>();
            List<EnListEstadoPresupuesto> result = new List<EnListEstadoPresupuesto>();

            if (cod_dep == null || cod_dep == "") { cod_dep = "00"; }
            if (cod_dist == null || cod_dist == "") { cod_dist = "00"; }
            if (cod_prov == null || cod_prov == "") { cod_prov = "00"; }
            if (snip == null) { snip = ""; }
            if (cui == null) { cui = ""; }

            obj = context.ListEstadoPresupuesto.Where(x => (cod_dep == "00" || x.cod_dep == cod_dep) && (cod_prov == "00" || x.cod_prov == cod_prov) && (cod_dist == "00" || x.cod_dist == cod_dist) && (snip == "" || x.SNIP == snip) && (cui == "" || x.CUI == cui)).OrderByDescending(x => x.SNIP).ToList();
            if (obj != null && obj.Count() > 0)
            {
                foreach (var data in obj)
                {
                    EnListEstadoPresupuesto model = new EnListEstadoPresupuesto();
                    model.IdProyecto = data.IdProyecto;
                    model.Programa = data.Programa;
                    model.Departamento = data.Departamento;
                    model.Provincia = data.Provincia;
                    model.Distrito = data.Distrito;
                    model.SNIP = data.SNIP;
                    model.CUI = data.CUI;
                    model.Proyecto = data.Proyecto;
                    model.Localidad = data.Localidad;
                    model.Presupuesto = data.Presupuesto;
                    model.Fecha_Actualización_Presupuesto = data.Fecha_Actualización_Presupuesto;
                    result.Add(model);
                }
            }
            return result.ToList();
        }
        public List<EnListEstadoPresupuesto> ListResumenEstadoPresupuesto(string cod_dep, string cod_prov, string cod_dist, string snip, string cui)
        {
            List<ListEstadoPresupuesto> obj = new List<ListEstadoPresupuesto>();
            List<EnListEstadoPresupuesto> result = new List<EnListEstadoPresupuesto>();

            if (cod_dep == null || cod_dep == "") { cod_dep = "00"; }
            if (cod_dist == null || cod_dist == "") { cod_dist = "00"; }
            if (cod_prov == null || cod_prov == "") { cod_prov = "00"; }
            if (snip == null) { snip = ""; }
            if (cui == null) { cui = ""; }

            obj = context.ListEstadoPresupuesto.Where(x => (cod_dep == "00" || x.cod_dep == cod_dep) && (cod_prov == "00" || x.cod_prov == cod_prov) && (cod_dist == "00" || x.cod_dist == cod_dist) && (snip == "" || x.SNIP == snip) && (cui == "" || x.CUI == cui)).OrderByDescending(x => x.SNIP).ToList();
            if (obj != null && obj.Count() > 0)
            {
                int IdProyecto = 0;
                decimal total = 12;
                foreach (var data in obj)
                {
                    if (IdProyecto == 0)
                    {
                        IdProyecto = data.IdProyecto;
                        EnListEstadoPresupuesto model = new EnListEstadoPresupuesto();
                        model.IdProyecto = data.IdProyecto;
                        model.Programa = data.Programa;
                        model.Departamento = data.Departamento;
                        model.Provincia = data.Provincia;
                        model.Distrito = data.Distrito;
                        model.SNIP = data.SNIP;
                        model.CUI = data.CUI;
                        model.Proyecto = data.Proyecto;
                        model.Localidad = data.Localidad;
                        model.Presupuesto = data.Presupuesto;
                        model.Fecha_Actualización_Presupuesto = data.Fecha_Actualización_Presupuesto;
                        model.PorcentajeAvance = Decimal.Round(((obj.Where(x => x.IdProyecto == data.IdProyecto && x.Fecha_Actualización_Presupuesto != "").Count() / total) * 100),2);
                        result.Add(model);

                    }
                    else if (IdProyecto != data.IdProyecto)
                    {
                        IdProyecto = data.IdProyecto;
                        EnListEstadoPresupuesto model = new EnListEstadoPresupuesto();
                        model.IdProyecto = data.IdProyecto;
                        model.Programa = data.Programa;
                        model.Departamento = data.Departamento;
                        model.Provincia = data.Provincia;
                        model.Distrito = data.Distrito;
                        model.SNIP = data.SNIP;
                        model.CUI = data.CUI;
                        model.Proyecto = data.Proyecto;
                        model.Localidad = data.Localidad;
                        model.Presupuesto = data.Presupuesto;
                        model.Fecha_Actualización_Presupuesto = data.Fecha_Actualización_Presupuesto;
                        model.PorcentajeAvance = Decimal.Round(((obj.Where(x => x.IdProyecto == data.IdProyecto && x.Fecha_Actualización_Presupuesto != "").Count() / total) * 100),2);
                        result.Add(model);
                    }
                    
                }
            }
            return result.ToList();
        }
        public EnAutorizacionVSManifiesto ListAutorizacionVSManifiesto(string cod_dep, string cod_prov, string cod_dist, string snip, string cui, int anio)
        {
            if (cod_dep == null || cod_dep == "") { cod_dep = "00"; }
            if (cod_dist == null || cod_dist == "") { cod_dist = "00"; }
            if (cod_prov == null || cod_prov == "") { cod_prov = "00"; }
            if (snip == null) { snip = ""; }
            if (cui == null) { cui = ""; }

            List<int> ListProyectos = context.Proyecto.Where(x=>x.Cod_subprograma== 133 && (cod_dep == "00" || x.IdUbigeo.Substring(0,2) == cod_dep) && (cod_prov == "00" || x.IdUbigeo.Substring(2, 2) == cod_prov) && (cod_dist == "00" || x.IdUbigeo.Substring(4, 2) == cod_dist) && (snip == "" || x.Snip == snip) && (cui == "" || x.CUI == cui)).Select(x=>x.IdProyecto).ToList();
            var Autorizacion = context.Autorizacion_Gasto.Where(x => ListProyectos.Contains(x.IdProyecto) && x.Estado_documento==23 && x.Estado == 1).ToList();
            var Manifiesto = context.MANIFIESTO_GASTO.Where(x => ListProyectos.Contains(x.IDPROYECTO) && x.ESTADO_DOCUMENTO == 23 && x.ESTADO == 1).ToList();
            var AutorizacionGestionado = context.Autorizacion_Gasto.Where(x => ListProyectos.Contains(x.IdProyecto) && x.Estado_documento != 23 && x.Estado == 1).ToList();
            var ManifiestoGestionado = context.MANIFIESTO_GASTO.Where(x => ListProyectos.Contains(x.IDPROYECTO) && x.ESTADO_DOCUMENTO != 23 && x.ESTADO == 1).ToList();

            DateTime EneroIni = new DateTime(anio, 1, 1);
            DateTime EneroFin = EneroIni.AddMonths(1).AddDays(-1);
            DateTime FebreroIni = new DateTime(anio, 2, 1);
            DateTime FebreroFin = FebreroIni.AddMonths(1).AddDays(-1);
            DateTime MarzoIni = new DateTime(anio, 3, 1);
            DateTime MarzoFin = MarzoIni.AddMonths(1).AddDays(-1);
            DateTime AbrilIni = new DateTime(anio, 4, 1);
            DateTime AbrilFin = AbrilIni.AddMonths(1).AddDays(-1);
            DateTime MayoIni = new DateTime(anio, 5, 1);
            DateTime MayoFin = MayoIni.AddMonths(1).AddDays(-1);
            DateTime JunioIni = new DateTime(anio, 6, 1);
            DateTime JunioFin = JunioIni.AddMonths(1).AddDays(-1);
            DateTime JulioIni = new DateTime(anio, 7, 1);
            DateTime JulioFin = JulioIni.AddMonths(1).AddDays(-1);
            DateTime AgostoIni = new DateTime(anio, 8, 1);
            DateTime AgostoFin = AgostoIni.AddMonths(1).AddDays(-1);
            DateTime SeptiembreIni = new DateTime(anio, 9, 1);
            DateTime SeptiembreFin = SeptiembreIni.AddMonths(1).AddDays(-1);
            DateTime OctubreIni = new DateTime(anio, 10, 1);
            DateTime OctubreFin = OctubreIni.AddMonths(1).AddDays(-1);
            DateTime NoviembreIni = new DateTime(anio, 11, 1);
            DateTime NoviembreFin = NoviembreIni.AddMonths(1).AddDays(-1);
            DateTime DiciembreIni = new DateTime(anio, 12, 1);
            DateTime DiciembreFin = DiciembreIni.AddMonths(1).AddDays(-1);

            EnAutorizacionVSManifiesto model = new EnAutorizacionVSManifiesto();
            model.EneroAutorizacion = Autorizacion.Where(x => x.Fecha_autorizacion >= EneroIni && x.Fecha_autorizacion<=EneroFin).Sum(x => x.Monto_autorizacion);
            model.EneroManifiesto = Manifiesto.Where(x => x.FECHA_MANIFIESTO >= EneroIni && x.FECHA_MANIFIESTO <= EneroFin).Sum(x => x.MONTO_MANIFIESTO);
            model.EneroAutorizacionGestionada = AutorizacionGestionado.Where(x => x.Fecha_autorizacion >= EneroIni && x.Fecha_autorizacion <= EneroFin).Sum(x => x.Monto_autorizacion);
            model.EneroManifiestoGestionada = ManifiestoGestionado.Where(x => x.FECHA_MANIFIESTO >= EneroIni && x.FECHA_MANIFIESTO <= EneroFin).Sum(x => x.MONTO_MANIFIESTO);

            model.FebreroAutorizacion = Autorizacion.Where(x => x.Fecha_autorizacion >= FebreroIni && x.Fecha_autorizacion <= FebreroFin).Sum(x => x.Monto_autorizacion);
            model.FebreroManifiesto = Manifiesto.Where(x => x.FECHA_MANIFIESTO >= FebreroIni && x.FECHA_MANIFIESTO <= FebreroFin).Sum(x => x.MONTO_MANIFIESTO);
            model.FebreroAutorizacionGestionada = AutorizacionGestionado.Where(x => x.Fecha_autorizacion >= FebreroIni && x.Fecha_autorizacion <= FebreroFin).Sum(x => x.Monto_autorizacion);
            model.FebreroManifiestoGestionada = ManifiestoGestionado.Where(x => x.FECHA_MANIFIESTO >= FebreroIni && x.FECHA_MANIFIESTO <= FebreroFin).Sum(x => x.MONTO_MANIFIESTO);

            model.MarzoAutorizacion = Autorizacion.Where(x => x.Fecha_autorizacion >= MarzoIni && x.Fecha_autorizacion <= MarzoFin).Sum(x => x.Monto_autorizacion);
            model.MarzoManifiesto = Manifiesto.Where(x => x.FECHA_MANIFIESTO >= MarzoIni && x.FECHA_MANIFIESTO <= MarzoFin).Sum(x => x.MONTO_MANIFIESTO);
            model.MarzoAutorizacionGestionada = AutorizacionGestionado.Where(x => x.Fecha_autorizacion >= MarzoIni && x.Fecha_autorizacion <= MarzoFin).Sum(x => x.Monto_autorizacion);
            model.MarzoManifiestoGestionada = ManifiestoGestionado.Where(x => x.FECHA_MANIFIESTO >= MarzoIni && x.FECHA_MANIFIESTO <= MarzoFin).Sum(x => x.MONTO_MANIFIESTO);

            model.AbrilAutorizacion = Autorizacion.Where(x => x.Fecha_autorizacion >= AbrilIni && x.Fecha_autorizacion <= AbrilFin).Sum(x => x.Monto_autorizacion);
            model.AbrilManifiesto = Manifiesto.Where(x => x.FECHA_MANIFIESTO >= AbrilIni && x.FECHA_MANIFIESTO <= AbrilFin).Sum(x => x.MONTO_MANIFIESTO);
            model.AbrilAutorizacionGestionada = AutorizacionGestionado.Where(x => x.Fecha_autorizacion >= AbrilIni && x.Fecha_autorizacion <= AbrilFin).Sum(x => x.Monto_autorizacion);
            model.AbrilManifiestoGestionada = ManifiestoGestionado.Where(x => x.FECHA_MANIFIESTO >= AbrilIni && x.FECHA_MANIFIESTO <= AbrilFin).Sum(x => x.MONTO_MANIFIESTO);

            model.MayoAutorizacion = Autorizacion.Where(x => x.Fecha_autorizacion >= MayoIni && x.Fecha_autorizacion <= MayoFin).Sum(x => x.Monto_autorizacion);
            model.MayoManifiesto = Manifiesto.Where(x => x.FECHA_MANIFIESTO >= MayoIni && x.FECHA_MANIFIESTO <= MayoFin).Sum(x => x.MONTO_MANIFIESTO);
            model.MayoAutorizacionGestionada = AutorizacionGestionado.Where(x => x.Fecha_autorizacion >= MayoIni && x.Fecha_autorizacion <= MayoFin).Sum(x => x.Monto_autorizacion);
            model.MayoManifiestoGestionada = ManifiestoGestionado.Where(x => x.FECHA_MANIFIESTO >= MayoIni && x.FECHA_MANIFIESTO <= MayoFin).Sum(x => x.MONTO_MANIFIESTO);

            model.JunioAutorizacion = Autorizacion.Where(x => x.Fecha_autorizacion >= JunioIni && x.Fecha_autorizacion <= JunioFin).Sum(x => x.Monto_autorizacion);
            model.JunioManifiesto = Manifiesto.Where(x => x.FECHA_MANIFIESTO >= JunioIni && x.FECHA_MANIFIESTO <= JunioFin).Sum(x => x.MONTO_MANIFIESTO);
            model.JunioAutorizacionGestionada = AutorizacionGestionado.Where(x => x.Fecha_autorizacion >= JunioIni && x.Fecha_autorizacion <= JunioFin).Sum(x => x.Monto_autorizacion);
            model.JunioManifiestoGestionada = ManifiestoGestionado.Where(x => x.FECHA_MANIFIESTO >= JunioIni && x.FECHA_MANIFIESTO <= JunioFin).Sum(x => x.MONTO_MANIFIESTO);

            model.JulioAutorizacion = Autorizacion.Where(x => x.Fecha_autorizacion >= JulioIni && x.Fecha_autorizacion <= JulioFin).Sum(x => x.Monto_autorizacion);
            model.JulioManifiesto = Manifiesto.Where(x => x.FECHA_MANIFIESTO >= JulioIni && x.FECHA_MANIFIESTO <= JulioFin).Sum(x => x.MONTO_MANIFIESTO);
            model.JulioAutorizacionGestionada = AutorizacionGestionado.Where(x => x.Fecha_autorizacion >= JulioIni && x.Fecha_autorizacion <= JulioFin).Sum(x => x.Monto_autorizacion);
            model.JulioManifiestoGestionada = ManifiestoGestionado.Where(x => x.FECHA_MANIFIESTO >= JulioIni && x.FECHA_MANIFIESTO <= JulioFin).Sum(x => x.MONTO_MANIFIESTO);

            model.AgostoAutorizacion = Autorizacion.Where(x => x.Fecha_autorizacion >= AgostoIni && x.Fecha_autorizacion <= AgostoFin).Sum(x => x.Monto_autorizacion);
            model.AgostoManifiesto = Manifiesto.Where(x => x.FECHA_MANIFIESTO >= AgostoIni && x.FECHA_MANIFIESTO <= AgostoFin).Sum(x => x.MONTO_MANIFIESTO);
            model.AgostoAutorizacionGestionada = AutorizacionGestionado.Where(x => x.Fecha_autorizacion >= AgostoIni && x.Fecha_autorizacion <= AgostoFin).Sum(x => x.Monto_autorizacion);
            model.AgostoManifiestoGestionada = ManifiestoGestionado.Where(x => x.FECHA_MANIFIESTO >= AgostoIni && x.FECHA_MANIFIESTO <= AgostoFin).Sum(x => x.MONTO_MANIFIESTO);

            model.SeptiembreAutorizacion = Autorizacion.Where(x => x.Fecha_autorizacion >= SeptiembreIni && x.Fecha_autorizacion <= SeptiembreFin).Sum(x => x.Monto_autorizacion);
            model.SeptiembreManifiesto = Manifiesto.Where(x => x.FECHA_MANIFIESTO >= SeptiembreIni && x.FECHA_MANIFIESTO <= SeptiembreFin).Sum(x => x.MONTO_MANIFIESTO);
            model.SeptiembreAutorizacionGestionada = AutorizacionGestionado.Where(x => x.Fecha_autorizacion >= SeptiembreIni && x.Fecha_autorizacion <= SeptiembreFin).Sum(x => x.Monto_autorizacion);
            model.SeptiembreManifiestoGestionada = ManifiestoGestionado.Where(x => x.FECHA_MANIFIESTO >= SeptiembreIni && x.FECHA_MANIFIESTO <= SeptiembreFin).Sum(x => x.MONTO_MANIFIESTO);

            model.OctubreAutorizacion = Autorizacion.Where(x => x.Fecha_autorizacion >= OctubreIni && x.Fecha_autorizacion <= OctubreFin).Sum(x => x.Monto_autorizacion);
            model.OctubreManifiesto = Manifiesto.Where(x => x.FECHA_MANIFIESTO >= OctubreIni && x.FECHA_MANIFIESTO <= OctubreFin).Sum(x => x.MONTO_MANIFIESTO);
            model.OctubreAutorizacionGestionada = AutorizacionGestionado.Where(x => x.Fecha_autorizacion >= OctubreIni && x.Fecha_autorizacion <= OctubreFin).Sum(x => x.Monto_autorizacion);
            model.OctubreManifiestoGestionada = ManifiestoGestionado.Where(x => x.FECHA_MANIFIESTO >= OctubreIni && x.FECHA_MANIFIESTO <= OctubreFin).Sum(x => x.MONTO_MANIFIESTO);

            model.NoviembreAutorizacion = Autorizacion.Where(x => x.Fecha_autorizacion >= NoviembreIni && x.Fecha_autorizacion <= NoviembreFin).Sum(x => x.Monto_autorizacion);
            model.NoviembreManifiesto = Manifiesto.Where(x => x.FECHA_MANIFIESTO >= NoviembreIni && x.FECHA_MANIFIESTO <= NoviembreFin).Sum(x => x.MONTO_MANIFIESTO);
            model.NoviembreAutorizacionGestionada = AutorizacionGestionado.Where(x => x.Fecha_autorizacion >= NoviembreIni && x.Fecha_autorizacion <= NoviembreFin).Sum(x => x.Monto_autorizacion);
            model.NoviembreManifiestoGestionada = ManifiestoGestionado.Where(x => x.FECHA_MANIFIESTO >= NoviembreIni && x.FECHA_MANIFIESTO <= NoviembreFin).Sum(x => x.MONTO_MANIFIESTO);

            model.DiciembreAutorizacion = Autorizacion.Where(x => x.Fecha_autorizacion >= DiciembreIni && x.Fecha_autorizacion <= DiciembreFin).Sum(x => x.Monto_autorizacion);
            model.DiciembreManifiesto = Manifiesto.Where(x => x.FECHA_MANIFIESTO >= DiciembreIni && x.FECHA_MANIFIESTO <= DiciembreFin).Sum(x => x.MONTO_MANIFIESTO);
            model.DiciembreAutorizacionGestionada = AutorizacionGestionado.Where(x => x.Fecha_autorizacion >= DiciembreIni && x.Fecha_autorizacion <= DiciembreFin).Sum(x => x.Monto_autorizacion);
            model.DiciembreManifiestoGestionada = ManifiestoGestionado.Where(x => x.FECHA_MANIFIESTO >= DiciembreIni && x.FECHA_MANIFIESTO <= DiciembreFin).Sum(x => x.MONTO_MANIFIESTO);

            return model;
    }
        public List<EnAutorizacionVSManifiesto> ListDetalleAutorizacionVSManifiesto(string cod_dep, string cod_prov, string cod_dist, string snip, string cui, int anio, string mes, string tipo)
        {
            if (cod_dep == null || cod_dep == "") { cod_dep = "00"; }
            if (cod_dist == null || cod_dist == "") { cod_dist = "00"; }
            if (cod_prov == null || cod_prov == "") { cod_prov = "00"; }
            if (snip == null) { snip = ""; }
            if (cui == null) { cui = ""; }

            List<int> ListProyectos = context.Proyecto.Where(x => x.Cod_subprograma == 133 && (cod_dep == "00" || x.IdUbigeo.Substring(0, 2) == cod_dep) && (cod_prov == "00" || x.IdUbigeo.Substring(2, 2) == cod_prov) && (cod_dist == "00" || x.IdUbigeo.Substring(4, 2) == cod_dist) && (snip == "" || x.Snip == snip) && (cui == "" || x.CUI == cui)).Select(x => x.IdProyecto).ToList();
            var Autorizacion = context.Autorizacion_Gasto.Where(x => ListProyectos.Contains(x.IdProyecto) && x.Estado_documento == 23 && x.Estado == 1).ToList();
            var Manifiesto = context.MANIFIESTO_GASTO.Where(x => ListProyectos.Contains(x.IDPROYECTO) && x.ESTADO_DOCUMENTO == 23 && x.ESTADO == 1).ToList();
            var AutorizacionGestionado = context.Autorizacion_Gasto.Where(x => ListProyectos.Contains(x.IdProyecto) && x.Estado_documento != 23 && x.Estado == 1).ToList();
            var ManifiestoGestionado = context.MANIFIESTO_GASTO.Where(x => ListProyectos.Contains(x.IDPROYECTO) && x.ESTADO_DOCUMENTO != 23 && x.ESTADO == 1).ToList();

            var nmes = 1;

            if (mes == "Enero") { nmes = 1; }
            else if (mes == "Febrero") { nmes = 2; }
            else if (mes == "Marzo") { nmes = 3; }
            else if (mes == "Abril") { nmes = 4; }
            else if (mes == "Mayo") { nmes = 5; }
            else if (mes == "Junio") { nmes = 6; }
            else if (mes == "Julio") { nmes = 7; }
            else if (mes == "Agosto") { nmes = 8; }
            else if (mes == "Septiembre") { nmes = 9; }
            else if (mes == "Octubre") { nmes = 10; }
            else if (mes == "Noviembre") { nmes = 11; }
            else if (mes == "Diciembre") { nmes = 12; }

            DateTime mesini = new DateTime(anio, nmes, 1);
            DateTime mesFin = mesini.AddMonths(1).AddDays(-1);

            List<EnAutorizacionVSManifiesto> result = new List<EnAutorizacionVSManifiesto>();


            if (tipo == "Autorizacion")
            {
                var obj = Autorizacion.Where(x => x.Fecha_autorizacion >= mesini && x.Fecha_autorizacion <= mesFin).ToList();
                if (obj != null)
                {
                    if (obj.Count() > 0)
                    {
                        foreach(var data in obj)
                        {
                            var departamento = context.Departamento.FirstOrDefault(x => x.cod_depa == data.Proyecto.IdUbigeo.Substring(0, 2)).nom_depa;
                            var Provincia = context.Provincia.FirstOrDefault(x => x.cod_depa == data.Proyecto.IdUbigeo.Substring(0, 2) && x.cod_prov == data.Proyecto.IdUbigeo.Substring(2, 2)).nom_prov;
                            var Distrito = context.Distrito.FirstOrDefault(x => x.cod_depa == data.Proyecto.IdUbigeo.Substring(0, 2) && x.cod_prov == data.Proyecto.IdUbigeo.Substring(2, 2) && x.cod_dist == data.Proyecto.IdUbigeo.Substring(4, 2)).nom_dist;
                            var MovimientoDocumento = context.Movimiento_Documento.Where(x => x.IdProyecto == data.IdProyecto && x.IdDocumento == data.IdAutorizacion && x.Tipo_documento == "AG" && x.Estado == 1);
                            var Movimiento = MovimientoDocumento.ToList().LastOrDefault();

                            EnAutorizacionVSManifiesto model = new EnAutorizacionVSManifiesto();
                            model.Snip = data.Proyecto.Snip;
                            model.CUI = data.Proyecto.CUI;
                            model.Departamento = departamento;
                            model.Provincia = Provincia;
                            model.Distrito = Distrito;
                            model.Proyecto = data.Proyecto.Nom_proyecto;
                            model.Localidad = data.Proyecto.Localidad;
                            model.Mto_proyecto = data.Proyecto.Mto_proyecto;
                            model.Autorizacion = data.Monto_autorizacion;

                            if (Movimiento != null)
                            {
                                if (Movimiento.Tipo_recibe_documento == 0)
                                {
                                    model.Estado = "Finalizado" + "</br>" + Convert.ToDateTime(Movimiento.Fecha_envia_documento).ToString("dd/MM/yyyy hh:mm tt");
                                }
                                else if (Movimiento.Estado_documento == 0)
                                {
                                    model.Estado = "Por Recibir </br>" + context.TABLA_DETALLE.FirstOrDefault(x => x.IDDETALLE == Movimiento.Tipo_recibe_documento && x.NESTADO == 1).SDETALLE + "</br>" + Convert.ToDateTime(Movimiento.Fecha_envia_documento).ToString("dd/MM/yyyy hh:mm tt");
                                }
                                else if (Movimiento.Estado_documento == 29)
                                {
                                    model.Estado = "En Envaluación </br>" + context.TABLA_DETALLE.FirstOrDefault(x => x.IDDETALLE == Movimiento.Tipo_recibe_documento && x.NESTADO == 1).SDETALLE + "</br>" + context.USUARIO_SISTEMA.FirstOrDefault(x => x.IDUSUARIO == Movimiento.IdUsuario_recibe_documento).PERSONAL + "</br>" + Convert.ToDateTime(Movimiento.Fecha_recibe_documento).ToString("dd/MM/yyyy hh:mm tt");
                                }
                            }
                            else
                            {
                                model.Estado = "Pendiente de Envio";
                            }
                            result.Add(model);
                           
                        }
                    }
                }

                
            }
            else if (tipo == "Justificación")
            {
                var obj = Manifiesto.Where(x => x.FECHA_MANIFIESTO >= mesini && x.FECHA_MANIFIESTO <= mesFin).ToList();
                if (obj != null)
                {
                    if (obj.Count() > 0)
                    {
                        foreach (var data in obj)
                        {
                            var departamento = context.Departamento.FirstOrDefault(x => x.cod_depa == data.Proyecto.IdUbigeo.Substring(0, 2)).nom_depa;
                            var Provincia = context.Provincia.FirstOrDefault(x => x.cod_depa == data.Proyecto.IdUbigeo.Substring(0, 2) && x.cod_prov == data.Proyecto.IdUbigeo.Substring(2, 2)).nom_prov;
                            var Distrito = context.Distrito.FirstOrDefault(x => x.cod_depa == data.Proyecto.IdUbigeo.Substring(0, 2) && x.cod_prov == data.Proyecto.IdUbigeo.Substring(2, 2) && x.cod_dist == data.Proyecto.IdUbigeo.Substring(4, 2)).nom_dist;
                            var MovimientoDocumento = context.Movimiento_Documento.Where(x => x.IdProyecto == data.IDPROYECTO && x.IdDocumento == data.IDMANIFIESTO && x.Tipo_documento == "MG" && x.Estado == 1);
                            var Movimiento = MovimientoDocumento.ToList().LastOrDefault();

                            EnAutorizacionVSManifiesto model = new EnAutorizacionVSManifiesto();
                            model.Snip = data.Proyecto.Snip;
                            model.CUI = data.Proyecto.CUI;
                            model.Departamento = departamento;
                            model.Provincia = Provincia;
                            model.Distrito = Distrito;
                            model.Proyecto = data.Proyecto.Nom_proyecto;
                            model.Localidad = data.Proyecto.Localidad;
                            model.Mto_proyecto = data.Proyecto.Mto_proyecto;
                            model.Manifiesto = data.MONTO_MANIFIESTO;

                            if (Movimiento != null)
                            {
                                if (Movimiento.Tipo_recibe_documento == 0)
                                {
                                    model.Estado = "Finalizado" + "</br>" + Convert.ToDateTime(Movimiento.Fecha_envia_documento).ToString("dd/MM/yyyy hh:mm tt");
                                }
                                else if (Movimiento.Estado_documento == 0)
                                {
                                    model.Estado = "Por Recibir </br>" + context.TABLA_DETALLE.FirstOrDefault(x => x.IDDETALLE == Movimiento.Tipo_recibe_documento && x.NESTADO == 1).SDETALLE + "</br>" + Convert.ToDateTime(Movimiento.Fecha_envia_documento).ToString("dd/MM/yyyy hh:mm tt");
                                }
                                else if (Movimiento.Estado_documento == 29)
                                {
                                    model.Estado = "En Envaluación </br>" + context.TABLA_DETALLE.FirstOrDefault(x => x.IDDETALLE == Movimiento.Tipo_recibe_documento && x.NESTADO == 1).SDETALLE + "</br>" + context.USUARIO_SISTEMA.FirstOrDefault(x => x.IDUSUARIO == Movimiento.IdUsuario_recibe_documento).PERSONAL + "</br>" + Convert.ToDateTime(Movimiento.Fecha_recibe_documento).ToString("dd/MM/yyyy hh:mm tt");
                                }
                            }
                            else
                            {
                                model.Estado = "Pendiente de Envio";
                            }
                            result.Add(model);
                        }
                    }
                }
            }
            else if (tipo == "AutorizacionGestionada")
            {
                var obj = AutorizacionGestionado.Where(x => x.Fecha_autorizacion >= mesini && x.Fecha_autorizacion <= mesFin).ToList();
                if (obj != null)
                {
                    if (obj.Count() > 0)
                    {
                        foreach (var data in obj)
                        {
                            var departamento = context.Departamento.FirstOrDefault(x => x.cod_depa == data.Proyecto.IdUbigeo.Substring(0, 2)).nom_depa;
                            var Provincia = context.Provincia.FirstOrDefault(x => x.cod_depa == data.Proyecto.IdUbigeo.Substring(0, 2) && x.cod_prov == data.Proyecto.IdUbigeo.Substring(2, 2)).nom_prov;
                            var Distrito = context.Distrito.FirstOrDefault(x => x.cod_depa == data.Proyecto.IdUbigeo.Substring(0, 2) && x.cod_prov == data.Proyecto.IdUbigeo.Substring(2, 2) && x.cod_dist == data.Proyecto.IdUbigeo.Substring(4, 2)).nom_dist;
                            var MovimientoDocumento = context.Movimiento_Documento.Where(x => x.IdProyecto == data.IdProyecto && x.IdDocumento == data.IdAutorizacion && x.Tipo_documento == "AG" && x.Estado == 1);
                            var Movimiento = MovimientoDocumento.ToList().LastOrDefault();

                            EnAutorizacionVSManifiesto model = new EnAutorizacionVSManifiesto();
                            model.Snip = data.Proyecto.Snip;
                            model.CUI = data.Proyecto.CUI;
                            model.Departamento = departamento;
                            model.Provincia = Provincia;
                            model.Distrito = Distrito;
                            model.Proyecto = data.Proyecto.Nom_proyecto;
                            model.Localidad = data.Proyecto.Localidad;
                            model.Mto_proyecto = data.Proyecto.Mto_proyecto;
                            model.AutorizacionGestionada = data.Monto_autorizacion;

                            if (Movimiento != null)
                            {
                                if (Movimiento.Tipo_recibe_documento == 0)
                                {
                                    model.Estado = "Finalizado" + "</br>" + Convert.ToDateTime(Movimiento.Fecha_envia_documento).ToString("dd/MM/yyyy hh:mm tt");
                                }
                                else if (Movimiento.Estado_documento == 0)
                                {
                                    model.Estado = "Por Recibir </br>" + context.TABLA_DETALLE.FirstOrDefault(x => x.IDDETALLE == Movimiento.Tipo_recibe_documento && x.NESTADO == 1).SDETALLE + "</br>" + Convert.ToDateTime(Movimiento.Fecha_envia_documento).ToString("dd/MM/yyyy hh:mm tt");
                                }
                                else if (Movimiento.Estado_documento == 29)
                                {
                                    model.Estado = "En Envaluación </br>" + context.TABLA_DETALLE.FirstOrDefault(x => x.IDDETALLE == Movimiento.Tipo_recibe_documento && x.NESTADO == 1).SDETALLE + "</br>" + context.USUARIO_SISTEMA.FirstOrDefault(x => x.IDUSUARIO == Movimiento.IdUsuario_recibe_documento).PERSONAL + "</br>" + Convert.ToDateTime(Movimiento.Fecha_recibe_documento).ToString("dd/MM/yyyy hh:mm tt");
                                }
                            }
                            else
                            {
                                model.Estado = "Pendiente de Envio";
                            }
                            result.Add(model);
                        }
                    }
                }
            }
            else if (tipo == "JustificaciónGestionada")
            {
                var obj = ManifiestoGestionado.Where(x => x.FECHA_MANIFIESTO >= mesini && x.FECHA_MANIFIESTO <= mesFin).ToList();
                if (obj != null)
                {
                    if (obj.Count() > 0)
                    {
                        foreach (var data in obj)
                        {
                            var departamento = context.Departamento.FirstOrDefault(x => x.cod_depa == data.Proyecto.IdUbigeo.Substring(0, 2)).nom_depa;
                            var Provincia = context.Provincia.FirstOrDefault(x => x.cod_depa == data.Proyecto.IdUbigeo.Substring(0, 2) && x.cod_prov == data.Proyecto.IdUbigeo.Substring(2, 2)).nom_prov;
                            var Distrito = context.Distrito.FirstOrDefault(x => x.cod_depa == data.Proyecto.IdUbigeo.Substring(0, 2) && x.cod_prov == data.Proyecto.IdUbigeo.Substring(2, 2) && x.cod_dist == data.Proyecto.IdUbigeo.Substring(4, 2)).nom_dist;
                            var MovimientoDocumento = context.Movimiento_Documento.Where(x => x.IdProyecto == data.IDPROYECTO && x.IdDocumento == data.IDMANIFIESTO && x.Tipo_documento == "MG" && x.Estado == 1);
                            var Movimiento = MovimientoDocumento.ToList().LastOrDefault();

                            EnAutorizacionVSManifiesto model = new EnAutorizacionVSManifiesto();
                            model.Snip = data.Proyecto.Snip;
                            model.CUI = data.Proyecto.CUI;
                            model.Departamento = departamento;
                            model.Provincia = Provincia;
                            model.Distrito = Distrito;
                            model.Proyecto = data.Proyecto.Nom_proyecto;
                            model.Localidad = data.Proyecto.Localidad;
                            model.Mto_proyecto = data.Proyecto.Mto_proyecto;
                            model.ManifiestoGestionada = data.MONTO_MANIFIESTO;

                            if (Movimiento != null)
                            {
                                if (Movimiento.Tipo_recibe_documento == 0)
                                {
                                    model.Estado = "Finalizado" + "</br>" + Convert.ToDateTime(Movimiento.Fecha_envia_documento).ToString("dd/MM/yyyy hh:mm tt");
                                }
                                else if (Movimiento.Estado_documento == 0)
                                {
                                    model.Estado = "Por Recibir </br>" + context.TABLA_DETALLE.FirstOrDefault(x => x.IDDETALLE == Movimiento.Tipo_recibe_documento && x.NESTADO == 1).SDETALLE + "</br>" + Convert.ToDateTime(Movimiento.Fecha_envia_documento).ToString("dd/MM/yyyy hh:mm tt");
                                }
                                else if (Movimiento.Estado_documento == 29)
                                {
                                    model.Estado = "En Envaluación </br>" + context.TABLA_DETALLE.FirstOrDefault(x => x.IDDETALLE == Movimiento.Tipo_recibe_documento && x.NESTADO == 1).SDETALLE + "</br>" + context.USUARIO_SISTEMA.FirstOrDefault(x => x.IDUSUARIO == Movimiento.IdUsuario_recibe_documento).PERSONAL + "</br>" + Convert.ToDateTime(Movimiento.Fecha_recibe_documento).ToString("dd/MM/yyyy hh:mm tt");
                                }
                            }
                            else
                            {
                                model.Estado = "Pendiente de Envio";
                            }
                            result.Add(model);
                        }
                    }
                }
            }

            return result.ToList();
        }
        public EnListMontoProyectoVSPresupuesto GrfMontoProyectoVSPresupuesto(string cod_dep, string cod_prov, string cod_dist, string snip, string cui)
        {
            List<ListMontoProyectoVSPresupuesto> obj = new List<ListMontoProyectoVSPresupuesto>();
            EnListMontoProyectoVSPresupuesto result = new EnListMontoProyectoVSPresupuesto();

            if (cod_dep == null || cod_dep == "") { cod_dep = "00"; }
            if (cod_dist == null || cod_dist == "") { cod_dist = "00"; }
            if (cod_prov == null || cod_prov == "") { cod_prov = "00"; }
            if (snip == null) { snip = ""; }
            if (cui == null) { cui = ""; }

            result.CountCompleto= context.ListMontoProyectoVSPresupuesto.Where(x => (cod_dep == "00" || x.cod_dep == cod_dep) && (cod_prov == "00" || x.cod_prov == cod_prov) && (cod_dist == "00" || x.cod_dist == cod_dist) && (snip == "" || x.Snip == snip) && (cui == "" || x.CUI == cui) && x.Correcto == 1).OrderByDescending(x => x.Snip).Count();
            result.CountIncompleto = context.ListMontoProyectoVSPresupuesto.Where(x => (cod_dep == "00" || x.cod_dep == cod_dep) && (cod_prov == "00" || x.cod_prov == cod_prov) && (cod_dist == "00" || x.cod_dist == cod_dist) && (snip == "" || x.Snip == snip) && (cui == "" || x.CUI == cui) && x.Correcto == 0).OrderByDescending(x => x.Snip).Count();

            return result;
        }
        public List<EnListMontoProyectoVSPresupuesto> ListMontoProyectoVSPresupuesto(string cod_dep, string cod_prov, string cod_dist, string snip, string cui)
        {
            List<ListMontoProyectoVSPresupuesto> obj = new List<ListMontoProyectoVSPresupuesto>();
            List<EnListMontoProyectoVSPresupuesto> result = new List<EnListMontoProyectoVSPresupuesto>();

            if (cod_dep == null || cod_dep == "") { cod_dep = "00"; }
            if (cod_dist == null || cod_dist == "") { cod_dist = "00"; }
            if (cod_prov == null || cod_prov == "") { cod_prov = "00"; }
            if (snip == null) { snip = ""; }
            if (cui == null) { cui = ""; }

            obj = context.ListMontoProyectoVSPresupuesto.Where(x => (cod_dep == "00" || x.cod_dep == cod_dep) && (cod_prov == "00" || x.cod_prov == cod_prov) && (cod_dist == "00" || x.cod_dist == cod_dist) && (snip == "" || x.Snip == snip) && (cui == "" || x.CUI == cui)).OrderByDescending(x => x.Snip).ToList();
            if (obj != null && obj.Count() > 0)
            {
                foreach (var data in obj)
                {
                    EnListMontoProyectoVSPresupuesto model = new EnListMontoProyectoVSPresupuesto();
                    model.Programa = data.Programa;
                    model.Departamento = data.Ubigeo;
                    model.Departamento = data.Departamento;
                    model.Provincia = data.Provincia;
                    model.Distrito = data.Distrito;
                    model.Localidad = data.Localidad;
                    model.Snip = data.Snip;
                    model.Nom_proyecto = data.Nom_proyecto;
                    model.Mto_proyecto = data.Mto_proyecto;
                    model.Presupuesto = data.Presupuesto;
                    model.Porcentaje = Decimal.Round(Convert.ToDecimal((data.Presupuesto/data.Mto_proyecto)*100),4);
                    model.Estado = data.Mto_proyecto == data.Presupuesto ? "OK" : "Con Diferencias";
                    result.Add(model);
                }
            }
            return result.ToList();
        }
        public List<EnDesembolsoVSJustificado> ListDesenbolsoVSJustificacion(int anio)
        {
            List<DesembolsoVSJustificado> obj = new List<DesembolsoVSJustificado>();
            List<EnDesembolsoVSJustificado> result = new List<EnDesembolsoVSJustificado>();

            obj = context.DesembolsoVSJustificado.Where(x => (anio == 0 || x.AnioEjecucion == anio)).OrderByDescending(x => x.Snip).ToList();
            if (obj != null && obj.Count() > 0)
            {
                var count = 0;
                //var obj1 = obj.OrderBy(x => x.Porcentaje).GroupBy(x => x.AnioEjecucion).ToList();
                //var obj2 = obj
                foreach (var data in obj.OrderBy(x =>x.AnioEjecucion).ThenBy(x=>x.Porcentaje).GroupBy(x => x.AnioEjecucion).SelectMany(x=>x))
                {
                    var MovimientoDocumentoAG = context.Autorizacion_Gasto.Where(x => x.IdProyecto == data.IdProyecto && x.Estado == 1);
                    var MovimientoAG = MovimientoDocumentoAG.ToList().LastOrDefault();
                    var MovimientoDocumentoMG = context.MANIFIESTO_GASTO.Where(x => x.IDPROYECTO == data.IdProyecto && x.ESTADO == 1);
                    var MovimientoMG = MovimientoDocumentoMG.ToList().LastOrDefault();

                    var objMonitoreo = context.MonitoreoObras.Where(x => x.IdProyecto == data.IdProyecto && x.Activo == true).OrderByDescending(x => x.Fecha_add).FirstOrDefault();

                    EnDesembolsoVSJustificado model = new EnDesembolsoVSJustificado();
                    model.Nro = count + 1;
                    model.Programa = data.Programa;
                    model.Departamento = data.Departamento;
                    model.Provincia = data.Provincia;
                    model.Distrito = data.Distrito;
                    model.Localidad = data.Localidad;
                    model.Snip = data.Snip;
                    model.CUI = data.CUI;
                    model.Nom_proyecto = data.Nom_proyecto;
                    model.Mto_proyecto = data.Mto_proyecto;
                    model.Manifiesto = data.Manifiesto;
                    model.Autorizacion = data.Autorizacion;
                    model.ManifiestoGestionado = data.ManifiestoGestionado;
                    model.AutorizacionGestionada = data.AutorizacionGestionada;
                    model.Desembolso = data.Desembolso;
                    model.Porcentaje = data.Porcentaje;
                    model.Liquidador = data.Liquidador;
                    model.Anio = Convert.ToInt32(data.AnioEjecucion);
                    model.Grupo = data.Grupo;
                    model.PorcentajeAvanceFisico = objMonitoreo == null ? "0.00 %" : objMonitoreo.PorcentajeAvanceObra.ToString() + " %";

                    if (data.Autorizacion != 0 && data.Desembolso!=0)
                    {
                        model.PorcentajePendienteAutorizacion = 100 - ((data.Autorizacion / data.Desembolso) * 100);
                        model.PendienteAutorizacion = (data.Desembolso - data.Autorizacion);
                    }
                    else
                    {
                        model.PorcentajePendienteAutorizacion = 100;
                        model.PendienteAutorizacion = data.Desembolso;
                    }

                    if (data.Manifiesto != 0)
                    {
                        model.PorcentajePendienteRendicion = 100 - ((data.Manifiesto / data.Autorizacion) * 100);
                        model.PendienteRendicion = (data.Autorizacion - data.Manifiesto);
                    }
                    else
                    {
                        model.PorcentajePendienteRendicion = 100;
                        model.PendienteRendicion = data.Autorizacion;
                    }
                    
                    
                   

                    if (MovimientoAG != null)
                    {
                        model.FechaUltAut = Convert.ToDateTime(MovimientoAG.Fecha_autorizacion).ToString("dd/MM/yyyy");
                    }
                    else
                    {
                        model.FechaUltAut = "";
                    }

                    if (MovimientoMG != null)
                    {
                        model.FechaUltMan = Convert.ToDateTime(MovimientoMG.FECHA_MANIFIESTO).ToString("dd/MM/yyyy");
                    }
                    else
                    {
                        model.FechaUltMan = "";
                    }


                    if (MovimientoAG != null)
                    {
                        if (MovimientoMG != null)
                        {
                            DateTime fechAg = Convert.ToDateTime(MovimientoAG.Fecha_autorizacion);
                            DateTime fechMg = Convert.ToDateTime(MovimientoMG.FECHA_MANIFIESTO);
                            TimeSpan diffechas = fechMg - fechAg;
                            int dias = diffechas.Days;

                            if (dias < 0)
                            {
                                diffechas = DateTime.Now - fechAg;
                                dias = diffechas.Days;
                            }

                            model.NroDias = dias;

                            if (model.NroDias <= 7)
                            {
                                model.Estado = 1;
                            }
                            else if (model.NroDias > 7)
                            {
                                model.Estado = 3;
                            }
                        }
                        else
                        {
                            DateTime fechAg = Convert.ToDateTime(MovimientoAG.Fecha_autorizacion);
                            DateTime fechMg = DateTime.Now;
                            TimeSpan diffechas = fechMg - fechAg;
                            int dias = diffechas.Days;
                            if (dias < 0) { dias = 0; }
                            model.NroDias = dias;

                            if (model.NroDias <= 7)
                            {
                                model.Estado = 1;
                            }
                            else if (model.NroDias > 7)
                            {
                                model.Estado = 3;
                            }
                        }
                    }
                    else
                    {
                        model.NroDias = 0;
                        model.Estado = 4;
                    }
                    
                    result.Add(model);
                    count++;
                }
            }
            return result.OrderBy(x=>x.Nro).ToList();
        }
        public EnDesembolsoVSJustificado GrfDesenbolsoVSJustificacion(string cod_dep, string cod_prov, string cod_dist, string snip, string cui)
        {
            List<DesembolsoVSJustificado> obj = new List<DesembolsoVSJustificado>();
            EnDesembolsoVSJustificado result = new EnDesembolsoVSJustificado();

            if (cod_dep == null || cod_dep == "") { cod_dep = "00"; }
            if (cod_dist == null || cod_dist == "") { cod_dist = "00"; }
            if (cod_prov == null || cod_prov == "") { cod_prov = "00"; }
            if (snip == null) { snip = ""; }
            if (cui == null) { cui = ""; }

            result.Manifiesto = context.DesembolsoVSJustificado.Where(x => (cod_dep == "00" || x.cod_dep == cod_dep) && (cod_prov == "00" || x.cod_prov == cod_prov) && (cod_dist == "00" || x.cod_dist == cod_dist) && (snip == "" || x.Snip == snip) && (cui == "" || x.CUI == cui)).Sum(x=>x.Manifiesto);
            result.Desembolso = context.DesembolsoVSJustificado.Where(x => (cod_dep == "00" || x.cod_dep == cod_dep) && (cod_prov == "00" || x.cod_prov == cod_prov) && (cod_dist == "00" || x.cod_dist == cod_dist) && (snip == "" || x.Snip == snip) && (cui == "" || x.CUI == cui)).Sum(x => x.Desembolso)- result.Manifiesto;

            return result;
        }
        public EnIndicadores Indicadores()
        {
            EnIndicadores result =new EnIndicadores();
            List<int> ListProyectos = context.Proyecto.Where(x => x.Cod_subprograma == 133 && x.Cod_modalidad==22 ).Select(x => x.IdProyecto).ToList();


            result.NroObras = context.Proyecto.Where(x => ListProyectos.Contains(x.IdProyecto)).Count();
            result.MontoObras = Convert.ToDecimal(context.Proyecto.Where(x => ListProyectos.Contains(x.IdProyecto)).Sum(x => x.Mto_proyecto));
            result.MtoAutorizacion = Convert.ToDecimal(context.Autorizacion_Gasto.Where(x =>ListProyectos.Contains(x.IdProyecto) && x.Estado_documento == 23 && x.Estado==1).Sum(x => x.Monto_autorizacion));
            
            result.MtoManifiesto = Convert.ToDecimal(context.MANIFIESTO_GASTO.Where(x =>ListProyectos.Contains(x.IDPROYECTO) && x.ESTADO_DOCUMENTO == 23 && x.ESTADO == 1).Sum(x => x.MONTO_MANIFIESTO));
            
            result.MtoDesembolso = Convert.ToDecimal(context.Proyecto.Where(x => ListProyectos.Contains(x.IdProyecto)).Sum(x=>x.MontoDesembolso));
            result.PorcentajeJustificacion = (result.MtoManifiesto / result.MtoDesembolso)*100;

            result.PorcentajePendienteAutorizacion =100 - ((result.MtoAutorizacion / result.MtoDesembolso) * 100);
            result.PorcentajePendienteRendicion =100 - ((result.MtoManifiesto / result.MtoAutorizacion) * 100);

            result.PendienteAutorizacion = (result.MtoDesembolso - result.MtoAutorizacion);
            result.PendienteRendicion = (result.MtoAutorizacion - result.MtoManifiesto);

            var obj = context.HistoricoMonitoreo.Where(x => x.Activo == true).OrderByDescending(x => x.FechaActualizacion).Take(2).ToList();

            if(obj!= null && obj.Count()>0)
            {
                var Actual = obj.FirstOrDefault();

                result.FechaActual = Convert.ToDateTime(Actual.FechaActualizacion).ToString("dd/MM/yyyy hh:mm:ss");

                var ultimo = obj.OrderBy(x => x.FechaActualizacion).FirstOrDefault();

                result.MtoDesembolsoAnterior = Convert.ToDecimal(ultimo.MontoTotalTransferido);
                result.MtoAutorizacionAnterior = Convert.ToDecimal(ultimo.MontoTotalAutorizaciones);
                result.MtoManifiestoAnterior = Convert.ToDecimal(ultimo.MontoTotalRendiciones);
                result.FechaAnterior = Convert.ToDateTime(ultimo.FechaActualizacion).ToString("dd/MM/yyyy hh:mm:ss");

            }
            else
            {
                result.MtoDesembolsoAnterior = 0;
                result.MtoAutorizacionAnterior = 0;
                result.MtoManifiestoAnterior = 0;
                result.FechaAnterior = "";
                result.FechaActual = "";
            }

            return result;
        }
        public EnIndicadores IndicadoresFiltro(string cod_dep, string cod_prov, string cod_dist, string snip, string cui, int anio)
        {
            EnIndicadores result = new EnIndicadores();
            if (cod_dep == null || cod_dep == "") { cod_dep = "00"; }
            if (cod_dist == null || cod_dist == "") { cod_dist = "00"; }
            if (cod_prov == null || cod_prov == "") { cod_prov = "00"; }
            if (snip == null) { snip = ""; }

            List<int> ListProyectos = context.Proyecto.Where(x => x.Cod_subprograma == 133 && (cod_dep == "00" || x.IdUbigeo.Substring(0, 2) == cod_dep) && (cod_prov == "00" || x.IdUbigeo.Substring(2, 2) == cod_prov) && (cod_dist == "00" || x.IdUbigeo.Substring(4, 2) == cod_dist) && (snip == "" || x.Snip == snip) && (cui == "" || x.CUI == cui) && x.Cod_modalidad == 22).Select(x => x.IdProyecto).ToList();


            result.NroObras = context.Proyecto.Where(x => ListProyectos.Contains(x.IdProyecto) && x.AnioEjecucion == anio).Count();
            result.MontoObras = Convert.ToDecimal(context.Proyecto.Where(x => ListProyectos.Contains(x.IdProyecto)).Sum(x => x.Mto_proyecto));
            result.MtoAutorizacion = Convert.ToDecimal(context.Autorizacion_Gasto.Where(x => x.Fecha_autorizacion.Value.Year == anio && ListProyectos.Contains(x.IdProyecto) && x.Estado_documento == 23 && x.Estado == 1).Sum(x => x.Monto_autorizacion));
            result.MtoAutorizacionGestionada = Convert.ToDecimal(context.Autorizacion_Gasto.Where(x => x.Fecha_autorizacion.Value.Year == anio && ListProyectos.Contains(x.IdProyecto) && x.Estado_documento != 23 && x.Estado == 1).Sum(x => x.Monto_autorizacion));
            result.MtoManifiesto = Convert.ToDecimal(context.MANIFIESTO_GASTO.Where(x => x.CORRESPONDE_AL_ANIO == anio && ListProyectos.Contains(x.IDPROYECTO) && x.ESTADO_DOCUMENTO == 23 && x.ESTADO == 1).Sum(x => x.MONTO_MANIFIESTO));
            result.MtoManifiestoGestionada = Convert.ToDecimal(context.MANIFIESTO_GASTO.Where(x => x.CORRESPONDE_AL_ANIO == anio && ListProyectos.Contains(x.IDPROYECTO) && x.ESTADO_DOCUMENTO != 23 && x.ESTADO == 1).Sum(x => x.MONTO_MANIFIESTO));
            result.MtoDesembolso = Convert.ToDecimal(context.Desembolso.Where(x => x.Anio == anio && x.Activo == true).Sum(x => x.MontoDesembolsado));
            if (result.MtoDesembolso != 0)
            {
                result.PorcentajeJustificacion = (result.MtoManifiesto / result.MtoDesembolso) * 100;
            }
            else
            {
                result.PorcentajeJustificacion = 0;
            }

            return result;
        }
        public List<EnListEstadoActividad> ListEstadoActividad(string cod_dep, string cod_prov, string cod_dist, string snip, string cui)
        {
            List<ListEstadoActividad> obj = new List<ListEstadoActividad>();
            List<EnListEstadoActividad> result = new List<EnListEstadoActividad>();

            if (cod_dep == null || cod_dep == "") { cod_dep = "00"; }
            if (cod_dist == null || cod_dist == "") { cod_dist = "00"; }
            if (cod_prov == null || cod_prov == "") { cod_prov = "00"; }
            if (snip == null) { snip = ""; }
            if (cui == null) { cui = ""; }

            //if(cod_dep=="00" && cod_dist=="00" && cod_prov=="00" && )
            obj = context.ListEstadoActividad.Where(x => (cod_dep == "00" || x.cod_dep == cod_dep) && (cod_prov == "00" || x.cod_prov == cod_prov) && (cod_dist == "00" || x.cod_dist == cod_dist) && (snip == "" || x.SNIP == snip) && (cui == "" || x.CUI == cui)).OrderBy(x => x.estado).ToList();
            if (obj != null && obj.Count() > 0)
            {
                foreach (var data in obj)
                {

                    EnListEstadoActividad model = new EnListEstadoActividad();
                    model.IdProyecto = data.IdProyecto;
                    model.SNIP = data.SNIP;
                    model.CUI = data.CUI;
                    model.DEPARTAMENTO = data.DEPARTAMENTO;
                    model.PROVINCIA = data.PROVINCIA;
                    model.DISTRITO = data.DISTRITO;
                    model.PROYECTO = data.PROYECTO;
                    model.LOCALIDAD = data.LOCALIDAD;
                    model.MTO_PROYECTO = data.MTO_PROYECTO;
                    model.TOTAL_AUTORIZACION = data.TOTAL_AUTORIZACION;
                    model.TOTAL_MANIFIESTO = data.TOTAL_MANIFIESTO;
                    model.fecha_ult_act = data.fecha_ult_act;
                    model.estado = data.estado;

                    result.Add(model);
                }
            }
            return result.ToList();
        }
        public List<EnHistoricoMonitoreo> GraficoHistorial()
        {
            List<HistoricoMonitoreo> obj = new List<HistoricoMonitoreo>();
            List<EnHistoricoMonitoreo> result = new List<EnHistoricoMonitoreo>();

            obj = context.HistoricoMonitoreo.Where(x => x.Activo == true).OrderBy(x => x.FechaActualizacion).ToList();

            string[] meses = { "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" };
            if (obj != null && obj.Count() > 0)
            {
                for (int i = 1; i <= 12; i++)
                {
                    var mes = obj.Where(x => x.FechaActualizacion.Value.Month == i).OrderByDescending(x => x.FechaActualizacion).FirstOrDefault();

                    if(mes!=null)
                    {
                        DateTime primerDia = new DateTime(DateTime.Now.Year, i, 1);
                        DateTime ultimoDia = primerDia.AddMonths(1).AddDays(-1);

                        EnHistoricoMonitoreo model = new EnHistoricoMonitoreo();
                        model.MontoTotalAutorizaciones = mes.MontoTotalAutorizaciones;
                        model.MontoTotalTransferido = mes.MontoTotalTransferido;
                        model.MontoTotalRendiciones = mes.MontoTotalRendiciones;
                        model.FechaActualizacion = mes.FechaActualizacion;
                        model.StringFechaActualizacion = mes.FechaActualizacion.Value.Year.ToString()+ "-" + i + "-" + ultimoDia.Day.ToString();//Convert.ToDateTime(data.FechaActualizacion).ToString("yyyy-MM-ddTHH:mm:ss");

                        model.Mes = meses[i - 1];
                        model.MontoTransferidoPorcentaje = 100;
                        model.MontoRendicionesPorcentaje = (mes.MontoTotalRendiciones / mes.MontoTotalTransferido) * 100;
                        model.MontoAutorizacionesPorcentaje = (mes.MontoTotalAutorizaciones / mes.MontoTotalTransferido) * 100;
                       
                        result.Add(model);
                    }

                }
            }
            return result.OrderBy(x=>x.FechaActualizacion).ToList();
        }

        public List<EnEstadoFinanciero> ListResumenEstadoFinanciero()
        {
            List<EnEstadoFinanciero> result = new List<EnEstadoFinanciero>();
            List<EnDesembolsoVSJustificado> List = ListDesenbolsoVSJustificacion(0);

            var departamentos = List.Select(x => x.Departamento).Distinct();
            var totalporAutorizar = List.Sum(x => x.PendienteAutorizacion);
            var totalporRendir = List.Sum(x => x.PendienteRendicion);
            var totalporejecutar = totalporAutorizar + totalporRendir;
            var count = 1;

            foreach (var dep in departamentos)
            {
                EnEstadoFinanciero estado = new EnEstadoFinanciero();
                estado.orden = count;
                estado.Departamento = dep;
                estado.PendienteAutorizacion = List.Where(x => x.Departamento == dep).Sum(x => x.PendienteAutorizacion);
                estado.PendienteRendicion = List.Where(x => x.Departamento == dep).Sum(x => x.PendienteRendicion);
                estado.TotalAutorizacion = List.Where(x => x.Departamento == dep).Sum(x => x.Autorizacion);
                estado.TotalRendicion = List.Where(x => x.Departamento == dep).Sum(x => x.Manifiesto);
                estado.TotalPorEjecutar = estado.PendienteAutorizacion + estado.PendienteRendicion;
                if (estado.PorcentajeTotalPorEjecutar == 0)
                {
                    estado.PorcentajeTotalPorEjecutar = 0;
                }
                else
                {
                    estado.PorcentajeTotalPorEjecutar = (estado.TotalPorEjecutar / totalporejecutar) * 100;
                }
                result.Add(estado);
                count++;
            }

            return result.OrderByDescending(x=>x.TotalPorEjecutar).ToList();
        }
        public List<EnEstadoFinanciero> ListResumenEstadoFinancieroCuadro()
        {
            List<EnEstadoFinanciero> result = new List<EnEstadoFinanciero>();
            List<EnDesembolsoVSJustificado> List = ListDesenbolsoVSJustificacion(0);

            var departamentos = List.Select(x => x.Departamento).Distinct();
            var totalporAutorizar = List.Sum(x => x.PendienteAutorizacion);
            var totalporRendir = List.Sum(x => x.PendienteRendicion);
            var totalporejecutar = totalporAutorizar + totalporRendir;
            var count = 1;

            foreach (var dep in departamentos)
            {
                EnEstadoFinanciero estado = new EnEstadoFinanciero();
                estado.orden = count;
                estado.Departamento = dep;
                estado.PendienteAutorizacion = List.Where(x => x.Departamento == dep).Sum(x => x.PendienteAutorizacion);
                estado.PendienteRendicion = List.Where(x => x.Departamento == dep).Sum(x => x.PendienteRendicion);
                estado.TotalAutorizacion = List.Where(x => x.Departamento == dep).Sum(x => x.Autorizacion);
                estado.TotalRendicion = List.Where(x => x.Departamento == dep).Sum(x => x.Manifiesto);
                estado.TotalPorEjecutar = estado.PendienteAutorizacion + estado.PendienteRendicion;
                if (estado.TotalPorEjecutar == 0)
                {
                    estado.PorcentajeTotalPorEjecutar = 0;
                }
                else
                {
                    estado.PorcentajeTotalPorEjecutar = (estado.TotalPorEjecutar / totalporejecutar) * 100;
                }
                result.Add(estado);
                count++;
            }

            result = result.OrderByDescending(x => x.TotalPorEjecutar).ToList();

            EnEstadoFinanciero total = new EnEstadoFinanciero();
            total.orden = count;
            total.Departamento = "TOTAL";
            total.PendienteAutorizacion = totalporAutorizar;
            total.PendienteRendicion = totalporRendir;
            total.TotalAutorizacion = List.Sum(x => x.Autorizacion);
            total.TotalRendicion = List.Sum(x => x.Manifiesto);
            total.TotalPorEjecutar = total.PendienteAutorizacion + total.PendienteRendicion;
            if (total.TotalPorEjecutar == 0)
            {
                total.PorcentajeTotalPorEjecutar = 0;
            }
            else
            {
                total.PorcentajeTotalPorEjecutar = (total.TotalPorEjecutar / totalporejecutar) * 100;
            }
            result.Add(total);

            return result;
        }
        public List<EnDesembolsoVSJustificado> ListProyectosEstadoFinanciero(string dep)
        {
            List<EnDesembolsoVSJustificado> result = new List<EnDesembolsoVSJustificado>();
            var List = ListDesenbolsoVSJustificacion(0).Where(x => x.Departamento == dep).OrderBy(a => a.Grupo).ToList();
            var count = 1;
            var grupoactual = "";
            decimal totalproyecto = 0;
            decimal totaltrasnferido = 0;
            decimal totalautorizado = 0;
            decimal pendienteautorizar = 0;
            decimal totalrendido = 0;
            decimal pendienterendicion = 0;
            var last = List.Last();

            foreach (var lista in List)
            {
                if (grupoactual == lista.Grupo)
                {
                    EnDesembolsoVSJustificado model = new EnDesembolsoVSJustificado();
                    model.Nro = count;
                    model.Snip = lista.Snip;
                    model.CUI = lista.CUI;
                    model.Grupo = lista.Grupo;
                    model.Departamento = lista.Departamento;
                    model.Localidad = lista.Localidad;
                    model.Mto_proyecto = lista.Mto_proyecto;
                    model.Manifiesto = lista.Manifiesto;
                    model.Autorizacion = lista.Autorizacion;
                    model.PendienteAutorizacion = lista.PendienteAutorizacion;
                    model.PorcentajePendienteAutorizacion = lista.PorcentajePendienteAutorizacion;
                    model.PendienteRendicion = lista.PendienteRendicion;
                    model.PorcentajePendienteRendicion = lista.PorcentajePendienteRendicion;
                    model.Desembolso = lista.Desembolso;
                    model.Liquidador = lista.Liquidador;
                    model.Anio = Convert.ToInt32(lista.Anio);
                    model.PorcentajeAvanceFisico = lista.PorcentajeAvanceFisico;

                    totalproyecto = totalproyecto + Convert.ToDecimal(lista.Mto_proyecto);
                    totaltrasnferido = totaltrasnferido + lista.Desembolso;
                    totalautorizado = totalautorizado + lista.Autorizacion;
                    pendienteautorizar = pendienteautorizar + lista.PendienteAutorizacion;
                    totalrendido = totalrendido + lista.Manifiesto;
                    pendienterendicion = pendienterendicion + lista.PendienteRendicion;

                    result.Add(model);
                    count++;
                }
                else
                {
                    if (grupoactual != "")
                    {
                        EnDesembolsoVSJustificado total = new EnDesembolsoVSJustificado();
                        total.Localidad = "TOTAL";
                        total.Mto_proyecto = totalproyecto;
                        total.Desembolso = totaltrasnferido;
                        total.Manifiesto = totalrendido;
                        total.Autorizacion = totalautorizado;
                        total.PendienteAutorizacion = pendienteautorizar;
                        total.PendienteRendicion = pendienterendicion;
                        result.Add(total);
                    }

                    count = 1;
                    totalproyecto = 0;
                    totaltrasnferido = 0;
                    totalautorizado = 0;
                    pendienteautorizar = 0;
                    totalrendido = 0;
                    pendienterendicion = 0;

                    grupoactual = lista.Grupo;

                    EnDesembolsoVSJustificado model = new EnDesembolsoVSJustificado();
                    model.Nro = count;
                    model.Snip = lista.Snip;
                    model.CUI = lista.CUI;
                    model.Grupo = lista.Grupo;
                    model.Departamento = lista.Departamento;
                    model.Localidad = lista.Localidad;
                    model.Mto_proyecto = lista.Mto_proyecto;
                    model.Manifiesto = lista.Manifiesto;
                    model.Autorizacion = lista.Autorizacion;
                    model.PendienteAutorizacion = lista.PendienteAutorizacion;
                    model.PorcentajePendienteAutorizacion = lista.PorcentajePendienteAutorizacion;
                    model.PendienteRendicion = lista.PendienteRendicion;
                    model.PorcentajePendienteRendicion = lista.PorcentajePendienteRendicion;
                    model.Desembolso = lista.Desembolso;
                    model.Liquidador = lista.Liquidador;
                    model.Anio = Convert.ToInt32(lista.Anio);
                    model.PorcentajeAvanceFisico = lista.PorcentajeAvanceFisico;

                    totalproyecto = totalproyecto + Convert.ToDecimal(lista.Mto_proyecto);
                    totaltrasnferido = totaltrasnferido + lista.Desembolso;
                    totalautorizado = totalautorizado + lista.Autorizacion;
                    pendienteautorizar = pendienteautorizar + lista.PendienteAutorizacion;
                    totalrendido = totalrendido + lista.Manifiesto;
                    pendienterendicion = pendienterendicion + lista.PendienteRendicion;

                    result.Add(model);
                    count++;

                }

                if (lista.Equals(last))
                {
                    EnDesembolsoVSJustificado total = new EnDesembolsoVSJustificado();
                    total.Localidad = "TOTAL";
                    total.Mto_proyecto = totalproyecto;
                    total.Desembolso = totaltrasnferido;
                    total.Manifiesto = totalrendido;
                    total.Autorizacion = totalautorizado;
                    total.PendienteAutorizacion = pendienteautorizar;
                    total.PendienteRendicion = pendienterendicion;
                    result.Add(total);
                }

            }

            return result;
        }

        public List<EnDesembolsoProgramadoMensual> GraficoDesembolsoProgramado(int anio)
        {
            List<EnDesembolsoProgramadoMensual> result = new List<EnDesembolsoProgramadoMensual>();

            var obj = context.DesembolsoProgramadoAnual.Where(x =>x.Anio==anio && x.Activo == true).ToList();

            string[] meses = { "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" };
            if (obj != null && obj.Count() > 0)
            {
                

                for (int i = 1; i <= 12; i++)
                {
                    decimal? Programado = 0;
                    decimal? Ejecutado = 0;

                    foreach (var item in obj)
                    {
                        var objMensual = context.DesembolsoProgramadoMensual.Where(x => x.IdProgramadoAnual == item.IdProgramadoAnual && x.Mes == i).OrderByDescending(x => x.Fecha_add).FirstOrDefault();
                        Programado = Programado + (objMensual.ROProgramado + objMensual.ROOCProgramado);
                        Ejecutado = Ejecutado + (objMensual.RO + objMensual.ROOC);
                    }

                    EnDesembolsoProgramadoMensual model = new EnDesembolsoProgramadoMensual();
                    model.Mes = i;
                    model.MesNombre = meses[i - 1];
                    model.TotalProgramado = Programado;
                    model.TotalEjecutado = Ejecutado;
                    result.Add(model);
                }

            }
            return result.ToList();
        }
        public List<EnDesembolsoProgramadoMensual> ListDesembolsoProgramado(int anio, int mes)
        {
            List<EnDesembolsoProgramadoMensual> result = new List<EnDesembolsoProgramadoMensual>();

            var obj = context.DesembolsoProgramadoAnual.Where(x => x.Anio == anio && x.Activo == true).ToList();

            string[] meses = { "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" };
            if (obj != null && obj.Count() > 0)
            {
                foreach (var item in obj)
                {
                    var Proyecto = context.Proyecto.SingleOrDefault(x => x.IdProyecto == item.IdProyecto);
                    var objMensual = context.DesembolsoProgramadoMensual.Where(x => x.IdProgramadoAnual == item.IdProgramadoAnual && x.Mes == mes).OrderByDescending(x => x.Fecha_add).FirstOrDefault();

                    EnDesembolsoProgramadoMensual model = new EnDesembolsoProgramadoMensual();
                    model.CUI = Proyecto.CUI;
                    model.SNIP = Proyecto.Snip;
                    model.Localidad = Proyecto.Localidad;
                    model.MesNombre = meses[mes - 1];
                    model.ROProgramado = objMensual.ROProgramado;
                    model.ROOCProgramado = objMensual.ROOCProgramado;
                    model.RO = objMensual.RO;
                    model.ROOC = objMensual.ROOC;
                    model.TotalProgramado = model.ROProgramado + model.ROOCProgramado;
                    model.TotalEjecutado = model.RO + model.ROOC;
                    model.Diferencia = model.TotalProgramado - model.TotalEjecutado;
                    result.Add(model);
                }
            }
            return result.ToList();
        }

        public List<EnDesembolsoVSJustificado> ListMontoGiradoPendiente()
        {
            List<DesembolsoVSJustificado> obj = new List<DesembolsoVSJustificado>();
            List<EnDesembolsoVSJustificado> result = new List<EnDesembolsoVSJustificado>();

            obj = context.DesembolsoVSJustificado.Where(x=>x.Mto_proyecto>x.Desembolso).OrderByDescending(x => x.Desembolso).ToList();

            if (obj != null && obj.Count() > 0)
            {
                var count = 0;
                //var obj1 = obj.OrderBy(x => x.Porcentaje).GroupBy(x => x.AnioEjecucion).ToList();
                //var obj2 = obj
                foreach (var data in obj)
                {
                    var objMonitoreo = context.MonitoreoObras.Where(x => x.IdProyecto == data.IdProyecto && x.Activo == true).OrderByDescending(x => x.Fecha_add).FirstOrDefault();

                    EnDesembolsoVSJustificado model = new EnDesembolsoVSJustificado();
                    model.Nro = count + 1;
                    model.Programa = data.Programa;
                    model.Departamento = data.Departamento;
                    model.Provincia = data.Provincia;
                    model.Distrito = data.Distrito;
                    model.Localidad = data.Localidad;
                    model.Snip = data.Snip;
                    model.CUI = data.CUI;
                    model.Nom_proyecto = data.Nom_proyecto;
                    model.Mto_proyecto = data.Mto_proyecto;
                    model.Manifiesto = data.Manifiesto;
                    model.Autorizacion = data.Autorizacion;
                    model.ManifiestoGestionado = data.ManifiestoGestionado;
                    model.AutorizacionGestionada = data.AutorizacionGestionada;
                    model.Desembolso = data.Desembolso;
                    model.Porcentaje = data.Porcentaje;
                    model.Liquidador = data.Liquidador;
                    model.Anio = Convert.ToInt32(data.AnioEjecucion);
                    model.Grupo = data.Grupo;
                    model.PorcentajeAvanceFisico = objMonitoreo == null ? "0.00 %" : objMonitoreo.PorcentajeAvanceObra.ToString() + " %";
                    model.MontoPendienteTransferir = model.Mto_proyecto - model.Desembolso;
                    model.PorcentajePendienteTransferir = (model.MontoPendienteTransferir / model.Mto_proyecto) * 100;


                    result.Add(model);
                    count++;
                }
            }
            return result.OrderBy(x => x.Nro).ToList();

        }
    }
}
