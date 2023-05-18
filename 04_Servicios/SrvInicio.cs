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
    }
}
