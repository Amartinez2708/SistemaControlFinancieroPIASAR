using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using _02_Entidades;
using _03_Data;

namespace _04_Servicios
{
    public class SrvGestionComponente
    {
        BD_NucleosEjecutoresEntities context = new BD_NucleosEjecutoresEntities();

        public EnIndicadores Indicadores()
        {
            EnIndicadores result = new EnIndicadores();

            var obj = context.Proceso.Where(x => x.IdComponente == 2 && x.Activo == true).ToList();

            result.nroProcesos = obj.Count();
            result.mtoProcesos = obj.Sum(x => x.MontoProceso);
            result.nroTDRET = obj.Where(x => x.ElaboroETTDR == 1).Count();
            result.nroCPP = obj.Where(x => x.CCP == true).Count();

            result.nroMVCS = obj.Where(x => x.IdUnidadResponsable == 1).Count();
            result.nroPIASAR = obj.Where(x => x.IdUnidadResponsable == 2).Count();
            result.nroPNSR = obj.Where(x => x.IdUnidadResponsable == 3).Count();

            result.mtoMVCS = obj.Where(x => x.IdUnidadResponsable == 1).Sum(x => x.MontoProceso);
            result.mtoPIASAR = obj.Where(x => x.IdUnidadResponsable == 2).Sum(x => x.MontoProceso);
            result.mtoPNSR = obj.Where(x => x.IdUnidadResponsable == 3).Sum(x => x.MontoProceso);

            return result;
        }
        public List<EnIndicador> grfMontoTotalPorIndicadores()
        {
            
            List<EnIndicador> result = new List<EnIndicador>();

            var objIndicador = context.Indicador.Where(x => x.IdComponente == 2 && x.Activo == true).ToList();
            var obj = context.Proceso.Where(x => x.IdComponente == 2 && x.Activo == true).ToList();

            if (objIndicador!=null && objIndicador.Count() > 0)
            {
                foreach (var indicador in objIndicador)
                {
                    EnIndicador i = new EnIndicador();
                    i.NroIndicadorText = "Indicador " + indicador.NroIndicador.ToString();

                    var Proceso = obj.Where(x => x.IdIndicador == indicador.IdIndicador).ToList();
                    if (Proceso != null)
                    {
                        i.Cantidad = Proceso.Count();
                        i.Monto = Proceso.Sum(x => x.MontoProceso);
                    }
                    else
                    {
                        i.Cantidad =0;
                        i.Monto = 0;
                    }
                    result.Add(i);
                }
            }
            return result;
        }
        public List<EnProcesoDetalle> grfEjecucionMensual()
        {

            List<EnProcesoDetalle> result = new List<EnProcesoDetalle>();

            var objDetalle = context.ProcesoDetalle.Where(x => x.Proceso.IdComponente == 2 && x.Activo == true).ToList();
            string[] meses = { "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" };
            if (objDetalle != null && objDetalle.Count() > 0)
            {
                for (int i = 0; i < 12; i++)
                {
                    EnProcesoDetalle p = new EnProcesoDetalle();
                    p.Mes = meses[i];

                    switch(i)
                    {
                        case 0:
                            p.Monto = objDetalle.Sum(x => x.Enero);
                            p.Cantidad = objDetalle.Where(x => x.Enero > 0).Count();
                            result.Add(p);
                            break;
                        case 1:
                            p.Monto = objDetalle.Sum(x => x.Febrero);
                            p.Cantidad = objDetalle.Where(x => x.Febrero > 0).Count();
                            result.Add(p);
                            break;
                        case 2:
                            p.Monto = objDetalle.Sum(x => x.Marzo);
                            p.Cantidad = objDetalle.Where(x => x.Marzo > 0).Count();
                            result.Add(p);
                            break;
                        case 3:
                            p.Monto = objDetalle.Sum(x => x.Abril);
                            p.Cantidad = objDetalle.Where(x => x.Abril > 0).Count();
                            result.Add(p);
                            break;
                        case 4:
                            p.Monto = objDetalle.Sum(x => x.Mayo);
                            p.Cantidad = objDetalle.Where(x => x.Mayo > 0).Count();
                            result.Add(p);
                            break;
                        case 5:
                            p.Monto = objDetalle.Sum(x => x.Junio);
                            p.Cantidad = objDetalle.Where(x => x.Junio > 0).Count();
                            result.Add(p);
                            break;
                        case 6:
                            p.Monto = objDetalle.Sum(x => x.Julio);
                            p.Cantidad = objDetalle.Where(x => x.Julio > 0).Count();
                            result.Add(p);
                            break;
                        case 7:
                            p.Monto = objDetalle.Sum(x => x.Agosto);
                            p.Cantidad = objDetalle.Where(x => x.Agosto > 0).Count();
                            result.Add(p);
                            break;
                        case 8:
                            p.Monto = objDetalle.Sum(x => x.Septiembre);
                            p.Cantidad = objDetalle.Where(x => x.Septiembre > 0).Count();
                            result.Add(p);
                            break;
                        case 9:
                            p.Monto = objDetalle.Sum(x => x.Octubre);
                            p.Cantidad = objDetalle.Where(x => x.Octubre > 0).Count();
                            result.Add(p);
                            break;
                        case 10:
                            p.Monto = objDetalle.Sum(x => x.Noviembre);
                            p.Cantidad = objDetalle.Where(x => x.Noviembre > 0).Count();
                            result.Add(p);
                            break;
                        case 11:
                            p.Monto = objDetalle.Sum(x => x.Diciembre);
                            p.Cantidad = objDetalle.Where(x => x.Diciembre > 0).Count();
                            result.Add(p);
                            break;
                    }   
                }
            }

            return result;
        }
        public List<EnProceso> grfNroProcesoEstado()
        {

            List<EnProceso> result = new List<EnProceso>();

            var objProceso = context.Proceso.Where(x => x.IdComponente == 2 && x.Activo == true).ToList();

            if (objProceso != null && objProceso.Count() > 0)
            {
                for (int i = 1; i <= 12; i++)
                {
                    EnProceso p = new EnProceso();
                    p.EstadoString = GetEstado(i).ValorDevolucion;
                    p.Cantidad = objProceso.Where(x => x.Estado == i).Count();
                    p.MontoProceso = objProceso.Where(x => x.Estado == i).Sum(x => x.MontoProceso);
                    result.Add(p);

                }
            }

            return result;
        }

        public List<EnProceso> ListProceso(string Tipo, string value)
        {

            List<EnProceso> result = new List<EnProceso>();

            if (Tipo == "Indicador")
            {
                #region Indicador
                char delimitador = ' ';
                string[] Indicador = value.Split(delimitador);

                int IdIndicador = Convert.ToInt32(Indicador[1]);
                var objProceso = context.Proceso.Where(x => x.IdComponente == 2 && x.IdIndicador == IdIndicador && x.Activo == true).ToList();


                if (objProceso != null && objProceso.Count() > 0)
                {
                    foreach (var item in objProceso)
                    {

                        EnProceso p = new EnProceso();
                        p.NroProceso = item.NroProceso;
                        p.NombreProceso = item.NombreProceso;
                        p.TextIndicador = "Indicador " + item.Indicador.NroIndicador.ToString();
                        p.AnioProceso = item.AnioProceso;
                        p.TextAntiguedad = item.TipoAntiguedad == 1 ? "Nuevo" : "Continuidad";
                        p.MontoProceso = item.MontoProceso;
                        p.TextUnidadResponsable = item.IdUnidadResponsable == 1 ? "MVCS" : item.IdUnidadResponsable == 2 ? "PIASAR" : "PNSR";
                        p.Responsable1 = item.Responsable1;
                        p.Responsable2 = item.Responsable2;
                        p.TextTipoProceso = GetProceso(item.TipoProceso).ValorDevolucion;
                        p.TextEstrategiaProcesoAdquisicion = item.EstrategiaProcesoAdquisicion == 1 ? "Sede Central" : "Sedes Regionales";
                        p.Hito1 = item.Hito1;
                        p.Hito2 = item.Hito2;
                        p.TextElaboroETTDR = item.ElaboroETTDR == 1 ? "SI" : item.ElaboroETTDR == 2 ? "NO" : "No requiere";
                        p.TextRevisado = item.Revisado == true ? "SI" : "NO";
                        p.EstadoString = GetEstado(item.Estado).ValorDevolucion;
                        p.TextHT = item.HT == true ? "SI" : "NO";
                        p.NumeroHT = item.NumeroHT;
                        p.TextCCP = item.CCP == true ? "SI" : "NO";
                        p.Observacion = item.Observacion == null ? "" : item.Observacion;

                        var objDetalle = context.ProcesoDetalle.SingleOrDefault(x => x.IdProceso == item.IdProceso && x.Activo == true);
                        if (objDetalle != null)
                        {
                            p.Enero = objDetalle.Enero;
                            p.Febrero = objDetalle.Febrero;
                            p.Marzo = objDetalle.Marzo;
                            p.Abril = objDetalle.Abril;
                            p.Mayo = objDetalle.Mayo;
                            p.Junio = objDetalle.Junio;
                            p.Julio = objDetalle.Julio;
                            p.Agosto = objDetalle.Agosto;
                            p.Septiembre = objDetalle.Septiembre;
                            p.Octubre = objDetalle.Octubre;
                            p.Noviembre = objDetalle.Noviembre;
                            p.Diciembre = objDetalle.Diciembre;
                            p.TextSemestre = objDetalle.Semestre == 0 ? "" : objDetalle.Semestre == 1 ? "Semestre 1" : "Semestre 2";
                        }

                        result.Add(p);

                    }
                }
                #endregion
            }
            else if (Tipo== "Mes")
            {
                #region Mes
                List<Proceso> objProceso = new List<Proceso>();
                List<int> ListProcesos = new List<int>();

                switch (value)
                {
                    case "Enero":
                        ListProcesos = context.ProcesoDetalle.Where(x => x.Enero > 0 && x.Activo == true).Select(x => x.IdProceso).ToList();
                        objProceso = context.Proceso.Where(x => x.IdComponente == 2 && ListProcesos.Contains(x.IdProceso) && x.Activo == true).ToList();
                        break;
                    case "Febrero":
                        ListProcesos = context.ProcesoDetalle.Where(x => x.Febrero > 0 && x.Activo == true).Select(x => x.IdProceso).ToList();
                        objProceso = context.Proceso.Where(x => x.IdComponente == 2 && ListProcesos.Contains(x.IdProceso) && x.Activo == true).ToList();
                        break;
                    case "Marzo":
                        ListProcesos = context.ProcesoDetalle.Where(x => x.Marzo > 0 && x.Activo == true).Select(x => x.IdProceso).ToList();
                        objProceso = context.Proceso.Where(x => x.IdComponente == 2 && ListProcesos.Contains(x.IdProceso) && x.Activo == true).ToList();
                        break;
                    case "Abril":
                        ListProcesos = context.ProcesoDetalle.Where(x => x.Abril > 0 && x.Activo == true).Select(x => x.IdProceso).ToList();
                        objProceso = context.Proceso.Where(x => x.IdComponente == 2 && ListProcesos.Contains(x.IdProceso) && x.Activo == true).ToList();
                        break;
                    case "Mayo":
                        ListProcesos = context.ProcesoDetalle.Where(x => x.Mayo > 0 && x.Activo == true).Select(x => x.IdProceso).ToList();
                        objProceso = context.Proceso.Where(x => x.IdComponente == 2 && ListProcesos.Contains(x.IdProceso) && x.Activo == true).ToList();
                        break;
                    case "Junio":
                        ListProcesos = context.ProcesoDetalle.Where(x => x.Junio > 0 && x.Activo == true).Select(x => x.IdProceso).ToList();
                        objProceso = context.Proceso.Where(x => x.IdComponente == 2 && ListProcesos.Contains(x.IdProceso) && x.Activo == true).ToList();
                        break;
                    case "Julio":
                        ListProcesos = context.ProcesoDetalle.Where(x => x.Julio > 0 && x.Activo == true).Select(x => x.IdProceso).ToList();
                        objProceso = context.Proceso.Where(x => x.IdComponente == 2 && ListProcesos.Contains(x.IdProceso) && x.Activo == true).ToList();
                        break;
                    case "Agosto":
                        ListProcesos = context.ProcesoDetalle.Where(x => x.Agosto > 0 && x.Activo == true).Select(x => x.IdProceso).ToList();
                        objProceso = context.Proceso.Where(x => x.IdComponente == 2 && ListProcesos.Contains(x.IdProceso) && x.Activo == true).ToList();
                        break;
                    case "Septiembre":
                        ListProcesos = context.ProcesoDetalle.Where(x => x.Septiembre > 0 && x.Activo == true).Select(x => x.IdProceso).ToList();
                        objProceso = context.Proceso.Where(x => x.IdComponente == 2 && ListProcesos.Contains(x.IdProceso) && x.Activo == true).ToList();
                        break;
                    case "Octubre":
                        ListProcesos = context.ProcesoDetalle.Where(x => x.Octubre > 0 && x.Activo == true).Select(x => x.IdProceso).ToList();
                        objProceso = context.Proceso.Where(x => x.IdComponente == 2 && ListProcesos.Contains(x.IdProceso) && x.Activo == true).ToList();
                        break;
                    case "Noviembre":
                        ListProcesos = context.ProcesoDetalle.Where(x => x.Noviembre > 0 && x.Activo == true).Select(x => x.IdProceso).ToList();
                        objProceso = context.Proceso.Where(x => x.IdComponente == 2 && ListProcesos.Contains(x.IdProceso) && x.Activo == true).ToList();
                        break;
                    case "Diciembre":
                        ListProcesos = context.ProcesoDetalle.Where(x => x.Diciembre > 0 && x.Activo == true).Select(x => x.IdProceso).ToList();
                        objProceso = context.Proceso.Where(x => x.IdComponente == 2 && ListProcesos.Contains(x.IdProceso) && x.Activo == true).ToList();
                        break;
                }

                if (objProceso != null && objProceso.Count() > 0)
                {
                    foreach (var item in objProceso)
                    {

                        EnProceso p = new EnProceso();
                        p.NroProceso = item.NroProceso;
                        p.NombreProceso = item.NombreProceso;
                        p.TextIndicador = "Indicador " + item.Indicador.NroIndicador.ToString();
                        p.AnioProceso = item.AnioProceso;
                        p.TextAntiguedad = item.TipoAntiguedad == 1 ? "Nuevo" : "Continuidad";
                        p.MontoProceso = item.MontoProceso;
                        p.TextUnidadResponsable = item.IdUnidadResponsable == 1 ? "MVCS" : item.IdUnidadResponsable == 2 ? "PIASAR" : "PNSR";
                        p.Responsable1 = item.Responsable1;
                        p.Responsable2 = item.Responsable2;
                        p.TextTipoProceso = GetProceso(item.TipoProceso).ValorDevolucion;
                        p.TextEstrategiaProcesoAdquisicion = item.EstrategiaProcesoAdquisicion == 1 ? "Sede Central" : "Sedes Regionales";
                        p.Hito1 = item.Hito1;
                        p.Hito2 = item.Hito2;
                        p.TextElaboroETTDR = item.ElaboroETTDR == 1 ? "SI" : item.ElaboroETTDR == 2 ? "NO" : "No requiere";
                        p.TextRevisado = item.Revisado == true ? "SI" : "NO";
                        p.EstadoString = GetEstado(item.Estado).ValorDevolucion;
                        p.TextHT = item.HT == true ? "SI" : "NO";
                        p.NumeroHT = item.NumeroHT;
                        p.TextCCP = item.CCP == true ? "SI" : "NO";
                        p.Observacion = item.Observacion == null ? "" : item.Observacion;

                        var objDetalle = context.ProcesoDetalle.SingleOrDefault(x => x.IdProceso == item.IdProceso && x.Activo == true);
                        if (objDetalle != null)
                        {
                            p.Enero = objDetalle.Enero;
                            p.Febrero = objDetalle.Febrero;
                            p.Marzo = objDetalle.Marzo;
                            p.Abril = objDetalle.Abril;
                            p.Mayo = objDetalle.Mayo;
                            p.Junio = objDetalle.Junio;
                            p.Julio = objDetalle.Julio;
                            p.Agosto = objDetalle.Agosto;
                            p.Septiembre = objDetalle.Septiembre;
                            p.Octubre = objDetalle.Octubre;
                            p.Noviembre = objDetalle.Noviembre;
                            p.Diciembre = objDetalle.Diciembre;
                            p.TextSemestre = objDetalle.Semestre == 0 ? "" : objDetalle.Semestre == 1 ? "Semestre 1" : "Semestre 2";
                        }

                        result.Add(p);
                    }
                }
                #endregion
            }
            else if (Tipo == "Estado")
            {
                #region Estado
                int IdEstado = Convert.ToInt32(GetEstadoString(value).ValorDevolucion);
                var objProceso = context.Proceso.Where(x => x.IdComponente == 2 && x.Estado == IdEstado && x.Activo == true).ToList();


                if (objProceso != null && objProceso.Count() > 0)
                {
                    foreach (var item in objProceso)
                    {

                        EnProceso p = new EnProceso();
                        p.NroProceso = item.NroProceso;
                        p.NombreProceso = item.NombreProceso;
                        p.TextIndicador = "Indicador " + item.Indicador.NroIndicador.ToString();
                        p.AnioProceso = item.AnioProceso;
                        p.TextAntiguedad = item.TipoAntiguedad == 1 ? "Nuevo" : "Continuidad";
                        p.MontoProceso = item.MontoProceso;
                        p.TextUnidadResponsable = item.IdUnidadResponsable == 1 ? "MVCS" : item.IdUnidadResponsable == 2 ? "PIASAR" : "PNSR";
                        p.Responsable1 = item.Responsable1;
                        p.Responsable2 = item.Responsable2;
                        p.TextTipoProceso = GetProceso(item.TipoProceso).ValorDevolucion;
                        p.TextEstrategiaProcesoAdquisicion = item.EstrategiaProcesoAdquisicion == 1 ? "Sede Central" : "Sedes Regionales";
                        p.Hito1 = item.Hito1;
                        p.Hito2 = item.Hito2;
                        p.TextElaboroETTDR = item.ElaboroETTDR == 1 ? "SI" : item.ElaboroETTDR == 2 ? "NO" : "No requiere";
                        p.TextRevisado = item.Revisado == true ? "SI" : "NO";
                        p.EstadoString = GetEstado(item.Estado).ValorDevolucion;
                        p.TextHT = item.HT == true ? "SI" : "NO";
                        p.NumeroHT = item.NumeroHT;
                        p.TextCCP = item.CCP == true ? "SI" : "NO";
                        p.Observacion = item.Observacion == null ? "" : item.Observacion;

                        var objDetalle = context.ProcesoDetalle.SingleOrDefault(x => x.IdProceso == item.IdProceso && x.Activo == true);
                        if (objDetalle != null)
                        {
                            p.Enero = objDetalle.Enero;
                            p.Febrero = objDetalle.Febrero;
                            p.Marzo = objDetalle.Marzo;
                            p.Abril = objDetalle.Abril;
                            p.Mayo = objDetalle.Mayo;
                            p.Junio = objDetalle.Junio;
                            p.Julio = objDetalle.Julio;
                            p.Agosto = objDetalle.Agosto;
                            p.Septiembre = objDetalle.Septiembre;
                            p.Octubre = objDetalle.Octubre;
                            p.Noviembre = objDetalle.Noviembre;
                            p.Diciembre = objDetalle.Diciembre;
                            p.TextSemestre = objDetalle.Semestre == 0 ? "" : objDetalle.Semestre == 1 ? "Semestre 1" : "Semestre 2";
                        }

                        result.Add(p);

                    }
                }
                #endregion
            }
            else if (Tipo == "Programa")
            {
                #region Programa
                int IdPrograma = value == "MVCS" ? 1 : value == "PIASAR" ? 2 : 3;
                var objProceso = context.Proceso.Where(x => x.IdComponente == 2 && x.IdUnidadResponsable == IdPrograma && x.Activo == true).ToList();


                if (objProceso != null && objProceso.Count() > 0)
                {
                    foreach (var item in objProceso)
                    {

                        EnProceso p = new EnProceso();
                        p.NroProceso = item.NroProceso;
                        p.NombreProceso = item.NombreProceso;
                        p.TextIndicador = "Indicador " + item.Indicador.NroIndicador.ToString();
                        p.AnioProceso = item.AnioProceso;
                        p.TextAntiguedad = item.TipoAntiguedad == 1 ? "Nuevo" : "Continuidad";
                        p.MontoProceso = item.MontoProceso;
                        p.TextUnidadResponsable = item.IdUnidadResponsable == 1 ? "MVCS" : item.IdUnidadResponsable == 2 ? "PIASAR" : "PNSR";
                        p.Responsable1 = item.Responsable1;
                        p.Responsable2 = item.Responsable2;
                        p.TextTipoProceso = GetProceso(item.TipoProceso).ValorDevolucion;
                        p.TextEstrategiaProcesoAdquisicion = item.EstrategiaProcesoAdquisicion == 1 ? "Sede Central" : "Sedes Regionales";
                        p.Hito1 = item.Hito1;
                        p.Hito2 = item.Hito2;
                        p.TextElaboroETTDR = item.ElaboroETTDR == 1 ? "SI" : item.ElaboroETTDR == 2 ? "NO" : "No requiere";
                        p.TextRevisado = item.Revisado == true ? "SI" : "NO";
                        p.EstadoString = GetEstado(item.Estado).ValorDevolucion;
                        p.TextHT = item.HT == true ? "SI" : "NO";
                        p.NumeroHT = item.NumeroHT;
                        p.TextCCP = item.CCP == true ? "SI" : "NO";
                        p.Observacion = item.Observacion == null ? "" : item.Observacion;

                        var objDetalle = context.ProcesoDetalle.SingleOrDefault(x => x.IdProceso == item.IdProceso && x.Activo == true);
                        if (objDetalle != null)
                        {
                            p.Enero = objDetalle.Enero;
                            p.Febrero = objDetalle.Febrero;
                            p.Marzo = objDetalle.Marzo;
                            p.Abril = objDetalle.Abril;
                            p.Mayo = objDetalle.Mayo;
                            p.Junio = objDetalle.Junio;
                            p.Julio = objDetalle.Julio;
                            p.Agosto = objDetalle.Agosto;
                            p.Septiembre = objDetalle.Septiembre;
                            p.Octubre = objDetalle.Octubre;
                            p.Noviembre = objDetalle.Noviembre;
                            p.Diciembre = objDetalle.Diciembre;
                            p.TextSemestre = objDetalle.Semestre == 0 ? "" : objDetalle.Semestre == 1 ? "Semestre 1" : "Semestre 2";
                        }

                        result.Add(p);

                    }
                }
                #endregion
            }
            else if (Tipo == "Todo")
            {
                #region Programa
                var objProceso = context.Proceso.Where(x => x.IdComponente == 2 && x.Activo == true).ToList();


                if (objProceso != null && objProceso.Count() > 0)
                {
                    foreach (var item in objProceso)
                    {

                        EnProceso p = new EnProceso();
                        p.NroProceso = item.NroProceso;
                        p.NombreProceso = item.NombreProceso;
                        p.TextIndicador = "Indicador " + item.Indicador.NroIndicador.ToString();
                        p.AnioProceso = item.AnioProceso;
                        p.TextAntiguedad = item.TipoAntiguedad == 1 ? "Nuevo" : "Continuidad";
                        p.MontoProceso = item.MontoProceso;
                        p.TextUnidadResponsable = item.IdUnidadResponsable == 1 ? "MVCS" : item.IdUnidadResponsable == 2 ? "PIASAR" : "PNSR";
                        p.Responsable1 = item.Responsable1;
                        p.Responsable2 = item.Responsable2;
                        p.TextTipoProceso = GetProceso(item.TipoProceso).ValorDevolucion;
                        p.TextEstrategiaProcesoAdquisicion = item.EstrategiaProcesoAdquisicion == 1 ? "Sede Central" : "Sedes Regionales";
                        p.Hito1 = item.Hito1;
                        p.Hito2 = item.Hito2;
                        p.TextElaboroETTDR = item.ElaboroETTDR == 1 ? "SI" : item.ElaboroETTDR == 2 ? "NO" : "No requiere";
                        p.TextRevisado = item.Revisado == true ? "SI" : "NO";
                        p.EstadoString = GetEstado(item.Estado).ValorDevolucion;
                        p.TextHT = item.HT == true ? "SI" : "NO";
                        p.NumeroHT = item.NumeroHT;
                        p.TextCCP = item.CCP == true ? "SI" : "NO";
                        p.Observacion = item.Observacion == null ? "" : item.Observacion;

                        var objDetalle = context.ProcesoDetalle.SingleOrDefault(x => x.IdProceso == item.IdProceso && x.Activo == true);
                        if (objDetalle != null)
                        {
                            p.Enero = objDetalle.Enero;
                            p.Febrero = objDetalle.Febrero;
                            p.Marzo = objDetalle.Marzo;
                            p.Abril = objDetalle.Abril;
                            p.Mayo = objDetalle.Mayo;
                            p.Junio = objDetalle.Junio;
                            p.Julio = objDetalle.Julio;
                            p.Agosto = objDetalle.Agosto;
                            p.Septiembre = objDetalle.Septiembre;
                            p.Octubre = objDetalle.Octubre;
                            p.Noviembre = objDetalle.Noviembre;
                            p.Diciembre = objDetalle.Diciembre;
                            p.TextSemestre = objDetalle.Semestre == 0 ? "" : objDetalle.Semestre == 1 ? "Semestre 1" : "Semestre 2";
                        }

                        result.Add(p);

                    }
                }
                #endregion
            }
            return result;
        }

        public EnRespuesta GetEstado(int id)
        {
            EnRespuesta result = new EnRespuesta();

            if (id == 1)
            {
                result.ValorDevolucion = "En Ejecución";
            }
            else if (id == 2)
            {
                result.ValorDevolucion = "Ejecutado";
            }
            else if (id == 3)
            {
                result.ValorDevolucion = "En Actualización";
            }
            else if (id == 4)
            {
                result.ValorDevolucion = "En Elaboración";
            }
            else if (id == 5)
            {
                result.ValorDevolucion = "En Proceso Contratación";
            }
            else if (id == 6)
            {
                result.ValorDevolucion = "Estudio de Mercado";
            }
            else if (id == 7)
            {
                result.ValorDevolucion = "Evaluaciòn de Adquisiciones CA";
            }
            else if (id == 8)
            {
                result.ValorDevolucion = "No se elaboran";
            }
            else if (id == 9)
            {
                result.ValorDevolucion = "Pendiente";
            }
            else if (id == 10)
            {
                result.ValorDevolucion = "Requerimiento solicitado";
            }
            else if (id == 11)
            {
                result.ValorDevolucion = "Revision OGEI";
            }
            else if (id == 12)
            {
                result.ValorDevolucion = "Solicitud de no objecion";
            }

            return result;
        }
        public EnRespuesta GetEstadoString(string text)
        {
            EnRespuesta result = new EnRespuesta();

            if (text == "En Ejecución")
            {
                result.ValorDevolucion = "1";
            }
            else if (text == "Ejecutado")
            {
                result.ValorDevolucion = "2";
            }
            else if (text == "En Actualización")
            {
                result.ValorDevolucion = "3";
            }
            else if (text == "En Elaboración")
            {
                result.ValorDevolucion = "4";
            }
            else if (text == "En Proceso Contratación")
            {
                result.ValorDevolucion = "5";
            }
            else if (text == "Estudio de Mercado")
            {
                result.ValorDevolucion = "6";
            }
            else if (text == "Evaluaciòn de Adquisiciones CA")
            {
                result.ValorDevolucion = "7";
            }
            else if (text == "No se elaboran")
            {
                result.ValorDevolucion = "8";
            }
            else if (text == "Pendiente")
            {
                result.ValorDevolucion = "9";
            }
            else if (text == "Requerimiento solicitado")
            {
                result.ValorDevolucion = "10";
            }
            else if (text == "Revision OGEI")
            {
                result.ValorDevolucion = "11";
            }
            else if (text == "Solicitud de no objecion")
            {
                result.ValorDevolucion = "12";
            }

            return result;
        }
        public EnRespuesta GetProceso(int id)
        {
            EnRespuesta result = new EnRespuesta();

            if (id == 1)
            {
                result.ValorDevolucion = "Comparacion de Precios";
            }
            else if (id == 2)
            {
                result.ValorDevolucion = "Consultoria Individual";
            }
            else if (id == 3)
            {
                result.ValorDevolucion = "Contratacion Directa";
            }
            else if (id == 4)
            {
                result.ValorDevolucion = "Orden de Servicio";
            }
            else if (id == 5)
            {
                result.ValorDevolucion = "Selección Directa";
            }
            else if (id == 6)
            {
                result.ValorDevolucion = "SSC";
            }
            

            return result;
        }
    }
}
