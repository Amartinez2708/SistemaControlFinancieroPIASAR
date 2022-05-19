using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using _02_Entidades;
using _03_Data;


namespace _04_Servicios
{
    public class SrvEjecucionPresupuestalPNSR
    {
        BD_NucleosEjecutoresEntities context = new BD_NucleosEjecutoresEntities();
        public EnIndicadores Indicadores(int Anio)
        {
            EnIndicadores result = new EnIndicadores();

            var obj = context.EjecucionInversion.Where(x => x.Activo == true && x.Anio == Anio);

            result.mtoTotalPIM = obj.Where(x => x.Nivel == 1).Sum(x => x.PIM);
            result.mtoTotalGastosCorrientes = obj.Where(x => x.IdCategoriaGasto == 1 && x.Nivel == 1).Sum(x => x.PIM);
            result.mtoTotalGastosCapital = obj.Where(x => x.IdCategoriaGasto == 2 && x.Nivel == 1).Sum(x => x.PIM);
            result.mtoTotalCertificado = obj.Where(x => x.Nivel == 1).Sum(x => x.Certificado);
            result.mtoTotalComprometido = obj.Where(x => x.Nivel == 1).Sum(x => x.Compromiso);
            result.mtoTotalDevengado = obj.Where(x => x.Nivel == 1).Sum(x => x.Devengado);

            return result;
        }

        public List<EnEjecucionInversionMes> ListEjecucionMes(int anio)
        {
            List<EnEjecucionInversionMes> result = new List<EnEjecucionInversionMes>();

            var objEjecucionPIASAR = context.EjecucionInversion.Where(x => x.Activo == true && x.Anio == anio && x.Nivel == 3 && x.GenericaGasto == "PIASAR").FirstOrDefault();
            var objEjecucionAR = context.EjecucionInversion.Where(x => x.Activo == true && x.Anio == anio && x.Nivel == 3 && x.GenericaGasto == "Amazonia Rural").FirstOrDefault();
            var objEjecucionUTP = context.EjecucionInversion.Where(x => x.Activo == true && x.Anio == anio && x.Nivel == 3 && x.GenericaGasto == "UTP, FONDES, EX PROCOES").FirstOrDefault();

            string[] meses = { "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre" };
            for (int i = 1; i <= 12; i++)
            {
                var objEjecucionPIASARMes = context.EjecucionInversionMes.Where(x => x.Activo == true && x.IdEjecucionInversion == objEjecucionPIASAR.IdEjecucionInversion && x.Mes==i).OrderByDescending(x => x.Fecha).ThenByDescending(q => q.Fecha_add).FirstOrDefault();
                var objEjecucionARMes = context.EjecucionInversionMes.Where(x => x.Activo == true && x.IdEjecucionInversion == objEjecucionAR.IdEjecucionInversion && x.Mes == i).OrderByDescending(x => x.Fecha).ThenByDescending(q => q.Fecha_add).FirstOrDefault();
                var objEjecucionUTPMes = context.EjecucionInversionMes.Where(x => x.Activo == true && x.IdEjecucionInversion == objEjecucionUTP.IdEjecucionInversion && x.Mes == i).OrderByDescending(x => x.Fecha).ThenByDescending(q => q.Fecha_add).FirstOrDefault();

                EnEjecucionInversionMes e = new EnEjecucionInversionMes();
                e.MesText = meses[i - 1];
                e.ProgramadoMesPIASAR = objEjecucionPIASARMes == null ? 0 : objEjecucionPIASARMes.ProgramadoMes;
                e.EjecutadoMesPIASAR = objEjecucionPIASARMes == null ? 0 : objEjecucionPIASARMes.EjecutadoMes;
                e.PorcentagePIASAR = objEjecucionPIASARMes == null ? 0 : objEjecucionPIASARMes.Porcentage;
                e.PorEjecutarPIASAR = objEjecucionPIASARMes == null ? 0 : objEjecucionPIASARMes.PorEjecutar;

                e.ProgramadoMesAR = objEjecucionARMes == null ? 0 : objEjecucionARMes.ProgramadoMes;
                e.EjecutadoMesAR = objEjecucionARMes == null ? 0 : objEjecucionARMes.EjecutadoMes;
                e.PorcentageAR = objEjecucionARMes == null ? 0 : objEjecucionARMes.Porcentage;
                e.PorEjecutarAR = objEjecucionARMes == null ? 0 : objEjecucionARMes.PorEjecutar;

                e.ProgramadoMesUTP = objEjecucionUTPMes == null ? 0 : objEjecucionUTPMes.ProgramadoMes;
                e.EjecutadoMesUTP = objEjecucionUTPMes == null ? 0 : objEjecucionUTPMes.EjecutadoMes;
                e.PorcentageUTP = objEjecucionUTPMes == null ? 0 : objEjecucionUTPMes.Porcentage;
                e.PorEjecutarUTP = objEjecucionUTPMes == null ? 0 : objEjecucionUTPMes.PorEjecutar;

                result.Add(e);
            }

            return result;
        }

        public List<EnEjecucionInversion> ListEjecucionInversion(int anio)
        {
            List<EnEjecucionInversion> result = new List<EnEjecucionInversion>();

            //var objEjecucionPIASAR = context.EjecucionInversion.Where(x => x.Activo == true && x.Anio == anio && x.Nivel == 3 && x.GenericaGasto == "PIASAR").FirstOrDefault();
            //var objEjecucionAR = context.EjecucionInversion.Where(x => x.Activo == true && x.Anio == anio && x.Nivel == 3 && x.GenericaGasto == "Amazonia Rural").FirstOrDefault();
            //var objEjecucionUTP = context.EjecucionInversion.Where(x => x.Activo == true && x.Anio == anio && x.Nivel == 3 && x.GenericaGasto == "UTP, FONDES, EX PROCOES").FirstOrDefault();

            //string[] meses = { "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre" };
            //for (int i = 1; i <= 12; i++)
            //{
            //    var objEjecucionPIASARMes = context.EjecucionInversionMes.Where(x => x.Activo == true && x.IdEjecucionInversion == objEjecucionPIASAR.IdEjecucionInversion && x.Mes == i).OrderByDescending(x => x.Fecha).ThenByDescending(q => q.Fecha_add).FirstOrDefault();
            //    var objEjecucionARMes = context.EjecucionInversionMes.Where(x => x.Activo == true && x.IdEjecucionInversion == objEjecucionAR.IdEjecucionInversion && x.Mes == i).OrderByDescending(x => x.Fecha).ThenByDescending(q => q.Fecha_add).FirstOrDefault();
            //    var objEjecucionUTPMes = context.EjecucionInversionMes.Where(x => x.Activo == true && x.IdEjecucionInversion == objEjecucionUTP.IdEjecucionInversion && x.Mes == i).OrderByDescending(x => x.Fecha).ThenByDescending(q => q.Fecha_add).FirstOrDefault();

            //    EnEjecucionInversion e = new EnEjecucionInversion();


            //    result.Add(e);
            //}

            return result;
        }
    }
}
