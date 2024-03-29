﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnAUTORIZACION_GASTO_DETALLE
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
        public Nullable<decimal> SaldoImporte { get; set; }
    }
}
