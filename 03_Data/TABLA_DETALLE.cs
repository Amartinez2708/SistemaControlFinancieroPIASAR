//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace _03_Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class TABLA_DETALLE
    {
        public int IDDETALLE { get; set; }
        public int IDTABLA { get; set; }
        public string SDETALLE { get; set; }
        public string FILLER1 { get; set; }
        public string FILLER2 { get; set; }
        public System.DateTime FECINS { get; set; }
        public System.DateTime FECUPD { get; set; }
        public int NESTADO { get; set; }
        public Nullable<int> IDPADRE { get; set; }
    
        public virtual TABLA TABLA { get; set; }
    }
}
