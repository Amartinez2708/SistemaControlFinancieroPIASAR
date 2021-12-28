using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_Entidades
{
    public class EnReporteBID
    {
        public string NroSubComponente { get; set; }
        public string SubComponente { get; set; }
        public string Unidad { get; set; }
        public string Progreso { get; set; }
        public Nullable<decimal> p2018 { get; set; }
        public Nullable<decimal> p2019 { get; set; }
        public Nullable<decimal> p2020 { get; set; }
        public Nullable<decimal> p2021 { get; set; }
        public Nullable<decimal> p2022 { get; set; }
        public Nullable<decimal> total { get; set; }
    }
}
