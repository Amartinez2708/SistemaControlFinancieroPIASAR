using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _05_Utilidades
{
    public static class SecurityManager<T>
    {
        public static string UserName
        {
            get { return SessionManager.Get<string>("UserName"); }
            set { SessionManager.Set("UserName", value); }
        }

        public static T User
        {
            get { return SessionManager.Get<T>("User"); }
            set { SessionManager.Set("User", value); }
        }
    }
}
