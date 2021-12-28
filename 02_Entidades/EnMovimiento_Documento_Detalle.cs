using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnMovimiento_Documento_Detalle
    {
        public int IdDocumento_detalle { get; set; }
        public int IdMovimiento { get; set; }
        public string Nombre_documento { get; set; }
        public string Nombre_real_documento { get; set; }
        public string Ruta_documento { get; set; }
        public string Cod_pagina { get; set; }
        public Nullable<bool> Estado { get; set; }
    }
}
