using System;
using System.IO;
using System.Web.Mvc;
using System.Web.UI;

namespace _05_Utilidades
{
    public class ViewToStringRenderer
    {
        private readonly ControllerContext _context;

        public ViewToStringRenderer(ControllerContext context)
        {
            _context = context;
        }

        public string RenderViewToString(string viewName, object model)
        {
            var viewEngineResult = ViewEngines.Engines.FindPartialView(_context, viewName);
            if (viewEngineResult.View == null)
            {
                throw new FileNotFoundException($"La vista '{viewName}' no pudo ser encontrada");
            }

            var viewData = new ViewDataDictionary(model);
            var tempData = new TempDataDictionary();
            var viewContext = new ViewContext(_context, viewEngineResult.View, viewData, tempData, TextWriter.Null);

            using (var stringWriter = new StringWriter())
            {
                var html = new HtmlTextWriter(stringWriter);
                viewEngineResult.View.Render(viewContext, html);
                return stringWriter.ToString();
            }
        }
    }
}
