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
    public class SrvInicio
    {
        BD_NucleosEjecutoresEntities context = new BD_NucleosEjecutoresEntities();
        public List<EnMenuSistema> ListMenu(int IdPerfil)
        {
            List<MenuSistema> objMenuSistema = new List<MenuSistema>();
            List<EnMenuSistema> objEnMenuSistema = new List<EnMenuSistema>();
            List<PerfilMenu> objPerfilMenu = new List<PerfilMenu>();

            #region Menu
            if (IdPerfil != 1)
            {
                objPerfilMenu = context.PerfilMenu.Where(x => x.IdPerfil == IdPerfil && x.Activo == true).ToList();
                if (objPerfilMenu != null && objPerfilMenu.Count() > 0)
                {
                    #region Obtener menu
                    foreach (var dataPerfilMenu in objPerfilMenu)
                    {
                        objMenuSistema = context.MenuSistema.Where(x => x.IdMenuSistema == dataPerfilMenu.IdMenuSistema && x.Activo == true).ToList();
                        if (objMenuSistema != null)
                        {
                            EnMenuSistema Menu;
                            foreach (var dataMenu in objMenuSistema)
                            {
                                Menu = new EnMenuSistema();
                                Menu.IdMenuSistema = dataMenu.IdMenuSistema;
                                Menu.Titulo_padre = dataMenu.Titulo_padre;
                                Menu.Descripcion = dataMenu.Descripcion;
                                Menu.IdMenu_padre = dataMenu.IdMenu_padre;
                                Menu.Url = dataMenu.Url;
                                Menu.Menu_jerarquia = dataMenu.Menu_jerarquia;
                                Menu.Icono = dataMenu.Icono;
                                objEnMenuSistema.Add(Menu);
                            }
                        }
                    }
                    #endregion
                }
            }
            else
            {
                objMenuSistema = context.MenuSistema.Where(x => x.IdMenuSistema != 0 && x.Activo == true).ToList();
                if (objMenuSistema != null)
                {
                    EnMenuSistema Menu;
                    foreach (var dataMenu in objMenuSistema)
                    {
                        Menu = new EnMenuSistema();
                        Menu.IdMenuSistema = dataMenu.IdMenuSistema;
                        Menu.Titulo_padre = dataMenu.Titulo_padre;
                        Menu.Descripcion = dataMenu.Descripcion;
                        Menu.IdMenu_padre = dataMenu.IdMenu_padre;
                        Menu.Url = dataMenu.Url;
                        Menu.Menu_jerarquia = dataMenu.Menu_jerarquia;
                        Menu.Icono = dataMenu.Icono;
                        objEnMenuSistema.Add(Menu);
                    }
                }
            }


            #endregion

            return objEnMenuSistema.ToList();
        }

        public EnIndicadoresInicio Indicadores(int IdPerfil)
        {
            EnIndicadoresInicio result = new EnIndicadoresInicio();

            if (IdPerfil == 1)//Administrador
            {

            }
            else if (IdPerfil == 2)//Monitor Social Institucional
            {
                result.NroProyectos = context.Proyecto.Where(x => x.Cod_subprograma == 133 && x.Estado == 1).Count();
                result.NroProyectosAsignados = context.PersonaProyecto.Where(x => x.IdPersona == SecurityManager<EnUsuario>.User.IdPersonal && x.Activo == true).Select(x => x.IdProyecto).Count();
                result.NroRegistrosRealizados = 0;//
                result.NroActividadesFamilias = context.DetalleSeguimientoActividadesFamilias.Where(x => x.Activo == true).Count();
                result.NroActividadesNE = context.DetalleSeguimientoActividadesNE.Where(x => x.Activo == true).Count();
                result.NroActividadesJASS = context.DetalleSeguimientoActividadesJASS.Where(x => x.Activo == true).Count();
                result.NroActividadesATM = context.DetalleSeguimientoActividadesATM.Where(x => x.Activo == true).Count();

                result.NroRegistroFamilias = context.DetalleSeguimientoActividadesFamilias.Where(x =>x.IdUsuario_add== SecurityManager<EnUsuario>.User.IdUsuario && x.Activo == true).Count();
                result.NroRegistroNE = context.DetalleSeguimientoActividadesNE.Where(x => x.IdUsuario_add == SecurityManager<EnUsuario>.User.IdUsuario && x.Activo == true).Count();
                result.NroRegistroJASS = context.DetalleSeguimientoActividadesJASS.Where(x => x.IdUsuario_add == SecurityManager<EnUsuario>.User.IdUsuario && x.Activo == true).Count();
                result.NroRegistroATM = context.DetalleSeguimientoActividadesATM.Where(x => x.IdUsuario_add == SecurityManager<EnUsuario>.User.IdUsuario && x.Activo == true).Count();

                int TotalR = result.NroRegistroFamilias + result.NroRegistroNE + result.NroRegistroJASS + result.NroRegistroATM;

                result.PRFamilia = TotalR == 0 ? 0 : ((result.NroRegistroFamilias / TotalR) * 100);
                result.PRNE = TotalR == 0 ? 0 : ((result.NroRegistroNE / TotalR) * 100);
                result.PRJASS = TotalR == 0 ? 0 : ((result.NroRegistroJASS / TotalR) * 100);
                result.PRATM = TotalR == 0 ? 0 : ((result.NroRegistroATM / TotalR) * 100);

                int max = 0;
                string Principal = "-";

                if (TotalR > 0)
                {
                    max = result.NroRegistroFamilias;
                    Principal = "Familias";

                    if (result.NroRegistroNE > max) { max = result.NroRegistroNE; Principal = "Nucleos Ejecutores"; }
                    if (result.NroRegistroJASS > max) { max = result.NroRegistroJASS; Principal = "JASS"; }
                    if (result.NroRegistroATM > max) { max = result.NroRegistroATM; Principal = "ATM"; }

                }

                result.NroRegistroPrincipal = max;
                result.Principal = Principal;
            }

            return result;
        }

        public List<EnIndicadoresInicio> AreaIntervencion(int IdPerfil, int IdPersona)
        {
            List<EnIndicadoresInicio> result = new List<EnIndicadoresInicio>();

            List<int> objProyectoAsignados = context.PersonaProyecto.Where(x => x.IdPersona == IdPersona && x.Activo == true).Select(x => x.IdProyecto).ToList();
            var obj = context.Proyecto.Where(x => x.Cod_subprograma == 133 && (objProyectoAsignados.Count() == 0 || objProyectoAsignados.Contains(x.IdProyecto)) && x.Estado == 1).ToList();
            if(obj!= null && obj.Count() > 0)
            {
                var objAreas = obj.Select(x => x.IdUbigeo.Substring(0, 2)).Distinct();

                foreach (var item in objAreas)
                {
                    var dep = context.Departamento.FirstOrDefault(x => x.cod_depa == item).nom_depa;
                    EnIndicadoresInicio n = new EnIndicadoresInicio();
                    n.AreaIntervencion = dep;
                    n.NroLocalidadesIntervenidad = obj.Where(x => x.IdUbigeo.Substring(0, 2) == item).Count();
                    result.Add(n);
                }
            }
            return result;
        }

        public List<EnActividadReciente> ActividadReciente()
        {
            List<EnActividadReciente> result = new List<EnActividadReciente>();

            var Familias = context.DetalleSeguimientoActividadesFamilias.Where(x => x.IdUsuario_add == SecurityManager<EnUsuario>.User.IdUsuario && x.Activo == true).ToList();
            var NE = context.DetalleSeguimientoActividadesNE.Where(x => x.IdUsuario_add == SecurityManager<EnUsuario>.User.IdUsuario && x.Activo == true).ToList();
            var JASS = context.DetalleSeguimientoActividadesJASS.Where(x => x.IdUsuario_add == SecurityManager<EnUsuario>.User.IdUsuario && x.Activo == true).ToList();
            var ATM = context.DetalleSeguimientoActividadesATM.Where(x => x.IdUsuario_add == SecurityManager<EnUsuario>.User.IdUsuario && x.Activo == true).ToList();

            if (Familias != null && Familias.Count() > 0)
            {
                foreach (var item in Familias)
                {
                    EnActividadReciente n = new EnActividadReciente();
                    n.Tipo = "Familias";
                    n.IdDetalleSeguimiento = item.IdDetalleSeguimientoActividadesFamilias;
                    n.IdSeguimiento = item.IdSeguimientoActividades;
                    n.IdCronograma = item.IdCronogramaActividades;
                    n.Fecha = item.Fecha;
                    n.Fecha_add = item.Fecha_add;
                    result.Add(n);
                }
            }
            if (NE != null && NE.Count() > 0)
            {
                foreach (var item in NE)
                {
                    EnActividadReciente n = new EnActividadReciente();
                    n.Tipo = "Nucleos Ejecutores";
                    n.IdDetalleSeguimiento = item.IdDetalleSeguimientoActividadesNE;
                    n.IdSeguimiento = item.IdSeguimientoActividadesNE;
                    n.IdCronograma = item.IdCronogramaActividades;
                    n.Fecha = item.Fecha;
                    n.Fecha_add = item.Fecha_add;
                    result.Add(n);
                }
            }
            if (JASS != null && JASS.Count() > 0)
            {
                foreach (var item in JASS)
                {
                    EnActividadReciente n = new EnActividadReciente();
                    n.Tipo = "JASS";
                    n.IdDetalleSeguimiento = item.IdDetalleSeguimientoActividadesJASS;
                    n.IdSeguimiento = item.IdSeguimientoActividadesJASS;
                    n.IdCronograma = item.IdCronogramaActividades;
                    n.Fecha = item.Fecha;
                    n.Fecha_add = item.Fecha_add;
                    result.Add(n);
                }
            }
            if (ATM != null && ATM.Count() > 0)
            {
                foreach (var item in ATM)
                {
                    EnActividadReciente n = new EnActividadReciente();
                    n.Tipo = "ATM";
                    n.IdDetalleSeguimiento = item.IdDetalleSeguimientoActividadesATM;
                    n.IdSeguimiento = item.IdSeguimientoActividadesATM;
                    n.IdCronograma = item.IdCronogramaActividades;
                    n.Fecha = item.Fecha;
                    n.Fecha_add = item.Fecha_add;
                    result.Add(n);
                }
            }
            return result.OrderByDescending(x=>x.Fecha_add).ToList();
        }
    }
}
