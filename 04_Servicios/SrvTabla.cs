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
    public class SrvTabla
    {
        BD_NucleosEjecutoresEntities context = new BD_NucleosEjecutoresEntities();

        public List<EnDropDownList> ddlTablaDetalle(string IdsTabla)
        {
            var searchIds = new List<int> {};
            List<EnDropDownList> result = new List<EnDropDownList>();

            char[] spearator = { ',' };
            String[] Ids = IdsTabla.Split(spearator);

            foreach (String IdTabla in Ids)
            {
                searchIds.Add(Convert.ToInt32(IdTabla));
            }

            var obj = context.TABLA_DETALLE.Where(l => searchIds.Contains(l.IDTABLA) && l.NESTADO==1);
            if (obj != null && obj.Count() > 0)
            {
                EnDropDownList t = new EnDropDownList();
                t.id = -1;
                t.text = "[--Seleccione--]";
                result.Add(t);

                EnDropDownList values;
                foreach (var data in obj)
                {
                    values = new EnDropDownList();
                    values.id = data.IDDETALLE;
                    values.text = data.SDETALLE;
                    result.Add(values);
                }
            }
            return result;
        }
    }
}
