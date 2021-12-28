using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(_01_Aplicacion.Startup))]
namespace _01_Aplicacion
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
