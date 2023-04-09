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
    public class SrvMatrizResultados
    {
        BD_NucleosEjecutoresEntities context = new BD_NucleosEjecutoresEntities();

        public List<EnListSeguimiento> ListSeguimientoJASS()
        {
            List<EnListSeguimiento> result = new List<EnListSeguimiento>();

            var obj = context.TipoSeguimiento.Where(x => x.Activo == true).ToList();
            if (obj != null && obj.Count() > 0)
            {
                foreach (var data in obj)
                {
                    EnListSeguimiento s = new EnListSeguimiento();
                    s.Nivel = 1;
                    s.IdTipoSeguimiento = data.IdTipoSeguimiento;
                    s.TipoSeguimiento = data.TipoSeguimiento1;
                    s.TipoBienArticulo = "";
                    s.Cantidad = 0;
                    s.Costo = 0;
                    result.Add(s);

                    var objBienTipo = context.TipoSeguimientoBienATMJASS.Where(x => x.Tipo == "JASS" && x.IdTipoSeguimiento == data.IdTipoSeguimiento && x.Activo == true).ToList();

                    foreach (var item in objBienTipo)
                    {
                        EnListSeguimiento b = new EnListSeguimiento();
                        b.Nivel = 2;
                        s.IdTipoSeguimiento = data.IdTipoSeguimiento;
                        b.TipoSeguimiento = item.TipoSeguimiento.TipoSeguimiento1;
                        b.TipoBienArticulo = item.TipoBienArticulo.TipoBienArticulo1;
                        b.Cantidad = 0;
                        b.Costo = 0;
                        b.Avance = 100;
                        result.Add(b);
                    }
                }
            }
            return result.ToList();
        }

        public List<EnListSeguimientoDetalle> ListSeguimientoJASSDetalle()
        {
            List<EnListSeguimientoDetalle> result = new List<EnListSeguimientoDetalle>();

            var objCPP = context.Proyecto.Where(x => x.Cod_subprograma == 133 && x.Estado == 1).ToList();

            if (objCPP != null && objCPP.Count() > 0)
            {
                foreach (var data in objCPP)
                {
                    var contarsi = 0;
                    var porcentage = 0;

                    //var objBien = context.TipoBienArticulo.Where(x => x.Activo == true).ToList();
                    var objBien = context.TipoSeguimientoBienATMJASS.Where(x => x.Tipo == "JASS" && x.Activo == true).ToList();

                    foreach (var item in objBien)
                    {
                        EnListSeguimientoDetalle s = new EnListSeguimientoDetalle();
                        s.CUI = data.CUI;
                        s.Localidad = data.Localidad;
                        s.IdTipoSeguimiento = item.IdTipoSeguimiento;
                        s.TipoSeguimiento = item.TipoSeguimiento.TipoSeguimiento1;
                        s.IdTipoBienArticulo = item.IdTipoBienArticulo;
                        s.TipoBienArticulo = item.TipoBienArticulo.TipoBienArticulo1;

                        var objDetalleSeg = context.DetalleSeguimientoJASS.SingleOrDefault(x => x.SeguimientoJASS.CUI == data.CUI && x.IdTipoSeguimiento == item.IdTipoSeguimiento && x.IdTipoBienArticulo == item.IdTipoBienArticulo && x.Activo == true);

                        s.check = objDetalleSeg == null ? 0 : objDetalleSeg.Cantidad == null ? 0 : objDetalleSeg.Cantidad == 0 ? 0 : 1;

                        if (s.check == 1) { contarsi++; }

                        result.Add(s);
                    }
                    porcentage = ((contarsi * 100) / 18);

                    var obj = result.Where(x => x.CUI == data.CUI).ToList();
                    obj.ForEach(a => a.PorcentageAvance = porcentage);
                }
            }
            return result.ToList();
        }

        public List<EnListSeguimientoDetalle> ListSeguimientoATMDetalle()
        {
            List<EnListSeguimientoDetalle> result = new List<EnListSeguimientoDetalle>();

            var objCPP = context.SeguimientoATM.Where(x => x.Activo == true).ToList();

            if (objCPP != null && objCPP.Count() > 0)
            {
                foreach (var data in objCPP)
                {
                    var contarsi = 0;
                    var porcentage = 0;

                    //var objBien = context.TipoBienArticulo.Where(x => x.Activo == true).ToList();
                    var objBien = context.TipoSeguimientoBienATMJASS.Where(x => x.Tipo == "ATM" && x.Activo == true).ToList();

                    foreach (var item in objBien)
                    {

                        var depa = context.Departamento.SingleOrDefault(x => x.cod_depa == data.Ubigeo.Substring(0, 2));
                        var prov = context.Provincia.SingleOrDefault(x => x.cod_depa == data.Ubigeo.Substring(0, 2) && x.cod_prov == data.Ubigeo.Substring(2, 2));
                        var dist = context.Distrito.SingleOrDefault(x => x.cod_depa == data.Ubigeo.Substring(0, 2) && x.cod_prov == data.Ubigeo.Substring(2, 2) && x.cod_dist == data.Ubigeo.Substring(4, 2));

                        EnListSeguimientoDetalle s = new EnListSeguimientoDetalle();
                        s.Ubigeo = data.Ubigeo;
                        s.Departamento = depa.nom_depa;
                        s.Provincia = prov.nom_prov;
                        s.Distrito = dist.nom_dist;
                        s.IdTipoSeguimiento = item.IdTipoSeguimiento;
                        s.TipoSeguimiento = item.TipoSeguimiento.TipoSeguimiento1;
                        s.IdTipoBienArticulo = item.IdTipoBienArticulo;
                        s.TipoBienArticulo = item.TipoBienArticulo.TipoBienArticulo1;

                        var objDetalleSeg = context.DetalleSeguimientoATM.SingleOrDefault(x => x.SeguimientoATM.Ubigeo == data.Ubigeo && x.IdTipoSeguimiento == item.IdTipoSeguimiento && x.IdTipoBienArticulo == item.IdTipoBienArticulo && x.Activo == true);

                        s.check = objDetalleSeg == null ? 0 : objDetalleSeg.Cantidad == null ? 0 : objDetalleSeg.Cantidad == 0 ? 0 : 1;

                        if (s.check == 1) { contarsi++; }

                        result.Add(s);
                    }
                    porcentage = ((contarsi * 100) / 14);

                    var obj = result.Where(x => x.Ubigeo == data.Ubigeo).ToList();
                    obj.ForEach(a => a.PorcentageAvance = porcentage);
                }
            }
            return result.ToList();
        }

        public List<EnListResultadoEsperadoAnio> ListResultadoEsperadoAnio()
        {
            List<EnListResultadoEsperadoAnio> result = new List<EnListResultadoEsperadoAnio>();

            DateTime InicioAnio1 = Convert.ToDateTime("12/09/2018"); DateTime FinAnio1 = Convert.ToDateTime("11/09/2019"); //Anio 1
            DateTime InicioAnio2 = Convert.ToDateTime("12/09/2019"); DateTime FinAnio2 = Convert.ToDateTime("11/09/2020"); //Anio 2
            DateTime InicioAnio3 = Convert.ToDateTime("12/09/2020"); DateTime FinAnio3 = Convert.ToDateTime("11/09/2021"); //Anio 3
            DateTime InicioAnio4 = Convert.ToDateTime("12/09/2021"); DateTime FinAnio4 = Convert.ToDateTime("11/09/2022"); //Anio 4


            var obj = context.Proyecto.Where(x => x.Cod_subprograma == 133 && x.Estado == 1).ToList();

            if (obj != null && obj.Count() > 0)
            {
                var anio1 = obj.Where(x => Convert.ToDateTime(x.FechaCulminacionObra).Year == 2019).ToList();
                var anio2 = obj.Where(x => Convert.ToDateTime(x.FechaCulminacionObra).Year ==2020).ToList();
                var anio3 = obj.Where(x => Convert.ToDateTime(x.FechaCulminacionObra).Year ==2021).ToList();
                var anio4 = obj.Where(x => Convert.ToDateTime(x.FechaCulminacionObra).Year == 2022).ToList();
                var anio5 = obj.Where(x => Convert.ToDateTime(x.FechaCulminacionObra).Year == 2023).ToList();

                EnListResultadoEsperadoAnio a1 = new EnListResultadoEsperadoAnio();
                a1.NroAnio = 1;
                a1.Programado = 0;
                a1.Avanzado = Convert.ToInt32(anio1 == null ? 0 : anio1.Sum(x => x.NroViviendas));
                a1.PorcentageAvanzado = 100;
                result.Add(a1);

                EnListResultadoEsperadoAnio a2 = new EnListResultadoEsperadoAnio();
                a2.NroAnio = 2;
                a2.Programado = 0;
                a2.Avanzado = Convert.ToInt32(anio2 == null ? 0 : anio2.Sum(x => x.NroViviendas));
                a2.PorcentageAvanzado = 100;
                result.Add(a2);

                EnListResultadoEsperadoAnio a3 = new EnListResultadoEsperadoAnio();
                a3.NroAnio = 3;
                a3.Programado = 5000;
                a3.Avanzado = Convert.ToInt32(anio3 == null ? 0 : anio3.Sum(x => x.NroViviendas));
                a3.PorcentageAvanzado = Math.Round((a3.Avanzado / a3.Programado) * 100);
                result.Add(a3);

                EnListResultadoEsperadoAnio a4 = new EnListResultadoEsperadoAnio();
                a4.NroAnio = 4;
                a4.Programado = 5000;
                a4.Avanzado = Convert.ToInt32(anio4 == null ? 0 : anio4.Sum(x => x.NroViviendas));
                a4.PorcentageAvanzado = Math.Round((a4.Avanzado / a4.Programado) * 100);
                result.Add(a4);

                EnListResultadoEsperadoAnio a5 = new EnListResultadoEsperadoAnio();
                a5.NroAnio = 5;
                a5.Programado = 5000;
                a5.Avanzado = Convert.ToInt32(anio5 == null ? 0 : anio5.Sum(x => x.NroViviendas));
                a5.PorcentageAvanzado = Math.Round((a5.Avanzado / a5.Programado) * 100);
                result.Add(a5);
            }

            return result;
        }

        public List<EnProyecto> ListResultadoEsperadoAnioDetalle(int Anio)
        {
            List<EnProyecto> result = new List<EnProyecto>();

            DateTime InicioAnio1 = Convert.ToDateTime("12/09/2018"); DateTime FinAnio1 = Convert.ToDateTime("11/09/2019"); //Anio 1
            DateTime InicioAnio2 = Convert.ToDateTime("12/09/2019"); DateTime FinAnio2 = Convert.ToDateTime("11/09/2020"); //Anio 2
            DateTime InicioAnio3 = Convert.ToDateTime("12/09/2020"); DateTime FinAnio3 = Convert.ToDateTime("11/09/2021"); //Anio 3
            DateTime InicioAnio4 = Convert.ToDateTime("12/09/2021"); DateTime FinAnio4 = Convert.ToDateTime("11/09/2022"); //Anio 4


            var obj = context.Proyecto.Where(x => x.Cod_subprograma == 133 && x.Estado == 1).ToList();

            if (obj != null && obj.Count() > 0)
            {
                List<Proyecto> p = new List<Proyecto>();
                switch (Anio)
                {
                    case 1:
                        p = obj.Where(x => Convert.ToDateTime(x.FechaCulminacionObra).Year == 2019).ToList();
                        break;
                    case 2:
                        p = obj.Where(x => Convert.ToDateTime(x.FechaCulminacionObra).Year == 2020).ToList();
                        break;
                    case 3:
                        p = obj.Where(x => Convert.ToDateTime(x.FechaCulminacionObra).Year == 2021).ToList();
                        break;
                    case 4:
                        p = obj.Where(x => Convert.ToDateTime(x.FechaCulminacionObra).Year == 2022).ToList();
                        break;
                    case 5:
                        p = obj.Where(x => Convert.ToDateTime(x.FechaCulminacionObra).Year == 2023).ToList();
                        break;
                }

                if (Anio==1)
                {
                    var anio = obj.Where(x => x.FechaCulminacionObra >= InicioAnio1 && x.FechaCulminacionObra <= FinAnio1).ToList();
                }

                foreach (var item in p)
                {
                    EnProyecto a1 = new EnProyecto();
                    a1.CUI = item.CUI;
                    a1.Localidad = item.Localidad;
                    a1.FechaCulminacionObra = item.FechaCulminacionObra;
                    a1.NroViviendas = item.NroViviendas;
                    a1.PoblacionBeneficiaria = item.PoblacionBeneficiaria;
                    a1.NroConexionesAgua = item.NroConexionesAgua;
                    a1.NroConexionesUBS = item.NroConexionesUBS;
                    result.Add(a1);
                }
            }

            return result;
        }

        public List<EnListResultadoEsperadoAnio> ListResultadoEsperadoAnioHogaresUBS()
        {
            List<EnListResultadoEsperadoAnio> result = new List<EnListResultadoEsperadoAnio>();

            var obj = context.Proyecto.Where(x => x.Cod_subprograma == 133 && x.Estado == 1).ToList();

            if (obj != null && obj.Count() > 0)
            {
                var anio1 = obj.Where(x => Convert.ToDateTime(x.FechaCulminacionObra).Year == 2019).ToList();
                var anio2 = obj.Where(x => Convert.ToDateTime(x.FechaCulminacionObra).Year == 2020).ToList();
                var anio3 = obj.Where(x => Convert.ToDateTime(x.FechaCulminacionObra).Year == 2021).ToList();
                var anio4 = obj.Where(x => Convert.ToDateTime(x.FechaCulminacionObra).Year == 2022).ToList();
                var anio5 = obj.Where(x => Convert.ToDateTime(x.FechaCulminacionObra).Year == 2023).ToList();

                EnListResultadoEsperadoAnio a1 = new EnListResultadoEsperadoAnio();
                a1.NroAnio = 1;
                a1.Programado = 0;
                a1.Avanzado = Convert.ToInt32(anio1 == null ? 0 : anio1.Sum(x => x.ViviendasUtilizanUBS));
                a1.NroViviendas = Convert.ToInt32(anio1 == null ? 0 : anio1.Sum(x => x.NroViviendas));
                a1.PorcentageAvanzado = 100;
                result.Add(a1);

                EnListResultadoEsperadoAnio a2 = new EnListResultadoEsperadoAnio();
                a2.NroAnio = 2;
                a2.Programado = 0;
                a2.Avanzado = Convert.ToInt32(anio2 == null ? 0 : anio2.Sum(x => x.ViviendasUtilizanUBS));
                a2.NroViviendas = Convert.ToInt32(anio2 == null ? 0 : anio2.Sum(x => x.NroViviendas));
                a2.PorcentageAvanzado =100;
                result.Add(a2);

                EnListResultadoEsperadoAnio a3 = new EnListResultadoEsperadoAnio();
                a3.NroAnio = 3;
                a3.Programado = 60;
                a3.Avanzado = Convert.ToInt32(anio3 == null ? 0 : anio3.Sum(x => x.ViviendasUtilizanUBS));
                a3.NroViviendas = Convert.ToInt32(anio3 == null ? 0 : anio3.Sum(x => x.NroViviendas));
                a3.PorcentageAvanzado = Math.Round((a3.Avanzado / a3.NroViviendas) * 100);
                result.Add(a3);

                EnListResultadoEsperadoAnio a4 = new EnListResultadoEsperadoAnio();
                a4.NroAnio = 4;
                a4.Programado = 20;
                a4.Avanzado = Convert.ToInt32(anio4 == null ? 0 : anio4.Sum(x => x.ViviendasUtilizanUBS));
                a4.NroViviendas = Convert.ToInt32(anio4 == null ? 0 : anio4.Sum(x => x.NroViviendas));
                a4.PorcentageAvanzado = Math.Round((a4.Avanzado / a4.NroViviendas) * 100);
                result.Add(a4);

                EnListResultadoEsperadoAnio a5 = new EnListResultadoEsperadoAnio();
                a5.NroAnio = 5;
                a5.Programado = 20;
                a5.Avanzado = Convert.ToInt32(anio5 == null ? 0 : anio5.Sum(x => x.ViviendasUtilizanUBS));
                a5.NroViviendas = Convert.ToInt32(anio5 == null ? 0 : anio5.Sum(x => x.NroViviendas));
                a5.PorcentageAvanzado = Math.Round((a5.Avanzado / a5.NroViviendas) * 100);
                result.Add(a5);
            }

            return result;
        }

        public List<EnProyecto> ListResultadoEsperadoAnioDetalleHogaresUBS(int Anio)
        {
            List<EnProyecto> result = new List<EnProyecto>();

            DateTime InicioAnio1 = Convert.ToDateTime("12/09/2018"); DateTime FinAnio1 = Convert.ToDateTime("11/09/2019"); //Anio 1
            DateTime InicioAnio2 = Convert.ToDateTime("12/09/2019"); DateTime FinAnio2 = Convert.ToDateTime("11/09/2020"); //Anio 2
            DateTime InicioAnio3 = Convert.ToDateTime("12/09/2020"); DateTime FinAnio3 = Convert.ToDateTime("11/09/2021"); //Anio 3
            DateTime InicioAnio4 = Convert.ToDateTime("12/09/2021"); DateTime FinAnio4 = Convert.ToDateTime("11/09/2022"); //Anio 4


            var obj = context.Proyecto.Where(x => x.Cod_subprograma == 133 && x.Estado == 1).ToList();

            if (obj != null && obj.Count() > 0)
            {
                List<Proyecto> p = new List<Proyecto>();
                switch (Anio)
                {
                    case 1:
                        p = obj.Where(x => Convert.ToDateTime(x.FechaCulminacionObra).Year == 2019).ToList();
                        break;
                    case 2:
                        p = obj.Where(x => Convert.ToDateTime(x.FechaCulminacionObra).Year == 2020).ToList();
                        break;
                    case 3:
                        p = obj.Where(x => Convert.ToDateTime(x.FechaCulminacionObra).Year == 2021).ToList();
                        break;
                    case 4:
                        p = obj.Where(x => Convert.ToDateTime(x.FechaCulminacionObra).Year == 2022).ToList();
                        break;
                }

                if (Anio == 1)
                {
                    var anio = obj.Where(x => x.FechaCulminacionObra >= InicioAnio1 && x.FechaCulminacionObra <= FinAnio1).ToList();
                }

                foreach (var item in p)
                {
                    EnProyecto a1 = new EnProyecto();
                    a1.CUI = item.CUI;
                    a1.Localidad = item.Localidad;
                    a1.FechaCulminacionObra = item.FechaCulminacionObra;
                    a1.NroViviendas = item.NroViviendas;
                    a1.ViviendasUtilizanUBS = item.ViviendasUtilizanUBS;
                    a1.PorcentageViviendasUtilizanUBS = (Convert.ToDecimal(a1.ViviendasUtilizanUBS) / Convert.ToDecimal(a1.NroViviendas)) * 100;
                    result.Add(a1);
                }
            }

            return result;
        }

        public List<EnListResultadoEsperadoAnio> ListResultadoEsperadoAnioMujeresJASS()
        {
            List<EnListResultadoEsperadoAnio> result = new List<EnListResultadoEsperadoAnio>();

            var obj = context.Proyecto.Where(x => x.Cod_subprograma == 133 && x.Estado == 1).ToList();

            if (obj != null && obj.Count() > 0)
            {
                var anio1 = obj.Where(x => Convert.ToDateTime(x.FechaCantidadMujeres).Year == 2019).ToList();
                var anio2 = obj.Where(x => Convert.ToDateTime(x.FechaCantidadMujeres).Year == 2020).ToList();
                var anio3 = obj.Where(x => Convert.ToDateTime(x.FechaCantidadMujeres).Year == 2021).ToList();
                var anio4 = obj.Where(x => Convert.ToDateTime(x.FechaCantidadMujeres).Year == 2022).ToList();

                EnListResultadoEsperadoAnio a1 = new EnListResultadoEsperadoAnio();
                a1.NroAnio = 1;
                a1.Programado = 0;
                a1.Avanzado = Convert.ToInt32(anio1 == null ? 0 : anio1.Where(x => x.CantidadMujeresJASS >= 2).Count());
                a1.NroJASS = Convert.ToInt32(anio1 == null ? 0 : anio1.Count());
                a1.PorcentageAvanzado = 100;
                result.Add(a1);

                EnListResultadoEsperadoAnio a2 = new EnListResultadoEsperadoAnio();
                a2.NroAnio = 2;
                a2.Programado = 0;
                a2.Avanzado = Convert.ToInt32(anio2 == null ? 0 : anio2.Where(x => x.CantidadMujeresJASS >= 2).Count());
                a2.NroJASS = Convert.ToInt32(anio2 == null ? 0 : anio2.Count());
                a2.PorcentageAvanzado = 100;
                result.Add(a2);

                EnListResultadoEsperadoAnio a3 = new EnListResultadoEsperadoAnio();
                a3.NroAnio = 3;
                a3.Programado = 100;
                a3.Avanzado = Convert.ToInt32(anio3 == null ? 0 : anio3.Where(x => x.CantidadMujeresJASS >= 2).Count());
                a3.NroJASS = Convert.ToInt32(anio3 == null ? 0 : anio3.Count());
                a3.PorcentageAvanzado = Math.Round((a3.Avanzado / a3.NroJASS) * 100);
                result.Add(a3);

                EnListResultadoEsperadoAnio a4 = new EnListResultadoEsperadoAnio();
                a4.NroAnio = 4;
                a4.Programado = 100;
                a4.Avanzado = Convert.ToInt32(anio4 == null ? 0 : anio4.Where(x => x.CantidadMujeresJASS >= 2).Count());
                a4.NroJASS = Convert.ToInt32(anio4 == null ? 0 : anio4.Count());
                a4.PorcentageAvanzado = Math.Round((a4.Avanzado / a4.NroJASS) * 100);
                result.Add(a4);
            }

            return result;
        }
        public List<EnProyecto> ListResultadoEsperadoAnioDetalleMujeresJASS(int Anio)
        {
            List<EnProyecto> result = new List<EnProyecto>();

            var obj = context.Proyecto.Where(x => x.Cod_subprograma == 133 && x.Estado == 1).ToList();

            if (obj != null && obj.Count() > 0)
            {
                List<Proyecto> p = new List<Proyecto>();
                switch (Anio)
                {
                    case 1:
                        p = obj.Where(x => Convert.ToDateTime(x.FechaCantidadMujeres).Year == 2019).ToList();
                        break;
                    case 2:
                        p = obj.Where(x => Convert.ToDateTime(x.FechaCantidadMujeres).Year == 2020).ToList();
                        break;
                    case 3:
                        p = obj.Where(x => Convert.ToDateTime(x.FechaCantidadMujeres).Year == 2021).ToList();
                        break;
                    case 4:
                        p = obj.Where(x => Convert.ToDateTime(x.FechaCantidadMujeres).Year == 2022).ToList();
                        break;
                }
                foreach (var item in p)
                {
                    EnProyecto a1 = new EnProyecto();
                    a1.CUI = item.CUI;
                    a1.Localidad = item.Localidad;
                    a1.FechaCantidadMujeres = item.FechaCantidadMujeres;
                    a1.CantidadMujeresJASS = item.CantidadMujeresJASS;
                    a1.Check = a1.CantidadMujeresJASS >= 2 ? 1 : 0;
                    result.Add(a1);
                }
            }

            return result;
        }

        public List<EnListResultadoEsperadoAnio> ListResultadoEsperadoAnioMujeresNE()
        {
            List<EnListResultadoEsperadoAnio> result = new List<EnListResultadoEsperadoAnio>();

            var obj = context.Proyecto.Where(x => x.Cod_subprograma == 133 && x.Estado == 1).ToList();

            if (obj != null && obj.Count() > 0)
            {
                var anio1 = obj.Where(x => Convert.ToDateTime(x.FechaCantidadMujeresNE).Year == 2019).ToList();
                var anio2 = obj.Where(x => Convert.ToDateTime(x.FechaCantidadMujeresNE).Year == 2020).ToList();
                var anio3 = obj.Where(x => Convert.ToDateTime(x.FechaCantidadMujeresNE).Year == 2021).ToList();
                var anio4 = obj.Where(x => Convert.ToDateTime(x.FechaCantidadMujeresNE).Year == 2022).ToList();

                EnListResultadoEsperadoAnio a1 = new EnListResultadoEsperadoAnio();
                a1.NroAnio = 1;
                a1.Programado = 25;
                a1.Avanzado = Convert.ToInt32(anio1 == null ? 0 : anio1.Where(x => x.CantidadMujeresNE >= 1).Count());
                a1.NroJASS = Convert.ToInt32(anio1 == null ? 0 : anio1.Count());
                a1.PorcentageAvanzado = Math.Round((a1.Avanzado / a1.NroJASS) * 100);
                result.Add(a1);

                EnListResultadoEsperadoAnio a2 = new EnListResultadoEsperadoAnio();
                a2.NroAnio = 2;
                a2.Programado = 60;
                a2.Avanzado = Convert.ToInt32(anio2 == null ? 0 : anio2.Where(x => x.CantidadMujeresNE >= 1).Count());
                a2.NroJASS = Convert.ToInt32(anio2 == null ? 0 : anio2.Count());
                a2.PorcentageAvanzado = Math.Round((a2.Avanzado / a2.NroJASS) * 100);
                result.Add(a2);

                EnListResultadoEsperadoAnio a3 = new EnListResultadoEsperadoAnio();
                a3.NroAnio = 3;
                a3.Programado = 60;
                a3.Avanzado = Convert.ToInt32(anio3 == null ? 0 : anio3.Where(x => x.CantidadMujeresNE >= 1).Count());
                a3.NroJASS = Convert.ToInt32(anio3 == null ? 0 : anio3.Count());
                a3.PorcentageAvanzado = Math.Round((a3.Avanzado / a3.NroJASS) * 100);
                result.Add(a3);

                EnListResultadoEsperadoAnio a4 = new EnListResultadoEsperadoAnio();
                a4.NroAnio = 4;
                a4.Programado = 60;
                a4.Avanzado = Convert.ToInt32(anio4 == null ? 0 : anio4.Where(x => x.CantidadMujeresNE >= 1).Count());
                a4.NroJASS = Convert.ToInt32(anio4 == null ? 0 : anio4.Count());
                a4.PorcentageAvanzado = Math.Round((a4.Avanzado / a4.NroJASS) * 100);
                result.Add(a4);
            }

            return result;
        }
        public List<EnProyecto> ListResultadoEsperadoAnioDetalleMujeresNE(int Anio)
        {
            List<EnProyecto> result = new List<EnProyecto>();

            var obj = context.Proyecto.Where(x => x.Cod_subprograma == 133 && x.Estado == 1).ToList();

            if (obj != null && obj.Count() > 0)
            {
                List<Proyecto> p = new List<Proyecto>();
                switch (Anio)
                {
                    case 1:
                        p = obj.Where(x => Convert.ToDateTime(x.FechaCantidadMujeresNE).Year == 2019).ToList();
                        break;
                    case 2:
                        p = obj.Where(x => Convert.ToDateTime(x.FechaCantidadMujeresNE).Year == 2020).ToList();
                        break;
                    case 3:
                        p = obj.Where(x => Convert.ToDateTime(x.FechaCantidadMujeresNE).Year == 2021).ToList();
                        break;
                    case 4:
                        p = obj.Where(x => Convert.ToDateTime(x.FechaCantidadMujeresNE).Year == 2022).ToList();
                        break;
                }
                foreach (var item in p)
                {
                    EnProyecto a1 = new EnProyecto();
                    a1.CUI = item.CUI;
                    a1.Localidad = item.Localidad;
                    a1.FechaCantidadMujeresNE = item.FechaCantidadMujeresNE;
                    a1.CantidadMujeresNE = item.CantidadMujeresNE;
                    a1.Check = a1.CantidadMujeresNE >= 1 ? 1 : 0;
                    result.Add(a1);
                }
            }

            return result;
        }

        public List<EnListSeguimientoDetalleActividades> ListProductoSeguimientoJASScapacitadas()//Hito. Talleres de capacitación a la JASS en AOM y aspectos legales realizados - JASS capacitadas para administrar, operar y mantener los servicios de AyS
        {
            List<EnListSeguimientoDetalleActividades> result = new List<EnListSeguimientoDetalleActividades>();

            //List<string> ListCUI = context.SeguimientoActividadesJASS.Where(x => x.Activo == true).Select(x => x.CUI).ToList();

            List<Int32> IdCronograma = new List<Int32>() { 102, 106, 124, 146, 161 }; // id de talleres y sesiones

            var objproy = context.Proyecto.Where(x => x.Cod_subprograma == 133 && x.Estado == 1).ToList();

            if (objproy != null && objproy.Count() > 0)
            {
                foreach (var data in objproy)
                {

                    var objDet = context.DetalleSeguimientoActividadesJASS.Where(x => x.SeguimientoActividadesJASS.CUI == data.CUI && IdCronograma.Contains(x.IdCronogramaActividades) && x.Activo == true).ToList();
                    int Nro = 0;

                    EnListSeguimientoDetalleActividades total = new EnListSeguimientoDetalleActividades();
                    total.CUI = data.CUI;
                    total.Localidad = data.Localidad;
                    total.Fecha ="";
                    total.NroHombres = 0;
                    total.NroMujeres = 0;
                    total.Total = 0;
                    total.Tipo = "TOTAL";
                    total.PorcentageTotal = 0;
                    total.TotalSAP = 0;
                    total.PorcentageTotalSAP = 0;

                    result.Add(total);

                    foreach (var item in objDet)
                    {
                        EnListSeguimientoDetalleActividades s = new EnListSeguimientoDetalleActividades();
                        s.CUI = data.CUI;
                        s.Localidad = data.Localidad;
                        s.Fecha = item.Fecha == null ? "" : Convert.ToDateTime(item.Fecha).ToString("dd/MM/yyyy");
                        s.NroHombres = item.NroHombres;
                        s.NroMujeres = item.NroMujeres;
                        s.Total = item.Total;
                        s.PorcentageTotal = item.PorcentageTotal;
                        s.TotalSAP = item.TotalSAP;
                        s.PorcentageTotalSAP = item.PorcentageSAP;

                        if (s.Fecha != "") { Nro++; }

                        result.Add(s);
                    }
                    var obj = result.FirstOrDefault(x => x.CUI == data.CUI && x.Tipo == "TOTAL");
                    obj.TotalProgramado = 5;
                    obj.TotalAvanzado = Nro;
                    obj.PorcentageAvanzado = (Convert.ToDecimal(obj.TotalAvanzado) / Convert.ToDecimal(obj.TotalProgramado)) * 100;

                }
            }
            return result.OrderBy(x=>x.CUI).ToList();
        }

        public List<EnListSeguimientoDetalleActividades> ListProductoSeguimientoTalleresDirigidoMujeres()//Hito. Talleres de liderazgo y participación dirigidos a mujeres realizados
        {
            List<EnListSeguimientoDetalleActividades> result = new List<EnListSeguimientoDetalleActividades>();

            //List<string> ListCUI = context.SeguimientoActividadesJASS.Where(x => x.Activo == true).Select(x => x.CUI).ToList();

            List<Int32> IdCronograma = new List<Int32>() { 104 }; // id de talleres y sesiones

            var objproy = context.Proyecto.Where(x => x.Cod_subprograma == 133 && x.Estado == 1).ToList();

            if (objproy != null && objproy.Count() > 0)
            {
                foreach (var data in objproy)
                {

                    var objDet = context.DetalleSeguimientoActividadesJASS.Where(x => x.SeguimientoActividadesJASS.CUI == data.CUI && IdCronograma.Contains(x.IdCronogramaActividades) && x.Activo == true).ToList();

                    int Nro = 0;

                    EnListSeguimientoDetalleActividades total = new EnListSeguimientoDetalleActividades();
                    total.CUI = data.CUI;
                    total.Localidad = data.Localidad;
                    total.Fecha = "";
                    total.NroHombres = 0;
                    total.NroMujeres = 0;
                    total.Total = 0;
                    total.Tipo = "TOTAL";
                    total.PorcentageTotal = 0;
                    total.TotalSAP = 0;
                    total.PorcentageTotalSAP = 0;

                    result.Add(total);

                    foreach (var item in objDet)
                    {
                        EnListSeguimientoDetalleActividades s = new EnListSeguimientoDetalleActividades();
                        s.CUI = data.CUI;
                        s.Localidad = data.Localidad;
                        s.Fecha = item.Fecha == null ? "" : Convert.ToDateTime(item.Fecha).ToString("dd/MM/yyyy");
                        s.NroHombres = item.NroHombres;
                        s.NroMujeres = item.NroMujeres;
                        s.Total = item.Total;
                        s.PorcentageTotal = item.PorcentageTotal;
                        s.TotalSAP = item.TotalSAP;
                        s.PorcentageTotalSAP = item.PorcentageSAP;

                        if (s.Fecha != "") { Nro++; }

                        result.Add(s);
                    }

                    var obj = result.FirstOrDefault(x => x.CUI == data.CUI && x.Tipo == "TOTAL");
                    obj.TotalProgramado = 1;
                    obj.TotalAvanzado = Nro;
                    obj.PorcentageAvanzado = (Convert.ToDecimal(obj.TotalAvanzado) / Convert.ToDecimal(obj.TotalProgramado)) * 100;
                }
            }
            return result.OrderBy(x => x.CUI).ToList();
        }
        public List<EnListSeguimientoDetalleActividades> ListProductoSeguimientoATM()//ATM capacitadas para brindar asistencia técnica a las JASS
        {
            List<EnListSeguimientoDetalleActividades> result = new List<EnListSeguimientoDetalleActividades>();

            var objproy = context.Proyecto.Where(x => x.Cod_subprograma == 133 && x.Estado == 1).Select(m => m.IdUbigeo).Distinct().ToList();

            //List<string> ListCUI = context.SeguimientoActividadesATM.Where(x => x.Activo == true).Select(x => x.CUI).ToList();

            List<Int32> IdCronograma = context.CronogramaActividades.Where(x => x.Activo == true && x.Tipo == "ATM").Select(x => x.IdCronogramaActividades).ToList(); // id de talleres y sesiones

            //var objproy = context.Proyecto.Where(x => x.Cod_subprograma == 133 && x.Estado == 1 && ListCUI.Contains(x.CUI)).ToList();

            if (objproy != null && objproy.Count() > 0)
            {
                foreach (var data in objproy)
                {
                    var depa = context.Departamento.SingleOrDefault(x => x.cod_depa == data.Substring(0, 2));
                    var prov = context.Provincia.SingleOrDefault(x => x.cod_depa == data.Substring(0, 2) && x.cod_prov == data.Substring(2, 2));
                    var dist = context.Distrito.SingleOrDefault(x => x.cod_depa == data.Substring(0, 2) && x.cod_prov == data.Substring(2, 2) && x.cod_dist == data.Substring(4, 2));

                    int Nro = 0;

                    EnListSeguimientoDetalleActividades total = new EnListSeguimientoDetalleActividades();
                    total.Ubigeo = data;
                    total.Departamento = depa.nom_depa;
                    total.Provincia = prov.nom_prov;
                    total.Distrito = dist.nom_dist;
                    total.Fecha = "";
                    total.NroHombres = 0;
                    total.NroMujeres = 0;
                    total.Total = 0;
                    total.Tipo = "TOTAL";
                    total.PorcentageTotal = 0;
                    total.TotalSAP = 0;
                    total.PorcentageTotalSAP = 0;

                    result.Add(total);

                    var PrimeraATM = context.SeguimientoActividadesATM.FirstOrDefault(x => x.Ubigeo == data && x.Activo == true);

                    if (PrimeraATM != null)
                    {
                        var objDet = context.DetalleSeguimientoActividadesATM.Where(x => x.IdSeguimientoActividadesATM == PrimeraATM.IdSeguimientoActividadesATM && IdCronograma.Contains(x.IdCronogramaActividades) && x.Activo == true).ToList();

                        foreach (var item in objDet)
                        {
                            EnListSeguimientoDetalleActividades s = new EnListSeguimientoDetalleActividades();
                            s.Ubigeo = data;
                            s.Departamento = depa.nom_depa;
                            s.Provincia = prov.nom_prov;
                            s.Distrito = dist.nom_dist;
                            s.Fecha = item.Fecha == null ? "" : Convert.ToDateTime(item.Fecha).ToString("dd/MM/yyyy");
                            s.NroHombres = item.NroHombres;
                            s.NroMujeres = item.NroMujeres;
                            s.Total = item.Total;

                            if (s.Fecha != "") { Nro++; }

                            result.Add(s);
                        }
                    }

                    var obj = result.FirstOrDefault(x => x.Ubigeo == data && x.Tipo == "TOTAL");
                    obj.TotalProgramado = 29;
                    obj.TotalAvanzado = Nro;
                    obj.PorcentageAvanzado = (Convert.ToDecimal(obj.TotalAvanzado) / Convert.ToDecimal(obj.TotalProgramado)) * 100;

                }
            }
            return result.OrderBy(x => x.CUI).ToList();
        }
        public List<EnListSeguimientoDetalleActividades> ListProductoSeguimientoNE()//Núcleos Ejecutores capacitados en gestión y administración de proyectos
        {
            List<EnListSeguimientoDetalleActividades> result = new List<EnListSeguimientoDetalleActividades>();

            List<string> ListCUI = context.SeguimientoActividadesNE.Where(x => x.Activo == true).Select(x => x.CUI).ToList();

            List<Int32> IdCronograma = context.CronogramaActividades.Where(x => x.Activo == true && x.Tipo == "Nucleo Ejecutor" && x.Etapa == "Ejecución").Select(x => x.IdCronogramaActividades).ToList(); // id de talleres y sesiones

            var objproy = context.Proyecto.Where(x => x.Cod_subprograma == 133 && x.Estado == 1 && ListCUI.Contains(x.CUI)).ToList();

            if (objproy != null && objproy.Count() > 0)
            {
                foreach (var data in objproy)
                {

                    var objDet = context.DetalleSeguimientoActividadesNE.Where(x => x.SeguimientoActividadesNE.CUI == data.CUI && IdCronograma.Contains(x.IdCronogramaActividades) && x.Activo == true).ToList();

                    int Nro = 0;

                    EnListSeguimientoDetalleActividades total = new EnListSeguimientoDetalleActividades();
                    total.CUI = data.CUI;
                    total.Localidad = data.Localidad;
                    total.Fecha = "";
                    total.NroHombres = 0;
                    total.NroMujeres = 0;
                    total.Total = 0;
                    total.Tipo = "TOTAL";
                    total.PorcentageTotal = 0;
                    total.TotalSAP = 0;
                    total.PorcentageTotalSAP = 0;

                    result.Add(total);

                    foreach (var item in objDet)
                    {
                        EnListSeguimientoDetalleActividades s = new EnListSeguimientoDetalleActividades();
                        s.CUI = data.CUI;
                        s.Localidad = data.Localidad;
                        s.Fecha = item.Fecha == null ? "" : Convert.ToDateTime(item.Fecha).ToString("dd/MM/yyyy");
                        s.NroHombres = item.NroHombres;
                        s.NroMujeres = item.NroMujeres;
                        s.Total = item.Total;

                        if (s.Fecha != "") { Nro++; }

                        result.Add(s);
                    }

                    var obj = result.FirstOrDefault(x => x.CUI == data.CUI && x.Tipo == "TOTAL");
                    obj.TotalProgramado = 34;
                    obj.TotalAvanzado = Nro;
                    obj.PorcentageAvanzado = (Convert.ToDecimal(obj.TotalAvanzado) / Convert.ToDecimal(obj.TotalProgramado)) * 100;
                }
            }
            return result.OrderBy(x => x.CUI).ToList();
        }


        public List<EnListResultadoEsperadoAnio> ListResultadoEsperadoAnioCuotaFamiliar()//JASS cuyos ingresos operativos cubren los costos de AOM
        {
            List<EnListResultadoEsperadoAnio> result = new List<EnListResultadoEsperadoAnio>();

            var obj = ListResultadoDetalleJASSCuota().Where(x =>x.Tipo == "TOTAL" && x.PorcentageTotal >= 80);

            if (obj != null && obj.Count() > 0)
            {
                var anio1 = obj.Where(x => Convert.ToDateTime(x.Fecha).Year == 2019).ToList();
                var anio2 = obj.Where(x => Convert.ToDateTime(x.Fecha).Year == 2020).ToList();
                var anio3 = obj.Where(x => Convert.ToDateTime(x.Fecha).Year == 2021).ToList();
                var anio4 = obj.Where(x => Convert.ToDateTime(x.Fecha).Year == 2022).ToList();
                var anio5 = obj.Where(x => Convert.ToDateTime(x.Fecha).Year == 2023).ToList();

                EnListResultadoEsperadoAnio a1 = new EnListResultadoEsperadoAnio();
                a1.NroAnio = 1;
                a1.Anio = 2019;
                a1.Programado = 0;
                a1.Avanzado = Convert.ToInt32(anio1 == null ? 0 : anio1.Count());
                a1.PorcentageAvanzado = 100;
                result.Add(a1);

                EnListResultadoEsperadoAnio a2 = new EnListResultadoEsperadoAnio();
                a2.NroAnio = 2;
                a2.Anio = 2020;
                a2.Programado = 0;
                a2.Avanzado = Convert.ToInt32(anio2 == null ? 0 : anio2.Count());
                a2.PorcentageAvanzado = 100;
                result.Add(a2);

                EnListResultadoEsperadoAnio a3 = new EnListResultadoEsperadoAnio();
                a3.NroAnio = 3;
                a3.Anio = 2021;
                a3.Programado = 70;
                a3.Avanzado = Convert.ToInt32(anio3 == null ? 0 : anio3.Count());
                a3.PorcentageAvanzado = Math.Round((a3.Avanzado / a3.Programado) * 100);
                result.Add(a3);

                EnListResultadoEsperadoAnio a4 = new EnListResultadoEsperadoAnio();
                a4.NroAnio = 4;
                a4.Anio = 2022;
                a4.Programado = 70;
                a4.Avanzado = Convert.ToInt32(anio4 == null ? 0 : anio4.Count());
                a4.PorcentageAvanzado = Math.Round((a4.Avanzado / a4.Programado) * 100);
                result.Add(a4);

                EnListResultadoEsperadoAnio a5 = new EnListResultadoEsperadoAnio();
                a5.NroAnio = 5;
                a5.Anio = 2023;
                a5.Programado = 90;
                a5.Avanzado = Convert.ToInt32(anio5 == null ? 0 : anio5.Count());
                a5.PorcentageAvanzado = Math.Round((a5.Avanzado / a5.Programado) * 100);
                result.Add(a5);
            }

            return result;
        }
        public List<EnListSeguimientoDetalleActividades> ListResultadoEsperadoAnioDetalleCuotaFamiliar(int Anio)
        {
            List<EnListSeguimientoDetalleActividades> result = new List<EnListSeguimientoDetalleActividades>();

            var obj = ListResultadoDetalleJASSCuota().Where(x => x.Tipo == "TOTAL" && x.PorcentageTotal >= 80);

            if (obj != null && obj.Count() > 0)
            {
                List<EnListSeguimientoDetalleActividades> p = new List<EnListSeguimientoDetalleActividades>();
                switch (Anio)
                {
                    case 1:
                        p = obj.Where(x => Convert.ToDateTime(x.Fecha).Year == 2019).ToList();
                        break;
                    case 2:
                        p = obj.Where(x => Convert.ToDateTime(x.Fecha).Year == 2020).ToList();
                        break;
                    case 3:
                        p = obj.Where(x => Convert.ToDateTime(x.Fecha).Year == 2021).ToList();
                        break;
                    case 4:
                        p = obj.Where(x => Convert.ToDateTime(x.Fecha).Year == 2022).ToList();
                        break;
                    case 5:
                        p = obj.Where(x => Convert.ToDateTime(x.Fecha).Year == 2023).ToList();
                        break;
                }

                foreach (var item in p)
                {
                    var objDet = context.DetalleSeguimientoCuotaFamiliarJASS.Where(x => x.SeguimientoCuotaFamiliarJASS.CUI == item.CUI && x.Activo == true).ToList();

                    EnListSeguimientoDetalleActividades total = new EnListSeguimientoDetalleActividades();
                    total.CUI = item.CUI;
                    total.Localidad = item.Localidad;
                    total.Fecha = "";
                    total.NroHombres = 0;
                    total.NroMujeres = 0;
                    total.Total = 0;
                    total.Tipo = "TOTAL";
                    total.PorcentageTotal = 0;
                    total.TotalSAP = 0;
                    total.PorcentageTotalSAP = 0;

                    result.Add(total);

                    foreach (var det in objDet)
                    {
                        EnListSeguimientoDetalleActividades s = new EnListSeguimientoDetalleActividades();
                        s.CUI = item.CUI;
                        s.Localidad = item.Localidad;
                        s.Fecha = det.Fecha == null ? "" : Convert.ToDateTime(item.Fecha).ToString("dd/MM/yyyy");
                        s.NroHombres = det.NroHombres;
                        s.NroMujeres = det.NroMujeres;
                        s.Total = det.Total;
                        s.PorcentageTotal = det.PorcentageAsistencia * 100;

                        result.Add(s);
                    }

                    var objTotal = result.FirstOrDefault(x => x.CUI == item.CUI && x.Tipo == "TOTAL");
                    var promedios = result.Where(x => x.CUI == item.CUI && x.Tipo != "TOTAL").ToList();

                    objTotal.NroHombres = Convert.ToInt32(promedios.Select(x => x.NroHombres).Average());
                    objTotal.NroMujeres = Convert.ToInt32(promedios.Select(x => x.NroMujeres).Average());
                    objTotal.PorcentageTotal = Convert.ToDecimal(promedios.Select(x => x.PorcentageTotal).Average());
                    objTotal.Total = promedios.Sum(x => x.Total);
                    objTotal.Fecha = promedios.Max(x => x.Fecha);
                }
            }

            return result;
        }
        public List<EnListSeguimientoDetalleActividades> ListResultadoDetalleJASSCuota()//JASS cuyos ingresos operativos cubren los costos de AOM
        {
            List<EnListSeguimientoDetalleActividades> result = new List<EnListSeguimientoDetalleActividades>();

            var objproy = context.Proyecto.Where(x => x.Cod_subprograma == 133 && x.Estado == 1).ToList();

            if (objproy != null && objproy.Count() > 0)
            {
                foreach (var data in objproy)
                {

                    var objDet = context.DetalleSeguimientoCuotaFamiliarJASS.Where(x => x.SeguimientoCuotaFamiliarJASS.CUI == data.CUI && x.Activo == true).ToList();

                    EnListSeguimientoDetalleActividades total = new EnListSeguimientoDetalleActividades();
                    total.CUI = data.CUI;
                    total.Localidad = data.Localidad;
                    total.Fecha = "";
                    total.NroHombres = 0;
                    total.NroMujeres = 0;
                    total.Total = 0;
                    total.Tipo = "TOTAL";
                    total.PorcentageTotal = 0;
                    total.TotalSAP = 0;
                    total.PorcentageTotalSAP = 0;

                    result.Add(total);

                    foreach (var item in objDet)
                    {
                        EnListSeguimientoDetalleActividades s = new EnListSeguimientoDetalleActividades();
                        s.CUI = data.CUI;
                        s.Localidad = data.Localidad;
                        s.Fecha = item.Fecha == null ? "" : Convert.ToDateTime(item.Fecha).ToString("dd/MM/yyyy");
                        s.NroHombres = item.NroHombres;
                        s.NroMujeres = item.NroMujeres;
                        s.Total = item.Total;
                        s.PorcentageTotal = item.PorcentageAsistencia * 100;
                        //if (s.Fecha != "") { Nro++; }

                        result.Add(s);
                    }

                    var obj = result.FirstOrDefault(x => x.CUI == data.CUI && x.Tipo == "TOTAL");
                    var promedios = result.Where(x => x.CUI == data.CUI && x.Tipo != "TOTAL").ToList();

                    obj.NroHombres = Convert.ToInt32(promedios.Select(x => x.NroHombres).Average());
                    obj.NroMujeres = Convert.ToInt32(promedios.Select(x => x.NroMujeres).Average());
                    obj.PorcentageTotal = Convert.ToDecimal(promedios.Select(x => x.PorcentageTotal).Average());
                    obj.Fecha = promedios.Max(x => x.Fecha);
                }
            }
            return result.OrderBy(x => x.CUI).ToList();
        }



        public List<EnListSeguimientoDetalleActividades> ListProductosSistemasOTAConcluidas() //Sistemas de agua potable con operación técnica asistida concluida
        {
            List<EnListSeguimientoDetalleActividades> result = new List<EnListSeguimientoDetalleActividades>();

            var obj = context.Proyecto.Where(x => x.Cod_subprograma == 133 && x.Estado == 1).ToList();

            if (obj != null && obj.Count() > 0)
            {
                foreach (var item in obj)
                {
                    EnListSeguimientoDetalleActividades a1 = new EnListSeguimientoDetalleActividades();
                    a1.CUI = item.CUI;
                    a1.Localidad = item.Localidad;
                    a1.Fecha = item.FechaFinOTA == null ? "" : Convert.ToDateTime(item.FechaFinOTA).ToString("dd/MM/yyyy");
                    a1.Anio = item.FechaFinOTA == null ? 0 : Convert.ToDateTime(item.FechaFinOTA).Year;
                    result.Add(a1);
                }
            }
            return result;
        }


        public EnTablaDinamica ListProductoSeguimientoATMDetalles(string Etapa) //ATM capacitadas para brindar asistencia técnica a las JASS
        {
            EnTablaDinamica result = new EnTablaDinamica();

            List<EnTablaDinamicaColumnas> columnas = new List<EnTablaDinamicaColumnas>();
            List<EnTablaDinamicaColumnas> columnasS = new List<EnTablaDinamicaColumnas>();
            List<EnListSeguimientoDetalleActividades> actividades = new List<EnListSeguimientoDetalleActividades>();

            var objHeaderPrincipal = context.CronogramaActividades.Where(x => x.Tipo == "ATM" && x.Etapa == Etapa && x.Activo == true).ToList();

            if (objHeaderPrincipal!=null && objHeaderPrincipal.Count() > 0)
            {
                EnTablaDinamicaColumnas HPn = new EnTablaDinamicaColumnas();
                HPn.title = "N°";
                HPn.data = "";
                HPn.rowspan = 2;
                HPn.colspan = 1;
                columnas.Add(HPn);

                EnTablaDinamicaColumnas HP1 = new EnTablaDinamicaColumnas();
                HP1.title = "Departamento";
                HP1.data = "";
                HP1.rowspan = 2;
                HP1.colspan = 1;
                columnas.Add(HP1);

                EnTablaDinamicaColumnas HP2 = new EnTablaDinamicaColumnas();
                HP2.title = "Provincia";
                HP2.data = "";
                HP2.rowspan = 2;
                HP2.colspan = 1;
                columnas.Add(HP2);

                EnTablaDinamicaColumnas HP3 = new EnTablaDinamicaColumnas();
                HP3.title = "Distrito";
                HP3.data = "";
                HP3.rowspan = 2;
                HP3.colspan = 1;
                columnas.Add(HP3);

                foreach (var item in objHeaderPrincipal)
                {
                    EnTablaDinamicaColumnas HP = new EnTablaDinamicaColumnas();
                    HP.title = item.Actividad;
                    HP.data = "";
                    HP.rowspan = 1;
                    HP.colspan = 5;
                    columnas.Add(HP);

                    List<string> columnassecundarias = new List<string>() { "Fecha", "Nro. Hombres", "Nro. Mujeres", "Total", "Acta" };

                    for (int i = 0; i < columnassecundarias.Count(); i++)
                    {
                        EnTablaDinamicaColumnas HPS = new EnTablaDinamicaColumnas();
                        HPS.title = columnassecundarias[i];
                        HPS.data = "";
                        HPS.rowspan = 1;
                        HPS.colspan = 1;
                        columnasS.Add(HPS);
                    }
                }

            }

            var objproy = context.Proyecto.Where(x => x.Cod_subprograma == 133 && x.Estado == 1).Select(m => m.IdUbigeo).Distinct().ToList();

            if (objproy != null && objproy.Count() > 0)
            {
                List<Int32> IdCronograma = context.CronogramaActividades.Where(x => x.Activo == true && x.Etapa == Etapa && x.Tipo == "ATM").Select(x => x.IdCronogramaActividades).ToList(); // id de talleres y sesiones

                if (objproy != null && objproy.Count() > 0)
                {
                    foreach (var data in objproy)
                    {
                        var depa = context.Departamento.SingleOrDefault(x => x.cod_depa == data.Substring(0, 2));
                        var prov = context.Provincia.SingleOrDefault(x => x.cod_depa == data.Substring(0, 2) && x.cod_prov == data.Substring(2, 2));
                        var dist = context.Distrito.SingleOrDefault(x => x.cod_depa == data.Substring(0, 2) && x.cod_prov == data.Substring(2, 2) && x.cod_dist == data.Substring(4, 2));

                        var PrimeraATM = context.SeguimientoActividadesATM.FirstOrDefault(x => x.Ubigeo == data && x.Activo == true);

                        if (PrimeraATM != null)
                        {
                            var objDet = context.DetalleSeguimientoActividadesATM.Where(x => x.IdSeguimientoActividadesATM == PrimeraATM.IdSeguimientoActividadesATM && IdCronograma.Contains(x.IdCronogramaActividades) && x.Activo == true).ToList();

                            foreach (var item in objDet)
                            {
                                EnListSeguimientoDetalleActividades s = new EnListSeguimientoDetalleActividades();
                                s.Ubigeo = data;
                                s.Departamento = depa.nom_depa;
                                s.Provincia = prov.nom_prov;
                                s.Distrito = dist.nom_dist;
                                s.Fecha = item.Fecha == null ? "" : Convert.ToDateTime(item.Fecha).ToString("dd/MM/yyyy");
                                s.NroHombres = item.NroHombres == null ? 0 : item.NroHombres;
                                s.NroMujeres = item.NroMujeres == null ? 0 : item.NroMujeres;
                                s.Total = item.Total == null ? 0 : item.Total;

                                actividades.Add(s);
                            }
                        }
                    }
                }
            }

            result.Columnas = columnas.ToList();
            result.ColumnasSecundaria = columnasS.ToList();
            result.DetalleActividades = actividades.ToList();

            return result;
        }
        public EnTablaDinamica ListProductoSeguimientoNEDetalles(string Etapa) //ATM capacitadas para brindar asistencia técnica a las JASS
        {
            EnTablaDinamica result = new EnTablaDinamica();

            List<EnTablaDinamicaColumnas> columnas = new List<EnTablaDinamicaColumnas>();
            List<EnTablaDinamicaColumnas> columnasS = new List<EnTablaDinamicaColumnas>();
            List<EnListSeguimientoDetalleActividades> actividades = new List<EnListSeguimientoDetalleActividades>();

            var objHeaderPrincipal = context.CronogramaActividades.Where(x => x.Tipo == "Nucleo Ejecutor" && x.Etapa == Etapa && x.Activo == true).ToList();

            if (objHeaderPrincipal != null && objHeaderPrincipal.Count() > 0)
            {
                EnTablaDinamicaColumnas HPn = new EnTablaDinamicaColumnas();
                HPn.title = "N°";
                HPn.data = "";
                HPn.rowspan = 2;
                HPn.colspan = 1;
                columnas.Add(HPn);

                EnTablaDinamicaColumnas HP3 = new EnTablaDinamicaColumnas();
                HP3.title = "CUI";
                HP3.data = "";
                HP3.rowspan = 2;
                HP3.colspan = 1;
                columnas.Add(HP3);

                EnTablaDinamicaColumnas HP1 = new EnTablaDinamicaColumnas();
                HP1.title = "Región";
                HP1.data = "";
                HP1.rowspan = 2;
                HP1.colspan = 1;
                columnas.Add(HP1);

                EnTablaDinamicaColumnas HP2 = new EnTablaDinamicaColumnas();
                HP2.title = "Localidad";
                HP2.data = "";
                HP2.rowspan = 2;
                HP2.colspan = 1;
                columnas.Add(HP2);

                foreach (var item in objHeaderPrincipal)
                {
                    EnTablaDinamicaColumnas HP = new EnTablaDinamicaColumnas();
                    HP.title = item.Actividad;
                    HP.data = "";
                    HP.rowspan = 1;
                    HP.colspan = 5;
                    columnas.Add(HP);

                    List<string> columnassecundarias = new List<string>() { "Fecha", "Nro. Hombres", "Nro. Mujeres", "Total", "Acta" };

                    for (int i = 0; i < columnassecundarias.Count(); i++)
                    {
                        EnTablaDinamicaColumnas HPS = new EnTablaDinamicaColumnas();
                        HPS.title = columnassecundarias[i];
                        HPS.data = "";
                        HPS.rowspan = 1;
                        HPS.colspan = 1;
                        columnasS.Add(HPS);
                    }
                }

            }

            List<string> ListCUI = context.SeguimientoActividadesNE.Where(x => x.Activo == true).Select(x => x.CUI).ToList();
            var objproy = context.Proyecto.Where(x => x.Cod_subprograma == 133 && x.Estado == 1 && ListCUI.Contains(x.CUI)).ToList();

            if (objproy != null && objproy.Count() > 0)
            {
                List<Int32> IdCronograma = context.CronogramaActividades.Where(x => x.Activo == true && x.Etapa == Etapa && x.Tipo == "Nucleo Ejecutor").Select(x => x.IdCronogramaActividades).ToList(); // id de talleres y sesiones

                if (objproy != null && objproy.Count() > 0)
                {
                    foreach (var data in objproy)
                    {
                        var objDet = context.DetalleSeguimientoActividadesNE.Where(x => x.SeguimientoActividadesNE.CUI == data.CUI && IdCronograma.Contains(x.IdCronogramaActividades) && x.Activo == true).ToList();
                        var depa = context.Departamento.SingleOrDefault(x => x.cod_depa == data.IdUbigeo.Substring(0, 2));

                        foreach (var item in objDet)
                        {
                            EnListSeguimientoDetalleActividades s = new EnListSeguimientoDetalleActividades();
                            s.CUI = data.CUI;
                            s.Departamento = depa.nom_depa;
                            s.Localidad = data.Localidad;
                            s.Fecha = item.Fecha == null ? "" : Convert.ToDateTime(item.Fecha).ToString("dd/MM/yyyy");
                            s.NroHombres = item.NroHombres == null ? 0 : item.NroHombres;
                            s.NroMujeres = item.NroMujeres == null ? 0 : item.NroMujeres;
                            s.Total = item.Total == null ? 0 : item.Total;

                            actividades.Add(s);
                        }
                        
                    }
                }
            }

            result.Columnas = columnas.ToList();
            result.ColumnasSecundaria = columnasS.ToList();
            result.DetalleActividades = actividades.ToList();

            return result;
        }

        public List<EnMatrizResumen> ListMatrizResumenRE() //Matriz Resumen
        {
            List<EnMatrizResumen> result = new List<EnMatrizResumen>();

            var obj = context.MatrizResultado.Where(x => x.Activo == true).ToList();

            if (obj != null && obj.Count() > 0)
            {
                foreach (var item in obj)
                {
                    EnMatrizResumen a = new EnMatrizResumen();
                    a.Nivel = 1;
                    a.NroResultado = Convert.ToInt32(item.NroResultado);
                    a.Resultado = item.Resultado;
                    result.Add(a);

                    var objResultado = context.ResultadoEsperado.Where(x => x.IdMatrizResultado == item.IdMatrizResultado && x.Activo == true).ToList();

                    foreach (var re in objResultado)
                    {
                        EnMatrizResumen b = new EnMatrizResumen();
                        b.Nivel = 2;
                        b.NroResultado = Convert.ToInt32(item.NroResultado);
                        b.Resultado = item.Resultado;
                        b.ResultadoEsperado = re.ResultadoEsperado1;
                        b.LineaBase = Convert.ToInt32(re.LineaBase);
                        b.AnioLineaBase = Convert.ToInt32(re.AnioLineaBase);
                        b.UnidadMedida = re.UnidadMedida;
                        b.MedioVerificacion = re.MedioVerificacion;
                        b.Observaciones = re.Observaciones;

                        var objResultadoAnio = context.ResultadoEsperadoAnio.Where(x => x.IdResultadoEsperado == re.IdResultadoEsperado && x.Activo == true).ToList();

                        foreach (var reanio in objResultadoAnio)
                        {
                            switch (reanio.NroAnio)
                            {
                                case 1:
                                    b.NroAnio1 = Convert.ToInt32(reanio.NroAnio);
                                    b.Anio1 = Convert.ToInt32(reanio.Anio);
                                    b.Anio1_A = Convert.ToDecimal(reanio.Avanzado);
                                    b.Anio1_P = Convert.ToDecimal(reanio.Programado);
                                    break;
                                case 2:
                                    b.NroAnio2 = Convert.ToInt32(reanio.NroAnio);
                                    b.Anio2 = Convert.ToInt32(reanio.Anio);
                                    b.Anio2_A = Convert.ToDecimal(reanio.Avanzado);
                                    b.Anio2_P = Convert.ToDecimal(reanio.Programado);
                                    break;
                                case 3:
                                    b.NroAnio3 = Convert.ToInt32(reanio.NroAnio);
                                    b.Anio3 = Convert.ToInt32(reanio.Anio);
                                    b.Anio3_A = Convert.ToDecimal(reanio.Avanzado);
                                    b.Anio3_P = Convert.ToDecimal(reanio.Programado);
                                    break;
                                case 4:
                                    b.NroAnio4 = Convert.ToInt32(reanio.NroAnio);
                                    b.Anio4 = Convert.ToInt32(reanio.Anio);
                                    b.Anio4_A = Convert.ToDecimal(reanio.Avanzado);
                                    b.Anio4_P = Convert.ToDecimal(reanio.Programado);
                                    break;
                                case 5:
                                    b.NroAnio5 = Convert.ToInt32(reanio.NroAnio);
                                    b.Anio5 = Convert.ToInt32(reanio.Anio);
                                    b.Anio5_A = Convert.ToDecimal(reanio.Avanzado);
                                    b.Anio5_P = Convert.ToDecimal(reanio.Programado);
                                    break;
                            }
                        }
                        b.Meta_A = b.Anio1_A + b.Anio2_A + b.Anio3_A + b.Anio4_A + b.Anio5_A;
                        b.Meta_P = b.Anio1_P + b.Anio2_P + b.Anio3_P + b.Anio4_P + b.Anio5_P;

                        result.Add(b);
                    }
                }
            }
            return result;
        }

        public List<EnMatrizResumen> ListMatrizResumenP() //Matriz Resumen
        {
            List<EnMatrizResumen> result = new List<EnMatrizResumen>();

            var obj = context.Componente.Where(x => x.Activo == true).ToList();

            if (obj != null && obj.Count() > 0)
            {
                foreach (var item in obj)
                {
                    EnMatrizResumen a = new EnMatrizResumen();
                    a.Nivel = 1;
                    a.NroComponente = Convert.ToInt32(item.NroComponente);
                    a.Componente = item.NombreComponente;
                    result.Add(a);

                    var objProducto = context.Producto.Where(x => x.IdComponente == item.IdComponente && x.Activo == true).ToList();

                    foreach (var re in objProducto)
                    {
                        EnMatrizResumen b = new EnMatrizResumen();
                        b.Nivel = 2;
                        b.NroComponente = Convert.ToInt32(item.NroComponente);
                        b.NroProducto = Convert.ToInt32(re.NroProducto);
                        b.Producto = re.Producto1;
                        b.CostoEstimado = Convert.ToDecimal(re.CostoEstimado);
                        b.LineaBase = Convert.ToInt32(re.LineaBase);
                        b.UnidadMedida = re.UnidadMedida;
                        b.MedioVerificacion = re.MedioVerificacion;
                        b.Observaciones = re.Observaciones;

                        var objResultadoContri = context.MatrizResultadoProducto.Where(x => x.IdProducto == re.IdProducto && x.Activo == true).ToList();
                        
                        if(objResultadoContri!=null && objResultadoContri.Count() > 0)
                        {
                            var contribuye = "";
                            foreach (var x in objResultadoContri)
                            {
                                if (contribuye == "")
                                {
                                    contribuye = x.MatrizResultado.NroResultado.ToString();
                                }
                                else
                                {
                                    contribuye = contribuye + "," + x.MatrizResultado.NroResultado.ToString();
                                }
                                
                            }
                            b.ResultadoContribuye = contribuye;
                        }
                        else
                        {
                            b.ResultadoContribuye = "";
                        }

                        var objProductoAnio = context.ProductoAnio.Where(x => x.IdProducto == re.IdProducto && x.Activo == true).ToList();

                        foreach (var reanio in objProductoAnio)
                        {
                            switch (reanio.NroAnio)
                            {
                                case 1:
                                    b.NroAnio1 = Convert.ToInt32(reanio.NroAnio);
                                    b.Anio1 = Convert.ToInt32(reanio.Anio);
                                    b.Anio1_A = Convert.ToDecimal(reanio.Avanzado);
                                    b.Anio1_P = Convert.ToDecimal(reanio.Programado);
                                    break;
                                case 2:
                                    b.NroAnio2 = Convert.ToInt32(reanio.NroAnio);
                                    b.Anio2 = Convert.ToInt32(reanio.Anio);
                                    b.Anio2_A = Convert.ToDecimal(reanio.Avanzado);
                                    b.Anio2_P = Convert.ToDecimal(reanio.Programado);
                                    break;
                                case 3:
                                    b.NroAnio3 = Convert.ToInt32(reanio.NroAnio);
                                    b.Anio3 = Convert.ToInt32(reanio.Anio);
                                    b.Anio3_A = Convert.ToDecimal(reanio.Avanzado);
                                    b.Anio3_P = Convert.ToDecimal(reanio.Programado);
                                    break;
                                case 4:
                                    b.NroAnio4 = Convert.ToInt32(reanio.NroAnio);
                                    b.Anio4 = Convert.ToInt32(reanio.Anio);
                                    b.Anio4_A = Convert.ToDecimal(reanio.Avanzado);
                                    b.Anio4_P = Convert.ToDecimal(reanio.Programado);
                                    break;
                                case 5:
                                    b.NroAnio5 = Convert.ToInt32(reanio.NroAnio);
                                    b.Anio5 = Convert.ToInt32(reanio.Anio);
                                    b.Anio5_A = Convert.ToDecimal(reanio.Avanzado);
                                    b.Anio5_P = Convert.ToDecimal(reanio.Programado);
                                    break;
                            }
                        }

                        b.Meta_A = b.Anio1_A + b.Anio2_A + b.Anio3_A + b.Anio4_A + b.Anio5_A;
                        b.Meta_P = b.Anio1_P + b.Anio2_P + b.Anio3_P + b.Anio4_P + b.Anio5_P;
                        result.Add(b);
                    }
                }
            }
            return result;
        }
    }
}
