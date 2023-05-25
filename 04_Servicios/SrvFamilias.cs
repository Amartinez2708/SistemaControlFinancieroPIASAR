using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using _02_Entidades;
using _03_Data;

namespace _04_Servicios
{
    public class SrvFamilias
    {
        BD_NucleosEjecutoresEntities context = new BD_NucleosEjecutoresEntities();

        public List<EnProyecto> ListProyectosFamilias()
        {
            List<EnProyecto> result = new List<EnProyecto>();

            var obj = context.Proyecto.Where(x => x.Cod_subprograma == 133 && x.Estado == 1).ToList();
            if (obj != null && obj.Count() > 0)
            {
                foreach (var data in obj)
                {
                    var departamento = context.Departamento.FirstOrDefault(x => x.cod_depa == data.IdUbigeo.Substring(0, 2)).nom_depa;
                    var Provincia = context.Provincia.FirstOrDefault(x => x.cod_depa == data.IdUbigeo.Substring(0, 2) && x.cod_prov == data.IdUbigeo.Substring(2, 2)).nom_prov;
                    var Distrito = context.Distrito.FirstOrDefault(x => x.cod_depa == data.IdUbigeo.Substring(0, 2) && x.cod_prov == data.IdUbigeo.Substring(2, 2) && x.cod_dist == data.IdUbigeo.Substring(4, 2)).nom_dist;
                    var o = context.SeguimientoActividadesFamilias.FirstOrDefault(x => x.CUI == data.CUI && x.Activo == true);

                    EnProyecto model = new EnProyecto();
                    model.IdProyecto = data.IdProyecto;
                    model.Snip = data.Snip;
                    model.CUI = data.CUI;
                    model.Modalidad = data.Cod_modalidad == 22 ? "Núcleo Ejecutor" : "Contrata";
                    model.IdUbigeo = data.IdUbigeo;
                    model.Departamento = departamento;
                    model.Provincia = Provincia;
                    model.Distrito = Distrito;
                    model.Nom_proyecto = data.Nom_proyecto;
                    model.Localidad = data.Localidad;
                    model.FechaActualizacion = o == null ? "Sin Seguimiento" : Convert.ToDateTime(o.Fecha_upd).ToString("dd/MM/yyyy hh:mm:ss");

                    result.Add(model);
                }
            }
            return result.ToList();
        }
        public List<EnDropDownList> ddlMeses(string Etapa)
        {
            List<EnDropDownList> result = new List<EnDropDownList>();

            var obj = context.CronogramaActividades.Where(x => x.Tipo == "Familias" && x.Etapa == Etapa).Select(x => x.NroMes).Distinct();
            if (obj != null && obj.Count() > 0)
            {
                EnDropDownList ddl = new EnDropDownList();
                ddl.id = 0;
                ddl.text = "[--Seleccione--]";
                result.Add(ddl);

                EnDropDownList values;
                foreach (var data in obj)
                {
                    values = new EnDropDownList();
                    values.id = Convert.ToInt32(data);
                    values.text = data.ToString();
                    result.Add(values);
                }
            }
            return result;
        }

        public List<EnDropDownList> ddlActividad(string Etapa, int NroMes)
        {
            List<EnDropDownList> result = new List<EnDropDownList>();

            var obj = context.CronogramaActividades.Where(x => x.Tipo == "Familias" && x.Etapa == Etapa && x.NroMes== NroMes);
            if (obj != null && obj.Count() > 0)
            {
                EnDropDownList ddl = new EnDropDownList();
                ddl.id = 0;
                ddl.text = "[--Seleccione--]";
                result.Add(ddl);

                EnDropDownList values;
                foreach (var data in obj)
                {
                    values = new EnDropDownList();
                    values.id = data.IdCronogramaActividades;
                    values.text = data.Actividad;
                    result.Add(values);
                }
            }
            return result;
        }
        public List<EnDetalleSeguimientoActividadesFamilias> ListDetalleSeguimiento(string cui, int IdCronogramaActividades)
        {
            List<EnDetalleSeguimientoActividadesFamilias> result = new List<EnDetalleSeguimientoActividadesFamilias>();

            var obj = context.SeguimientoActividadesFamilias.Where(x => x.CUI == cui && x.Activo == true).SingleOrDefault();
            if (obj != null)
            {
                var objDetalle = context.DetalleSeguimientoActividadesFamilias.Where(x => x.IdSeguimientoActividades == obj.IdSeguimientoActividades && x.IdCronogramaActividades == IdCronogramaActividades && x.Activo == true).ToList();

                foreach (var data in objDetalle)
                {
                    EnDetalleSeguimientoActividadesFamilias model = new EnDetalleSeguimientoActividadesFamilias();
                    model.Actividades = data.CronogramaActividades.Actividad;
                    model.FechaString = Convert.ToDateTime(data.Fecha).ToString("dd/MM/yyyy");
                    model.NroHombres = data.NroHombres;
                    model.NroMujeres = data.NroMujeres;
                    model.Total = data.Total;
                    model.PorcentageAsistencia = data.PorcentageAsistencia;
                    
                    result.Add(model);
                }
            }
            return result.ToList();
        }
    }
}
