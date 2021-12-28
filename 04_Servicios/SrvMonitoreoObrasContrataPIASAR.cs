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
    public class SrvMonitoreoObrasContrataPIASAR
    {
        BD_NucleosEjecutoresEntities context = new BD_NucleosEjecutoresEntities();

        public List<EnMonitoreoGeneral> ListMonitoreoGeneralPorEquipos(int anio)
        {
            List<EnMonitoreoGeneral> result = new List<EnMonitoreoGeneral>();

            List<int> Grupo1 = context.ProyectosSeguimiento.Where(x => (x.CodGrupo == 1 || x.CodGrupo == 2) && x.Activo == true).Select(x => x.IdProyectosSeguimiento).Distinct().ToList();//CT
            List<int> Grupo2 = context.ProyectosSeguimiento.Where(x => (x.CodGrupo ==4) && x.Activo == true).Select(x => x.IdProyectosSeguimiento).Distinct().ToList();//CA
            List<int> Grupo3 = context.ProyectosSeguimiento.Where(x => (x.CodGrupo ==3) && x.Activo == true).Select(x => x.IdProyectosSeguimiento).Distinct().ToList();//C2

            string[] meses = { "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre" };

            for (int i = 1; i <= 12; i++)
            {

                decimal? meta = 0;
                decimal? resultado = 0;

                EnMonitoreoGeneral m = new EnMonitoreoGeneral();
                m.Mes = i;
                m.Anio = anio;
                m.MesS = meses[i - 1];
                m.MesAnio = meses[i-1] + " - " + anio;
                m.MetaMes_CT = 0;
                m.ResultadoMes_CT = 0;
                m.PorcentajeMes_CT = 0;
                m.MetaMes_CA = 0;
                m.ResultadoMes_CA = 0;
                m.PorcentajeMes_CA = 0;
                m.MetaMes_C2 = 0;
                m.ResultadoMes_C2 = 0;
                m.PorcentajeMes_C2 = 0;
                m.MetaMes_T = 0;
                m.ResultadoMes_T = 0;
                m.PorcentajeMes_T = 0;

                foreach (int Id in Grupo1)
                {
                    var objFila = context.SeguimientoEjecucionProyectosInversion.Where(x => x.IdProyectosSeguimiento == Id && x.AnioEjecucion == anio && x.Mes == i && x.Activo == true).OrderByDescending(x => x.Fecha).ThenByDescending(q => q.Fecha_add).FirstOrDefault();
                    if (objFila != null)
                    {
                        m.fecha = objFila.Fecha == null ? "" : Convert.ToDateTime(objFila.Fecha).ToString("dd/MM/yyyy");

                        var Programado = context.ProgramadoEjecutadoMensual.SingleOrDefault(x => x.IdSeguimientoEjecucionProyectosInversion == objFila.IdSeguimientoEjecucionProyectosInversion && x.Activo == true);
                        meta = meta + (Programado.ProgramadoMes == null ? 0 : Programado.ProgramadoMes);

                        var Devengado = context.DevengadoMensual.SingleOrDefault(x => x.IdSeguimientoEjecucionProyectosInversion == objFila.IdSeguimientoEjecucionProyectosInversion && x.Activo == true);
                        resultado = resultado + (Devengado.DevengadoAcumulado == null ? 0 : Devengado.DevengadoAcumulado);
                    }
                }

                m.MetaMes_CT = meta;
                m.ResultadoMes_CT = resultado;

                if (m.MetaMes_CT == 0)
                {
                    m.PorcentajeMes_CT = 0;
                }
                else
                {
                    m.PorcentajeMes_CT = (m.ResultadoMes_CT / m.MetaMes_CT) * 100;
                }

                meta = 0;
                resultado = 0;

                foreach (int Id in Grupo2)
                {
                    var objFila = context.SeguimientoEjecucionProyectosInversion.Where(x => x.IdProyectosSeguimiento == Id && x.AnioEjecucion == anio && x.Mes == i && x.Activo == true).OrderByDescending(x => x.Fecha).ThenByDescending(q => q.Fecha_add).FirstOrDefault();
                    if (objFila != null)
                    {
                        var Programado = context.ProgramadoEjecutadoMensual.SingleOrDefault(x => x.IdSeguimientoEjecucionProyectosInversion == objFila.IdSeguimientoEjecucionProyectosInversion && x.Activo == true);
                        meta = meta + (Programado.ProgramadoMes == null ? 0 : Programado.ProgramadoMes);

                        var Devengado = context.DevengadoMensual.SingleOrDefault(x => x.IdSeguimientoEjecucionProyectosInversion == objFila.IdSeguimientoEjecucionProyectosInversion && x.Activo == true);
                        resultado = resultado + (Devengado.DevengadoAcumulado == null ? 0 : Devengado.DevengadoAcumulado);
                    }
                }

                m.MetaMes_CA = meta;
                m.ResultadoMes_CA = resultado;

                if (m.MetaMes_CA == 0)
                {
                    m.PorcentajeMes_CA = 0;
                }
                else
                {
                    m.PorcentajeMes_CA = (m.ResultadoMes_CA / m.MetaMes_CA) * 100;
                }


                meta = 0;
                resultado = 0;

                foreach (int Id in Grupo3)
                {
                    var objFila = context.SeguimientoEjecucionProyectosInversion.Where(x => x.IdProyectosSeguimiento == Id && x.AnioEjecucion == anio && x.Mes == i && x.Activo == true).OrderByDescending(x => x.Fecha).ThenByDescending(q => q.Fecha_add).FirstOrDefault();
                    if (objFila != null)
                    {
                        var Programado = context.ProgramadoEjecutadoMensual.SingleOrDefault(x => x.IdSeguimientoEjecucionProyectosInversion == objFila.IdSeguimientoEjecucionProyectosInversion && x.Activo == true);
                        meta = meta + (Programado.ProgramadoMes == null ? 0 : Programado.ProgramadoMes);

                        var Devengado = context.DevengadoMensual.SingleOrDefault(x => x.IdSeguimientoEjecucionProyectosInversion == objFila.IdSeguimientoEjecucionProyectosInversion && x.Activo == true);
                        resultado = resultado + (Devengado.DevengadoAcumulado == null ? 0 : Devengado.DevengadoAcumulado);
                    }
                }

                m.MetaMes_C2 = meta;
                m.ResultadoMes_C2 = resultado;

                if (m.MetaMes_C2 == 0)
                {
                    m.PorcentajeMes_C2 = 0;
                }
                else
                {
                    m.PorcentajeMes_C2 = (m.ResultadoMes_C2 / m.MetaMes_C2) * 100;
                }


                m.MetaMes_T = m.MetaMes_C2 + m.MetaMes_CA + m.MetaMes_CT;
                m.ResultadoMes_T = m.ResultadoMes_C2 + m.ResultadoMes_CA + m.ResultadoMes_CT;

                if (m.MetaMes_T == 0)
                {
                    m.PorcentajeMes_T = 0;
                }
                else
                {
                    m.PorcentajeMes_T = (m.ResultadoMes_T / m.MetaMes_T) * 100;
                }

                result.Add(m);
            }

            return result.Where(x => x.PorcentajeMes_T != 0).ToList();
        }

    }
}
