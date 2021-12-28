﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnMANIFIESTO_GASTO_DETALLE
    {
        public int IDMANIFIESTO_DETALLE { get; set; }
        public Nullable<int> IDMANIFIESTO { get; set; }
        public string ITEM { get; set; }
        public Nullable<int> IDRUBRO { get; set; }
        public Nullable<int> IDSUBRUBRO { get; set; }
        public Nullable<int> ORDEN_CRONOLOGICO { get; set; }
        public Nullable<System.DateTime> FECHA { get; set; }
        public Nullable<int> IDCLASE { get; set; }
        public Nullable<int> ID_ITEM { get; set; }
        public string ITEM_INSUMO_SERVICIO { get; set; }
        public string NRO_ITEM { get; set; }
        public string RAZON_SOCIAL_NOMBRE { get; set; }
        public string CONCEPTO { get; set; }
        public string UNIDAD { get; set; }
        public Nullable<decimal> CANTIDAD { get; set; }
        public Nullable<decimal> PRECIO_UNITARIO { get; set; }
        public Nullable<decimal> IMPORTE { get; set; }
        public string OBSERVACION { get; set; }
        public Nullable<decimal> SALDO_IMPORTE_INSUMO { get; set; }
        public Nullable<decimal> SALDO_CANTIDAD_INSUMO { get; set; }
        public string OBSERVACIONES { get; set; }
        public Nullable<int> TIPO_FLAG { get; set; }
        public Nullable<int> ESTADO { get; set; }
        public Nullable<int> IDUSUARIO_ADD { get; set; }
        public Nullable<System.DateTime> FECHA_ADD { get; set; }
        public Nullable<int> IDUSUARIO_UPD { get; set; }
        public Nullable<System.DateTime> FECHA_UPD { get; set; }
        public string Clase { get; set; }

    }
}
