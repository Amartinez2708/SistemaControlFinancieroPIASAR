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
    
    public partial class AUTORIZACION_GASTO_DETALLE
    {
        public int IDAUTORIZACION_DETALLE { get; set; }
        public Nullable<int> IDAUTORIZACION { get; set; }
        public Nullable<int> NRO_ITEM { get; set; }
        public Nullable<int> IDRUBRO { get; set; }
        public string PARTIDA { get; set; }
        public Nullable<int> ID_ITEM { get; set; }
        public string ITEM_INSUMO_SERVICIO { get; set; }
        public string DESCRIPCION_INSUMO_SERVICIO { get; set; }
        public string UNIDAD { get; set; }
        public Nullable<decimal> CANTIDAD { get; set; }
        public Nullable<decimal> PRECIO_UNITARIO { get; set; }
        public Nullable<decimal> IMPORTE { get; set; }
        public Nullable<decimal> SALDO_IMPORTE_INSUMO { get; set; }
        public Nullable<decimal> SALDO_CANTIDAD_INSUMO { get; set; }
        public string OBSERVACIONES { get; set; }
        public Nullable<int> TIPO_FLAG { get; set; }
        public Nullable<decimal> CANTIDAD_MODIFICADA { get; set; }
        public Nullable<decimal> IMPORTE_MODIFICADO { get; set; }
        public string NOMBRE_SUSTENTO { get; set; }
        public string ADJUNTO_SUSTENTO { get; set; }
        public Nullable<int> ESTADO { get; set; }
        public Nullable<int> IDUSUARIO_ADD { get; set; }
        public Nullable<System.DateTime> FECHA_ADD { get; set; }
        public Nullable<int> IDUSUARIO_UPD { get; set; }
        public Nullable<System.DateTime> FECHA_UPD { get; set; }
        public Nullable<decimal> SaldoImporte { get; set; }
    
        public virtual Autorizacion_Gasto Autorizacion_Gasto { get; set; }
    }
}
