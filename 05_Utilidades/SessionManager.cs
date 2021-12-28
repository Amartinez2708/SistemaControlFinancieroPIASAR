using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;


namespace _05_Utilidades
{
    public class SessionManager
    {
        const string STR_SESSION = "SessionManager";

        [Serializable]
        class SessionItem
        {
            public string Key { get; set; }
            public object Value { get; set; }
        }

        static List<SessionItem> CurrentSession;

        static List<SessionItem> getCurrentSession()
        {
            if (HttpContext.Current != null)
            {

                if (HttpContext.Current.Session[STR_SESSION] == null)
                    HttpContext.Current.Session[STR_SESSION] = new List<SessionItem>();

                return (List<SessionItem>)HttpContext.Current.Session[STR_SESSION];
            }
            else
            {
                if (CurrentSession == null)
                    CurrentSession = new List<_05_Utilidades.SessionManager.SessionItem>();

                return CurrentSession;
            }
        }

        public static void Remove(string key)
        {
            if (HttpContext.Current != null)
                HttpContext.Current.Session.Remove(key);
            //else
            //    CurrentSession.Remove()
        }

        public static void RemoveAll()
        {
            if (HttpContext.Current != null)
            {
                HttpContext.Current.Session.Clear();
                HttpContext.Current.Session.RemoveAll();
            }
            else
                CurrentSession = null;
        }

        public static void Set(string key, object value)
        {
            var exist = getCurrentSession().Where(x => x.Key == key).FirstOrDefault();
            if (exist == null)
                getCurrentSession().Add(new SessionItem() { Key = key, Value = value });
            else
                exist.Value = value;
        }

        public static T Get<T>(string key)
        {

            var exist = getCurrentSession().Where(x => x.Key == key).FirstOrDefault();
            if (exist == null)
                return default(T);
            else
                return (T)exist.Value;
        }
    }
}
