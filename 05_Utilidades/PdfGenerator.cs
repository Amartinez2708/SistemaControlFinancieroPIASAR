using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using iTextSharp.text;
using iTextSharp.text.pdf;
using System.IO;
using iTextSharp.tool.xml;
using iTextSharp.tool.xml.pipeline.end;
//using iTextSharp.tool.xml.pipeline.end;

namespace _05_Utilidades
{
    public class PdfGenerator
    {
        public byte[] GeneratePdf(string imagePath, string headerText, string mainText)
        {
            // Crear un documento PDF
            Document pdfDocument = new Document(PageSize.A4, 50, 50, 70, 50);//PageSize.A4, 50, 50, 30, 30
            MemoryStream memoryStream = new MemoryStream();
            PdfWriter writer = PdfWriter.GetInstance(pdfDocument, memoryStream);

            // Agregar evento personalizado para la cabecera en cada página
            writer.PageEvent = new PdfHeaderEvent(imagePath, headerText);

            pdfDocument.Open();

            // Agregar el texto principal utilizando XMLWorkerHelper
            using (StringReader stringReader = new StringReader(mainText))
            {
                XMLWorkerHelper.GetInstance().ParseXHtml(writer, pdfDocument, stringReader);
            }

            pdfDocument.Close();

            // Obtener los bytes del documento PDF generado
            byte[] pdfBytes = memoryStream.ToArray();

            return pdfBytes;
        }
    }

    public class PdfHeaderEvent : PdfPageEventHelper
    {
        private string imagePath;
        private string headerText;

        public PdfHeaderEvent(string imagePath, string headerText)
        {
            this.imagePath = imagePath;
            this.headerText = headerText;
        }

        public override void OnEndPage(PdfWriter writer, Document document)
        {
            base.OnEndPage(writer, document);

            // Obtener el tamaño de la página
            Rectangle pageSize = document.PageSize;

            // Crear la tabla para el encabezado
            PdfPTable headerTable = new PdfPTable(2);
            headerTable.TotalWidth = pageSize.Width;
            headerTable.LockedWidth = true;

            // Crear la celda para la imagen
            PdfPCell imageCell = new PdfPCell();
            imageCell.Border = Rectangle.NO_BORDER;
            imageCell.VerticalAlignment = Element.ALIGN_TOP;
            imageCell.FixedHeight = 50f;

            // Agregar la imagen a la celda
            iTextSharp.text.Image headerImage = iTextSharp.text.Image.GetInstance(imagePath);
            headerImage.ScaleToFit(300f, 80f);
            imageCell.AddElement(headerImage);

            // Agregar la celda de la imagen a la tabla
            headerTable.AddCell(imageCell);

            // Crear la celda para el texto utilizando XMLWorkerHelper
            PdfPCell textCell = new PdfPCell();
            textCell.Border = Rectangle.NO_BORDER;
            textCell.VerticalAlignment = Element.ALIGN_MIDDLE;
            textCell.PaddingLeft = 10f;

            headerTable.AddCell(textCell);

            //// Agregar el texto a la celda utilizando XMLWorkerHelper
            //using (StringReader stringReader = new StringReader(headerText))
            //{
            //    XMLWorkerHelper.GetInstance().ParseXHtml(new PdfWriterPipeline(textCell, writer), stringReader);
            //}

            // Calcular la posición de la tabla para que esté en el medio de la parte superior
            float tableYPosition = pageSize.GetTop(document.TopMargin - 70f) - (headerTable.TotalHeight / 2f);
            float tableXPosition = (document.PageSize.Width / 2f) - 150;

            // Posicionar la tabla en la parte superior centrada
            headerTable.WriteSelectedRows(0, -1, tableXPosition, tableYPosition, writer.DirectContent);
        }
    }
}
