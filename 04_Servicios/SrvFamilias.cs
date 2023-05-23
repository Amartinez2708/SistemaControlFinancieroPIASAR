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
    }
}
