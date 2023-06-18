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
    public class SrvAsignacionProyectos
    {
        BD_NucleosEjecutoresEntities context = new BD_NucleosEjecutoresEntities();
        public List<EnDropDownList> ddlPersonal()
        {
            List<EnDropDownList> result = new List<EnDropDownList>();

            var obj = context.Persona.Where(x => x.IdPersona != 1 && x.IdCargo != 1 && x.Activo == true).ToList();
            if (obj != null && obj.Count() > 0)
            {
                EnDropDownList unidad = new EnDropDownList();
                unidad.id = 0;
                unidad.text = "[--Seleccione Personal--]";
                result.Add(unidad);

                EnDropDownList values;
                foreach (var data in obj)
                {
                    values = new EnDropDownList();
                    values.id = data.IdPersona;
                    values.text = data.ApePaterno + " " + data.ApeMaterno + ", " + data.Nombres + " - [" + data.Cargo.Cargo1 + "]";
                    result.Add(values);
                }
            }
            return result;
        }
        public List<EnDropDownList> chkProyectos()
        {
            List<EnDropDownList> result = new List<EnDropDownList>();

            var obj = context.Proyecto.Where(x => x.Cod_subprograma == 133 && x.Estado == 1).ToList();
            if (obj != null && obj.Count() > 0)
            {
                EnDropDownList values;
                foreach (var data in obj)
                {
                    values = new EnDropDownList();
                    values.id = data.IdProyecto;
                    values.text = "[" + data.CUI + "]-" + data.Localidad;
                    result.Add(values);
                }
            }
            return result;
        }
    }
}
